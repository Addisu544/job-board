import { useEffect, useMemo, useRef, useState } from "react";
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
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  Snackbar,
  Stack,
  Paper,
  Autocomplete,
  Alert,
} from "@mui/material";
import api from "../../services/api";
import { skillsList } from "../../data/skills";
import { languagesList } from "../../data/languages";
import { educationLevels } from "../../data/educationLevel";

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
    skills: [],
    languages: [],
    experience: "",
    education: "",
    level: "",
    linkedin: "",
    telegram: "",
    github: "",
    portfolio: "",
    availability: "",
    cvPath: "",
  });
  const [cvFile, setCvFile] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
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
          // skills: res.data.skills || "",
          // languages: res.data.languages || "",
          skills: res.data.skills
            ? res.data.skills.split(",").filter(Boolean)
            : [],

          languages: res.data.languages
            ? res.data.languages.split(",").filter(Boolean)
            : [],
          experience: res.data.experience || "",
          education: res.data.education || "",
          level: res.data.level || "",
          linkedin: res.data.linkedin || "",
          telegram: res.data.telegram || "",
          github: res.data.github || "",
          portfolio: res.data.portfolio || "",
          availability: res.data.availability || "",
          cvPath: res.data.cvPath || "",
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

  const handleAddLanguage = (lang) => {
    if (!form.languages.includes(lang)) {
      setForm({ ...form, languages: [...form.languages, lang] });
    }
  };

  const handleRemoveLanguage = (lang) => {
    setForm({
      ...form,
      languages: form.languages.filter((l) => l !== lang),
    });
  };

  // const handleSubmit = async () => {
  //   try {
  //     setSaving(true);
  //     await api.put("/profile/employee/me", form);
  //     alert("Profile updated successfully");
  //   } catch (err) {
  //     alert("Failed to update profile");
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  // const handleSubmit = async () => {
  //   try {
  //     setSaving(true);

  //     const formData = new FormData();

  //     // append text fields
  //     Object.keys(form).forEach((key) => {
  //       formData.append(key, form[key]);
  //     });

  //     // append file
  //     if (cvFile) {
  //       formData.append("cv", cvFile);
  //     }

  //     await api.put("/profile/employee/me", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     alert("Profile updated successfully");
  //   } catch (err) {
  //     alert("Failed to update profile");
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      setSaving(true);

      const formData = new FormData();

      const payload = {
        ...form,
        skills: form.skills.join(","), //  convert
        languages: form.languages.join(","), //convert
      };

      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });

      if (cvFile) {
        formData.append("cv", cvFile);
      }

      await api.put("/profile/employee/me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setToast({
        open: true,
        message: "Profile updated successfully.",
        severity: "success",
      });
    } catch (err) {
      console.log(err);
      setToast({
        open: true,
        message: "Failed to update profile. Please try again.",
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const completeness = useMemo(() => {
    const total = 6;
    const filled = [
      Boolean(form.title?.trim()),
      Boolean(form.bio?.trim()),
      form.skills?.length > 0,
      Boolean(form.experience?.trim()),
      Boolean(form.education?.trim()),
      Boolean(cvFile || form.cvPath),
    ].filter(Boolean).length;

    return Math.round((filled / total) * 100);
  }, [cvFile, form.bio, form.education, form.experience, form.cvPath, form.skills, form.title]);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleCvFile = (file) => {
    if (!file) return;
    // Backend currently expects a CV upload under `cv` (multipart). Keep PDF-only UX.
    if (file.type !== "application/pdf") {
      setToast({
        open: true,
        message: "Please upload a PDF CV.",
        severity: "error",
      });
      return;
    }
    setCvFile(file);
  };

  const handleCvDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer?.files?.[0];
    handleCvFile(file);
  };

  const handleCvDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleCvDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  if (loading) {
    return (
      <Box mt={5} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box mb={3}>
        <Typography variant="h4" mb={1}>
          {userInfo.fullName}
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          {userInfo.email}
        </Typography>

        <Typography variant="body2" fontWeight={800} mb={1}>
          Profile completeness: {completeness}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={completeness}
          sx={{ height: 10, borderRadius: 999 }}
        />

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 2 }}>
          <Step>
            <StepLabel>Personal info</StepLabel>
          </Step>
          <Step>
            <StepLabel>Skills & experience</StepLabel>
          </Step>
        </Stepper>
      </Box>

      {activeStep === 0 && (
        <Box>
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

          <Paper
            variant="outlined"
            onDrop={handleCvDrop}
            onDragOver={handleCvDragOver}
            onDragLeave={handleCvDragLeave}
            onClick={openFilePicker}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openFilePicker();
            }}
            sx={(theme) => ({
              mt: 2.5,
              p: 2.5,
              borderRadius: 4,
              borderStyle: "dashed",
              borderWidth: 2,
              borderColor: dragActive
                ? "primary.main"
                : theme.palette.divider,
              cursor: "pointer",
              userSelect: "none",
              backgroundColor: theme.palette.action.hover,
              transition: "border-color 160ms ease, background-color 160ms ease",
            })}
            aria-label="Upload CV (PDF) via drag and drop"
          >
            <Typography variant="subtitle1" fontWeight={900}>
              Drag & drop your CV (PDF)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Or click to browse.
            </Typography>

            {cvFile ? (
              <Typography mt={1} variant="body2">
                Selected: {cvFile.name}
              </Typography>
            ) : null}

            {form.cvPath ? (
              <Box mt={1.5}>
                <a
                  href={`http://localhost:5000${form.cvPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Current CV
                </a>
              </Box>
            ) : null}

            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              hidden
              onChange={(e) => handleCvFile(e.target.files?.[0])}
            />
          </Paper>

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
        </Box>
      )}

      {activeStep === 1 && (
        <Box>
          <Autocomplete
            multiple
            options={skillsList}
            value={form.skills}
            disableCloseOnSelect
            onChange={(_, newValue) => {
              setForm((prev) => ({
                ...prev,
                skills: newValue.slice(0, 5),
              }));
            }}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Skills (max 5)"
                margin="normal"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  size="small"
                  {...getTagProps({ index })}
                  key={option}
                  sx={{ m: 0.5 }}
                />
              ))
            }
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Languages</InputLabel>
            <Select
              value=""
              label="Languages"
              onChange={(e) => handleAddLanguage(e.target.value)}
            >
              {languagesList.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mt: 1 }}>
            {form.languages.map((lang) => (
              <Chip
                key={lang}
                label={lang}
                onDelete={() => handleRemoveLanguage(lang)}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>

          <TextField
            label="Brief explanation of your Experience"
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

          <FormControl fullWidth margin="normal">
            <InputLabel>Education Level</InputLabel>
            <Select
              name="level"
              value={form.level}
              label="Education Level"
              onChange={handleChange}
            >
              {educationLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        sx={{ mt: 3 }}
      >
        <Button
          variant="outlined"
          disabled={activeStep === 0 || saving}
          onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
        >
          Back
        </Button>

        {activeStep === 0 ? (
          <Button
            variant="contained"
            onClick={() => setActiveStep(1)}
            disabled={saving}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Profile"}
          </Button>
        )}
      </Stack>

      <Snackbar
        open={toast.open}
        autoHideDuration={4500}
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

export default EmployeeProfile;
