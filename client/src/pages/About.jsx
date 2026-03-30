import { Box, Typography, Container, Grid } from "@mui/material";

const About = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        About HireHub
      </Typography>

      <Typography mb={3}>
        HireHub is a modern job platform designed to connect talented
        professionals with leading companies across the world. Our goal is to
        simplify hiring and job searching through a seamless digital experience.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold">
            Our Mission
          </Typography>
          <Typography>
            To empower job seekers and employers by providing a transparent,
            efficient, and accessible hiring platform.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold">
            Our Vision
          </Typography>
          <Typography>
            To become a leading global job marketplace where opportunities meet
            talent without barriers.
          </Typography>
        </Grid>
      </Grid>

      <Box mt={5}>
        <Typography variant="h6" fontWeight="bold">
          Why Choose HireHub?
        </Typography>
        <Typography>
          • Easy job application process • Smart candidate filtering for
          recruiters • Secure and transparent communication • Modern and
          user-friendly interface
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
