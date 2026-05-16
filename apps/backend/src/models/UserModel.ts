import { Schema, model } from "mongoose";

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<User>(
  {
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
  },
  { timestamps: true },
);

export const UserModel = model<User>("user", UserSchema);
