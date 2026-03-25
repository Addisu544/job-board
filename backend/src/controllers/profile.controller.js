import {
  getRecruiterProfileByUserId,
  updateRecruiterProfileByUserId,
} from "../services/recruiterProfile.service.js";

import {
  getEmployeeProfileByUserId,
  updateEmployeeProfileByUserId,
} from "../services/employeeProfile.service.js";

export const getMyRecruiterProfile = async (req, res) => {
  const userId = req.user.id;

  const profile = await getRecruiterProfileByUserId(userId);

  if (!profile) {
    return res.status(404).json({ message: "Recruiter profile not found" });
  }

  res.status(200).json(profile);
};

export const getMyEmployeeProfile = async (req, res) => {
  const userId = req.user.id;
  const profile = await getEmployeeProfileByUserId(userId);

  if (!profile) {
    return res.status(404).json({ message: "Employee profile not found" });
  }

  res.status(200).json(profile);
};

// export const updateMyEmployeeProfile = async (req, res) => {
//   const userId = req.user.id;

//   const updatedProfile = await updateEmployeeProfileByUserId(userId, req.body);

//   res.status(200).json(updatedProfile);
// };
// export const updateMyEmployeeProfile = async (req, res) => {
//   const userId = req.user.id;

//   try {
//     const updatedProfile = await updateEmployeeProfileByUserId(
//       userId,
//       req.body,
//     );

//     res.status(200).json(updatedProfile);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to update profile" });
//   }
// };

export const updateMyEmployeeProfile = async (req, res) => {
  const userId = req.user.id;
  // let c = { ...req.body };
  // console.log(c);
  try {
    let data = { ...req.body };

    // If file uploaded
    if (req.file) {
      data.cvPath = `/uploads/cv/${req.file.filename}`;
    }

    const updatedProfile = await updateEmployeeProfileByUserId(userId, data);

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

export const updateMyRecruiterProfile = async (req, res) => {
  const userId = req.user.id;

  const updatedProfile = await updateRecruiterProfileByUserId(userId, req.body);

  res.status(200).json(updatedProfile);
};
