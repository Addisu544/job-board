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
  Chip,
  Stack,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // adjust path if needed

const JobCardRecruiter = ({ job, onStatusChange }) => {
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const applicationsCount = job.applications?.length ?? job._count?.applications ?? 0;
  const isOpen = job.status === "OPEN";

  const statusLabel = isOpen ? "Open" : "Closed";
  const statusChip = isOpen ? "success" : "default";

  const handleCloseJob = async () => {
    try {
      setLoading(true);

      await api.patch(`/jobs/${job.id}/status`, {
        status: "CLOSED",
      });

      // API marks the job as HIRED; use returned status if available.
      onStatusChange(job.id, "HIRED");

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
      <Card
        elevation={0}
        sx={(theme) => ({
          mb: 2,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          background:
            theme.palette.mode === "light"
              ? "rgba(255,255,255,0.7)"
              : "rgba(17,28,52,0.65)",
          backdropFilter: "blur(10px)",
          transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: theme.shadows[8],
            borderColor: theme.palette.primary.main,
          },
        })}
      >
        <CardContent>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h6" fontWeight={900} noWrap>
                {job.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {(job.city && job.country) ? `${job.city}, ${job.country}` : job.city || job.country || "Location not listed"}
              </Typography>
            </Box>

            <Chip size="small" label={statusLabel} color={statusChip} variant={isOpen ? "filled" : "outlined"} />
          </Stack>

          <Stack direction="row" spacing={1.5} mt={1} flexWrap="wrap" alignItems="center">
            <Chip size="small" variant="outlined" label={`Applications: ${applicationsCount}`} />
            {job.jobType && <Chip size="small" variant="outlined" label={job.jobType} />}
            {job.workMode && <Chip size="small" variant="outlined" label={job.workMode} />}
          </Stack>

          <Stack direction="row" spacing={1} mt={2} flexWrap="wrap" alignItems="center">
            <Button
              variant="outlined"
              onClick={() => navigate(`/recruiter/jobs/${job.id}/applications`)}
              sx={{ borderRadius: 2, textTransform: "none" }}
            >
              View Applicants
            </Button>

            {isOpen && (
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpenConfirm(true)}
                disabled={loading}
                sx={{ borderRadius: 2, textTransform: "none" }}
              >
                {loading ? "Closing..." : "Close Job"}
              </Button>
            )}
          </Stack>
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
