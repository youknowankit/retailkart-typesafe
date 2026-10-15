import asyncHandler from "#shared/utils/asyncHandler.js";
import CustomError from "#shared/utils/CustomError.js";
import successResponse from "#shared/utils/successResponse.js";
import type {
  AddToCartData,
  RemoveCartItemData,
  UpdateCartItemData,
} from "./cart.schema.js";
import {
  addToCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "./cart.service.js";

export const getCartController = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new CustomError("Authentication Required", 401);
  }

  const cart = await getCart(req.user.id);

  successResponse(res, "Cart fetched successfully", cart);
});

export const addToCartController = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new CustomError("Authentication Required", 401);
  }

  const cart = await addToCart(req.user.id, req.body as AddToCartData);

  successResponse(res, "Product added to cart successfully", cart);
});

export const updateCartItemController = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new CustomError("Authentication Required", 401);
  }

  const cart = await updateCartItem(
    req.user.id,
    req.body as UpdateCartItemData,
  );

  successResponse(res, "Cart item updated successfully", cart);
});

export const removeCartItemController = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new CustomError("Authentication Required", 401);
  }

  const cart = await removeCartItem(
    req.user.id,
    req.body as RemoveCartItemData,
  );

  successResponse(res, "Product removed from cart successfully", cart);
});
