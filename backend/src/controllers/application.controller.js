import prisma from "../lib/prisma.js";
import { applyForJob } from "../services/application.service.js";

export const applyForJobController = async (req, res) => {
  const userId = req.user.id;
  const { jobId } = req.params;
  const { coverLetter } = req.body;

  // 1️⃣ Get employee profile
  const employeeProfile = await prisma.employeeProfile.findUnique({
    where: { userId },
  });

  if (!employeeProfile) {
    return res.status(403).json({
      message: "Employee profile not found",
    });
  }

  // 2️⃣ Check job exists and is OPEN
  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job || job.status !== "OPEN") {
    return res.status(400).json({
      message: "Job not available",
    });
  }

  try {
    // 3️⃣ Apply
    const application = await applyForJob({
      jobId,
      employeeProfileId: employeeProfile.id,
      coverLetter,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    // Prisma unique constraint error
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "You already applied for this job",
      });
    }

    res.status(500).json({
      message: "Failed to apply for job",
    });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get employee profile
    const employeeProfile = await prisma.employeeProfile.findUnique({
      where: { userId },
    });

    if (!employeeProfile) {
      return res.status(404).json({
        message: "Employee profile not found",
      });
    }

    // Fetch applications
    const applications = await prisma.application.findMany({
      where: { employeeId: employeeProfile.id },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            location: true,
            jobType: true,
            status: true,
          },
        },
      },
      orderBy: { appliedAt: "desc" },
    });

    res.status(200).json({
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch applied jobs",
      error: error.message,
    });
  }
};

export const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const userId = req.user.id;

    // 1️⃣ Get recruiter profile
    const recruiterProfile = await prisma.recruiterProfile.findUnique({
      where: { userId },
    });

    if (!recruiterProfile) {
      return res.status(403).json({
        message: "Recruiter profile not found",
      });
    }

    // 2️⃣ Verify recruiter owns the job
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job || job.recruiterId !== recruiterProfile.id) {
      return res.status(403).json({
        message: "You are not authorized to view these applications",
      });
    }

    // 3️⃣ Fetch applications
    const applications = await prisma.application.findMany({
      where: { jobId },
      include: {
        employee: {
          select: {
            id: true,
            resume: true,
            skills: true,
            experience: true,
            education: true,
            user: {
              select: {
                fullName: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: { appliedAt: "desc" },
    });

    res.status(200).json({
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch job applications",
      error: error.message,
    });
  }
};
