import { z } from "zod";
export const updateProfileSchema = z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    profilePic: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    zipCode: z.string().optional(),
    phoneNo: z.string().optional(),
});
//# sourceMappingURL=user.schema.js.map