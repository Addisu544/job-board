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

import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box, CircularProgress, Container } from "@mui/material";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import NavbarMinimal from "./components/NavbarMinimal";

const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const RecruiterDashboard = React.lazy(() => import("./pages/recruiter/RecruiterDashboard"));
const EmployeeDashboard = React.lazy(() => import("./pages/employee/EmployeeDashboard"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const Users = React.lazy(() => import("./pages/admin/Users"));
const JobList = React.lazy(() => import("./pages/JobList"));
const EmployeeProfile = React.lazy(() => import("./pages/profile/EmployeeProfile"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Privacy = React.lazy(() => import("./pages/Privacy"));
const Terms = React.lazy(() => import("./pages/Terms"));

const PageTransition = ({ children }) => (
  <Motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.22, ease: "easeOut" }}
  >
    {children}
  </Motion.div>
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
      <Toaster position="top-right" />
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
          <Suspense fallback={<RouteLoader />}>
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
          </Suspense>
        </AnimatePresence>
      </Container>
    </Box>
  );
}

export default App;
