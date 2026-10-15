import { Router } from "express";
import {
  getCurrentUserController,
  updateProfileController,
} from "./user.controller.js";
import authMiddleware from "#middlewares/authMiddleware.js";
import validateMiddleware from "#middlewares/validateMiddleware.js";
import { updateProfileSchema } from "./user.schema.js";

const userRouter = Router();

userRouter.get("/me", authMiddleware, getCurrentUserController);
userRouter.patch(
  "/me",
  authMiddleware,
  validateMiddleware(updateProfileSchema),
  updateProfileController,
);

export default userRouter;
