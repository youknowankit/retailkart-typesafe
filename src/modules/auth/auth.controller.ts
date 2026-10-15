import { env } from "#config/env.js";
import asyncHandler from "#shared/utils/asyncHandler.js";
import successResponse from "#shared/utils/successResponse.js";
import type { LoginData, SignupData } from "./auth.schema.js";
import { createUser, loginUser } from "./auth.service.js";

export const createUserController = asyncHandler(async (req, res) => {
  /*TS assertion is used which will not gurantee in itself but eventually req flows through the validate middleware which checks for the type*/
  const user = await createUser(req.body as SignupData);

  successResponse(res, "User created successfully", user, 201);
});

export const loginUserController = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body as LoginData);

  res.cookie("token", result.token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  successResponse(res, "Login successful", result.user);
});

export const logoutUserController = asyncHandler(async (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
  });

  successResponse(res, "Logout Successful");
});
