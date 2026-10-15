import { model, Schema } from "mongoose";
import type { ICart, ICartItem } from "./cart.types.js";

const cartItemSchema = new Schema<ICartItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      dafault: 1,
    },
  },
  { _id: false },
);

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: {
      type: [cartItemSchema],
      dafault: [],
    },
  },
  { timestamps: true },
);

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;
