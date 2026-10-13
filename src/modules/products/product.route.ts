import validateMiddleware from "#middlewares/validateMiddleware.js";
import { Router } from "express";
import { createProductSchema, updateProductSchema } from "./product.schema.js";
import {
  createProductController,
  getProductByIdController,
  getProductsController,
  updateProductController,
} from "./product.controller.js";

const productRouter = Router();

productRouter.post(
  "/",
  validateMiddleware(createProductSchema),
  createProductController,
);

productRouter.get("/", getProductsController);
productRouter.get("/:id", getProductByIdController);
productRouter.patch(
  "/:id",
  validateMiddleware(updateProductSchema),
  updateProductController,
);

export default productRouter;
