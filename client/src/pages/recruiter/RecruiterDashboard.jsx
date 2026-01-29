import { Routes, Route, Link } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import CreateJob from "./CreateJob";
import MyJobs from "./MyJobs";
import JobApplicants from "./JobApplicants";

const RecruiterDashboard = () => {
  return (
    <Box sx={{ p: 4 }}>
      {/* <Typography variant="h4" mb={3}>
        Recruiter Dashboard
      </Typography> */}

      {/* <Stack direction="row" spacing={2} mb={4}>
        <Button component={Link} to="create" variant="contained">
          Create Job
        </Button>
        <Button component={Link} to="jobs" variant="outlined">
          My Jobs
        </Button>
      </Stack> */}

      <Routes>
        <Route path="create" element={<CreateJob />} />
        <Route path="jobs" element={<MyJobs />} />
        <Route path="jobs/:jobId/applications" element={<JobApplicants />} />
      </Routes>
    </Box>
  );
};

export default RecruiterDashboard;
