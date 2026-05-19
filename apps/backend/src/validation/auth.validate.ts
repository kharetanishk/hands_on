import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, "username is too short")
  .max(30, "username is too ")
  .trim();

export const emailValidation = z.email("invalid email");
export const passwordValidation = z
  .string()
  .min(4, "password is too short")
  .regex(/[0-9]/, "password must contain atleast one number");

export const signupSchema = z.object({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
});

export const signinSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});
