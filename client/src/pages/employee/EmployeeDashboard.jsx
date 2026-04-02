import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Skeleton,
  Stack,
} from "@mui/material";
import { motion as Motion } from "framer-motion";
import api from "../../services/api";
import AppliedJobCard from "../../components/AppliedJobCard";
import { useAuth } from "../../context/AuthContext";

const EmployeeDashboard = () => {
  useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState("applied");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await api.get("/applications/me");
      setApplications(res.data.applications);
    } catch (err) {
      console.error("Failed to load applications", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={900} mb={2}>
          My Applications
        </Typography>
        <Skeleton variant="rounded" height={42} width={360} sx={{ mx: "auto", mb: 2 }} />
        <Stack spacing={1.5} sx={{ mx: "auto", maxWidth: 860 }}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Motion.div
              key={idx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.03 }}
            >
              <Skeleton variant="rounded" height={130} />
            </Motion.div>
          ))}
        </Stack>
      </Container>
    );
  }

  const appliedApps = applications.filter(
    (a) => a.status === "PENDING" || a.status === "DECLINED",
  );
  const interviewApps = applications.filter((a) => a.status === "SHORTLISTED");
  const offerApps = applications.filter((a) => a.status === "PASSED");

  const visibleApps =
    tabValue === "applied"
      ? appliedApps
      : tabValue === "interviews"
        ? interviewApps
        : offerApps;

  return (
    <Container sx={{ mt: 5 }}>
      <Stack spacing={2} mb={3}>
        <Typography variant="h4" fontWeight={900}>
          My Applications
        </Typography>
        <Tabs
          value={tabValue}
          onChange={(_, v) => setTabValue(v)}
          aria-label="Application status tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab value="applied" label={`Applied (${appliedApps.length})`} />
          <Tab
            value="interviews"
            label={`Interviews (${interviewApps.length})`}
          />
          <Tab value="offers" label={`Offers (${offerApps.length})`} />
        </Tabs>
      </Stack>

      {visibleApps.length === 0 ? (
        <Typography color="text.secondary">
          No items in this section yet.
        </Typography>
      ) : (
        <Box>
          {visibleApps.map((app, idx) => (
            <Motion.div
              key={app.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.03 }}
            >
              <AppliedJobCard application={app} />
            </Motion.div>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default EmployeeDashboard;
