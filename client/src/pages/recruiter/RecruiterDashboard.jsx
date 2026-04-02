import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  IconButton,
  Skeleton,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import CreateJob from "./CreateJob";
import MyJobs from "./MyJobs";
import JobApplicants from "./JobApplicants";
import RecruiterProfile from "../profile/RecruiterProfile";
import api from "../../services/api";

const drawerWidth = 280;

const RecruiterDashboard = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobsIndex, setJobsIndex] = useState([]);
  const [loadingJobsIndex, setLoadingJobsIndex] = useState(true);

  useEffect(() => {
    const fetchIndex = async () => {
      try {
        const res = await api.get("/jobs/me");
        setJobsIndex(res.data.jobs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingJobsIndex(false);
      }
    };

    fetchIndex();
  }, []);

  const defaultJobId = useMemo(
    () => jobsIndex?.[0]?.id || "",
    [jobsIndex],
  );

  const activeKey = useMemo(() => {
    if (location.pathname.includes("/profile")) return "profile";
    if (location.pathname.includes("/applications")) return "applicants";
    if (location.pathname.includes("/jobs")) return "jobs";
    return "jobs";
  }, [location.pathname]);

  const sidebar = (
    <Box sx={{ width: drawerWidth }}>
      <Stack spacing={2} sx={{ px: 2, py: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          Recruiter Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Hiring workflow, jobs, and applicants.
        </Typography>
      </Stack>
      <Divider />
      <List>
        <ListItemButton
          component={Link}
          to="/recruiter/jobs"
          selected={activeKey === "jobs"}
        >
          <ListItemIcon>
            <WorkOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Jobs" />
        </ListItemButton>

        <ListItemButton
          selected={activeKey === "applicants"}
          onClick={() => {
            if (!defaultJobId) return;
            navigate(`/recruiter/jobs/${defaultJobId}/applications`);
          }}
          disabled={loadingJobsIndex || !defaultJobId}
        >
          <ListItemIcon>
            <PeopleAltOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Applicants" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/recruiter/profile"
          selected={activeKey === "profile"}
        >
          <ListItemIcon>
            <PersonOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
      </List>

      <Divider />

      <Box sx={{ p: 2 }}>
        {loadingJobsIndex ? (
          <Stack spacing={1}>
            <Skeleton variant="rounded" height={34} />
            <Skeleton variant="rounded" height={34} />
          </Stack>
        ) : (
          <Typography variant="caption" color="text.secondary">
            Tip: Applicants loads from your most recent job.
          </Typography>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
      <Drawer
        variant={isMdUp ? "permanent" : "temporary"}
        open={isMdUp ? true : sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: `1px solid ${theme.palette.divider}`,
            backdropFilter: "blur(12px)",
          },
        }}
      >
        <Toolbar />
        {sidebar}
      </Drawer>

      {!isMdUp && (
        <Box sx={{ position: "fixed", top: 90, left: 10, zIndex: 1100 }}>
          <IconButton
            aria-label="Open recruiter navigation"
            onClick={() => setSidebarOpen(true)}
            color="inherit"
            sx={{ bgcolor: theme.palette.background.paper }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isMdUp ? `${drawerWidth}px` : 0,
          px: { xs: 1.5, md: 3 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Routes>
          <Route path="create" element={<CreateJob />} />
          <Route path="jobs" element={<MyJobs />} />
          <Route path="jobs/:jobId/applications" element={<JobApplicants />} />
          <Route path="profile" element={<RecruiterProfile />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default RecruiterDashboard;
