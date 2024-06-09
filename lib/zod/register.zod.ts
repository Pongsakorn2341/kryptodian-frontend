import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, { message: `Name is required` }),
  email: z.string().email(),
  password: z.string().min(1, { message: `Password is required` }),
  // .min(8, { message: `Password require at least 8 characters.` })
  // .refine((value) => /[a-z]/.test(value) && /[A-Z]/.test(value), {
  //   message: `Password require uppcase and lowercase`,
  // })
  // .refine((value) => /\d/.test(value), {
  //   message: `Password require number`,
  // })
  // .refine((value) => /[-!@#$%^&*()_+]/.test(value), {
  //   message: `Password require special characters`,
  // }),
  confirm_password: z.string().min(1, { message: `Password is required` }),
  is_remember_me: z.boolean().default(false),
});

export type IRegisterSchema = z.infer<typeof registerSchema>;
