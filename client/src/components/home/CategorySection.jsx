import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Skeleton,
  Stack,
} from "@mui/material";
import { motion as Motion } from "framer-motion";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const categories = [
  { name: "Technology", jobs: 324 },
  { name: "Finance", jobs: 182 },
  { name: "Healthcare", jobs: 264 },
  { name: "Education", jobs: 119 },
  { name: "Manufacturing", jobs: 147 },
  { name: "Retail", jobs: 208 },
  { name: "Construction", jobs: 94 },
  { name: "Agriculture", jobs: 66 },
];

const CategorySection = ({ loading = false }) => {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" textAlign="center" mb={1}>
        Explore Career Categories
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        color="text.secondary"
        mb={4}
        sx={{ maxWidth: 620, mx: "auto" }}
      >
        Start with high-demand domains and discover roles matched to your skills.
      </Typography>

      <Grid container spacing={3}>
        {categories.map((cat, index) => (
          <Grid item xs={12} sm={6} md={3} key={cat.name}>
            <Motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <Card
                sx={(theme) => ({
                  height: "100%",
                  border: `1px solid ${theme.palette.divider}`,
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-5px) scale(1.02)",
                    boxShadow: theme.shadows[6],
                    background:
                      theme.palette.mode === "light"
                        ? "linear-gradient(135deg, rgba(37,99,235,0.06), rgba(168,85,247,0.12))"
                        : "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(168,85,247,0.18))",
                  },
                })}
              >
                <CardContent>
                  {loading ? (
                    <Stack spacing={1.2}>
                      <Skeleton width="65%" />
                      <Skeleton width="45%" />
                    </Stack>
                  ) : (
                    <>
                      <Typography
                        fontWeight="bold"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {cat.name}
                        <ArrowOutwardIcon fontSize="inherit" />
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {cat.jobs}+ open jobs
                      </Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            </Motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategorySection;
