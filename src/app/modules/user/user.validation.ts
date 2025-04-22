import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(100).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    role: z.enum(["user", "customer", "provider", "admin"]).optional(), // Allow optional role
    phone: z.string().optional(),
    address: z.string().min(5).optional(),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Please provide a valid email address"),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

const passwordChangeValidationSchema = z.object({
  body: z.object({
    currentPassword: z
      .string({ required_error: "Current password is required" })
      .min(8, { message: "Current password must be at least 8 characters" }),
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(8, { message: "New password must be at least 8 characters" })
      .max(100, { message: "New password cannot be more than 100 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      }),
  }),
});

const updateProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(100).optional(),
    phone: z.string().optional(),
    address: z.string().min(5).optional(),
    photo: z.string().optional(),
  }),
});

export const UserValidation = {
  userValidationSchema,
  loginValidationSchema,
  passwordChangeValidationSchema,
  updateProfileValidationSchema,
};
