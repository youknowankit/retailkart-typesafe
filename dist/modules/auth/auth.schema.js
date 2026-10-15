import { z } from "zod";
export const signUpSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.email(),
    password: z.string().min(6),
});
export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});
//# sourceMappingURL=auth.schema.js.map