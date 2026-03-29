// import { Card, CardContent, Typography, Button, Box } from "@mui/material";

// const JobCard = ({ job, onApply, isApplied, onViewCompany }) => (
//   <Card sx={{ mb: 2 }}>
//     <CardContent>
//       <Typography variant="h6">{job.title}</Typography>
//       <Typography>{job.location}</Typography>
//       <Typography>{job.jobType}</Typography>
//       <Typography>Status: {job.status}</Typography>

//       <Box mt={2} display="flex" gap={2}>
//         {onApply && !isApplied && (
//           <Button variant="contained" onClick={onApply}>
//             Apply
//           </Button>
//         )}

//         <Button variant="outlined" onClick={onViewCompany}>
//           View Company
//         </Button>
//       </Box>

//       {isApplied && (
//         <Typography mt={2} color="green">
//           Already Applied
//         </Typography>
//       )}
//     </CardContent>
//   </Card>
// );

// export default JobCard;

import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";

const JobCard = ({ job, onApply, isApplied, onViewCompany }) => {
  const skills = job.skillsRequired
    ? job.skillsRequired.split(",").filter(Boolean)
    : [];

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        {/* Title */}
        <Typography variant="h6">{job.title}</Typography>

        {/* Company */}
        <Typography color="text.secondary" mb={1}>
          {job.recruiter?.companyName}
        </Typography>

        {/* Description */}
        <Typography mb={1}>{job.description}</Typography>

        {/* Location */}
        <Typography variant="body2">
          📍 {job.city}, {job.country}
        </Typography>

        {/* Job Type & Work Mode */}
        <Typography variant="body2">
          🕒 {job.jobType} • {job.workMode}
        </Typography>

        {/* Experience */}
        <Typography variant="body2">🎯 {job.experienceLevel}</Typography>

        {/* Skills */}
        <Box mt={1}>
          {skills.map((skill) => (
            <Chip key={skill} label={skill} sx={{ m: 0.5 }} />
          ))}
        </Box>

        {/* Status */}
        <Typography mt={1}>Status: {job.status}</Typography>

        {/* Actions */}
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
