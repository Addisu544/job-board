// import { Card, CardContent, Typography, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const JobCardRecruiter = ({ job }) => {
//   const navigate = useNavigate();

//   return (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Typography variant="h6">{job.title}</Typography>
//         <Typography>Status: {job.status}</Typography>

//         <Button
//           sx={{ mt: 2 }}
//           variant="outlined"
//           onClick={() => navigate(`/recruiter/jobs/${job.id}/applications`)}
//         >
//           View Applicants
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default JobCardRecruiter;

import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // adjust path if needed

const JobCardRecruiter = ({ job, onStatusChange }) => {
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  //  get applications count
  const applicationsCount =
    job.applications?.length ?? job._count?.applications ?? 0;

  const handleCloseJob = async () => {
    try {
      setLoading(true);

      await api.patch(`/jobs/${job.id}/status`, {
        status: "CLOSED",
      });

      // 🔥 update parent state
      onStatusChange(job.id, "CLOSED");

      setOpenConfirm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to close job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">{job.title}</Typography>

          <Typography
            sx={{
              color:
                job.status === "OPEN"
                  ? "green"
                  : job.status === "CLOSED"
                    ? "red"
                    : "gray",
              fontWeight: "bold",
            }}
          >
            Status: {job.status}
          </Typography>

          {/*Applications Count */}
          <Box sx={{ mt: 1 }}>
            <Chip
              label={`Applications: ${applicationsCount}`}
              color="primary"
              variant="outlined"
            />
          </Box>

          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate(`/recruiter/jobs/${job.id}/applications`)}
            >
              View Applicants
            </Button>

            {/* ✅ Close button ONLY when OPEN */}
            {job.status === "OPEN" && (
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpenConfirm(true)}
              >
                Close Job
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* 🔔 Confirmation Dialog */}
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Close Job</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to close this job?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseJob}
            disabled={loading}
          >
            {loading ? "Closing..." : "Yes, Close"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JobCardRecruiter;
