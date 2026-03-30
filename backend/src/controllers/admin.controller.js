import {
  getDashboardStats,
  getAllUsers,
  updateUserStatus,
} from "../services/admin.service.js";

export const dashboardStatsController = async (req, res) => {
  try {
    const stats = await getDashboardStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard stats",
    });
  }
};

export const getUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// UPDATE STATUS (ACTIVE / BANNED)
export const updateUserStatusController = async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;

  try {
    const updated = await updateUserStatus(userId, status);

    res.status(200).json({
      message: "User status updated",
      user: updated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update status" });
  }
};
