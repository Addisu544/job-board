import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

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

export const loginUser = async (data) => {
  const { email, password } = data;

  // 1. Validate input
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // 2. Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // 3. Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // 4. Generate JWT
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
  );

  // 5. Return safe response
  return {
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  };
};
