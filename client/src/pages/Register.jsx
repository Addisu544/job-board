import { useState } from "react";
import { TextField, Button, Box, Typography, Link, Grid, CircularProgress, CardActionArea, Card, CardContent } from "@mui/material";
import { CheckCircleRounded, PersonOutline, BusinessCenterOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setForm({ ...form, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/register", form);
      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create account");
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
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 6,
          position: "relative",
          order: { xs: 2, md: 1 } // Under form on mobile
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" fontWeight="bold" mb={2}>
            Join the Network
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Create an account to start applying to premium jobs or to find the perfect candidate for your company.
          </Typography>
        </motion.div>

        {/* Decorative elements */}
        <Box sx={{ position: "absolute", bottom: -50, right: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
        <Box sx={{ position: "absolute", top: -30, left: -30, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
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
          order: { xs: 1, md: 2 }
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography variant="h4" fontWeight="bold" mb={1} color="text.primary">
            Sign Up
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Choose your account type and get started.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <Typography variant="subtitle2" fontWeight="bold" mb={1.5} color="text.secondary">
                I am a...
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card
                    elevation={form.role === "EMPLOYEE" ? 3 : 0}
                    sx={{
                      border: form.role === "EMPLOYEE" ? "2px solid #10b981" : "1px solid #e0e0e0",
                      transition: "all 0.2s",
                      position: "relative",
                      overflow: "visible",
                    }}
                  >
                    <CardActionArea onClick={() => handleRoleSelect("EMPLOYEE")} sx={{ p: 2, textAlign: "center" }}>
                      <PersonOutline sx={{ fontSize: 40, color: form.role === "EMPLOYEE" ? "#10b981" : "text.secondary", mb: 1 }} />
                      <Typography fontWeight="bold" color={form.role === "EMPLOYEE" ? "text.primary" : "text.secondary"}>
                        Candidate
                      </Typography>
                    </CardActionArea>
                    <AnimatePresence>
                      {form.role === "EMPLOYEE" && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          style={{ position: "absolute", top: -10, right: -10 }}
                        >
                          <CheckCircleRounded sx={{ color: "#10b981", bgcolor: "white", borderRadius: "50%", fontSize: 24 }} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card
                    elevation={form.role === "RECRUITER" ? 3 : 0}
                    sx={{
                      border: form.role === "RECRUITER" ? "2px solid #3b82f6" : "1px solid #e0e0e0",
                      transition: "all 0.2s",
                      position: "relative",
                      overflow: "visible",
                    }}
                  >
                    <CardActionArea onClick={() => handleRoleSelect("RECRUITER")} sx={{ p: 2, textAlign: "center" }}>
                      <BusinessCenterOutlined sx={{ fontSize: 40, color: form.role === "RECRUITER" ? "#3b82f6" : "text.secondary", mb: 1 }} />
                      <Typography fontWeight="bold" color={form.role === "RECRUITER" ? "text.primary" : "text.secondary"}>
                        Recruiter
                      </Typography>
                    </CardActionArea>
                    <AnimatePresence>
                      {form.role === "RECRUITER" && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          style={{ position: "absolute", top: -10, right: -10 }}
                        >
                          <CheckCircleRounded sx={{ color: "#3b82f6", bgcolor: "white", borderRadius: "50%", fontSize: 24 }} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            <TextField fullWidth name="fullName" label="Full Name" value={form.fullName} onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth name="email" label="Email Address" type="email" value={form.email} onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth name="password" label="Password" type="password" value={form.password} onChange={handleChange} sx={{ mb: 3 }} />

            <Button
              fullWidth
              variant="contained"
              color={form.role === "EMPLOYEE" ? "success" : "primary"}
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
              {loading ? <CircularProgress size={26} color="inherit" /> : "Create Account"}
            </Button>
          </form>

          <Box display="flex" justifyContent="center" mt={4}>
            <Typography variant="body1" color="text.secondary">
              Already have an account?{" "}
              <Link
                component="button"
                variant="body1"
                fontWeight="bold"
                onClick={() => navigate("/login")}
                sx={{ textDecoration: "none", ml: 0.5 }}
              >
                Log In
              </Link>
            </Typography>
          </Box>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default Register;
