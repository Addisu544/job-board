import prisma from "../lib/prisma.js";

export const createEmployeeProfile = async ({ userId }) => {
  return prisma.employeeProfile.create({
    data: {
      userId,
    },
  });
};

export const getEmployeeProfileByUserId = async (userId) => {
  return prisma.employeeProfile.findUnique({
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
