// import bcrypt from "bcrypt";
// import prisma from "../lib/prisma.js";

// export const registerUser = async (data) => {
//   const { fullName, email, password, role } = data;

//   // 1. Validate basic input
//   if (!fullName || !email || !password || !role) {
//     throw new Error("All fields are required");
//   }
//   console.log("here");
//   // 2. Check if user already exists
//   const existingUser = await prisma.user.findUnique({
//     where: { email },
//   });
//   console.log("not here");

//   if (existingUser) {
//     throw new Error("Email already registered");
//   }

//   // 3. Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // 4. Save user
//   const user = await prisma.user.create({
//     data: {
//       fullName,
//       email,
//       password: hashedPassword,
//       role,
//     },
//     select: {
//       id: true,
//       fullName: true,
//       email: true,
//       role: true,
//       createdAt: true,
//     },
//   });

//   return user;
// };
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
export const registerUser = async (data) => {
  const { fullName, email, password, role } = data;

  // 1. Validate basic input
  if (!fullName || !email || !password || !role) {
    throw new Error("All fields are required");
  }

  try {
    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    console.log("not here");
    if (existingUser) {
      throw new Error("Email already registered");
    }
  } catch (error) {
    console.error("Error during database query:", error.message);
  }

  // 3. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Save user
  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
      role,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};
