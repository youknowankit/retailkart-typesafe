import authMiddleware from "#middlewares/authMiddleware.js";
import { Router } from "express";
import {
  removeCartItemController,
  addToCartController,
  getCartController,
  updateCartItemController,
} from "./cart.controller.js";
import validateMiddleware from "#middlewares/validateMiddleware.js";
import {
  addToCartSchema,
  removeCartItemSchema,
  updateCartItemSchema,
} from "./cart.schema.js";

const cartRouter = Router();

cartRouter.use(authMiddleware);

cartRouter.get("/", getCartController);
cartRouter.post(
  "/items",
  validateMiddleware(addToCartSchema),
  addToCartController,
);
cartRouter.patch(
  "/items",
  validateMiddleware(updateCartItemSchema),
  updateCartItemController,
);
cartRouter.delete(
  "/items",
  validateMiddleware(removeCartItemSchema),
  removeCartItemController,
);

export default cartRouter;
