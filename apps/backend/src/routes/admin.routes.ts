import { Router } from "express";
import { requireAuth } from "../middelware/requireAuth.js";
import { authorize } from "../middelware/authorize.js";
import { getAdmin, promoteTeacher } from "../controller/admin..controller.js";

const adminRoutes: Router = Router();

//get admininformation
adminRoutes.get("/me", requireAuth, authorize("admin"), getAdmin);

//promote  a user from student role to teacher role
adminRoutes.patch(
  "/promote/:userId",
  requireAuth,
  authorize("admin"),
  promoteTeacher,
);

export default adminRoutes;
