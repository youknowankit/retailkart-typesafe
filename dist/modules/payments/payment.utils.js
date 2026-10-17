import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "#config/env.js";
export const verifyPaymentSignature = (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
    const expectedSignature = createHmac("sha256", env.RAZORPAY_KEY_SECRET)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest("hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");
    const receivedBuffer = Buffer.from(razorpaySignature, "hex");
    if (expectedBuffer.length !== receivedBuffer.length ||
        receivedBuffer.length === 0) {
        return false;
    }
    return timingSafeEqual(expectedBuffer, receivedBuffer);
};
//# sourceMappingURL=payment.utils.js.map