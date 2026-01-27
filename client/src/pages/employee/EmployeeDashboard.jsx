import { useEffect, useState } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import api from "../../services/api";
import AppliedJobCard from "../../components/AppliedJobCard";
import { useAuth } from "../../context/AuthContext";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await api.get("/applications/me");
      setApplications(res.data.applications);
    } catch (err) {
      console.error("Failed to load applications", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" mb={3}>
        My Applications
      </Typography>

      {applications.length === 0 ? (
        <Typography>No applications yet.</Typography>
      ) : (
        applications.map((app) => (
          <AppliedJobCard key={app.id} application={app} />
        ))
      )}
    </Container>
  );
};

export default EmployeeDashboard;
