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
  Chip,
  Stack,
  Paper,
  Divider,
  Snackbar,
  Alert,
  LinearProgress,
} from "@mui/material";
import { industries } from "../../data/industries";
import { companySizes } from "../../data/companySizes";
import { countries } from "../../data/countries";
import { cities } from "../../data/cities";
import api from "../../services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RecruiterProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

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
      setToast({
        open: true,
        message: "Company profile updated successfully.",
        severity: "success",
      });
    } catch (err) {
      console.error(err);
      setToast({
        open: true,
        message: "Failed to update company profile. Please try again.",
        severity: "error",
      });
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

  const completeness = Math.round(
    ([
      form.companyName,
      form.companyWebsite,
      form.companyDescription,
      form.industry,
      form.companySize,
      form.city,
      form.country,
      form.mission,
    ].filter(Boolean).length / 8) * 100,
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 5, pb: 6 }}>
      <Stack spacing={3}>
        <Paper
          variant="outlined"
          sx={(theme) => ({
            borderRadius: 4,
            overflow: "hidden",
            borderColor: theme.palette.divider,
          })}
        >
          <Box
            sx={(theme) => ({
              p: { xs: 2.5, md: 3 },
              background:
                theme.palette.mode === "light"
                  ? "linear-gradient(135deg, rgba(37,99,235,0.10), rgba(168,85,247,0.08))"
                  : "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(168,85,247,0.14))",
            })}
          >
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="flex-start">
              <Box>
                <Typography variant="h4" fontWeight={900} mb={0.5}>
                  {form.companyName || "Your company"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {form.companyWebsite ? `Website: ${form.companyWebsite}` : userInfo.email}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ ml: "auto" }}>
                {form.industry && <Chip label={form.industry} variant="outlined" />}
                {form.companySize && <Chip label={form.companySize} variant="outlined" />}
                {(form.city || form.country) && (
                  <Chip
                    label={`${form.city || ""}${form.city && form.country ? ", " : ""}${form.country || ""}`}
                    variant="outlined"
                  />
                )}
              </Stack>
            </Stack>

            <Box mt={2}>
              <Typography variant="body2" fontWeight={900} mb={0.5}>
                Profile completeness: {completeness}%
              </Typography>
              <LinearProgress variant="determinate" value={completeness} />
            </Box>
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ borderRadius: 4, p: { xs: 2, md: 3 } }}>
          <Typography variant="h6" fontWeight={900} mb={2}>
            Company Details
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Company Name"
              name="companyName"
              fullWidth
              value={form.companyName}
              onChange={handleChange}
            />

            <TextField
              label="Company Website"
              name="companyWebsite"
              fullWidth
              value={form.companyWebsite}
              onChange={handleChange}
            />

            <Box>
              <Typography variant="body2" fontWeight={900} mb={0.5}>
                Rich company description
              </Typography>
              <ReactQuill
                theme="snow"
                value={form.companyDescription}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, companyDescription: value }))
                }
              />
            </Box>

            <Divider />

            <FormControl fullWidth>
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

            <FormControl fullWidth>
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

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  name="country"
                  value={form.country}
                  label="Country"
                  onChange={handleChange}
                >
                  {countries.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>City</InputLabel>
                <Select
                  name="city"
                  value={form.city}
                  label="City"
                  onChange={handleChange}
                >
                  {cities.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <TextField
              label="Company Mission"
              name="mission"
              fullWidth
              multiline
              rows={3}
              value={form.mission}
              onChange={handleChange}
            />

            <Button
              variant="contained"
              sx={{ mt: 1 }}
              disabled={saving}
              onClick={handleSubmit}
            >
              {saving ? "Saving..." : "Save Profile"}
            </Button>
          </Stack>
        </Paper>
      </Stack>

      <Snackbar
        open={toast.open}
        autoHideDuration={4200}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RecruiterProfile;
