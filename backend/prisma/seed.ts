import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // =========================
  // USERS
  // =========================
  await prisma.user.createMany({
    data: [
      {
        id: "02b95287-5d02-44ea-9662-ab5628887e98",
        fullName: "re",
        email: "re@test.com",
        password:
          "$2b$10$L1KrhWCcocghAbDHs8MxW.TztpKOHMnFi00BuEiFvUmfqfGuqBNVK",
        role: "RECRUITER",
        status: "ACTIVE",
        createdAt: new Date("2026-03-29T10:57:05.016Z"),
      },
      {
        id: "fa3e9020-a2be-46f9-b1c4-17889ac20e67",
        fullName: "ad",
        email: "ad@test.com",
        password:
          "$2b$10$F9xJLyNZCIijMBYC7..z0eIviQLtIY8wxwgEbOlmqwmSkz1Fns2Rm",
        role: "ADMIN",
        status: "ACTIVE",
        createdAt: new Date("2026-03-30T00:51:47.656Z"),
      },
      {
        id: "df3f308c-3169-4f50-a4a9-cc66ebc4c2e4",
        fullName: "em",
        email: "em@test.com",
        password:
          "$2b$10$nC7ffguQtBuWHc68f2D0RueO73p31gE9y1vvF/96NSGTTXijz26XW",
        role: "EMPLOYEE",
        status: "ACTIVE",
        createdAt: new Date("2026-03-29T10:56:48.423Z"),
      },
      {
        id: "8d8a81d4-6df2-47cb-9899-72c3981fb361",
        fullName: "em2",
        email: "em2@test.com",
        password:
          "$2b$10$rGcLxJ80eaHObXNRA3YY2OPinWCT6FdWr6.TgWPnDTJ9TQ2VUN6ni",
        role: "EMPLOYEE",
        status: "ACTIVE",
        createdAt: new Date("2026-04-01T13:05:39.712Z"),
      },
    ],
    skipDuplicates: true,
  });

  // =========================
  // RECRUITER PROFILE
  // =========================
  await prisma.recruiterProfile.create({
    data: {
      id: "a0c73957-43b1-4bd2-add8-664b8db4f65d",
      companyName: "companyname",
      companyWebsite: "https://amcd.com",
      companyDescription: "desc desc desc",
      userId: "02b95287-5d02-44ea-9662-ab5628887e98",
      city: "Adama",
      companySize: "50-100",
      country: "Ethiopia",
      industry: "Manufacturing",
      mission: "we dfww wv qwe vqwe",
    },
  });

  // =========================
  // EMPLOYEE PROFILES
  // =========================
  await prisma.employeeProfile.createMany({
    data: [
      {
        id: "e630a46b-574e-4193-b05b-1960fd60bf90",
        resume: null,
        skills: "CSS",
        experience: null,
        education: null,
        userId: "8d8a81d4-6df2-47cb-9899-72c3981fb361",
        availability: null,
        bio: "bb",
        cvPath: "/uploads/cv/1775117081381-filesonly.pdf",
        github: "www.ccc",
        languages: "Spanish",
        level: null,
        linkedin: "www.ccc",
        portfolio: null,
        telegram: "www.ccc",
        title: "tt",
      },
      {
        id: "90241243-9aa2-4215-907a-65ed31fb6bbf",
        resume: null,
        skills: "HTML,CSS,React",
        experience: "sfsdvsd sd sd sdv",
        education: "physics",
        userId: "df3f308c-3169-4f50-a4a9-cc66ebc4c2e4",
        availability: "immediately",
        bio: "my bio",
        cvPath:
          "/uploads/cv/1774782018272-Addisu_Agerie_-_Software_Engineer_compressed_(1).pdf",
        github: "www.lll",
        languages: "Amharic,English",
        level: "Diploma",
        linkedin: "www.lll",
        portfolio: "www.ll",
        telegram: "www.lll",
        title: "developer",
      },
    ],
    skipDuplicates: true,
  });

  // =========================
  // JOBS
  // =========================
  await prisma.job.createMany({
    data: [
      {
        id: "eed5d2f1-ec65-48fc-9ad2-66312ff949f2",
        title: "tttt",
        description: "dddd",
        jobType: "Part-time",
        status: "OPEN",
        createdAt: new Date("2026-03-29T10:58:37.315Z"),
        recruiterId: "a0c73957-43b1-4bd2-add8-664b8db4f65d",
        city: "Addis Ababa",
        country: "Ethiopia",
        experienceLevel: "Junior",
        skillsRequired: "Docker",
        workMode: "Onsite",
        jobIndustry: "Finance",
      },
      {
        id: "bc45d622-f238-4489-b625-913eeca3b493",
        title: "j2",
        description: "work ....",
        jobType: "Part-time",
        status: "OPEN",
        createdAt: new Date("2026-03-29T11:13:15.648Z"),
        recruiterId: "a0c73957-43b1-4bd2-add8-664b8db4f65d",
        city: "Adama",
        country: "Kenya",
        experienceLevel: "Junior",
        skillsRequired: "Docker",
        workMode: "Hybrid",
        jobIndustry: "Manufacturing",
      },
      {
        id: "68632258-99dd-46ff-ba23-b7e520290645",
        title: "nnnnn",
        description: "<p>disccccccccccc</p>",
        jobType: "Full-time",
        status: "HIRED",
        createdAt: new Date("2026-04-02T10:15:10.005Z"),
        recruiterId: "a0c73957-43b1-4bd2-add8-664b8db4f65d",
        city: "Adama",
        country: "Ethiopia",
        experienceLevel: "Junior",
        skillsRequired: "Node.js,TypeScript",
        workMode: "Hybrid",
        jobIndustry: "Education",
      },
    ],
    skipDuplicates: true,
  });

  // =========================
  // APPLICATIONS (LAST)
  // =========================
  await prisma.application.createMany({
    data: [
      {
        id: "bbe9c22a-f6b5-41ef-9c1e-1b0d5c773a85",
        coverLetter: "co le",
        status: "PASSED",
        appliedAt: new Date("2026-03-29T11:02:59.769Z"),
        jobId: "eed5d2f1-ec65-48fc-9ad2-66312ff949f2",
        employeeId: "90241243-9aa2-4215-907a-65ed31fb6bbf",
      },
      {
        id: "ae062e19-5179-4455-a057-94782fba058e",
        coverLetter: "j2",
        status: "SHORTLISTED",
        appliedAt: new Date("2026-03-29T11:13:36.057Z"),
        jobId: "bc45d622-f238-4489-b625-913eeca3b493",
        employeeId: "90241243-9aa2-4215-907a-65ed31fb6bbf",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed completed successfully");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });