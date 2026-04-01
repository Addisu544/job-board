import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  alpha,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavbarMinimal = () => {
  const navigate = useNavigate();
  const { mode, toggleMode } = useAuth();

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        top: 16,
        left: { xs: 8, sm: 16 },
        right: { xs: 8, sm: 16 },
        width: "auto",
      }}
    >
      <Toolbar
        sx={(theme) => ({
          px: { xs: 1.5, md: 2.5 },
          py: 1,
          borderRadius: 3,
          border: `1px solid ${alpha(theme.palette.divider, 0.35)}`,
          backdropFilter: "blur(14px)",
          backgroundColor:
            theme.palette.mode === "light"
              ? alpha(theme.palette.background.paper, 0.78)
              : alpha(theme.palette.background.paper, 0.62),
          boxShadow: theme.shadows[3],
          display: "flex",
          justifyContent: "space-between",
        })}
      >
        <Typography
          variant="h6"
          component="button"
          aria-label="Go to homepage"
          onClick={() => navigate("/")}
          sx={{
            border: 0,
            p: 0,
            m: 0,
            bgcolor: "transparent",
            color: "text.primary",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          HireHub
        </Typography>

        <IconButton
          onClick={toggleMode}
          aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
          color="inherit"
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarMinimal;
