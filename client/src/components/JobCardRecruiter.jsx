import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const JobCardRecruiter = ({ job }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{job.title}</Typography>
        <Typography>Status: {job.status}</Typography>

        <Button
          sx={{ mt: 2 }}
          variant="outlined"
          onClick={() => navigate(`/recruiter/jobs/${job.id}/applications`)}
        >
          View Applicants
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCardRecruiter;
