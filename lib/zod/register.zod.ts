import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, { message: `Name is required` }),
  email: z.string().email(),
  password: z.string().min(1, { message: `Password is required` }),
  confirm_password: z.string().min(1, { message: `Password is required` }),
  is_remember_me: z.boolean().default(false),
});

export type IRegisterSchema = z.infer<typeof registerSchema>;
