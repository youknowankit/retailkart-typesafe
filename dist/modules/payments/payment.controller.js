import asyncHandler from "#shared/utils/asyncHandler.js";
import CustomError from "#shared/utils/CustomError.js";
import { initiatePayment, verifyPayment } from "./payment.service.js";
import successResponse from "#shared/utils/successResponse.js";
export const initiatePaymentController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new CustomError("Authentication Required", 401);
        }
        const paymentOrder = await initiatePayment(req.user.id, req.body);
        successResponse(res, "Payment order created successfully", paymentOrder, 201);
    }
    catch (error) {
        next(error);
    }
};
export const verifyPaymentController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new CustomError("Authentication Required", 401);
        }
        const order = await verifyPayment(req.user.id, req.body);
        successResponse(res, "Payment verified successfully", order);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=payment.controller.js.map