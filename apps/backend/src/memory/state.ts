interface ActiveSession {
  classId: string;
  teacherId: string;
  startedAt: string;
  attendance: Map<string, "present" | "absent">;
}

export const activeSessions = new Map<string, ActiveSession>();
