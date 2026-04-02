// import { useEffect, useState } from "react";
// import { Typography } from "@mui/material";
// import api from "../../services/api";
// import JobCardRecruiter from "../../components/JobCardRecruiter";

// const MyJobs = () => {
//   const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     api.get("/jobs/me").then((res) => {
//       setJobs(res.data.jobs);
//     });
//   }, []);

//   return (
//     <>
//       <Typography variant="h6" mb={2}>
//         My Jobs
//       </Typography>

//       {jobs.map((job) => (
//         <JobCardRecruiter key={job.id} job={job} />
//       ))}
//     </>
//   );
// };

// export default MyJobs;

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Skeleton,
  Stack,
  Chip,
  Divider,
  Paper,
} from "@mui/material";
import api from "../../services/api";
import JobCardRecruiter from "../../components/JobCardRecruiter";
import { motion as Motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get("/jobs/me");
        setJobs(res.data.jobs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const openJobs = useMemo(
    () => jobs.filter((j) => j.status === "OPEN"),
    [jobs],
  );
  const closedJobs = useMemo(
    () => jobs.filter((j) => j.status !== "OPEN"),
    [jobs],
  );

  const applicationsByStatus = useMemo(() => {
    const counts = {
      PENDING: 0,
      SHORTLISTED: 0,
      PASSED: 0,
      DECLINED: 0,
    };

    jobs.forEach((job) => {
      (job.applications || []).forEach((app) => {
        if (counts[app.status] != null) counts[app.status] += 1;
      });
    });

    return counts;
  }, [jobs]);

  const chartData = useMemo(
    () => [
      { status: "Pending", count: applicationsByStatus.PENDING },
      {
        status: "Interview",
        count: applicationsByStatus.SHORTLISTED,
      },
      { status: "Offers", count: applicationsByStatus.PASSED },
      { status: "Rejected", count: applicationsByStatus.DECLINED },
    ],
    [applicationsByStatus],
  );

  const handleStatusChange = (jobId, newStatus) => {
    // Optimistic UI update driven by already existing state logic.
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === jobId ? { ...job, status: newStatus } : job)),
    );
  };

  const closeJobOptimistic = async (jobId) => {
    const previous = jobs;
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: "HIRED" } : j)),
    );
    try {
      await api.patch(`/jobs/${jobId}/status`, { status: "CLOSED" });
    } catch (err) {
      console.error(err);
      setJobs(previous);
      alert("Failed to close job");
    }
  };

  const onDragStartJob = (event, job) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/jobId", job.id);
    event.dataTransfer.setData("text/from", job.status);
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const onDropClosedColumn = (event) => {
    event.preventDefault();
    const jobId = event.dataTransfer.getData("text/jobId");
    const fromStatus = event.dataTransfer.getData("text/from");

    // Only allow dragging from OPEN → Closed (API does not support reopening).
    if (!jobId || fromStatus !== "OPEN") return;
    closeJobOptimistic(jobId);
  };

  return (
    <Box>
      <Stack spacing={2} mb={2}>
        <Motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h4" fontWeight={900}>
            My Jobs
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage postings, track pipeline health, and move jobs to Closed.
          </Typography>
        </Motion.div>

        <Motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="stretch">
              <Box sx={{ flex: 1, minWidth: 280 }}>
                <Typography fontWeight={900} mb={1}>
                  Applicant pipeline snapshot
                </Typography>
                {loading ? (
                  <Skeleton variant="rounded" height={260} />
                ) : (
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={chartData}>
                      <XAxis dataKey="status" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="var(--mui-palette-primary-main, #2563eb)" radius={[8,8,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </Box>

              <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />

              <Stack spacing={1} sx={{ minWidth: 260 }}>
                <Typography fontWeight={900}>Job distribution</Typography>
                <Chip label={`Open: ${openJobs.length}`} color="primary" variant="outlined" />
                <Chip label={`Closed: ${closedJobs.length}`} color="secondary" variant="outlined" />
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Tip: Drag an Open job into Closed to stop new applications.
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Motion.div>
      </Stack>

      {loading ? (
        <Stack spacing={2}>
          <Skeleton variant="rounded" height={150} />
          <Skeleton variant="rounded" height={150} />
          <Skeleton variant="rounded" height={150} />
        </Stack>
      ) : (
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="stretch">
          <Paper
            variant="outlined"
            sx={{
              flex: 1,
              p: 2,
              borderRadius: 4,
              background: "transparent",
              minHeight: 420,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography fontWeight={900}>Open</Typography>
              <Chip size="small" label={openJobs.length} color="primary" />
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              {openJobs.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No open jobs yet.
                </Typography>
              ) : (
                openJobs.map((job, idx) => (
                  <Motion.div key={job.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}>
                    <Box draggable onDragStart={(e) => onDragStartJob(e, job)} sx={{ cursor: "grab" }}>
                      <JobCardRecruiter job={job} onStatusChange={handleStatusChange} />
                    </Box>
                  </Motion.div>
                ))
              )}
            </Stack>
          </Paper>

          <Paper
            variant="outlined"
            onDragOver={allowDrop}
            onDrop={onDropClosedColumn}
            sx={{
              flex: 1,
              p: 2,
              borderRadius: 4,
              background:
                "linear-gradient(135deg, rgba(37,99,235,0.04), rgba(245,158,11,0.06))",
              minHeight: 420,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography fontWeight={900}>Closed</Typography>
              <Chip size="small" label={closedJobs.length} variant="outlined" />
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              {closedJobs.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Drag an Open job here to close it.
                </Typography>
              ) : (
                closedJobs.map((job) => (
                  <Box key={job.id}>
                    <JobCardRecruiter job={job} onStatusChange={handleStatusChange} />
                  </Box>
                ))
              )}
            </Stack>
          </Paper>
        </Stack>
      )}
    </Box>
  );
};

export default MyJobs;
