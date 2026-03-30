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

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import JobList from "./pages/JobList";
import Navbar from "./components/Navbar";
import NavbarMinimal from "./components/Navbarminimal";

import EmployeeProfile from "./pages/profile/EmployeeProfile";
import HomePage from "./pages/HomePage";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar ? <Navbar /> : <NavbarMinimal />}
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        <Route
          path="/recruiter/*"
          element={
            <ProtectedRoute roles={["RECRUITER"]}>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee"
          element={
            <ProtectedRoute roles={["EMPLOYEE"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route path="/jobs" element={<JobList />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute roles={["EMPLOYEE"]}>
              <EmployeeProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
