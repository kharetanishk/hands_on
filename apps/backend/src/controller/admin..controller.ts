import { Request, Response } from "express";
import { UserModel } from "../models/UserModel.js";

export const getAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await UserModel.findById(req.user.userId).select(
      "_id username email",
    );
    if (!admin) {
      return res.status(400).json({
        success: false,
        error: `no admin found`,
      });
    }

    return res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: `something went wrong -via adminc controller`,
    });
  }
};

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
