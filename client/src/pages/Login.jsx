import { useState } from "react";
import { TextField, Button, Box, Typography, Link, Grid, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login(res.data.token, res.data.user);
      toast.success("Welcome back!");

      // Redirect by role
      if (res.data.user.role === "RECRUITER") {
        navigate("/recruiter/jobs");
      } else if (res.data.user.role === "EMPLOYEE") {
        navigate("/");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ minHeight: "80vh", borderRadius: 4, overflow: "hidden", boxShadow: 4, bgcolor: "background.paper", my: 4 }}>
      {/* LEFT SIDE - BRANDING */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 6,
          position: "relative",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" fontWeight="bold" mb={2}>
            Welcome Back!
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Log in to manage your jobs, applications, and connect with top talent or great companies.
          </Typography>
        </motion.div>

        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            bottom: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          }}
        />
      </Grid>

      {/* RIGHT SIDE - FORM */}
      <Grid
        item
        xs={12}
        md={7}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: { xs: 4, md: 8 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography variant="h4" fontWeight="bold" mb={1} color="text.primary">
            Sign In
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Enter your email and password to access your account.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                boxShadow: 2,
                "&:hover": { boxShadow: 4 },
              }}
            >
              {loading ? <CircularProgress size={26} color="inherit" /> : "Login"}
            </Button>
          </form>
          
          <Box display="flex" justifyContent="center" mt={4}>
            <Typography variant="body1" color="text.secondary">
              Don't have an account?{" "}
              <Link
                component="button"
                variant="body1"
                fontWeight="bold"
                onClick={() => navigate("/register")}
                sx={{ textDecoration: "none", ml: 0.5 }}
              >
                Create one
              </Link>
            </Typography>
          </Box>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default Login;
