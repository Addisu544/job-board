import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const testimonials = [
  {
    name: "John Doe",
    text: "This platform helped me land my dream job!",
  },

  {
    name: "Jane Smith",
    text: "i am very satisfied with the job i got",
  },
  {
    name: "Bob Johnson",
    text: "it was very easy to find a job",
  },
  {
    name: "John Doe",
    text: "so easy to find a job",
  },

  {
    name: "Jane Smith",
    text: "this platform is very easy to use",
  },

  {
    name: "Jane Smith",
    text: "Easy to use and very effective.",
  },

  {
    name: "Bob Johnson",
    text: "I was able to get a job I always wanted.",
  },
];

const Testimonials = () => {
  return (
    <Box sx={{ py: 6, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h5" textAlign="center" mb={4}>
        What Users Say
      </Typography>

      <Grid container spacing={3} justifyContent="center">
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
