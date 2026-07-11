import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().int().positive().default(3000),

  DEV_LOGIN_EMAIL: z
    .string()
    .email()
    .default("admin@resolveiq.local"),

  DEV_LOGIN_PASSWORD: z
    .string()
    .min(8)
    .default("ResolveIQ2026!"),
});

const parsedEnvironment = environmentSchema.safeParse(process.env);

if (!parsedEnvironment.success) {
  console.error("Invalid environment configuration:");
  console.error(parsedEnvironment.error.flatten().fieldErrors);
  process.exit(1);
}

export const environment = parsedEnvironment.data;