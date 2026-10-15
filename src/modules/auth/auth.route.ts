import validateMiddleware from "#middlewares/validateMiddleware.js";
import { Router } from "express";
import { loginSchema, signUpSchema } from "./auth.schema.js";
import {
  createUserController,
  loginUserController,
  logoutUserController,
} from "./auth.controller.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateMiddleware(signUpSchema),
  createUserController,
);

authRouter.post("/login", validateMiddleware(loginSchema), loginUserController);
authRouter.post("/logout", logoutUserController);

export default authRouter;
