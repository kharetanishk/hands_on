import { redisClient } from "../config/redisClient.js";
export class SessionService {
  static async createSession(classId: string, teacherId: string) {
    //sessionkey bnao
    const sessionKey = `session:${classId}`;
    //check kro ki session exist krta hai ya nahi already
    const existing = await redisClient.get(sessionKey);
    if (existing) {
      throw new Error("Session already active");
    }
    //ek session create kro
    const session = {
      classId,
      teacherId,
      startedAt: new Date().toISOString(),
      attendance: {},
    };
    //uss session ko store krlo
    await redisClient.set(sessionKey, JSON.stringify(session));

    return session;
  }
  static async getSession(classId: string) {
    const session = await redisClient.get(`session:${classId}`);

    if (!session) {
      throw new Error(`session doesnt exist`);
    }
    return session ? JSON.parse(session) : null;
  }
}
