import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  getMyRecruiterProfile,
  getMyEmployeeProfile,
} from "../controllers/profile.controller.js";

const router = express.Router();

// Recruiter profile
router.get(
  "/recruiter/me",
  authenticate,
  authorizeRoles("RECRUITER"),
  getMyRecruiterProfile,
);

// Employee profile
router.get(
  "/employee/me",
  authenticate,
  authorizeRoles("EMPLOYEE"),
  getMyEmployeeProfile,
);

export default router;
