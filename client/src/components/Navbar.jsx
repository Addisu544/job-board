// import React, { useMemo, useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   IconButton,
//   InputBase,
//   Avatar,
//   Menu,
//   MenuItem,
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemText,
//   Stack,
//   alpha,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { user, logout, mode, toggleMode } = useAuth();
//   const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
//   const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
//   const isAccountMenuOpen = Boolean(accountMenuAnchor);

//   const navItems = useMemo(
//     () => [
//       { label: "Jobs", to: "/jobs" },
//       { label: "For Recruiters", to: "/recruiter" },
//       { label: "For Employees", to: "/employee" },
//     ],
//     [],
//   );

//   const handleLogout = () => {
//     logout();
//     setAccountMenuAnchor(null);
//     navigate("/");
//   };

//   const handleOpenAccountMenu = (event) => {
//     setAccountMenuAnchor(event.currentTarget);
//   };

//   const handleCloseAccountMenu = () => {
//     setAccountMenuAnchor(null);
//   };

//   const navigateAndCloseMobile = (path) => {
//     setMobileDrawerOpen(false);
//     navigate(path);
//   };

//   const navigateFromAccountMenu = (path) => {
//     setAccountMenuAnchor(null);
//     navigate(path);
//   };

//   return (
//     <AppBar
//       position="fixed"
//       color="transparent"
//       elevation={0}
//       sx={{
//         top: 16,
//         left: { xs: 8, sm: 16 },
//         right: { xs: 8, sm: 16 },
//         width: "auto",
//       }}
//     >
//       <Toolbar
//         sx={(theme) => ({
//           px: { xs: 1.5, md: 2.5 },
//           py: 1,
//           borderRadius: 3,
//           border: `1px solid ${alpha(theme.palette.divider, 0.35)}`,
//           backdropFilter: "blur(14px)",
//           backgroundColor:
//             theme.palette.mode === "light"
//               ? alpha(theme.palette.background.paper, 0.78)
//               : alpha(theme.palette.background.paper, 0.62),
//           boxShadow: theme.shadows[3],
//           display: "grid",
//           gridTemplateColumns: { xs: "1fr auto auto", md: "auto 1fr auto" },
//           gap: 1.5,
//         })}
//       >
//         <Typography
//           variant="h6"
//           component="button"
//           aria-label="Go to homepage"
//           onClick={() => navigate("/")}
//           sx={{
//             border: 0,
//             p: 0,
//             m: 0,
//             bgcolor: "transparent",
//             color: "text.primary",
//             cursor: "pointer",
//             textAlign: "left",
//             fontWeight: 700,
//           }}
//         >
//           HireHub
//         </Typography>

//         <Box
//           sx={(theme) => ({
//             display: { xs: "none", md: "flex" },
//             alignItems: "center",
//             maxWidth: 420,
//             width: "100%",
//             mx: 2,
//             px: 1.5,
//             py: 0.75,
//             borderRadius: 2,
//             border: `1px solid ${alpha(theme.palette.divider, 0.35)}`,
//             backgroundColor: alpha(theme.palette.background.default, 0.5),
//           })}
//           role="search"
//           aria-label="Global search"
//         >
//           <SearchIcon fontSize="small" />
//           <InputBase
//             placeholder="Search jobs, companies..."
//             inputProps={{ "aria-label": "Search jobs and companies" }}
//             sx={{ ml: 1, flex: 1, fontSize: 14 }}
//           />
//         </Box>

//         <Stack direction="row" alignItems="center" spacing={0.5}>
//           <Box sx={{ display: { xs: "none", md: "flex" } }}>
//             {navItems.map((item) => (
//               <Button
//                 key={item.label}
//                 color="inherit"
//                 onClick={() => navigate(item.to)}
//                 aria-label={`Go to ${item.label}`}
//               >
//                 {item.label}
//               </Button>
//             ))}
//           </Box>

//           <IconButton
//             onClick={toggleMode}
//             aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
//             color="inherit"
//           >
//             {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
//           </IconButton>

