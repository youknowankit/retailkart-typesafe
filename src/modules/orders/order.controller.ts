import asyncHandler from "#shared/utils/asyncHandler.js";
import CustomError from "#shared/utils/CustomError.js";
import successResponse from "#shared/utils/successResponse.js";
import type { CreateOrderData } from "./order.schema.js";
import { createOrder } from "./order.service.js";

export const createOrderController = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new CustomError("Authentication Required", 401);
  }

  const order = await createOrder(req.user.id, req.body as CreateOrderData);

  successResponse(res, "Order created successfully", order, 201);
});
