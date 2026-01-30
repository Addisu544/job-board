import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  getMyRecruiterProfile,
  getMyEmployeeProfile,
  updateMyEmployeeProfile,
  updateMyRecruiterProfile,
} from "../controllers/profile.controller.js";

const router = express.Router();

// Recruiter profile
router.get(
  "/recruiter/me",
  authenticate,
  authorizeRoles("RECRUITER"),
  getMyRecruiterProfile,
);

//Update Recruiter profile
router.put(
  "/recruiter/me",
  authenticate,
  authorizeRoles("RECRUITER"),
  updateMyRecruiterProfile,
);

// Employee profile
router.get(
  "/employee/me",
  authenticate,
  authorizeRoles("EMPLOYEE"),
  getMyEmployeeProfile,
);

//Update Employee profile
router.put(
  "/employee/me",
  authenticate,
  authorizeRoles("EMPLOYEE"),
  updateMyEmployeeProfile,
);

export default router;
