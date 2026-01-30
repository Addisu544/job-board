// import { Card, CardContent, Typography } from "@mui/material";

// const ApplicantCard = ({ application }) => {
//   const { employee, coverLetter, status } = application;

//   return (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Typography variant="h6">{employee.user.fullName}</Typography>
//         <Typography>Email: {employee.user.email}</Typography>
//         <Typography>Status: {status}</Typography>
//         <Typography mt={1}>Cover Letter:</Typography>
//         <Typography>{coverLetter}</Typography>
//       </CardContent>
//     </Card>
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
} from "@mui/material";

const ApplicantCard = ({ application }) => {
  const { employee, coverLetter, status } = application;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">{employee.user.fullName}</Typography>
          <Typography>Email: {employee.user.email}</Typography>
          <Typography>Status: {status}</Typography>

          <Typography mt={1}>Cover Letter:</Typography>
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
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Applicant Profile
          <Button onClick={() => setOpen(false)}>✕</Button>
        </DialogTitle>

        <DialogContent dividers>
          <Typography variant="subtitle1" fontWeight="bold">
            Full Name
          </Typography>
          <Typography mb={2}>{employee.user.fullName}</Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            Resume
          </Typography>
          <Typography mb={2}>{employee.resume || "Not provided"}</Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            Skills
          </Typography>
          <Typography mb={2}>{employee.skills || "Not provided"}</Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            Experience
          </Typography>
          <Typography mb={2}>
            {employee.experience || "Not provided"}
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            Education
          </Typography>
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
