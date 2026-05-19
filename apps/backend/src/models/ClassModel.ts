import { Schema, model } from "mongoose";

interface Class {
  className: string;
  teacherId: Schema.Types.ObjectId;
  students: Schema.Types.ObjectId[]; //ek class mein bhut saare bacche honge
  createdAt?: Date;
  updatedAt?: Date;
}

const ClassSchema = new Schema(
  {
    className: { type: String, unique: true, required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  },
);

export const ClassModel = model<Class>("class", ClassSchema);
