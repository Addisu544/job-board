import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const companies = [
  { name: "Google", industry: "Tech" },
  { name: "Amazon", industry: "E-commerce" },
  { name: "Meta", industry: "Social Media" },
  { name: "Microsoft", industry: "Software" },
];

const FeaturedCompanies = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Typography variant="h5" textAlign="center" mb={4}>
        Top Companies Hiring
      </Typography>

      <Grid container spacing={3}>
        {companies.map((c) => (
          <Grid item xs={12} sm={6} md={3} key={c.name}>
            <Card>
              <CardContent>
                <Typography fontWeight="bold">{c.name}</Typography>
                <Typography variant="body2">{c.industry}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedCompanies;
