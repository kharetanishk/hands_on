import { Schema, model } from "mongoose";

const ClassSchema = new Schema({
  className: { type: String, required: true, unique: true },
  teacherId: { type: Schema.Types.ObjectId, ref: "user" },
  studentIds: [{ type: Schema.Types.ObjectId, ref: "user" }],
});

export const ClassModel = model("class", ClassSchema);
