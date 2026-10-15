import { z } from "zod";
export const createOrderSchema = z.object({
    address: z.string().trim().min(1, "Delivery address is required"),
});
//# sourceMappingURL=order.schema.js.map