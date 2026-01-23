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
