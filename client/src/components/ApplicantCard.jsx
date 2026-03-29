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
  Chip,
} from "@mui/material";
import api from "../services/api";

const STATUS_OPTIONS = ["PENDING", "SHORTLISTED", "PASSED", "DECLINED"];

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
  const formatUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `https://${url}`;
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
          {/* BASIC INFO */}
          <Typography fontWeight="bold">Full Name</Typography>
          <Typography mb={2}>{employee.user.fullName}</Typography>

          <Typography fontWeight="bold">Email</Typography>
          <Typography mb={2}>{employee.user.email}</Typography>

          <Typography fontWeight="bold">Title</Typography>
          <Typography mb={2}>{employee.title || "Not provided"}</Typography>

          <Typography fontWeight="bold">Bio</Typography>
          <Typography mb={2}>{employee.bio || "Not provided"}</Typography>

          {/* SKILLS */}
          <Typography fontWeight="bold">Skills</Typography>
          <Box mb={2}>
            {employee.skills
              ? employee.skills
                  .split(",")
                  .map((skill) => (
                    <Chip key={skill} label={skill} sx={{ m: 0.5 }} />
                  ))
              : "Not provided"}
          </Box>

          {/* EXPERIENCE */}
          <Typography fontWeight="bold">Experience</Typography>
          <Typography mb={2}>
            {employee.experience || "Not provided"}
          </Typography>

          {/* EDUCATION */}
          <Typography fontWeight="bold">Education</Typography>
          <Typography mb={2}>{employee.education || "Not provided"}</Typography>

          <Typography fontWeight="bold">Level</Typography>
          <Typography mb={2}>{employee.level || "Not provided"}</Typography>

          {/* LINKS */}
          <Typography fontWeight="bold">LinkedIn</Typography>
          <Typography mb={2}>
            {employee.linkedin ? (
              <a
                href={formatUrl(employee.linkedin)}
                target="_blank"
                rel="noreferrer"
              >
                {employee.linkedin}
              </a>
            ) : (
              "Not provided"
            )}
          </Typography>

          <Typography fontWeight="bold">GitHub</Typography>
          <Typography mb={2}>
            {employee.github ? (
              <a
                href={formatUrl(employee.github)}
                target="_blank"
                rel="noreferrer"
              >
                {employee.github}
              </a>
            ) : (
              "Not provided"
            )}
          </Typography>

          <Typography fontWeight="bold">Portfolio</Typography>
          <Typography mb={2}>
            {employee.portfolio ? (
              <a
                href={formatUrl(employee.portfolio)}
                target="_blank"
                rel="noreferrer"
              >
                {employee.portfolio}
              </a>
            ) : (
              "Not provided"
            )}
          </Typography>

          <Typography fontWeight="bold">Telegram</Typography>
          <Typography mb={2}>{employee.telegram || "Not provided"}</Typography>
          <Typography fontWeight="bold">Telegram</Typography>
          <Typography mb={2}>
            {employee.portfolio ? (
              <a
                href={formatUrl(employee.telegram)}
                target="_blank"
                rel="noreferrer"
              >
                {employee.telegram}
              </a>
            ) : (
              "Not provided"
            )}
          </Typography>
          {/* AVAILABILITY */}
          <Typography fontWeight="bold">Availability</Typography>
          <Typography mb={2}>
            {employee.availability || "Not provided"}
          </Typography>

          {/* CV DOWNLOAD */}
          <Typography fontWeight="bold">CV</Typography>
          <Typography>
            {employee.cvPath ? (
              <a
                href={`http://localhost:5000${employee.cvPath}`}
                target="_blank"
                rel="noreferrer"
              >
                View CV
              </a>
            ) : (
              "Not uploaded"
            )}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApplicantCard;
