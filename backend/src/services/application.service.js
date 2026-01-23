import prisma from "../lib/prisma.js";

export const applyForJob = async ({
  jobId,
  employeeProfileId,
  coverLetter,
}) => {
  return prisma.application.create({
    data: {
      jobId,
      employeeId: employeeProfileId,
      coverLetter,
    },
  });
};
