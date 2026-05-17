import { Router } from "express";
import { requireAuth } from "../middelware/requireAuth.js";
import { authorize } from "../middelware/authorize.js";
import {
  getTeacher,
  startSessionController,
} from "../controller/teacher.controller.js";

const teacherRoutes: Router = Router();

//get the teacher dashboard
teacherRoutes.get("/me", requireAuth, authorize("teacher"), getTeacher);
//start the session
teacherRoutes.post(
  "/start-session",
  requireAuth,
  authorize("teacher"),
  startSessionController,
);

export default teacherRoutes;
