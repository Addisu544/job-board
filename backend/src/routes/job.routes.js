import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  createJobController,
  listJobsController,
  getMyJobsController,
  updateJobStatusController,
} from "../controllers/job.controller.js";
import { getJobApplications } from "../controllers/application.controller.js";
const router = express.Router();

// // Example: only recruiters can create jobs
// router.post(
//   "/create",
//   authenticate,
//   authorizeRoles("RECRUITER"),
//   (req, res) => {
//     res.json({ message: "Job creation route accessed", user: req.user });
//   },
// );

// // Example: only employees can view jobs
// router.get("/view", authenticate, authorizeRoles("EMPLOYEE"), (req, res) => {
//   res.json({ message: "Job view route accessed", user: req.user });
// });

// Create job (Recruiter only)
router.post(
  "/",
  authenticate,
  authorizeRoles("RECRUITER"),
  createJobController,
);
// Recruiter - view own jobs
router.get(
  "/me",
  authenticate,
  authorizeRoles("RECRUITER"),
  getMyJobsController,
);

// Recruiter - mark job as hired
router.patch(
  "/:id/status",
  authenticate,
  authorizeRoles("RECRUITER"),
  updateJobStatusController,
);

// Public - list all jobs
router.get("/", listJobsController);

router.get(
  "/:jobId/applications",
  authenticate,
  authorizeRoles("RECRUITER"),
  getJobApplications,
);
export default router;
