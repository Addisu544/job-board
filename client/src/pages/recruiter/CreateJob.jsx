import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
const CreateJob = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
  });
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
    await api.post("/jobs", form);
    alert("Job created successfully");
    setForm({ title: "", description: "", location: "", jobType: "" });
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
        <TextField
          name="location"
          label="Location"
          fullWidth
          margin="normal"
          onChange={handleChange}
          disabled={!companyProfileComplete}
        />
        <TextField
          name="jobType"
          label="Job Type"
          fullWidth
          margin="normal"
          onChange={handleChange}
          disabled={!companyProfileComplete}
        />

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
