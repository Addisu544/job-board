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

const EmployeeProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
  });

  // const [form, setForm] = useState({
  //   resume: "",
  //   skills: "",
  //   experience: "",
  //   education: "",
  // });
  const [form, setForm] = useState({
    title: "",
    bio: "",
    skills: "",
    languages: "",
    experience: "",
    education: "",
    level: "",
    linkedin: "",
    telegram: "",
    github: "",
    portfolio: "",
    availability: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/employee/me");

        setUserInfo({
          fullName: res.data.user.fullName,
          email: res.data.user.email,
        });

        // setForm({
        //   resume: res.data.resume || "",
        //   skills: res.data.skills || "",
        //   experience: res.data.experience || "",
        //   education: res.data.education || "",
        // });
        setForm({
          title: res.data.title || "",
          bio: res.data.bio || "",
          skills: res.data.skills || "",
          languages: res.data.languages || "",
          experience: res.data.experience || "",
          education: res.data.education || "",
          level: res.data.level || "",
          linkedin: res.data.linkedin || "",
          telegram: res.data.telegram || "",
          github: res.data.github || "",
          portfolio: res.data.portfolio || "",
          availability: res.data.availability || "",
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
      await api.put("/profile/employee/me", form);
      alert("Profile updated successfully");
    } catch (err) {
      alert("Failed to update profile");
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

      {/* <TextField
        label="Resume"
        name="resume"
        fullWidth
        margin="normal"
        value={form.resume}
        onChange={handleChange}
      />

      <TextField
        label="Skills"
        name="skills"
        fullWidth
        margin="normal"
        value={form.skills}
        onChange={handleChange}
      />

      <TextField
        label="Experience"
        name="experience"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        value={form.experience}
        onChange={handleChange}
      />

      <TextField
        label="Education"
        name="education"
        fullWidth
        margin="normal"
        multiline
        rows={2}
        value={form.education}
        onChange={handleChange}
      /> */}
      <TextField
        label="Title"
        name="title"
        fullWidth
        margin="normal"
        value={form.title}
        onChange={handleChange}
      />

      <TextField
        label="Bio"
        name="bio"
        fullWidth
        margin="normal"
        multiline
        rows={2}
        value={form.bio}
        onChange={handleChange}
      />

      <TextField
        label="Skills (comma separated)"
        name="skills"
        fullWidth
        margin="normal"
        value={form.skills}
        onChange={handleChange}
      />

      <TextField
        label="Languages (comma separated)"
        name="languages"
        fullWidth
        margin="normal"
        value={form.languages}
        onChange={handleChange}
      />

      <TextField
        label="Experience"
        name="experience"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        value={form.experience}
        onChange={handleChange}
      />

      <TextField
        label="Education"
        name="education"
        fullWidth
        margin="normal"
        value={form.education}
        onChange={handleChange}
      />

      <TextField
        label="Education Level"
        name="level"
        fullWidth
        margin="normal"
        value={form.level}
        onChange={handleChange}
      />

      <TextField
        label="LinkedIn URL"
        name="linkedin"
        fullWidth
        margin="normal"
        value={form.linkedin}
        onChange={handleChange}
      />

      <TextField
        label="Telegram URL"
        name="telegram"
        fullWidth
        margin="normal"
        value={form.telegram}
        onChange={handleChange}
      />

      <TextField
        label="GitHub URL"
        name="github"
        fullWidth
        margin="normal"
        value={form.github}
        onChange={handleChange}
      />

      <TextField
        label="Portfolio URL"
        name="portfolio"
        fullWidth
        margin="normal"
        value={form.portfolio}
        onChange={handleChange}
      />

      <TextField
        label="Availability"
        name="availability"
        fullWidth
        margin="normal"
        value={form.availability}
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

export default EmployeeProfile;
