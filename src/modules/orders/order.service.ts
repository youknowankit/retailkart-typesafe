import Cart from "#modules/cart/cart.model.js";
import Product from "#modules/products/product.model.js";
import CustomError from "#shared/utils/CustomError.js";
import mongoose from "mongoose";
import type { CreateOrderData, UpdateOrderStatusData } from "./order.schema.js";
import Order from "./order.model.js";
import type { IOrderItem } from "./order.types.js";

export const createOrder = async (userId: string, data: CreateOrderData) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart || cart.items.length === 0) {
    throw new CustomError("Cart is empty", 400);
  }

  const orderItems: IOrderItem[] = [];
  let totalAmount = 0;

  for (const item of cart.items) {
    const product = await Product.findById(item.product);

    if (!product) {
      throw new CustomError("A product in your cart no longer exists", 404);
    }

    const price = product.price;

    orderItems.push({
      productId: product._id,
      quantity: item.quantity,
      price,
    });

    totalAmount += price * item.quantity;
  }

  const session = await mongoose.startSession();

  try {
    let createdOrder;

    await session.withTransaction(async () => {
      const orders = await Order.create(
        [
          {
            user: userId,
            items: orderItems,
            totalAmount,
            address: data.address,
          },
        ],
        { session },
      );

      createdOrder = orders[0];

      await Cart.updateOne(
        { _id: cart._id, user: userId },
        { $set: { items: [] } },
        { session },
      );
    });

    if (!createdOrder) {
      throw new CustomError("Failed to create order", 500);
    }

    return createdOrder;
  } finally {
    await session.endSession();
  }
};

export const getMyOrders = async (userId: string) => {
  const orders = await Order.find({ user: userId }).sort({
    createdAt: -1,
  });

  return orders;
};

export const getOrderById = async (userId: string, orderId: string) => {
  if (!mongoose.isValidObjectId(orderId)) {
    throw new CustomError("Invalid order ID", 400);
  }

  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    throw new CustomError("Order not found", 404);
  }

  return order;
};

export const getAllOrders = async () => {
  const orders = await Order.find()
    .populate("user", "firstName lastName email")
    .sort({ createdAt: -1 });

  return orders;
};

export const updateOrderStatus = async (
  orderId: string,
  data: UpdateOrderStatusData,
) => {
  if (!mongoose.isValidObjectId(orderId)) {
    throw new CustomError("Invalid Order ID", 400);
  }

  const order = await Order.findByIdAndUpdate(
    orderId,
    { status: data.status },
    { returnDocument: "after", runValidators: true },
  );

  if (!order) {
    throw new CustomError("Order not found", 404);
  }

  return order;
};
