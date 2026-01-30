import { useState } from "react";
import { TextField, Button, Box, Typography, MenuItem } from "@mui/material";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
    companyName: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h5" mb={2}>
        Register
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          name="fullName"
          label="Full Name"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          select
          name="role"
          label="Role"
          fullWidth
          margin="normal"
          value={form.role}
          onChange={handleChange}
        >
          <MenuItem value="EMPLOYEE">Employee</MenuItem>
          <MenuItem value="RECRUITER">Recruiter</MenuItem>
        </TextField>

        {/* {form.role === "RECRUITER" && (
          <TextField
            name="companyName"
            label="Company Name"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
        )} */}

        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
