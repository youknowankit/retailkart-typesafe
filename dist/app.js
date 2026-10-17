import express from "express";
import errorMiddleware from "#middlewares/errorMiddleware.js";
import userRouter from "#modules/users/user.route.js";
import cookieParser from "cookie-parser";
import productRouter from "#modules/products/product.route.js";
import { pinoHttp } from "pino-http";
import logger from "#shared/utils/logger.js";
import authRouter from "#modules/auth/auth.route.js";
import cartRouter from "#modules/cart/cart.route.js";
import orderRouter from "#modules/orders/order.route.js";
import paymentRouter from "#modules/payments/payment.route.js";
const app = express();
//Global Middlewares
/*Logger-PINO */
app.use(pinoHttp({
    logger,
    customLogLevel: (_req, res, err) => {
        if (err || res.statusCode >= 500)
            return "error";
        if (res.statusCode >= 400)
            return "warn";
        return "info";
    },
    redact: {
        paths: [
            "req.headers.cookie",
            "req.headers.authorization",
            "res.headers.set-cookie",
        ],
        censor: "[REDACTED]",
    },
    serializers: {
        req(req) {
            return {
                method: req.method,
                url: req.url,
            };
        },
        res(res) {
            return {
                statusCode: res.statusCode,
            };
        },
    },
}));
app.use(express.json());
app.use(cookieParser());
//Routes
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "RetailKart TypeScript backend is running",
    });
});
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payments", paymentRouter);
//Error Middleware
app.use(errorMiddleware);
export default app;
//# sourceMappingURL=app.js.map