import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  name: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email address."),
  company: z.string().min(2, "Enter your company name."),
  acceptTerms: z
    .boolean()
    .refine((value) => value, "You must accept the terms to continue."),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

export const otpSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "Enter the 6-digit verification code."),
});

export type OTPFormValues = z.infer<typeof otpSchema>;

export const setPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SetPasswordFormValues = z.infer<typeof setPasswordSchema>;
