import asyncHandler from "#shared/utils/asyncHandler.js";
import CustomError from "#shared/utils/CustomError.js";
import successResponse from "#shared/utils/successResponse.js";
import { getCurrentUser, updateProfile } from "./user.service.js";
export const getCurrentUserController = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new CustomError("Authentication Required", 401);
    }
    const user = await getCurrentUser(req.user.id);
    successResponse(res, "User fetched successfully", user);
});
export const updateProfileController = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new CustomError("Authentication Required", 401);
    }
    const user = await updateProfile(req.user.id, req.body);
    successResponse(res, "Profile updated successfully", user);
});
//# sourceMappingURL=user.controller.js.map