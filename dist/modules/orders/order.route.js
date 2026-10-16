import authMiddleware from "#middlewares/authMiddleware.js";
import validateMiddleware from "#middlewares/validateMiddleware.js";
import { Router } from "express";
import { createOrderSchema } from "./order.schema.js";
import { createOrderController, getAllOrdersController, getMyOrdersController, getOrderByIdController, } from "./order.controller.js";
import adminMiddleware from "#middlewares/adminMiddleware.js";
const orderRouter = Router();
orderRouter.use(authMiddleware);
orderRouter.get("/", getMyOrdersController);
orderRouter.get("/:id", getOrderByIdController);
orderRouter.get("/admin/all", adminMiddleware, getAllOrdersController);
orderRouter.post("/", validateMiddleware(createOrderSchema), createOrderController);
export default orderRouter;
//# sourceMappingURL=order.route.js.map