//           {!user ? (
//             <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
//               <Button color="inherit" onClick={() => navigate("/login")}>
//                 Login
//               </Button>
//               <Button variant="contained" onClick={() => navigate("/register")}>
//                 Sign Up
//               </Button>
//             </Box>
//           ) : (
//             <>
//               <IconButton
//                 aria-label="Open account menu"
//                 aria-controls={isAccountMenuOpen ? "account-menu" : undefined}
//                 aria-haspopup="menu"
//                 aria-expanded={isAccountMenuOpen ? "true" : undefined}
//                 onClick={handleOpenAccountMenu}
//                 color="inherit"
//               >
//                 <Avatar sx={{ width: 32, height: 32 }}>
//                   {(user.name || "U").charAt(0).toUpperCase()}
//                 </Avatar>
//               </IconButton>
//               <Menu
//                 id="account-menu"
//                 anchorEl={accountMenuAnchor}
//                 open={isAccountMenuOpen}
//                 onClose={handleCloseAccountMenu}
//               >
//                 {user.role === "RECRUITER" && (
//                   <MenuItem onClick={() => navigateFromAccountMenu("/recruiter/profile")}>
//                     Profile
//                   </MenuItem>
//                 )}
//                 {user.role === "EMPLOYEE" && (
//                   <MenuItem onClick={() => navigateFromAccountMenu("/profile")}>
//                     Profile
//                   </MenuItem>
//                 )}
//                 {user.role === "ADMIN" && (
//                   <MenuItem onClick={() => navigateFromAccountMenu("/admin/dashboard")}>
//                     Dashboard
//                   </MenuItem>
//                 )}
//                 <MenuItem onClick={handleLogout}>Logout</MenuItem>
//               </Menu>
//             </>
//           )}

//           <IconButton
//             sx={{ display: { xs: "inline-flex", md: "none" } }}
//             color="inherit"
//             onClick={() => setMobileDrawerOpen(true)}
//             aria-label="Open navigation menu"
//           >
//             <MenuIcon />
//           </IconButton>
//         </Stack>
//       </Toolbar>

//       <Drawer
//         anchor="right"
//         open={mobileDrawerOpen}
//         onClose={() => setMobileDrawerOpen(false)}
//       >
//         <Box sx={{ width: 280, pt: 2 }} role="navigation" aria-label="Mobile menu">
//           <List>
//             {navItems.map((item) => (
//               <ListItemButton
//                 key={item.label}
//                 onClick={() => navigateAndCloseMobile(item.to)}
//               >
//                 <ListItemText primary={item.label} />
//               </ListItemButton>
//             ))}

//             {!user ? (
//               <>
//                 <ListItemButton onClick={() => navigateAndCloseMobile("/login")}>
//                   <ListItemText primary="Login" />
//                 </ListItemButton>
//                 <ListItemButton onClick={() => navigateAndCloseMobile("/register")}>
//                   <ListItemText primary="Sign Up" />
//                 </ListItemButton>
//               </>
//             ) : (
//               <ListItemButton onClick={handleLogout}>
//                 <ListItemText primary="Logout" />
//               </ListItemButton>
//             )}
//           </List>
//         </Box>
//       </Drawer>
//     </AppBar>
//   );
// };

// export default Navbar;



