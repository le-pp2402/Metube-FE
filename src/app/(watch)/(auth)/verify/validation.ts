import { z } from "zod";

export const VerifyEmailSchema = z.object({
    email: z.string().email('Invalid email format.'),
    code: z.string().length(4, 'Your one-time password must be 4 characters.'),
});