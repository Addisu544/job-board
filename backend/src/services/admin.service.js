import prisma from "../lib/prisma.js";

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateUserStatus = async (userId, status) => {
  return prisma.user.update({
    where: { id: userId },
    data: { status },
  });
};
// export const getDashboardStats = async () => {
//   const totalUsers = await prisma.user.count();

//   const totalRecruiters = await prisma.user.count({
//     where: { role: "RECRUITER" },
//   });

//   const totalEmployees = await prisma.user.count({
//     where: { role: "EMPLOYEE" },
//   });

//   const totalJobs = await prisma.job.count();

//   const totalApplications = await prisma.application.count();

//   const openJobs = await prisma.job.count({
//     where: { status: "OPEN" },
//   });

//   return {
//     totalUsers,
//     totalRecruiters,
//     totalEmployees,
//     totalJobs,
//     totalApplications,
//     openJobs,
//   };
// };

export const getDashboardStats = async () => {
  const [
    totalUsers,
    totalRecruiters,
    totalEmployees,
    totalJobs,
    openJobs,
    totalApplications,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.user.count({
      where: { role: "RECRUITER" },
    }),

    prisma.user.count({
      where: { role: "EMPLOYEE" },
    }),

    prisma.job.count(),

    prisma.job.count({
      where: { status: "OPEN" },
    }),

    prisma.application.count(),
  ]);

  return {
    totalUsers,
    totalRecruiters,
    totalEmployees,
    totalJobs,
    openJobs,
    totalApplications,
  };
};
