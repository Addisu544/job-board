import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Title */}
        <Typography
          variant="h6"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          JobBoard
        </Typography>

        {/* Right side buttons */}
        <Box>
          {!user ? (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          ) : (
            <>
              {/* Common logout button */}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>

              {/* Role-based buttons */}
              {user.role === "RECRUITER" && (
                <>
                  <Button
                    color="inherit"
                    onClick={() => navigate("/recruiter/profile")}
                  >
                    Profile
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => navigate("/recruiter/create")}
                  >
                    Crete Jobs
                  </Button>
                </>
              )}

              {user.role === "EMPLOYEE" && (
                <>
                  <Button color="inherit" onClick={() => navigate("/employee")}>
                    My Applications
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/profile")}>
                    Profile
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/")}>
                    Jobs
                  </Button>
                </>
              )}

              {user.role === "ADMIN" && (
                <>
                  <Button
                    color="inherit"
                    onClick={() => navigate("/admin/dashboard")}
                  >
                    Users
                  </Button>
                </>
              )}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
