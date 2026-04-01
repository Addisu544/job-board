import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  Paper,
  InputBase,
  Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ loading = false }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ minHeight: { xs: "70vh", md: "82vh" }, py: { xs: 6, md: 10 } }}>
          <Skeleton variant="rounded" height={520} />
        </Box>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: { xs: "55vh", md: "63vh" },
        borderRadius: 6,
        overflow: "hidden",
        color: "common.white",
        background:
          "linear-gradient(135deg, rgba(37,99,235,1) 0%, rgba(99,102,241,1) 52%, rgba(168,85,247,1) 100%)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        px: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15), transparent 35%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.18), transparent 30%)",
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={4} textAlign={{ xs: "left", md: "center" }}>
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Typography variant="h1" gutterBottom>
              Find your dream job
            </Typography>
            <Typography
              variant="h6"
              sx={{
                opacity: 0.92,
                maxWidth: 760,
                mx: { xs: 0, md: "auto" },
              }}
            >
              Discover curated opportunities from fast-growing startups and global
              brands, all in one intelligent hiring platform.
            </Typography>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <Paper
              component="form"
              role="search"
              aria-label="Search for jobs"
              onSubmit={(event) => event.preventDefault()}
              sx={{
                mx: "auto",
                width: "100%",
                maxWidth: 760,
                p: 1,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.16)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.28)",
              }}
            >
              <SearchIcon sx={{ ml: 1, mr: 1.5 }} />
              <InputBase
                placeholder="Search by role, company, or skill"
                inputProps={{ "aria-label": "Search by role company or skill" }}
                sx={{ flex: 1, color: "inherit" }}
              />
              <Button
                variant="contained"
                color="secondary"
                sx={{ borderRadius: 2, px: 2.5 }}
              >
                Search
              </Button>
            </Paper>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.14 }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent={{ xs: "flex-start", md: "center" }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate("/jobs")}
                aria-label="Browse jobs"
              >
                Browse Jobs
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/recruiter")}
                aria-label="Post a job"
                sx={{
                  color: "common.white",
                  borderColor: "rgba(255,255,255,0.65)",
                  "&:hover": {
                    borderColor: "common.white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Post a Job
              </Button>
            </Stack>
          </Motion.div>
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;
