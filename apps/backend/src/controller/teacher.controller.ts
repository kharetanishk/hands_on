import { UserModel } from "../models/UserModel.js";
import { Request, Response } from "express";
import { SessionService } from "../sessions/sessions.service.js";
import { success } from "zod";

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

export const startSessionController = async (req: Request, res: Response) => {
  try {
    const { classId } = req.body;

    const teacherId = req.user.userId;

    const session = await SessionService.createSession(classId, teacherId);

    return res.status(200).json({
      success: true,
      data: `new session created ${session}`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: `error in creating the session`,
    });
  }
};
