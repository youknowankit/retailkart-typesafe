import asyncHandler from "#shared/utils/asyncHandler.js";
import CustomError from "#shared/utils/CustomError.js";
import successResponse from "#shared/utils/successResponse.js";
import { createOrder, getMyOrders, getOrderById } from "./order.service.js";
export const createOrderController = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new CustomError("Authentication Required", 401);
    }
    const order = await createOrder(req.user.id, req.body);
    successResponse(res, "Order created successfully", order, 201);
});
export const getMyOrdersController = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new CustomError("Authentication Required", 401);
    }
    const orders = await getMyOrders(req.user.id);
    successResponse(res, "Orders fetched successfully", orders);
});
export const getOrderByIdController = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new CustomError("Authentication Required", 401);
    }
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new CustomError("Invalid order ID", 400);
    }
    const order = await getOrderById(req.user.id, id);
    successResponse(res, "Order fetched successfully", order);
});
//# sourceMappingURL=order.controller.js.map