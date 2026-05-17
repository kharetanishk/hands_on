import { z } from "zod";

const usernameValidation = z
  .string()
  .min(3, "username is too short")
  .max(30, "username too long ");

const emailValidation = z.email("INvalid email");

const passwordValidation = z.string().min(5, `the password is too short `);

export const signUpSchema = z.object({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
});

export const signInSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});
// type SignUpInput = z.infer<typeof signUpSchema>;
// type SignInInput = z.infer<typeof signInSchema>;

// export type AuthInputs = {
//   SignUpInput: z.infer<typeof signUpSchema>;
//   SignInInput: z.infer<typeof signInSchema>;
// };
