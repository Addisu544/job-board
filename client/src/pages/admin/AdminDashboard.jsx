import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import api from "../../services/api";

const StatCard = ({ title, value, color }) => (
  <Card
    sx={{
      borderRadius: 3,
      boxShadow: 3,
      transition: "0.3s",
      "&:hover": { transform: "translateY(-5px)" },
    }}
  >
    <CardContent>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h5" fontWeight="bold" sx={{ color: color, mt: 1 }}>
          {value}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

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
      <Box textAlign="center" mt={10}>
        <CircularProgress />
        <Typography mt={2}>Loading dashboard...</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      {/* HEADER */}
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Admin Dashboard
      </Typography>

      {/* STATS GRID */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            color="#3b82f6"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Recruiters"
            value={stats.totalRecruiters}
            color="#10b981"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Employees"
            value={stats.totalEmployees}
            color="#6366f1"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Jobs"
            value={stats.totalJobs}
            color="#f59e0b"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Open Jobs" value={stats.openJobs} color="#22c55e" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Applications"
            value={stats.totalApplications}
            color="#ef4444"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;

// import { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CircularProgress,
//   Chip,
// } from "@mui/material";
// import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
// import api from "../../services/api";

// const StatCard = ({ title, value, color }) => (
//   <Card
//     sx={{
//       borderRadius: 4,
//       background: `linear-gradient(135deg, ${color}22, ${color}55)`,
//       backdropFilter: "blur(10px)",
//       transition: "0.3s",
//       "&:hover": { transform: "translateY(-6px)" },
//     }}
//   >
//     <CardContent>
//       <Box display="flex" justifyContent="space-between">
//         <Typography variant="body2" color="text.secondary">
//           {title}
//         </Typography>

//         <Chip
//           label="Live"
//           size="small"
//           sx={{
//             bgcolor: `${color}22`,
//             color: color,
//             fontWeight: 600,
//           }}
//         />
//       </Box>

//       <Typography variant="h4" fontWeight="bold" mt={2} sx={{ color: color }}>
//         {value}
//       </Typography>
//     </CardContent>
//   </Card>
// );

// // Dummy trend data (replace later with real analytics)
// const trendData = [
//   { name: "Mon", value: 40 },
//   { name: "Tue", value: 60 },
//   { name: "Wed", value: 55 },
//   { name: "Thu", value: 80 },
//   { name: "Fri", value: 70 },
//   { name: "Sat", value: 90 },
// ];

// const AdminDashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await api.get("/admin/dashboard");
//         setStats(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   if (loading) {
//     return (
//       <Box textAlign="center" mt={10}>
//         <CircularProgress />
//         <Typography mt={2}>Loading dashboard...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box p={4}>
//       {/* HEADER */}
//       <Typography variant="h4" fontWeight="bold" mb={1}>
//         Admin Dashboard
//       </Typography>
//       <Typography color="text.secondary" mb={4}>
//         Real-time platform insights and performance overview
//       </Typography>

//       {/* STATS */}
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={4}>
//           <StatCard
//             title="Total Users"
//             value={stats.totalUsers}
//             color="#3b82f6"
//           />
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <StatCard
//             title="Recruiters"
//             value={stats.totalRecruiters}
//             color="#10b981"
//           />
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <StatCard
//             title="Employees"
//             value={stats.totalEmployees}
//             color="#6366f1"
//           />
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <StatCard
//             title="Total Jobs"
//             value={stats.totalJobs}
//             color="#f59e0b"
//           />
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <StatCard title="Open Jobs" value={stats.openJobs} color="#22c55e" />
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <StatCard
//             title="Applications"
//             value={stats.totalApplications}
//             color="#ef4444"
//           />
//         </Grid>
//       </Grid>

//       {/* CHART SECTION */}
//       <Box mt={6}>
//         <Typography variant="h6" mb={2}>
//           Weekly Activity
//         </Typography>

//         <Card sx={{ borderRadius: 4, p: 3 }}>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={trendData}>
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="value"
//                 stroke="#3b82f6"
//                 strokeWidth={3}
//                 dot={{ r: 4 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </Card>
//       </Box>

//       {/* OVERVIEW */}
//       <Box mt={6}>
//         <Typography variant="h6" mb={2}>
//           Overview
//         </Typography>

//         <Card sx={{ borderRadius: 4, p: 3 }}>
//           <Typography variant="body1" color="text.secondary">
//             Monitor system growth, hiring activity, and engagement trends in
//             real time. This dashboard helps administrators quickly identify
//             performance patterns and make informed decisions.
//           </Typography>
//         </Card>
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;
