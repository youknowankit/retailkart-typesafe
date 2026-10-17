import authMiddleware from "#middlewares/authMiddleware.js";
import { Router } from "express";
import { initiatePaymentController, verifyPaymentController, } from "./payment.controller.js";
import validateMiddleware from "#middlewares/validateMiddleware.js";
import { createOrderSchema } from "#modules/orders/order.schema.js";
import { verifyPaymentSchema } from "./payment.schema.js";
const paymentRouter = Router();
paymentRouter.use(authMiddleware);
paymentRouter.post("/initiate", validateMiddleware(createOrderSchema), initiatePaymentController);
paymentRouter.post("/verify", validateMiddleware(verifyPaymentSchema), verifyPaymentController);
export default paymentRouter;
//# sourceMappingURL=payment.route.js.map