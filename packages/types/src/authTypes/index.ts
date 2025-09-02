import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  fullname: z.string().min(3, "Full name must be at least 3 characters long"),
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export type LoginData = {
  userId: string;
  sessionId: string;
};
