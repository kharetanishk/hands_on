export type AttendanceStatus = "present" | "absent";

export interface MarkAttendancePayload {
  classId: string;
  studentId: string;
  status: AttendanceStatus;
}

export interface AttendanceUpdatePayload {
  classId: string;
  studentId: string;
  status: AttendanceStatus;
  updatedAt: string;
}
