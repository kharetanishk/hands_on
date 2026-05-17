import { Router } from "express";
import { registerUser, loginUser } from "../controller/auth.controller.js";

const authRoutes: Router = Router();

authRoutes.post("/signup", registerUser);
authRoutes.post("/signin", loginUser);

export default authRoutes;
