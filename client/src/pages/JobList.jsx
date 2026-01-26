import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import api from "../services/api";
import JobCard from "../components/JobCard";
import { useAuth } from "../context/AuthContext";

const JobList = () => {
  const { user, loading } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  // Fetch jobs + applied jobs
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoadingData(true);
      try {
        const res = await api.get("/jobs");
        setJobs(res.data.jobs);

        if (user.role === "EMPLOYEE") {
          const appliedRes = await api.get("/applications/me");
          const appliedJobIds = appliedRes.data.applications.map(
            (a) => a.jobId,
          );
          setAppliedJobs(appliedJobIds);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingData(false);
      }
    };

    if (!loading && user) {
      fetchData();
    }
  }, [user, loading]);

  const handleOpenDialog = (jobId) => {
    setSelectedJobId(jobId);
    setCoverLetter("");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJobId(null);
  };

  const handleSubmitApplication = async () => {
    if (!coverLetter) {
      alert("Please write a cover letter before applying.");
      return;
    }

    try {
      await api.post(`/jobs/${selectedJobId}/apply`, { coverLetter });
      setAppliedJobs((prev) => [...prev, selectedJobId]); // update state immediately
      handleCloseDialog();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  if (loading || loadingData || !user) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
        <Typography mt={2}>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" mb={3}>
        Job Listings
      </Typography>

      {jobs.map((job) => {
        const alreadyApplied = appliedJobs.includes(job.id);

        return (
          <JobCard
            key={job.id}
            job={job}
            onApply={
              user.role === "EMPLOYEE" && !alreadyApplied
                ? () => handleOpenDialog(job.id)
                : null
            }
            isApplied={alreadyApplied}
          />
        );
      })}

      {/* Cover Letter Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Submit Cover Letter</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            minRows={4}
            fullWidth
            label="Cover Letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Write your cover letter here..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitApplication}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JobList;
