import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const JobCard = ({ job, onApply, isApplied }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6">{job.title}</Typography>
      <Typography>{job.location}</Typography>
      <Typography>{job.jobType}</Typography>
      <Typography>Status: {job.status}</Typography>

      {onApply && !isApplied && (
        <Box mt={2}>
          <Button variant="contained" onClick={onApply}>
            Apply
          </Button>
        </Box>
      )}

      {isApplied && (
        <Typography mt={2} color="green">
          Already Applied
        </Typography>
      )}
    </CardContent>
  </Card>
);

export default JobCard;
