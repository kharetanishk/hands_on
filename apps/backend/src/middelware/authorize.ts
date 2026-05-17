import { NextFunction, Request, Response } from "express";

export const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user.role;
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        error: `forbidden`,
      });
    }
    next();
  };
};
