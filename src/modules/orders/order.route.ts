import authMiddleware from "#middlewares/authMiddleware.js";
import validateMiddleware from "#middlewares/validateMiddleware.js";
import { Router } from "express";
import { createOrderSchema } from "./order.schema.js";
import {
  createOrderController,
  getMyOrdersController,
  getOrderByIdController,
} from "./order.controller.js";

const orderRouter = Router();

orderRouter.use(authMiddleware);

orderRouter.get("/", getMyOrdersController);

orderRouter.get("/:id", getOrderByIdController);

orderRouter.post(
  "/",
  validateMiddleware(createOrderSchema),
  createOrderController,
);


export default orderRouter;
