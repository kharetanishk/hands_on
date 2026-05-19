import { Schema, model } from "mongoose";

interface User {
  username: string;
  email: string;
  password: string;
  role: "teacher" | "student" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ["teacher", "student", "admin"],
      required: true,
      default: "student",
    },
  },
  { timestamps: true },
);

export const UserModel = model<User>("user", UserSchema);
