import { Routes, Route, Link } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import CreateJob from "./CreateJob";
import MyJobs from "./MyJobs";
import JobApplicants from "./JobApplicants";

const RecruiterDashboard = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Routes>
        <Route path="create" element={<CreateJob />} />
        <Route path="jobs" element={<MyJobs />} />
        <Route path="jobs/:jobId/applications" element={<JobApplicants />} />
      </Routes>
    </Box>
  );
};

export default RecruiterDashboard;
