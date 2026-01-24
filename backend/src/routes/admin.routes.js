import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { dashboardStatsController } from "../controllers/admin.controller.js";
const router = express.Router();

router.get(
  "/dashboard",
  authenticate,
  authorizeRoles("ADMIN"),
  dashboardStatsController,
);

export default router;
