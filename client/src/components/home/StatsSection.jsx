import { Box, Typography, Grid } from "@mui/material";

const stats = [
  { label: "Jobs Posted", value: "10,000+" },
  { label: "Companies", value: "2,500+" },
  { label: "Candidates", value: "50,000+" },
];

const StatsSection = () => {
  return (
    <Box sx={{ py: 6, textAlign: "center" }}>
      <Grid container spacing={4} justifyContent="center">
        {stats.map((stat) => (
          <Grid item xs={12} md={3} key={stat.label}>
            <Typography variant="h4" fontWeight="bold">
              {stat.value}
            </Typography>
            <Typography>{stat.label}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsSection;
