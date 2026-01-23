import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { applyForJobController } from "../controllers/application.controller.js";

const router = express.Router();

// Employee apply for job
router.post(
  "/jobs/:jobId/apply",
  authenticate,
  authorizeRoles("EMPLOYEE"),
  applyForJobController,
);

export default router;
