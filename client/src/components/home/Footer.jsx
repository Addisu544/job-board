import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import { LinkedIn, Twitter, Facebook, GitHub } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#0f172a", color: "white", py: 6 }}>
      <Grid container spacing={4} px={4} justifyContent="center">
        <Grid item xs={12} md={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {/* HireHub */}
            <span style={{ color: "#38bdf8" }}>Hire</span>Hub
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Connecting talent with opportunity. Find your dream job or hire the
            best candidates easily.
          </Typography>
        </Grid>

        {/* COMPANY */}
        <Grid item xs={6} md={3}>
          <Typography fontWeight="bold" mb={1}>
            Company
          </Typography>

          <Link
            component={RouterLink}
            to="/about"
            color="inherit"
            display="block"
            underline="none"
          >
            About Us
          </Link>

          <Link
            component={RouterLink}
            to="/contact"
            color="inherit"
            display="block"
            underline="none"
          >
            Contact
          </Link>

          <Link
            component={RouterLink}
            to="/terms"
            color="inherit"
            display="block"
            underline="none"
          >
            Terms & Conditions
          </Link>

          <Link
            component={RouterLink}
            to="/privacy"
            color="inherit"
            display="block"
            underline="none"
          >
            Privacy Policy
          </Link>
        </Grid>

        {/* SOCIAL */}
        <Grid item xs={12} md={3}>
          <Typography fontWeight="bold" mb={1}>
            Follow Us
          </Typography>

          <Box>
            <IconButton
              component="a"
              href="https://linkedin.com"
              target="_blank"
              sx={{ color: "white" }}
            >
              <LinkedIn />
            </IconButton>

            <IconButton
              component="a"
              href="https://twitter.com"
              target="_blank"
              sx={{ color: "white" }}
            >
              <Twitter />
            </IconButton>

            <IconButton
              component="a"
              href="https://facebook.com"
              target="_blank"
              sx={{ color: "white" }}
            >
              <Facebook />
            </IconButton>

            <IconButton
              component="a"
              href="https://github.com"
              target="_blank"
              sx={{ color: "white" }}
            >
              <GitHub />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* BOTTOM BAR */}
      <Box mt={5} textAlign="center" sx={{ opacity: 0.6 }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} HireHub. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
