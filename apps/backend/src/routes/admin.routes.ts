import { Router } from "express";
import { requireAuth } from "../middelware/requireAuth.js";
import { authorize } from "../middelware/authorize.js";
import { promoteTeacher } from "../controller/admin..controller.js";

const adminRoutes = Router();

adminRoutes.patch(
  "/promote/:userId",
  requireAuth,
  authorize("admin"),
  promoteTeacher,
);
