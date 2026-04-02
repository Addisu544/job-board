import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Stack,
  Autocomplete,
} from "@mui/material";
import { jobTypes } from "../../data/jobTypes";
import { workModes } from "../../data/workModes";
import { industries } from "../../data/industries";
import { experienceLevels } from "../../data/experienceLevels";
import { skillsList } from "../../data/skills";
import { cities } from "../../data/cities";
import { countries } from "../../data/countries";
import api from "../../services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CreateJob = () => {
  // const [form, setForm] = useState({
  //   title: "",
  //   description: "",
  //   location: "",
  //   jobType: "",
  // });
  const initialForm = {
    title: "",
    description: "",
    city: "",
    country: "",
    jobType: "",
    workMode: "",
    skillsRequired: [],
    experienceLevel: "",
    jobIndustry: "",
  };
  const [form, setForm] = useState(initialForm);

  const [companyProfileComplete, setCompanyProfileComplete] = useState(true);

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const res = await api.get("/profile/recruiter/me");
        const { companyName, companyDescription } = res.data;

        if (!companyName || !companyDescription) {
          setCompanyProfileComplete(false);
        }
      } catch (err) {
        console.error(err);
      } finally {
        // no-op: keep UI simple without additional loading state
      }
    };

    fetchCompanyProfile();
  }, []);

  const steps = ["Job Details", "Requirements", "Preview"];
  const [activeStep, setActiveStep] = useState(0);
  const draftKey = "recruiter-job-draft-v1";
  const [showDraftNotice, setShowDraftNotice] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!parsed) return;
      setForm((prev) => ({
        ...prev,
        ...parsed,
        skillsRequired: Array.isArray(parsed.skillsRequired)
          ? parsed.skillsRequired
          : [],
      }));
      setShowDraftNotice(true);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    // Auto-save draft locally (no API changes).
    const descText = (form.description || "")
      .replace(/<[^>]*>/g, "")
      .trim();
    const isMeaningfulDraft = Boolean(
      form.title?.trim() ||
        descText ||
        form.city ||
        form.country ||
        form.jobType ||
        form.workMode ||
        form.jobIndustry ||
        (form.skillsRequired?.length || 0) > 0,
    );

    if (!isMeaningfulDraft) return;
    const t = window.setTimeout(() => {
      localStorage.setItem(draftKey, JSON.stringify(form));
    }, 550);
    return () => window.clearTimeout(t);
  }, [form]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      skillsRequired: form.skillsRequired.join(","), // ✅ IMPORTANT
    };
    await api.post("/jobs", payload);
    alert("Job created successfully");
    setForm(initialForm);
    localStorage.removeItem(draftKey);
    setShowDraftNotice(false);
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 920, mx: "auto" }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h4" fontWeight={900} mb={0.5}>
            Create Job
          </Typography>
          <Typography variant="body2" color="text.secondary">
            A fast, guided flow for enterprise-quality job posts.
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ pt: 1 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {!companyProfileComplete && (
          <Alert severity="warning">
            You must complete your company profile (company name and description)
            before creating a job.
          </Alert>
        )}

        {showDraftNotice && (
          <Alert severity="info">
            Draft loaded. Changes will auto-save locally.
          </Alert>
        )}

        <Divider />

        <form
          onSubmit={(e) => {
            if (activeStep !== 2) {
              e.preventDefault();
              return;
            }
            handleSubmit(e);
          }}
        >
          {activeStep === 0 && (
            <Stack spacing={2}>
              <TextField
                name="title"
                label="Job Title"
                fullWidth
                onChange={handleChange}
                disabled={!companyProfileComplete}
              />

              <Box>
                <Typography variant="body2" fontWeight={900} mb={0.5}>
                  Description (Rich text)
                </Typography>
                <ReactQuill
                  theme="snow"
                  value={form.description}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, description: value }))
                  }
                  readOnly={!companyProfileComplete}
                />
              </Box>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    disabled={!companyProfileComplete}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <Select
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    disabled={!companyProfileComplete}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Job Type</InputLabel>
                  <Select
                    name="jobType"
                    value={form.jobType}
                    onChange={handleChange}
                    disabled={!companyProfileComplete}
                  >
                    {jobTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Work Mode</InputLabel>
                  <Select
                    name="workMode"
                    value={form.workMode}
                    onChange={handleChange}
                    disabled={!companyProfileComplete}
                  >
                    {workModes.map((mode) => (
                      <MenuItem key={mode} value={mode}>
                        {mode}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <FormControl fullWidth>
                <InputLabel>Job Industry</InputLabel>
                <Select
                  name="jobIndustry"
                  value={form.jobIndustry}
                  onChange={handleChange}
                  disabled={!companyProfileComplete}
                >
                  {industries.map((industry) => (
                    <MenuItem key={industry} value={industry}>
                      {industry}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Stack direction="row" justifyContent="space-between" mt={1}>
                <Button variant="outlined" disabled>
                  Back
                </Button>
                <Button
                  variant="contained"
                  disabled={!companyProfileComplete}
                  onClick={() => setActiveStep(1)}
                >
                  Next
                </Button>
              </Stack>
            </Stack>
          )}

          {activeStep === 1 && (
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Experience Level</InputLabel>
                <Select
                  name="experienceLevel"
                  value={form.experienceLevel}
                  onChange={handleChange}
                  disabled={!companyProfileComplete}
                >
                  {experienceLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Autocomplete
                multiple
                options={skillsList}
                value={form.skillsRequired}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                onChange={(_, newValue) => {
                  setForm((prev) => ({
                    ...prev,
                    skillsRequired: newValue.slice(0, 5),
                  }));
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Skills Required (max 5)" />
                )}
              />

              <Stack direction="row" justifyContent="space-between" mt={1}>
                <Button variant="outlined" onClick={() => setActiveStep(0)}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  disabled={!companyProfileComplete}
                  onClick={() => setActiveStep(2)}
                >
                  Next
                </Button>
              </Stack>
            </Stack>
          )}

          {activeStep === 2 && (
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight={900}>
                Preview
              </Typography>

              <Box
                sx={(theme) => ({
                  borderRadius: 4,
                  border: `1px solid ${theme.palette.divider}`,
                  p: 2,
                  background: theme.palette.background.paper,
                })}
              >
                <Typography variant="h6" fontWeight={900}>
                  {form.title || "Job title"}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  {form.city && form.country
                    ? `${form.city}, ${form.country}`
                    : "Location not set"}{" "}
                  · {form.jobType || "Job type"} · {form.workMode || "Work mode"}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Industry: {form.jobIndustry || "Not set"}
                </Typography>

                <Typography variant="subtitle2" fontWeight={900} mt={2}>
                  Description
                </Typography>
                <Box
                  sx={{ mt: 0.5 }}
                  dangerouslySetInnerHTML={{
                    __html: form.description || "<p></p>",
                  }}
                />

                <Typography variant="subtitle2" fontWeight={900} mt={2}>
                  Requirements
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Experience: {form.experienceLevel || "Not set"}
                </Typography>

                <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                  {form.skillsRequired.map((s) => (
                    <Chip key={s} label={s} size="small" />
                  ))}
                </Stack>
              </Box>

              <Stack direction="row" justifyContent="space-between" mt={1}>
                <Button variant="outlined" onClick={() => setActiveStep(1)}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!companyProfileComplete}
                >
                  Create Job
                </Button>
              </Stack>
            </Stack>
          )}
        </form>
      </Stack>
    </Box>
  );
};

export default CreateJob;
