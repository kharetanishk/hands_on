import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { success, z } from "zod";
const JWT_SECRET = process.env.JWT_SECRET as string;

const TokenParseSchema = z.object({
  userId: z.uuid(),
});

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        message: `unauthenticated user`,
      });
    }
    const verifyToken = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const parseToken = TokenParseSchema.safeParse(verifyToken);

    if (!parseToken.success) {
      return res.status(400).json({
        success: false,
        error: `no userId in the jwt payload : unauthenticated`,
      });
    }
    req.user.userId = parseToken.data.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: `unauthorized user`,
    });
  }
};
