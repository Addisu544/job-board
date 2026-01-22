import { registerUser } from "../services/auth.service.js";
import { loginUser } from "../services/auth.service.js";
import { createRecruiterProfile } from "../services/recruiterProfile.service.js";
import { createEmployeeProfile } from "../services/employeeProfile.service.js";

export const register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      role,
      companyName,
      companyWebsite,
      companyDescription,
    } = req.body;

    //  Create user
    const user = await registerUser({
      fullName,
      email,
      password,
      role,
    });

    //  Recruiter profile
    if (role === "RECRUITER") {
      if (!companyName) {
        return res.status(400).json({
          message: "companyName is required for recruiter accounts",
        });
      }

      await createRecruiterProfile({
        userId: user.id,
        companyName,
        companyWebsite,
        companyDescription,
      });
    }

    //  Employee profile
    if (role === "EMPLOYEE") {
      await createEmployeeProfile({
        userId: user.id,
      });
    }

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};
