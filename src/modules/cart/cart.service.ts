import mongoose from "mongoose";
import Cart from "./cart.model.js";
import type {
  AddToCartData,
  RemoveCartItemData,
  UpdateCartItemData,
} from "./cart.schema.js";
import CustomError from "#shared/utils/CustomError.js";
import Product from "#modules/products/product.model.js";

export const getCart = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart) {
    return { user: userId, items: [] };
  }

  return cart;
};

export const addToCart = async (userId: string, data: AddToCartData) => {
  if (!mongoose.isValidObjectId(data.productId)) {
    throw new CustomError("Invalid Product ID", 400);
  }

  const product = await Product.findById(data.productId);
  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === data.productId,
  );
  if (existingItem) {
    existingItem.quantity += data.quantity;
  } else {
    cart.items.push({
      product: product._id,
      quantity: data.quantity,
    });
  }

  await cart.save();

  return cart.populate("items.product");
};

export const updateCartItem = async (
  userId: string,
  data: UpdateCartItemData,
) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new CustomError("Cart not found", 404);
  }

  const item = cart.items.find(
    (item) => item.product.toString() === data.productId,
  );
  if (!item) {
    throw new CustomError("Product not found in cart", 404);
  }

  item.quantity = data.quantity;

  await cart.save();

  return cart.populate("items.product");
};

export const removeCartItem = async (
  userId: string,
  data: RemoveCartItemData,
) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new CustomError("Cart not found", 404);
  }

  const itemExists = cart.items.some(
    (item) => item.product.toString() === data.productId,
  );
  if (!itemExists) {
    throw new CustomError("Product not found in cart", 404);
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== data.productId,
  );

  await cart.save();

  return cart.populate("items.product");
};
