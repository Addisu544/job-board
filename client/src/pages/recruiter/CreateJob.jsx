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
} from "@mui/material";
import { jobTypes } from "../../data/jobTypes";
import { workModes } from "../../data/workModes";
import { industries } from "../../data/industries";
import { experienceLevels } from "../../data/experienceLevels";
import { skillsList } from "../../data/skills";
import { cities } from "../../data/cities";
import { countries } from "../../data/countries";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
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
  const [loadingProfile, setLoadingProfile] = useState(true);
  const navigate = useNavigate();

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
        setLoadingProfile(false);
      }
    };

    fetchCompanyProfile();
  }, []);

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
  };

  const handleAddSkill = (skill) => {
    if (form.skillsRequired.length >= 5) return;
    if (!form.skillsRequired.includes(skill)) {
      setForm({
        ...form,
        skillsRequired: [...form.skillsRequired, skill],
      });
    }
  };

  const handleRemoveSkill = (skill) => {
    setForm({
      ...form,
      skillsRequired: form.skillsRequired.filter((s) => s !== skill),
    });
  };

  return (
    <Box maxWidth={500}>
      <Typography variant="h6" mb={2}>
        Create Job
      </Typography>
      {!companyProfileComplete && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          You must complete your company profile (company name and description)
          before creating a job.
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Title"
          fullWidth
          margin="normal"
          onChange={handleChange}
          disabled={!companyProfileComplete}
        />
        <TextField
          name="description"
          label="Description"
          fullWidth
          margin="normal"
          onChange={handleChange}
          disabled={!companyProfileComplete}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Country</InputLabel>
          <Select name="country" value={form.country} onChange={handleChange}>
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>City</InputLabel>
          <Select name="city" value={form.city} onChange={handleChange}>
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <TextField
          name="jobType"
          label="Job Type"
          fullWidth
          margin="normal"
          onChange={handleChange}
          disabled={!companyProfileComplete}
        /> */}

        <FormControl fullWidth margin="normal">
          <InputLabel>Job Type</InputLabel>
          <Select name="jobType" value={form.jobType} onChange={handleChange}>
            {jobTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Work Mode</InputLabel>
          <Select name="workMode" value={form.workMode} onChange={handleChange}>
            {workModes.map((mode) => (
              <MenuItem key={mode} value={mode}>
                {mode}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Job Industry</InputLabel>
          <Select
            name="jobIndustry"
            value={form.jobIndustry}
            onChange={handleChange}
          >
            {industries.map((industry) => (
              <MenuItem key={industry} value={industry}>
                {industry}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Experience Level</InputLabel>
          <Select
            name="experienceLevel"
            value={form.experienceLevel}
            onChange={handleChange}
          >
            {experienceLevels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Skills Required</InputLabel>
          <Select value="" onChange={(e) => handleAddSkill(e.target.value)}>
            {skillsList.map((skill) => (
              <MenuItem key={skill} value={skill}>
                {skill}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box mt={1}>
          {form.skillsRequired.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              onDelete={() => handleRemoveSkill(skill)}
              sx={{ m: 0.5 }}
            />
          ))}
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={!companyProfileComplete}
        >
          Create
        </Button>
      </form>
    </Box>
  );
};

export default CreateJob;
