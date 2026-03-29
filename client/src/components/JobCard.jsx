import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";

const JobCard = ({ job, onApply, isApplied, onViewCompany }) => {
  // convert skills string → array
  const skills = job.skillsRequired
    ? job.skillsRequired.split(",").filter(Boolean)
    : [];

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{job.title}</Typography>

        <Typography variant="body2" color="text.secondary">
          {job.city}, {job.country}
        </Typography>

        <Typography mt={1}>{job.description}</Typography>
        <Typography mt={1}>Job Industry: {job.jobIndustry}</Typography>
        <Typography mt={1}>Job Type: {job.jobType}</Typography>
        <Typography>Work Mode: {job.workMode}</Typography>
        <Typography>Experience: {job.experienceLevel}</Typography>

        {/* Skills */}
        <Box mt={1}>
          {skills.map((skill) => (
            <Chip key={skill} label={skill} sx={{ m: 0.5 }} />
          ))}
        </Box>

        <Typography mt={1}>Status: {job.status}</Typography>

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
};

export default JobCard;
