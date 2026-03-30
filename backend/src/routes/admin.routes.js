import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  dashboardStatsController,
  getUsersController,
  updateUserStatusController,
} from "../controllers/admin.controller.js";
const router = express.Router();

router.get(
  "/dashboard",
  authenticate,
  authorizeRoles("ADMIN"),
  dashboardStatsController,
);

// GET ALL USERS (ADMIN ONLY)
router.get("/users", authenticate, authorizeRoles("ADMIN"), getUsersController);

// UPDATE USER STATUS
router.patch(
  "/users/:userId/status",
  authenticate,
  authorizeRoles("ADMIN"),
  updateUserStatusController,
);

export default router;
