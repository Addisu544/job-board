import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#111", color: "white", py: 4, textAlign: "center" }}>
      <Typography>© 2026 JobBoard</Typography>
      <Typography>About | Contact | Terms</Typography>
      <Typography>LinkedIn | Twitter | Facebook</Typography>
    </Box>
  );
};

export default Footer;
