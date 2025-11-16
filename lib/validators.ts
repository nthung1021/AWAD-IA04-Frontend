import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty'),
  email: z.email('Enter a valid email').min(1, 'Email cannot be empty'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = z.object({
  email: z.email('Enter a valid email').min(1, 'Email cannot be empty'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
