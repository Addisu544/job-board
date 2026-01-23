import prisma from "../lib/prisma.js";
import {
  createJob,
  getAllJobs,
  getJobsByRecruiter,
} from "../services/job.service.js";

export const createJobController = async (req, res) => {
  const userId = req.user.id;
  const { title, description, location, jobType } = req.body;

  // 1️⃣ Validate input
  if (!title || !description || !location || !jobType) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // 2️⃣ Get recruiter profile
  const recruiterProfile = await prisma.recruiterProfile.findUnique({
    where: { userId },
  });

  if (!recruiterProfile) {
    return res.status(403).json({
      message: "Recruiter profile not found",
    });
  }

  // 3️⃣ Create job
  const job = await createJob({
    title,
    description,
    location,
    jobType,
    recruiterProfileId: recruiterProfile.id,
  });

  res.status(201).json({
    message: "Job created successfully",
    job,
  });
};

export const listJobsController = async (req, res) => {
  const jobs = await getAllJobs();

  res.status(200).json({
    count: jobs.length,
    jobs,
  });
};

export const getMyJobsController = async (req, res) => {
  const userId = req.user.id;

  // 1️⃣ Find recruiter profile
  const recruiterProfile = await prisma.recruiterProfile.findUnique({
    where: { userId },
  });

  if (!recruiterProfile) {
    return res.status(403).json({
      message: "Recruiter profile not found",
    });
  }

  // 2️⃣ Get jobs
  const jobs = await getJobsByRecruiter(recruiterProfile.id);

  res.status(200).json({
    count: jobs.length,
    jobs,
  });
};
