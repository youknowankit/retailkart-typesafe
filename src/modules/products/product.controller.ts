import asyncHandler from "#shared/utils/asyncHandler.js";
import successResponse from "#shared/utils/successResponse.js";
import type { RequestHandler } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./product.service.js";

export const createProductController = asyncHandler(async (req, res) => {
  const product = await createProduct(req.body);

  successResponse(res, "Product created successfully", product, 201);
});

export const getProductsController = asyncHandler(async (_req, res) => {
  const products = await getProducts();

  successResponse(res, "Products fetched successfully", products);
});

export const getProductByIdController: RequestHandler<{ id: string }> =
  asyncHandler(async (req, res) => {
    const product = await getProductById(req.params.id);

    successResponse(res, "Product fetched successfully", product);
  });

export const updateProductController: RequestHandler<{ id: string }> =
  asyncHandler(async (req, res) => {
    const product = await updateProduct(req.params.id, req.body);

    successResponse(res, "Product updated successfully", product);
  });

export const deleteProductController: RequestHandler<{ id: string }> =
  asyncHandler(async (req, res) => {
    const product = await deleteProduct(req.params.id);

    successResponse(res, "Product deleted successfully", product);
  });
