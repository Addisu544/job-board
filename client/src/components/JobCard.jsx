import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const JobCard = ({ job, onApply, isApplied, onViewCompany }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6">{job.title}</Typography>
      <Typography>{job.location}</Typography>
      <Typography>{job.jobType}</Typography>
      <Typography>Status: {job.status}</Typography>

      <Box mt={2} display="flex" gap={2}>
        {onApply && !isApplied && (
          <Button variant="contained" onClick={onApply}>
            Apply
          </Button>
        )}

        <Button variant="outlined" onClick={onViewCompany}>
          View Company
        </Button>
      </Box>

      {isApplied && (
        <Typography mt={2} color="green">
          Already Applied
        </Typography>
      )}
    </CardContent>
  </Card>
);

export default JobCard;
