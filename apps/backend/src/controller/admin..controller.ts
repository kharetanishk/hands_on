import { Request, Response } from "express";
import { UserModel } from "../models/UserModel.js";
import { success } from "zod";

export const promoteTeacher = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await UserModel.findOne({
      _id: userId,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: `user not found`,
      });
    }
    user.role = "teacher";

    await user.save();

    return res.status(200).json({
      success: true,
      data: `user : ${user.username} role changed to teacher -> ${user}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: `soemthing went wrong`,
    });
  }
};
