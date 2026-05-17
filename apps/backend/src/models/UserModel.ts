import { Schema, model } from "mongoose";

type Roles = "student" | "teacher" | "admin";

interface User {
  username: string;
  email: string;
  password: string;
  role: Roles;
}

const UserSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enums: ["student", "teacher", "admin"],
    default: "student",
  },
});

export const UserModel = model<User>("user", UserSchema);
