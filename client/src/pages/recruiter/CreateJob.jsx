import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import api from "../../services/api";

const CreateJob = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
  });

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

      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Title"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="Description"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="location"
          label="Location"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="jobType"
          label="Job Type"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Create
        </Button>
      </form>
    </Box>
  );
};

export default CreateJob;
