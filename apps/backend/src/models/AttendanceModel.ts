import { Schema, model } from "mongoose";

const AttendanceSchema = new Schema({
  classId: { type: Schema.Types.ObjectId, ref: "class" },
  studentId: { type: Schema.Types.ObjectId, ref: "user" },
  status: { type: String, enums: ["present", "absent"], default: "absent" },
});

export const AttendanceModel = model("attendance", AttendanceSchema);
