import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const categories = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
  "Construction",
  "Agriculture",
];

const CategorySection = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Typography variant="h5" textAlign="center" mb={4}>
        Explore Career Categories
      </Typography>

      <Grid container spacing={3}>
        {categories.map((cat) => (
          <Grid item xs={12} sm={6} md={3} key={cat}>
            <Card>
              <CardContent>
                <Typography fontWeight="bold">{cat}</Typography>
                <Typography variant="body2">
                  {Math.floor(Math.random() * 50) + 10} jobs
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategorySection;
