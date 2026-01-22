import prisma from "../lib/prisma.js";

export const createRecruiterProfile = async ({
  userId,
  companyName,
  companyWebsite,
  companyDescription,
}) => {
  return prisma.recruiterProfile.create({
    data: {
      userId,
      companyName,
      companyWebsite,
      companyDescription,
    },
  });
};

export const getRecruiterProfileByUserId = async (userId) => {
  return prisma.recruiterProfile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
        },
      },
    },
  });
};
