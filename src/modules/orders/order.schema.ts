import { z } from "zod";

export const createOrderSchema = z.object({
  address: z.string().trim().min(1, "Delivery address is required"),
});

export type CreateOrderData = z.infer<typeof createOrderSchema>;

export const updateOrderStatusSchema = z.object({
  status: z.enum(["pending", "shipped", "delivered"]),
});

export type UpdateOrderStatusData = z.infer<typeof updateOrderStatusSchema>;
