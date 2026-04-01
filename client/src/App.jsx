// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/login" replace />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Box, CircularProgress, Container } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import JobList from "./pages/JobList";
import Navbar from "./components/Navbar";
import NavbarMinimal from "./components/NavbarMinimal";

import EmployeeProfile from "./pages/profile/EmployeeProfile";
import HomePage from "./pages/HomePage";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.22, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const RouteLoader = () => (
  <Box
    aria-label="loading page"
    role="status"
    sx={{
      minHeight: "40vh",
      display: "grid",
      placeItems: "center",
    }}
  >
    <CircularProgress size={36} />
  </Box>
);

function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {!hideNavbar ? <Navbar /> : <NavbarMinimal />}
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          pt: hideNavbar ? 11 : 13,
          pb: 6,
        }}
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
            <Route
              path="/"
              element={
                <PageTransition>
                  <HomePage />
                </PageTransition>
              }
            />

            <Route
              path="/login"
              element={
                <PageTransition>
                  <Login />
                </PageTransition>
              }
            />
            <Route
              path="/register"
              element={
                <PageTransition>
                  <Register />
                </PageTransition>
              }
            />

            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
            <Route
              path="/privacy"
              element={
                <PageTransition>
                  <Privacy />
                </PageTransition>
              }
            />
            <Route
              path="/terms"
              element={
                <PageTransition>
                  <Terms />
                </PageTransition>
              }
            />

            <Route
              path="/recruiter/*"
              element={
                <ProtectedRoute roles={["RECRUITER"]} fallback={<RouteLoader />}>
                  <PageTransition>
                    <RecruiterDashboard />
                  </PageTransition>
                </ProtectedRoute>
              }
            />

            <Route
              path="/employee"
              element={
                <ProtectedRoute roles={["EMPLOYEE"]} fallback={<RouteLoader />}>
                  <PageTransition>
                    <EmployeeDashboard />
                  </PageTransition>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute roles={["ADMIN"]} fallback={<RouteLoader />}>
                  <PageTransition>
                    <AdminDashboard />
                  </PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute roles={["ADMIN"]} fallback={<RouteLoader />}>
                  <PageTransition>
                    <Users />
                  </PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <PageTransition>
                  <JobList />
                </PageTransition>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute roles={["EMPLOYEE"]} fallback={<RouteLoader />}>
                  <PageTransition>
                    <EmployeeProfile />
                  </PageTransition>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </Container>
    </Box>
  );
}

export default App;
