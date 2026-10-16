import { z } from "zod";
export const createOrderSchema = z.object({
    address: z.string().trim().min(1, "Delivery address is required"),
});
export const updateOrderStatusSchema = z.object({
    status: z.enum(["pending", "shipped", "delivered"]),
});
//# sourceMappingURL=order.schema.js.map