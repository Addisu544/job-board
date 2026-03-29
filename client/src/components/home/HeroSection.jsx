import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: "#0f172a",
        color: "white",
        py: 10,
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Find Your Dream Job Today
        </Typography>

        <Typography variant="h6" sx={{ opacity: 0.8, mb: 4 }}>
          Discover thousands of job opportunities with top companies. Build your
          career with ease and confidence.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/jobs")}
        >
          Browse Jobs
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;
