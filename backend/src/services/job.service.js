import prisma from "../lib/prisma.js";

export const createJob = async ({
  title,
  description,
  city,
  country,
  jobType,
  workMode,
  skillsRequired,
  experienceLevel,
  jobIndustry,
  recruiterProfileId,
}) => {
  return prisma.job.create({
    data: {
      title,
      description,
      city,
      country,
      jobType,
      workMode,
      skillsRequired,
      experienceLevel,
      jobIndustry,
      recruiterId: recruiterProfileId,
    },
  });
};

export const getAllJobs = async () => {
  return prisma.job.findMany({
    where: {
      status: "OPEN",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      recruiter: {
        select: {
          id: true,
          companyName: true,
          companyWebsite: true,
          companyDescription: true,
          industry: true,
          companySize: true,
          city: true,
          country: true,
          mission: true,
          user: {
            select: {
              fullName: true,
            },
          },
        },
      },
    },
  });
};

export const getJobsByRecruiter = async (recruiterProfileId) => {
  return prisma.job.findMany({
    where: {
      recruiterId: recruiterProfileId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      applications: {
        select: {
          id: true,
          status: true,
          appliedAt: true,
        },
      },
    },
  });
};

export const updateJobStatus = async (jobId, recruiterProfileId) => {
  return prisma.job.update({
    where: {
      id: jobId,
      recruiterId: recruiterProfileId,
    },
    data: {
      status: "HIRED",
    },
  });
};