import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, mode, toggleMode } = useAuth();

  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const isAccountMenuOpen = Boolean(accountMenuAnchor);

  const handleLogout = () => {
    logout();
    setAccountMenuAnchor(null);
    navigate("/");
  };

  const handleOpenAccountMenu = (event) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleCloseAccountMenu = () => {
    setAccountMenuAnchor(null);
  };

  const navigateAndCloseMobile = (path) => {
    setMobileDrawerOpen(false);
    navigate(path);
  };

  const navigateFromAccountMenu = (path) => {
    setAccountMenuAnchor(null);
    navigate(path);
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        top: 16,
        left: { xs: 8, sm: 16 },
        right: { xs: 8, sm: 16 },
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
          display: "grid",
          gridTemplateColumns: { xs: "1fr auto auto", md: "auto 1fr auto" },
          gap: 1.5,
        })}
      >
        {/* Logo */}
        <Typography
          variant="h6"
          onClick={() => navigate("/")}
          sx={{
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          HireHub
        </Typography>

        {/* Search */}
        <Box
          sx={(theme) => ({
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            maxWidth: 420,
            width: "100%",
            mx: 2,
            px: 1.5,
            py: 0.75,
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.divider, 0.35)}`,
            backgroundColor: alpha(theme.palette.background.default, 0.5),
          })}
        >
          <SearchIcon fontSize="small" />
          <InputBase
            placeholder="Search jobs..."
            sx={{ ml: 1, flex: 1, fontSize: 14 }}
          />
        </Box>

        {/* Right Section */}
        <Stack direction="row" alignItems="center" spacing={1}>
          {/* Theme Toggle */}
          <IconButton onClick={toggleMode} color="inherit">
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          {/* BEFORE LOGIN */}
          {!user ? (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Sign In
              </Button>
              <Button variant="contained" onClick={() => navigate("/register")}>
                Sign Up
              </Button>
            </Box>
          ) : (
            <>
              {/* ROLE-BASED BUTTONS (VISIBLE ON DESKTOP) */}

              {user.role === "EMPLOYEE" && (
                <>
                  <Button onClick={() => navigate("/employee")}>
                    My Applications
                  </Button>
                  <Button onClick={() => navigate("/")}>Jobs</Button>
                </>
              )}

              {user.role === "RECRUITER" && (
                <>
                  <Button onClick={() => navigate("/recruiter/jobs")}>
                    My Jobs
                  </Button>
                  <Button onClick={() => navigate("/recruiter/create")}>
                    Create Jobs
                  </Button>
                </>
              )}

              {user.role === "ADMIN" && (
                <>
                  <Button onClick={() => navigate("/admin/dashboard")}>
                    Dashboard
                  </Button>
                  <Button onClick={() => navigate("/admin/users")}>
                    Users
                  </Button>
                </>
              )}

              {/* AVATAR MENU */}
              <IconButton onClick={handleOpenAccountMenu} color="inherit">
                <Avatar sx={{ width: 32, height: 32 }}>
                  {(user.name || "U").charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={accountMenuAnchor}
                open={isAccountMenuOpen}
                onClose={handleCloseAccountMenu}
              >
                {/* PROFILE (ALL ROLES) */}
                {user.role === "RECRUITER" && (
                  <MenuItem
                    onClick={() =>
                      navigateFromAccountMenu("/recruiter/profile")
                    }
                  >
                    Profile
                  </MenuItem>
                )}

                {user.role === "EMPLOYEE" && (
                  <MenuItem
                    onClick={() => navigateFromAccountMenu("/profile")}
                  >
                    Profile
                  </MenuItem>
                )}

                {/* ADMIN: NO PROFILE, ONLY DASHBOARD */}
                {user.role === "ADMIN" && (
                  <MenuItem
                    onClick={() =>
                      navigateFromAccountMenu("/admin/dashboard")
                    }
                  >
                    Dashboard
                  </MenuItem>
                )}

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}

          {/* MOBILE MENU */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setMobileDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
      </Toolbar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      >
        <Box sx={{ width: 260, pt: 2 }}>
          <List>
            {!user ? (
              <>
                <ListItemButton
                  onClick={() => navigateAndCloseMobile("/login")}
                >
                  <ListItemText primary="Sign In" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => navigateAndCloseMobile("/register")}
                >
                  <ListItemText primary="Sign Up" />
                </ListItemButton>
              </>
            ) : (
              <>
                {user.role === "EMPLOYEE" && (
                  <>
                    <ListItemButton
                      onClick={() => navigateAndCloseMobile("/employee")}
                    >
                      <ListItemText primary="My Applications" />
                    </ListItemButton>
                    <ListItemButton
                      onClick={() => navigateAndCloseMobile("/")}
                    >
                      <ListItemText primary="Jobs" />
                    </ListItemButton>
                  </>
                )}

                {user.role === "RECRUITER" && (
                  <>
                    <ListItemButton
                      onClick={() =>
                        navigateAndCloseMobile("/recruiter/jobs")
                      }
                    >
                      <ListItemText primary="My Jobs" />
                    </ListItemButton>
                    <ListItemButton
                      onClick={() =>
                        navigateAndCloseMobile("/recruiter/create")
                      }
                    >
                      <ListItemText primary="Create Jobs" />
                    </ListItemButton>
                  </>
                )}

                {user.role === "ADMIN" && (
                  <>
                    <ListItemButton
                      onClick={() =>
                        navigateAndCloseMobile("/admin/dashboard")
                      }
                    >
                      <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    <ListItemButton
                      onClick={() =>
                        navigateAndCloseMobile("/admin/users")
                      }
                    >
                      <ListItemText primary="Users" />
                    </ListItemButton>
                  </>
                )}

                <ListItemButton onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;