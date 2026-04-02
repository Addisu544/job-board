import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import api from "../services/api";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

const STATUS_OPTIONS = ["PENDING", "SHORTLISTED", "PASSED", "DECLINED"];

const ApplicantCard = ({ application, jobId, onStatusChange }) => {
  const { employee, coverLetter } = application;

  const [status, setStatus] = useState(application.status);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const statusMeta = useMemo(() => {
    switch (status) {
      case "PENDING":
        return { label: "Pending", chipColor: "info" };
      case "SHORTLISTED":
        return { label: "Interview", chipColor: "warning" };
      case "PASSED":
        return { label: "Offer", chipColor: "success" };
      case "DECLINED":
        return { label: "Rejected", chipColor: "error" };
      default:
        return { label: status, chipColor: "default" };
    }
  }, [status]);

  const cvUrl = useMemo(() => {
    if (!employee?.cvPath) return "";
    return `http://localhost:5000${employee.cvPath}`;
  }, [employee?.cvPath]);

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
      <TableRow hover>
        <TableCell sx={{ minWidth: 240 }}>
          <Stack spacing={0.5}>
            <Typography fontWeight={900}>
              {employee?.user?.fullName || "Unknown"}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {employee?.user?.email || "—"}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell sx={{ minWidth: 190 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip size="small" label={statusMeta.label} color={statusMeta.chipColor} />
            <FormControl size="small" sx={{ minWidth: 140 }}>
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
          </Stack>
        </TableCell>

        <TableCell sx={{ minWidth: 270 }}>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpen(true)}
              disabled={loading}
              startIcon={<DescriptionOutlinedIcon />}
            >
              Details
            </Button>

            <Button
              variant="text"
              size="small"
              disabled={!cvUrl}
              component={cvUrl ? "a" : "button"}
              href={cvUrl || undefined}
              target="_blank"
              rel="noreferrer"
            >
              {cvUrl ? "Preview" : "CV missing"}
            </Button>

            <Button
              variant="text"
              size="small"
              disabled={!cvUrl}
              component={cvUrl ? "a" : "button"}
              href={cvUrl || undefined}
              download
            >
              Download
            </Button>
          </Stack>
        </TableCell>
      </TableRow>

      {/* Applicant profile dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Applicant Info</DialogTitle>
        <DialogContent dividers>
          {employee ? (
            <Stack spacing={1.5}>
              <Typography variant="h6" fontWeight={900}>
                {employee?.user?.fullName || "Unknown"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {employee?.user?.email || "—"}
              </Typography>

              <Box>
                <Typography fontWeight={900} mb={0.5}>
                  Title
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {employee.title || "Not provided"}
                </Typography>
              </Box>

              <Box>
                <Typography fontWeight={900} mb={0.5}>
                  Bio
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-wrap" }}>
                  {employee.bio || "Not provided"}
                </Typography>
              </Box>

              <Box>
                <Typography fontWeight={900} mb={0.5}>
                  Skills
                </Typography>
                {employee.skills ? (
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {employee.skills
                      .split(",")
                      .map((skill) => skill.trim())
                      .filter(Boolean)
                      .slice(0, 12)
                      .map((skill) => (
                        <Chip key={skill} size="small" label={skill} sx={{ mb: 0.5 }} />
                      ))}
                  </Stack>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Not provided
                  </Typography>
                )}
              </Box>

              <Box>
                <Typography fontWeight={900} mb={0.5}>
                  Cover letter
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-wrap" }}>
                  {coverLetter || "—"}
                </Typography>
              </Box>

              <Box>
                <Typography fontWeight={900} mb={0.5}>
                  CV
                </Typography>
                {cvUrl ? (
                  <Button variant="outlined" size="small" component="a" href={cvUrl} target="_blank" rel="noreferrer">
                    View CV
                  </Button>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Not uploaded
                  </Typography>
                )}
              </Box>
            </Stack>
          ) : (
            <Skeleton variant="rounded" height={220} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApplicantCard;
