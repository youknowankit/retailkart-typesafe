import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  category: z.string().min(1),
  stock: z.number().int().min(0),
  images: z.array(z.string()).optional(),
});

export type CreateProductData = z.infer<typeof createProductSchema>;

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  category: z.string().min(1).optional(),
  stock: z.number().int().min(0).optional(),
  images: z.array(z.string()).optional(),
});

export type UpdateProductData = z.infer<typeof updateProductSchema>;
