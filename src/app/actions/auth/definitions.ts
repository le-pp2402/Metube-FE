import { z } from 'zod';

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(6, { message: 'Be at least 6 characters long' })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password field must not be empty.' }),
});

export type FormState =
| {
    errors?: {
      username?: string[];
      email?: string[];
      password?: string[];
    };
    message?: string;
  }
| undefined;

export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};