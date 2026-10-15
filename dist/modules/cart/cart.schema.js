import { z } from "zod";
export const addToCartSchema = z.object({
    productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID"),
    quantity: z.number().int().min(1).default(1),
});
export const updateCartItemSchema = z.object({
    productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID"),
    quantity: z.number().int().min(1),
});
export const removeCartItemSchema = z.object({
    productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID"),
});
//# sourceMappingURL=cart.schema.js.map