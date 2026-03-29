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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import JobCard from "../components/JobCard";
import { useAuth } from "../context/AuthContext";
import { jobTypes } from "../data/jobTypes";
import { workModes } from "../data/workModes";
import { industries } from "../data/industries";
import { cities } from "../data/cities";

const JobList = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [profileComplete, setProfileComplete] = useState(true);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  const [companyDialogOpen, setCompanyDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterWorkMode, setFilterWorkMode] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterIndustry, setIndustry] = useState("");
  // Fetch jobs (public) + applied jobs (only employee)
  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const res = await api.get("/jobs");
        setJobs(res.data.jobs);

        if (user?.role === "EMPLOYEE") {
          const appliedRes = await api.get("/applications/me");
          const appliedJobIds = appliedRes.data.applications.map(
            (a) => a.jobId,
          );
          setAppliedJobs(appliedJobIds);

          //  check profile completeness
          const profileRes = await api.get("/profile/employee/me");

          const { resume, skills } = profileRes.data;

          if (!resume || !skills) {
            setProfileComplete(false);
          } else {
            setProfileComplete(true);
          }
        } else {
          setAppliedJobs([]); // reset if not employee
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingData(false);
      }
    };

    if (!loading) {
      fetchData();
    }
  }, [user, loading]);

  const handleApplyClick = (jobId) => {
    // Not logged in → go to login
    if (!user) {
      navigate("/login");
      return;
    }

    // Logged in but not employee
    if (user.role !== "EMPLOYEE") return;
    //  Profile incomplete stop here
    if (!profileComplete) {
      setProfileDialogOpen(true);
      return;
    }

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
      setAppliedJobs((prev) => [...prev, selectedJobId]);
      handleCloseDialog();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  if (loading || loadingData) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
        <Typography mt={2}>Loading...</Typography>
      </Container>
    );
  }

  const handleViewCompany = (job) => {
    setSelectedCompany(job.recruiter || null);
    setCompanyDialogOpen(true);
  };
  const formatUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `https://${url}`;
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" mb={3}>
        Job Listings
      </Typography>
      <Box mb={3} display="flex" gap={2} flexWrap="wrap">
        {/* Search */}
        <TextField
          label="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Job Type */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Job Type</InputLabel>
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {jobTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Job industry */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Job Industry</InputLabel>
          <Select
            value={filterIndustry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {industries.map((industry) => (
              <MenuItem key={industry} value={industry}>
                {industry}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Work Mode */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Work Mode</InputLabel>
          <Select
            value={filterWorkMode}
            onChange={(e) => setFilterWorkMode(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {workModes.map((mode) => (
              <MenuItem key={mode} value={mode}>
                {mode}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* City */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>City</InputLabel>
          {/* <Select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Addis Ababa">Addis Ababa</MenuItem>
          </Select> */}
          <Select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {cities.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* {jobs.map((job) => { */}
      {jobs
        .filter((job) => {
          return (
            job.title.toLowerCase().includes(search.toLowerCase()) &&
            (filterType ? job.jobType === filterType : true) &&
            (filterWorkMode ? job.workMode === filterWorkMode : true) &&
            (filterCity ? job.city === filterCity : true) &&
            (filterIndustry ? job.jobIndustry === filterIndustry : true)
          );
        })
        .map((job) => {
          const alreadyApplied =
            user?.role === "EMPLOYEE" && appliedJobs.includes(job.id);

          return (
            <JobCard
              key={job.id}
              job={job}
              onApply={alreadyApplied ? null : () => handleApplyClick(job.id)}
              isApplied={alreadyApplied}
              showApplyButton={
                user?.role !== "RECRUITER" && user?.role !== "ADMIN"
              }
              onViewCompany={() => handleViewCompany(job)}
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

      {/* Profile Incomplete Dialog */}
      <Dialog
        open={profileDialogOpen}
        onClose={() => setProfileDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Profile Incomplete
          <Button onClick={() => setProfileDialogOpen(false)}>✕</Button>
        </DialogTitle>

        <DialogContent>
          <Typography>
            Please complete your profile (resume and skills) before applying for
            jobs.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setProfileDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setProfileDialogOpen(false);
              navigate("/profile");
            }}
          >
            Go to Profile
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={companyDialogOpen}
        onClose={() => setCompanyDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Company Profile
          <Button onClick={() => setCompanyDialogOpen(false)}>✕</Button>
        </DialogTitle>

        <DialogContent>
          {selectedCompany ? (
            <>
              <Typography variant="h6" mb={1}>
                {selectedCompany.companyName}
              </Typography>

              {selectedCompany.companyWebsite && (
                <Typography mb={1}>
                  Website:{" "}
                  <a
                    // href={selectedCompany.companyWebsite}
                    href={formatUrl(selectedCompany.companyWebsite)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {selectedCompany.companyWebsite}
                  </a>
                </Typography>
              )}

              <Typography>{selectedCompany.companyDescription}</Typography>
            </>
          ) : (
            <Typography>No company information available.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default JobList;
