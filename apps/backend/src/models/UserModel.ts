import { Schema, model } from "mongoose";

interface User {
  username: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model<User>("user", UserSchema);
