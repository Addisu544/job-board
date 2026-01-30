import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import api from "../../services/api";

const RecruiterProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
  });

  const [form, setForm] = useState({
    companyName: "",
    companyWebsite: "",
    companyDescription: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/recruiter/me");

        setUserInfo({
          fullName: res.data.user.fullName,
          email: res.data.user.email,
        });

        setForm({
          companyName: res.data.companyName || "",
          companyWebsite: res.data.companyWebsite || "",
          companyDescription: res.data.companyDescription || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      await api.put("/profile/recruiter/me", form);
      alert("Company profile updated successfully");
    } catch (err) {
      alert("Failed to update company profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box mt={5} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" mb={1}>
        {userInfo.fullName}
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        {userInfo.email}
      </Typography>

      <TextField
        label="Company Name"
        name="companyName"
        fullWidth
        margin="normal"
        value={form.companyName}
        onChange={handleChange}
      />

      <TextField
        label="Company Website"
        name="companyWebsite"
        fullWidth
        margin="normal"
        value={form.companyWebsite}
        onChange={handleChange}
      />

      <TextField
        label="Company Description"
        name="companyDescription"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={form.companyDescription}
        onChange={handleChange}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleSubmit}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Profile"}
      </Button>
    </Container>
  );
};

export default RecruiterProfile;
