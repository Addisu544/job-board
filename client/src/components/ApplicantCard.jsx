// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Box,
// } from "@mui/material";

// const ApplicantCard = ({ application }) => {
//   const { employee, coverLetter, status } = application;
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <Card sx={{ mb: 2 }}>
//         <CardContent>
//           <Typography variant="h6">{employee.user.fullName}</Typography>
//           <Typography>Email: {employee.user.email}</Typography>
//           <Typography>Status: {status}</Typography>

//           <Typography mt={1}>Cover Letter:</Typography>
//           <Typography>{coverLetter}</Typography>

//           <Box mt={2}>
//             <Button variant="outlined" onClick={() => setOpen(true)}>
//               Applicant Info
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>

//       {/* Applicant Profile Dialog */}
//       <Dialog
//         open={open}
//         onClose={() => setOpen(false)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           Applicant Profile
//           <Button onClick={() => setOpen(false)}>✕</Button>
//         </DialogTitle>

//         <DialogContent dividers>
//           <Typography variant="subtitle1" fontWeight="bold">
//             Full Name
//           </Typography>
//           <Typography mb={2}>{employee.user.fullName}</Typography>

//           <Typography variant="subtitle1" fontWeight="bold">
//             Resume
//           </Typography>
//           <Typography mb={2}>{employee.resume || "Not provided"}</Typography>

//           <Typography variant="subtitle1" fontWeight="bold">
//             Skills
//           </Typography>
//           <Typography mb={2}>{employee.skills || "Not provided"}</Typography>

//           <Typography variant="subtitle1" fontWeight="bold">
//             Experience
//           </Typography>
//           <Typography mb={2}>
//             {employee.experience || "Not provided"}
//           </Typography>

//           <Typography variant="subtitle1" fontWeight="bold">
//             Education
//           </Typography>
//           <Typography>{employee.education || "Not provided"}</Typography>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default ApplicantCard;

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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import api from "../services/api";

const STATUS_OPTIONS = ["SHORTLISTED", "PASSED", "DECLINED"];

const ApplicantCard = ({ application, jobId, onStatusChange }) => {
  const { employee, coverLetter } = application;

  const [status, setStatus] = useState(application.status);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔁 handle dropdown change
  const handleChangeStatus = async (event) => {
    const newStatus = event.target.value;

    try {
      setLoading(true);

      await api.patch(`/jobs/${jobId}/applications/${application.id}/status`, {
        status: newStatus,
      });

      setStatus(newStatus);
      onStatusChange(application.id, newStatus);
    } catch (err) {
      console.error(err);
      alert("Failed to update application status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">{employee.user.fullName}</Typography>

          <Typography>Email: {employee.user.email}</Typography>

          {/* ✅ STATUS DROPDOWN */}
          <Box mt={2}>
            <FormControl size="small" fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={handleChangeStatus}
                disabled={loading}
              >
                {STATUS_OPTIONS.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Typography mt={2} fontWeight="bold">
            Cover Letter
          </Typography>
          <Typography>{coverLetter}</Typography>

          <Box mt={2}>
            <Button variant="outlined" onClick={() => setOpen(true)}>
              Applicant Info
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Applicant Profile Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Applicant Profile</DialogTitle>

        <DialogContent dividers>
          <Typography fontWeight="bold">Full Name</Typography>
          <Typography mb={2}>{employee.user.fullName}</Typography>

          <Typography fontWeight="bold">Resume</Typography>
          <Typography mb={2}>{employee.resume || "Not provided"}</Typography>

          <Typography fontWeight="bold">Skills</Typography>
          <Typography mb={2}>{employee.skills || "Not provided"}</Typography>

          <Typography fontWeight="bold">Experience</Typography>
          <Typography mb={2}>
            {employee.experience || "Not provided"}
          </Typography>

          <Typography fontWeight="bold">Education</Typography>
          <Typography>{employee.education || "Not provided"}</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApplicantCard;
