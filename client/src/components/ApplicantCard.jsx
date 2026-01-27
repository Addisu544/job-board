import { Card, CardContent, Typography } from "@mui/material";

const ApplicantCard = ({ application }) => {
  const { employee, coverLetter, status } = application;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{employee.user.fullName}</Typography>
        <Typography>Email: {employee.user.email}</Typography>
        <Typography>Status: {status}</Typography>
        <Typography mt={1}>Cover Letter:</Typography>
        <Typography>{coverLetter}</Typography>
      </CardContent>
    </Card>
  );
};

export default ApplicantCard;
