import { z } from "zod";

export const authLoginSchema = z.object({
  username: z.string().trim().min(1, {
    message: "Email address is required",
  }),
  password: z.string().trim().min(1, {
    message: "Password is required",
  }),
});

export const authRegisterSchema = z
  .object({
    roleName: z.enum(["Applicant", "Property Developer"]),
    firstName: z.string().trim().min(1, {
      message: "First name is required",
    }),
    lastName: z.string().trim().min(1, {
      message: "Surname is required",
    }),
    email: z.string().trim().min(1, {
      message: "Email is required",
    }),
    phone: z.string().trim().min(1, {
      message: "Phone is required",
    }),
    password: z.string().trim().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmationPassword: z.string().trim().min(6, {
      message: "Confirmation password must be at least 6 characters",
    }),
  })
  .refine((data) => data.password === data.confirmationPassword, {
    message: "Passwords do not match",
    path: ["confirmationPassword"],
  });

export const authResetSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, { message: "Email or phone number is required" })
    .refine((val) => /\S+@\S+\.\S+/.test(val) || /^[0-9]+$/.test(val), {
      message: "Invalid email or phone number format",
    }),
});
