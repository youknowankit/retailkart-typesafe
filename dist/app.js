import express from "express";
import errorMiddleware from "#middlewares/errorMiddleware.js";
import userRouter from "#modules/users/user.route.js";
import cookieParser from "cookie-parser";
import productRouter from "#modules/products/product.route.js";
import { pinoHttp } from "pino-http";
import logger from "#shared/utils/logger.js";
import { serialize } from "node:v8";
//Test imports
// import CustomError from "./shared/utils/CustomError.js";
// import asyncHandler from "./shared/utils/asyncHandler.js";
const app = express();
//Global Middlewares
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
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
//Test-Route
// app.get(
//   "/test-error",
//   asyncHandler((_req, _res) => {
//     throw new CustomError("This is a test Error", 400);
//   }),
// );
//Error Middleware
app.use(errorMiddleware);
export default app;
//# sourceMappingURL=app.js.map