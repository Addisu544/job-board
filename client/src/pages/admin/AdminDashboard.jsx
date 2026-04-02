import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Skeleton,
  Tooltip as MuiTooltip,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
} from "@mui/material";
import {
  PeopleAltOutlined,
  BusinessCenterOutlined,
  WorkOutline,
  AssignmentTurnedInOutlined,
  GroupAddOutlined,
  CheckCircleOutline,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import api from "../../services/api";

const StatCard = ({ title, value, color, icon, tooltipText }) => (
  <MuiTooltip title={tooltipText} placement="top">
    <Card
      sx={{
        borderRadius: 4,
        background: `linear-gradient(135deg, ${color}11, ${color}33)`,
        border: `1px solid ${color}44`,
        transition: "all 0.3s ease",
        "&:hover": { transform: "translateY(-6px)", boxShadow: `0 8px 24px ${color}44` },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight="bold" mb={1}>
              {title}
            </Typography>
            <Typography variant="h3" fontWeight="900" sx={{ color: color }}>
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              p: 1.5,
              borderRadius: "50%",
              backgroundColor: `${color}22`,
              color: color,
              display: "flex",
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  </MuiTooltip>
);



// const mockActivities = [
//   { id: 1, text: "Sarah Connor created an account.", time: "10 mins ago", icon: <GroupAddOutlined />, color: "#3b82f6" },
//   { id: 2, text: "Google Inc. posted a new job: Frontend Developer.", time: "1 hour ago", icon: <BusinessCenterOutlined />, color: "#10b981" },
//   { id: 3, text: "John Doe applied for Backend Engineer.", time: "2 hours ago", icon: <CheckCircleOutline />, color: "#f59e0b" },
//   { id: 4, text: "Alex Smith's account was verified.", time: "5 hours ago", icon: <CheckCircleOutline />, color: "#6366f1" },
// ];




const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box p={4}>
        <Skeleton variant="text" width="250px" height={60} sx={{ mb: 4 }} />
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rounded" height={140} sx={{ borderRadius: 4 }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box p={{ xs: 2, md: 4 }}>
        {/* HEADER */}
        <Box mb={4}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Admin Overview
          </Typography>
          <Typography color="text.secondary">
          </Typography>
        </Box>

        {/* STATS GRID */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="TOTAL USERS"
              value={stats.totalUsers}
              color="#3b82f6"
              icon={<PeopleAltOutlined fontSize="large" />}
              tooltipText="Total registered users across the platform"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="RECRUITERS"
              value={stats.totalRecruiters}
              color="#10b981"
              icon={<BusinessCenterOutlined fontSize="large" />}
              tooltipText="Registered company representatives"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="EMPLOYEES"
              value={stats.totalEmployees}
              color="#6366f1"
              icon={<WorkOutline fontSize="large" />}
              tooltipText="Standard job seeker accounts"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="TOTAL JOBS"
              value={stats.totalJobs}
              color="#f59e0b"
              icon={<AssignmentTurnedInOutlined fontSize="large" />}
              tooltipText="All jobs ever created"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="OPEN JOBS"
              value={stats.openJobs}
              color="#22c55e"
              icon={<CheckCircleOutline fontSize="large" />}
              tooltipText="Currently active job postings"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="APPLICATIONS"
              value={stats.totalApplications}
              color="#ef4444"
              icon={<GroupAddOutlined fontSize="large" />}
              tooltipText="Total resumes submitted"
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} mt={3}>


        </Grid>
      </Box>
    </motion.div>
  );
};

export default AdminDashboard;
