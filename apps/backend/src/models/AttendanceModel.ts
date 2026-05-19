import { Schema, model } from "mongoose";

type AttendanceStatus = "present" | "absent";

interface Attendance {
  classId: Schema.Types.ObjectId;
  teacherId: Schema.Types.ObjectId;
  attendanceDate: Date;
  attendance: Map<string, AttendanceStatus>;
  createdAt?: Date;
  updatedAt?: Date;
}

const AttendanceSchema = new Schema<Attendance>(
  {
    classId: {
      type: Schema.Types.ObjectId,
      ref: "class",
      required: true,
    },

    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    attendanceDate: {
      type: Date,
      required: true,
    },

    attendance: {
      type: Map,
      of: {
        type: String,
        enum: ["present", "absent"],
      },
      default: {},
    },
  },

  {
    timestamps: true,
  },
);

AttendanceSchema.index(
  {
    classId: 1,
    attendanceDate: 1,
  },
  {
    unique: true,
  },
);

export const AttendanceModel = model<Attendance>(
  "attendance",
  AttendanceSchema,
);
