import { z } from "zod";

export const loginRequestSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .transform((email) => email.toLowerCase()),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters.")
    .max(128, "Password must not exceed 128 characters."),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;