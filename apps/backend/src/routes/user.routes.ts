import { Router } from "express";
import { requireAuth } from "../middelware/requireAuth.js";
import { getUser } from "../controller/user.controller.js";

const userRoutes: Router = Router();

userRoutes.get("/me", requireAuth, getUser);

export default userRoutes;
