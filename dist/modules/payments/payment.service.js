import { env } from "#config/env.js";
import razorpay from "#config/razorpay.js";
import Cart from "#modules/cart/cart.model.js";
import Order from "#modules/orders/order.model.js";
import { createPendingPaymentOrder, getCartOrderDetails, } from "#modules/orders/order.service.js";
import CustomError from "#shared/utils/CustomError.js";
import { verifyPaymentSignature } from "./payment.utils.js";
export const createRazorpayOrder = async (amount) => {
    const razorpayOrder = await razorpay.orders.create({
        amount: Math.round(amount * 100),
        currency: "INR",
    });
    return {
        razorpayOrderId: razorpayOrder.id,
        amount: Number(razorpayOrder.amount),
        currency: razorpayOrder.currency,
        keyId: env.RAZORPAY_KEY_ID,
    };
};
export const initiatePayment = async (userId, data) => {
    const { orderItems, totalAmount } = await getCartOrderDetails(userId);
    const paymentOrder = await createRazorpayOrder(totalAmount);
    await createPendingPaymentOrder(userId, data, paymentOrder.razorpayOrderId, orderItems, totalAmount);
    return paymentOrder;
};
// export const verifyPayment = async (
//   userId: string,
//   data: VerifyPaymentData,
// ) => {
//   const isSignatureValid = verifyPaymentSignature(
//     data.razorpay_order_id,
//     data.razorpay_payment_id,
//     data.razorpay_signature,
//   );
//   if (!isSignatureValid) {
//     throw new CustomError("Invalid payment signature", 400);
//   }
//   const order = await Order.findOne({
//     user: userId,
//     razorpayOrderId: data.razorpay_order_id,
//   });
//   if (!order) {
//     throw new CustomError("Payment order not found", 404);
//   }
//   const payment = await razorpay.payments.fetch(data.razorpay_payment_id);
//   if (payment.order_id !== order.razorpayOrderId) {
//     throw new CustomError("Payment does not match this order", 400);
//   }
//   if (payment.status !== "captured") {
//     throw new CustomError("Payment has not been captured", 400);
//   }
//   if (order.paymentStatus === "paid") {
//     return order;
//   }
//   order.paymentId = data.razorpay_payment_id;
//   order.paymentStatus = "paid";
//   await order.save();
//   await Cart.updateOne({ user: userId }, { $set: { items: [] } });
//   return order;
// };
export const verifyPayment = async (userId, data) => {
    const order = await Order.findOne({
        user: userId,
        razorpayOrderId: data.razorpay_order_id,
    });
    if (!order || !order.razorpayOrderId) {
        throw new CustomError("Payment order not found", 404);
    }
    const isSignatureValid = verifyPaymentSignature(order.razorpayOrderId, data.razorpay_payment_id, data.razorpay_signature);
    if (!isSignatureValid) {
        throw new CustomError("Invalid payment signature", 400);
    }
    const payment = await razorpay.payments.fetch(data.razorpay_payment_id);
    if (payment.order_id !== order.razorpayOrderId) {
        throw new CustomError("Payment does not match this order", 400);
    }
    if (payment.status !== "captured") {
        throw new CustomError("Payment has not been captured", 400);
    }
    if (Number(payment.amount) !== Math.round(order.totalAmount * 100) ||
        payment.currency !== "INR") {
        throw new CustomError("Payment amount or currency does not match the order", 400);
    }
    if (order.paymentStatus === "paid") {
        if (order.paymentId !== data.razorpay_payment_id) {
            throw new CustomError("Order was paid using a different payment", 409);
        }
        return order;
    }
    order.paymentId = data.razorpay_payment_id;
    order.paymentStatus = "paid";
    await order.save();
    await Cart.updateOne({ user: userId }, { $set: { items: [] } });
    return order;
};
//# sourceMappingURL=payment.service.js.map