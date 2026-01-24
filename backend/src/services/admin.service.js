import prisma from "../lib/prisma.js";

export const getDashboardStats = async () => {
  const totalUsers = await prisma.user.count();

  const totalRecruiters = await prisma.user.count({
    where: { role: "RECRUITER" },
  });

  const totalEmployees = await prisma.user.count({
    where: { role: "EMPLOYEE" },
  });

  const totalJobs = await prisma.job.count();

  return {
    totalUsers,
    totalRecruiters,
    totalEmployees,
    totalJobs,
  };
};
