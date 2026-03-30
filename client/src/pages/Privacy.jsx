import { Container, Typography } from "@mui/material";

const Privacy = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Privacy Policy
      </Typography>

      <Typography paragraph>
        HireHub values your privacy. We collect personal information such as
        your name, email, resume, and job preferences to provide our services.
      </Typography>

      <Typography paragraph>
        We do not sell your data to third parties. Your information is only
        shared with recruiters when you apply for jobs.
      </Typography>

      <Typography paragraph>
        We implement security measures to protect your data, but we recommend
        users take precautions when sharing sensitive information online.
      </Typography>

      <Typography paragraph>
        By using HireHub, you agree to this privacy policy.
      </Typography>
    </Container>
  );
};

export default Privacy;
