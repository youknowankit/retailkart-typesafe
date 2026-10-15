import { z } from "zod";

export const createOrderSchema = z.object({
  address: z.string().trim().min(1, "Delivery address is required"),
});

export type CreateOrderData = z.infer<typeof createOrderSchema>;
