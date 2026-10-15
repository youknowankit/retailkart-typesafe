import { model, Schema } from "mongoose";
const orderItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
}, { _id: false });
const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    items: {
        type: [orderItemSchema],
        required: true,
        validate: {
            validator: (items) => items.length > 0,
            message: "An order must contain at least one item",
        },
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    paymentId: {
        type: String,
        default: undefined,
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered"],
        default: "pending",
    },
}, { timestamps: true });
const Order = model("Order", orderSchema);
export default Order;
//# sourceMappingURL=order.model.js.map