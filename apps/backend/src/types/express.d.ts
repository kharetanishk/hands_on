import { JwtPayload } from "jsonwebtoken";
type Roles = "student" | "teacher" | "admin";
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload & {
        userId: string;
        role: Roles;
      };
    }
  }
}

export {};
