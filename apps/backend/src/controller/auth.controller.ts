import { signUpSchema, signInSchema } from "../validation/auth.validate.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UserModel.js";
import { Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const parseD = signUpSchema.safeParse(req.body);

    if (!parseD.success) {
      const errors = parseD.error.flatten((issue) => issue.message).fieldErrors;
      return res.status(400).json({
        success: false,
        error: errors,
      });
    }

    const { username, email, password } = {
      username: parseD.data.username.trim(),
      email: parseD.data.email.trim(),
      password: parseD.data.password.trim(),
    };

    const exsistingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (exsistingUser) {
      return res.status(400).json({
        success: false,
        error: `useralready exist try logging in `,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: hashPassword,
    });

    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    });

    return res.status(200).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};

//login controller
export const loginUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const parseD = signInSchema.safeParse(req.body);

    if (!parseD.success) {
      const errors = parseD.error.flatten((issue) => issue.message).fieldErrors;
      return res.status(400).json({
        success: false,
        error: `invalid credentials ${errors}`,
      });
    }

    const { email, password } = {
      email: parseD.data.email.trim(),
      password: parseD.data.password.trim(),
    };

    const user = await UserModel.findOne({
      email: email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: `there is no user with this email , try logging in `,
      });
    }
    if (user.role === "admin") {
    }
    if (user.role === "teacher") {
    } else {
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: `invalid password`,
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: `somethign went wrong`,
    });
  }
};
