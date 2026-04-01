import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Grid, Link, IconButton, Stack } from "@mui/material";
import { LinkedIn, Twitter, Facebook, GitHub } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        bgcolor: theme.palette.mode === "light" ? "#0f172a" : "#020617",
        color: "common.white",
        py: { xs: 5, md: 7 },
        px: { xs: 2, md: 4 },
        mt: 2,
        borderRadius: 4,
      })}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            HireHub
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Find your next opportunity or hire top talent with confidence.
          </Typography>
        </Grid>

        <Grid item xs={6} sm={6} md={3}>
          <Typography fontWeight="bold" mb={1}>
            Company
          </Typography>
          <Stack spacing={0.8}>
            <Link component={RouterLink} to="/about" color="inherit" underline="hover">
              About Us
            </Link>
            <Link component={RouterLink} to="/contact" color="inherit" underline="hover">
              Contact
            </Link>
          
          </Stack>
        </Grid>

      
  {/* 3 */}
  <Grid item xs={6} sm={6} md={3}>
    <Typography fontWeight="bold" mb={1}>
      Explore
    </Typography>
    <Stack spacing={0.8}>
      <Link component={RouterLink} to="/jobs" color="inherit" underline="hover">Browse Jobs</Link>
      <Link component={RouterLink} to="/recruiter" color="inherit" underline="hover">Post a Job</Link>
    </Stack>
  </Grid>

        <Grid item xs={6} sm={6} md={3}>
          <Typography fontWeight="bold" mb={1}>
            Legal
          </Typography>
          <Stack spacing={0.8}>
            <Link component={RouterLink} to="/terms" color="inherit" underline="hover">
              Terms
            </Link>
            <Link component={RouterLink} to="/privacy" color="inherit" underline="hover">
              Privacy
            </Link>
          </Stack>
          <Typography fontWeight="bold" mt={2.5} mb={0.8}>
            Socials
          </Typography>
          <Box>
            <IconButton component="a" href="https://linkedin.com" target="_blank" sx={{ color: "white" }} aria-label="LinkedIn">
              <LinkedIn />
            </IconButton>
            <IconButton component="a" href="https://twitter.com" target="_blank" sx={{ color: "white" }} aria-label="Twitter">
              <Twitter />
            </IconButton>
            <IconButton component="a" href="https://facebook.com" target="_blank" sx={{ color: "white" }} aria-label="Facebook">
              <Facebook />
            </IconButton>
            <IconButton component="a" href="https://github.com" target="_blank" sx={{ color: "white" }} aria-label="GitHub">
              <GitHub />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Box mt={5} textAlign="center" sx={{ opacity: 0.6, borderTop: "1px solid rgba(255,255,255,0.12)", pt: 2.5 }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} HireHub. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
