import { Router } from "express";
import { requireAuth } from "../middelware/requireAuth.js";
import { authorize } from "../middelware/authorize.js";
import { getTeacher } from "../controller/teacher.controller.js";

const teacherRoutes: Router = Router();

teacherRoutes.get("/me", requireAuth, authorize("teacher"), getTeacher);

export default teacherRoutes;
