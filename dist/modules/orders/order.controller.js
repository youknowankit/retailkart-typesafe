import asyncHandler from "#shared/utils/asyncHandler.js";
import CustomError from "#shared/utils/CustomError.js";
import successResponse from "#shared/utils/successResponse.js";
import { createOrder, getAllOrders, getMyOrders, getOrderById, updateOrderStatus, } from "./order.service.js";
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
export const getAllOrdersController = asyncHandler(async (_req, res) => {
    const orders = await getAllOrders();
    successResponse(res, "All orders fetched successfully", orders);
});
export const updateOrderStatusController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new CustomError("Invalid Order ID", 400);
    }
    const order = await updateOrderStatus(id, req.body);
    successResponse(res, "Order status updated successfully", order);
});
//# sourceMappingURL=order.controller.js.map