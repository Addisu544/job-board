import { Box, Typography, Grid } from "@mui/material";

const HowItWorks = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Typography variant="h5" textAlign="center" mb={4}>
        How It Works
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography fontWeight="bold">For Job Seekers</Typography>
          <Typography>1. Create profile</Typography>
          <Typography>2. Apply to jobs</Typography>
          <Typography>3. Get hired</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography fontWeight="bold">For Recruiters</Typography>
          <Typography>1. Post jobs</Typography>
          <Typography>2. Review candidates</Typography>
          <Typography>3. Hire talent</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HowItWorks;
