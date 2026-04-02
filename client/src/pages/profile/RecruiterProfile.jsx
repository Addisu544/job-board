import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { industries } from "../../data/industries";
import { companySizes } from "../../data/companySizes";
import { countries } from "../../data/countries";
import { cities } from "../../data/cities";
import api from "../../services/api";

const RecruiterProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
  });

  // const [form, setForm] = useState({
  //   companyName: "",
  //   companyWebsite: "",
  //   companyDescription: "",
  // });

  const [form, setForm] = useState({
    companyName: "",
    companyWebsite: "",
    companyDescription: "",
    industry: "",
    companySize: "",
    city: "",
    country: "",
    mission: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/recruiter/me");

        setUserInfo({
          fullName: res.data.user.fullName,
          email: res.data.user.email,
        });

        // setForm({
        //   companyName: res.data.companyName || "",
        //   companyWebsite: res.data.companyWebsite || "",
        //   companyDescription: res.data.companyDescription || "",
        // });
        setForm({
          companyName: res.data.companyName || "",
          companyWebsite: res.data.companyWebsite || "",
          companyDescription: res.data.companyDescription || "",
          industry: res.data.industry || "",
          companySize: res.data.companySize || "",
          city: res.data.city || "",
          country: res.data.country || "",
          mission: res.data.mission || "",
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
      console.error(err);
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

      <FormControl fullWidth margin="normal">
        <InputLabel>Industry</InputLabel>
        <Select
          name="industry"
          value={form.industry}
          label="Industry"
          onChange={handleChange}
        >
          {industries.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Company Size</InputLabel>
        <Select
          name="companySize"
          value={form.companySize}
          label="Company Size"
          onChange={handleChange}
        >
          {companySizes.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Company Size</InputLabel>
        <Select
          name="companySize"
          value={form.companySize}
          label="Company Size"
          onChange={handleChange}
        >
          {companySizes.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Country</InputLabel>
        <Select name="country" value={form.country} onChange={handleChange}>
          {countries.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>City</InputLabel>
        <Select name="city" value={form.city} onChange={handleChange}>
          {cities.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Company Mission"
        name="mission"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        value={form.mission}
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
