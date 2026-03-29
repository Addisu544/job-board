import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const testimonials = [
  {
    name: "John Doe",
    text: "This platform helped me land my dream job!",
  },
  {
    name: "Jane Smith",
    text: "Easy to use and very effective.",
  },
];

const Testimonials = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Typography variant="h5" textAlign="center" mb={4}>
        What Users Say
      </Typography>

      <Grid container spacing={3}>
        {testimonials.map((t, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Card>
              <CardContent>
                <Typography>"{t.text}"</Typography>
                <Typography mt={2} fontWeight="bold">
                  - {t.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;
