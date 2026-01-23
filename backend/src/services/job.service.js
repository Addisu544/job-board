import prisma from "../lib/prisma.js";

export const createJob = async ({
  title,
  description,
  location,
  jobType,
  recruiterProfileId,
}) => {
  return prisma.job.create({
    data: {
      title,
      description,
      location,
      jobType,
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
