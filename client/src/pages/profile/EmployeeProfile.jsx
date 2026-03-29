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

  const handleAddSkill = (skill) => {
    if (form.skills.length >= 5) return;
    if (!form.skills.includes(skill)) {
      setForm({ ...form, skills: [...form.skills, skill] });
    }
  };

  const handleRemoveSkill = (skill) => {
    setForm({
      ...form,
      skills: form.skills.filter((s) => s !== skill),
    });
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

      alert("Profile updated successfully");
    } catch (err) {
      console.log(err);
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
      <Box>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setCvFile(e.target.files[0])}
        />
        {form.cvPath && (
          <Box mt={2}>
            <a
              href={`http://localhost:5000${form.cvPath}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Current CV
            </a>
          </Box>
        )}
      </Box>

      <FormControl fullWidth margin="normal">
        <InputLabel>Skills (max 5)</InputLabel>
        <Select
          value=""
          label="Skills (max 5)"
          onChange={(e) => handleAddSkill(e.target.value)}
        >
          {skillsList.map((skill) => (
            <MenuItem key={skill} value={skill}>
              {skill}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ mt: 1 }}>
        {form.skills.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            onDelete={() => handleRemoveSkill(skill)}
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>

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
