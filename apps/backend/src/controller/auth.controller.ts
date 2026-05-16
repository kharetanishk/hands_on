import { signUpSchema, signInSchema } from "../validation/auth.validate.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { UserModel } from "../models/UserModel.js";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const parseData = signUpSchema.safeParse(req.body);

    if (!parseData.success) {
      const errors = parseData.error.flatten(
        (issue) => issue.message,
      ).fieldErrors;
      return res.status(400).json({
        message: `Invalid inputs`,
        errors: errors,
      });
    }

    const { username, email, password } = {
      username: parseData.data.username.trim(),
      email: parseData.data.email.trim(),
      password: parseData.data.password.trim(),
    };

    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(200).json({
        message: "User already exist , try logging in ",
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
        email: newUser.email,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: `USER SIGNEDUP SUCCESSFULLY`,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `something went wrong`,
    });
  }
};

//login function
export const loginUser = async (req: Request, res: Response) => {
  try {
    const parseD = signInSchema.safeParse(req.body);

    if (!parseD.success) {
      const error = parseD.error.flatten((issue) => issue.message).fieldErrors;
      return res.status(200).json({
        message: `invaid sign in inputs`,
        error: error,
      });
    }
    const { email, password } = {
      email: parseD.data.email,
      password: parseD.data.password,
    };

    const user = await UserModel.findOne({
      email: email,
    });

    if (!user || !user.password) {
      return res.status(400).json({
        message: `invalid credentials`,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: `invalid password , try again`,
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: `logged in successfully`,
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      messgae: `something went wrong`,
    });
  }
};
