import { Container, Typography } from "@mui/material";

const Terms = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Terms & Conditions
      </Typography>

      <Typography paragraph>
        By using HireHub, you agree to comply with all applicable laws and
        regulations.
      </Typography>

      <Typography paragraph>
        Users are responsible for the accuracy of the information they provide.
        Fake job postings or fraudulent activities are strictly prohibited.
      </Typography>

      <Typography paragraph>
        HireHub reserves the right to suspend or terminate accounts that violate
        these terms.
      </Typography>

      <Typography paragraph>
        We may update these terms at any time. Continued use of the platform
        means you accept the updated terms.
      </Typography>
    </Container>
  );
};

export default Terms;
