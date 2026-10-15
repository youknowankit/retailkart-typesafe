import { z } from "zod";

export const addToCartSchema = z.object({
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID"),
  quantity: z.number().int().min(1).default(1),
});

export type AddToCartData = z.infer<typeof addToCartSchema>;

export const updateCartItemSchema = z.object({
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID"),
  quantity: z.number().int().min(1),
});

export type UpdateCartItemData = z.infer<typeof updateCartItemSchema>;

export const removeCartItemSchema = z.object({
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID"),
});

export type RemoveCartItemData = z.infer<typeof removeCartItemSchema>;
