import { Request, Response } from "express";
import { UserModel } from "../models/UserModel.js";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = UserModel.findById(req.user.userId).select(
      "_id  username email",
    );
    if (!user) {
      return res.status(400).json({
        success: false,
        error: `user not found`,
      });
    }
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: `failed to fetch user`,
    });
  }
};
