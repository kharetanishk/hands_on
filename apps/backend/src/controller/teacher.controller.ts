import { UserModel } from "../models/UserModel.js";
import { Request, Response } from "express";

export const getTeacher = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;
    const teacher =
      await UserModel.findById(userId).select("_id username email");
    if (!teacher) {
      return res.status(400).json({
        success: false,
        error: `no teacher account found`,
      });
    }
    return res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: `${error} not able to get teacher`,
    });
  }
};
