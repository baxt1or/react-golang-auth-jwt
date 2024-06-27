import { z } from "zod";

export const registerSchema = z.object({
  firstname: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const blogSchema = z.object({
  title: z.string().min(6, {
    message: "Invalid email address.",
  }),
  content: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  sub_title: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  category: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  status: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  location: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type BlogSchema = z.infer<typeof blogSchema>;
