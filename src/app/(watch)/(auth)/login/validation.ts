import { z } from "zod";

export const VerifyEmailSchema = z.object({
    email: z.string().email('Invalid email format.'),
    code: z.string().length(4, 'Your one-time password must be 4 characters.'),
});

export const LoginFormSchema = z.object({
    username: z.string().min(1, {
        message: 'Username is required.',
    }),
    password: z.string().min(1, {
        message: 'Password is required.',
    }),
});