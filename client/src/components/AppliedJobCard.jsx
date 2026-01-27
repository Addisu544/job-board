import { Card, CardContent, Typography, Chip, Stack } from "@mui/material";

const statusColor = (status) => {
  switch (status) {
    case "PASSED":
      return "success";
    case "SHORTLISTED":
      return "warning";
    case "DECLINED":
      return "error";
    default:
      return "default";
  }
};

const AppliedJobCard = ({ application }) => {
  const { job, status, appliedAt } = application;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{job.title}</Typography>
        <Typography>{job.location}</Typography>
        <Typography>{job.jobType}</Typography>

        <Stack direction="row" spacing={2} mt={2}>
          <Chip label={`Application: ${status}`} color={statusColor(status)} />
          <Chip label={`Job: ${job.status}`} />
        </Stack>

        <Typography mt={2} variant="body2" color="text.secondary">
          Applied on {new Date(appliedAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AppliedJobCard;
