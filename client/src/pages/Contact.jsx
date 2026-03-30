import { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully (demo)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Container sx={{ py: 6 }} maxWidth="sm">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Contact Us
      </Typography>

      <Typography mb={3}>
        Have questions or need help? Reach out to our team.
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="name"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={handleChange}
          required
        />

        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={handleChange}
          required
        />

        <TextField
          label="Message"
          name="message"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={form.message}
          onChange={handleChange}
          required
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Send Message
        </Button>
      </form>

      <Box mt={4}>
        <Typography>Email: support@hirehub.com</Typography>
        <Typography>Phone: +251 900 000 000</Typography>
        <Typography>Location: Addis Ababa, Ethiopia</Typography>
      </Box>
    </Container>
  );
};

export default Contact;
