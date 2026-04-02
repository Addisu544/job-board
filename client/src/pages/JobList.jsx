import { useEffect, useMemo, useRef, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
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
  Paper,
  Checkbox,
  ListItemText,
  Divider,
  Slider,
  Switch,
  FormControlLabel,
  Skeleton,
  Grid,
  Drawer,
  Stack,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ViewModuleOutlinedIcon from "@mui/icons-material/ViewModuleOutlined";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import api from "../services/api";
import JobCard from "../components/JobCard";
import { useAuth } from "../context/AuthContext";
import { jobTypes } from "../data/jobTypes";
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
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Enterprise filters (UI only for public jobs).
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [salaryMin, setSalaryMin] = useState(0);

  // Results UX
  const [viewMode, setViewMode] = useState("grid");
  const pageSize = 10;
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const sentinelRef = useRef(null);
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

  // Debounce search for a smoother enterprise-like filtering experience.
  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedSearch(search), 350);
    return () => window.clearTimeout(t);
  }, [search]);

  const hasAnySalary = useMemo(
    () =>
      jobs.some((j) => typeof j.salary === "number" && Number.isFinite(j.salary)),
    [jobs],
  );

  const salaryMax = useMemo(() => {
    const values = jobs
      .map((j) => (typeof j.salary === "number" ? j.salary : null))
      .filter((v) => typeof v === "number" && Number.isFinite(v));

    if (!values.length) return 200000;
    return Math.max(...values, 200000);
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();

    return jobs.filter((job) => {
      const haystack = [
        job.title,
        job.description,
        job.jobIndustry,
        job.city,
        job.country,
        job.skillsRequired,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !q || haystack.includes(q);
      const matchesJobTypes =
        selectedJobTypes.length === 0 ||
        selectedJobTypes.includes(job.jobType);
      const matchesIndustries =
        selectedIndustries.length === 0 ||
        selectedIndustries.includes(job.jobIndustry);
      const matchesLocations =
        selectedLocations.length === 0 ||
        selectedLocations.includes(job.city);
      const matchesRemote =
        !remoteOnly || (job.workMode || "").toLowerCase() === "remote";

      const jobSalary = typeof job.salary === "number" ? job.salary : null;
      const matchesSalary =
        !hasAnySalary ||
        salaryMin === 0 ||
        jobSalary == null ||
        jobSalary >= salaryMin;

      return (
        matchesSearch &&
        matchesJobTypes &&
        matchesIndustries &&
        matchesLocations &&
        matchesRemote &&
        matchesSalary
      );
    });
  }, [
    debouncedSearch,
    jobs,
    hasAnySalary,
    salaryMin,
    remoteOnly,
    selectedIndustries,
    selectedJobTypes,
    selectedLocations,
  ]);

  const visibleJobs = useMemo(
    () => filteredJobs.slice(0, visibleCount),
    [filteredJobs, visibleCount],
  );

  const canFetchMore = visibleCount < filteredJobs.length;

  // Reset pagination when any filter changes.
  useEffect(() => {
    setVisibleCount(pageSize);
    setIsFetchingMore(false);
  }, [
    debouncedSearch,
    remoteOnly,
    salaryMin,
    selectedIndustries,
    selectedJobTypes,
    selectedLocations,
    pageSize,
  ]);

  // Infinite scroll (UI-only): we reveal more results from the already-fetched dataset.
  useEffect(() => {
    if (!sentinelRef.current) return;
    if (!canFetchMore || isFetchingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        if (!canFetchMore) return;

        setIsFetchingMore(true);
        window.setTimeout(() => {
          setVisibleCount((v) =>
            Math.min(v + pageSize, filteredJobs.length),
          );
          setIsFetchingMore(false);
        }, 450);
      },
      { rootMargin: "500px" },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [canFetchMore, filteredJobs.length, isFetchingMore, pageSize, visibleCount]);

  const clearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setSelectedJobTypes([]);
    setSelectedIndustries([]);
    setSelectedLocations([]);
    setRemoteOnly(false);
    setSalaryMin(0);
    setVisibleCount(pageSize);
    setIsFetchingMore(false);
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
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={900}>
            Job Search
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filteredJobs.length.toLocaleString()} matching roles
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            sx={{ display: { xs: "inline-flex", md: "none" } }}
            onClick={() => setMobileFiltersOpen(true)}
            aria-label="Open filters"
          >
            <TuneIcon />
          </IconButton>

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, value) => {
              if (value) setViewMode(value);
            }}
            aria-label="Job results view"
          >
            <ToggleButton value="grid" aria-label="Grid view">
              <ViewModuleOutlinedIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="list" aria-label="List view">
              <ViewListOutlinedIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Box
        sx={{
          display: { xs: "block", md: "grid" },
          gridTemplateColumns: { md: "320px 1fr" },
          gap: 3,
        }}
      >
        {/* Desktop filters */}
        <Paper
          sx={{
            p: 2,
            display: { xs: "none", md: "block" },
            position: "sticky",
            top: 88,
            alignSelf: "start",
          }}
        >
          <Typography variant="h6" fontWeight={900} mb={1.5}>
            Filters
          </Typography>

          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs, companies, skills..."
            label="Search"
            fullWidth
            size="small"
            InputProps={{ startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} /> }}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="jobTypes-label">Job Types</InputLabel>
            <Select
              labelId="jobTypes-label"
              multiple
              value={selectedJobTypes}
              label="Job Types"
              onChange={(e) => setSelectedJobTypes(e.target.value)}
              renderValue={(selected) =>
                selected.length ? `${selected.length} selected` : "All"
              }
            >
              {jobTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Checkbox checked={selectedJobTypes.indexOf(type) > -1} />
                    <ListItemText primary={type} />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="industries-label">Industries</InputLabel>
            <Select
              labelId="industries-label"
              multiple
              value={selectedIndustries}
              label="Industries"
              onChange={(e) => setSelectedIndustries(e.target.value)}
              renderValue={(selected) =>
                selected.length ? `${selected.length} selected` : "All"
              }
            >
              {industries.map((ind) => (
                <MenuItem key={ind} value={ind}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Checkbox checked={selectedIndustries.indexOf(ind) > -1} />
                    <ListItemText primary={ind} />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="locations-label">Locations</InputLabel>
            <Select
              labelId="locations-label"
              multiple
              value={selectedLocations}
              label="Locations"
              onChange={(e) => setSelectedLocations(e.target.value)}
              renderValue={(selected) =>
                selected.length ? `${selected.length} selected` : "All"
              }
            >
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Checkbox checked={selectedLocations.indexOf(city) > -1} />
                    <ListItemText primary={city} />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
              />
            }
            label="Remote only"
            sx={{ mb: 1 }}
          />

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight={800} mb={0.5}>
              Salary (min, optional)
            </Typography>
            <Slider
              value={salaryMin}
              min={0}
              max={salaryMax}
              step={5000}
              onChange={(_, v) => setSalaryMin(v)}
              disabled={!hasAnySalary}
              aria-label="Minimum salary filter"
            />
            {!hasAnySalary && (
              <Typography variant="caption" color="text.secondary">
                Salary data isn’t available yet (UI only).
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Button fullWidth variant="outlined" onClick={clearFilters}>
            Clear filters
          </Button>
        </Paper>

        {/* Results */}
        <Box>
          {filteredJobs.length === 0 ? (
            <Alert severity="info" sx={{ borderRadius: 3 }}>
              No jobs match your filters. Try clearing filters or adjusting search.
            </Alert>
          ) : viewMode === "grid" ? (
            <Grid container spacing={2}>
              {visibleJobs.map((job) => {
                const alreadyApplied =
                  user?.role === "EMPLOYEE" && appliedJobs.includes(job.id);
                return (
                  <Grid item xs={12} md={6} key={job.id}>
                    <JobCard
                      job={job}
                      onApply={
                        alreadyApplied ? null : () => handleApplyClick(job.id)
                      }
                      isApplied={alreadyApplied}
                      showApplyButton={
                        user?.role !== "RECRUITER" && user?.role !== "ADMIN"
                      }
                      onViewCompany={() => handleViewCompany(job)}
                    />
                  </Grid>
                );
              })}

              {isFetchingMore &&
                visibleJobs.length < filteredJobs.length &&
                Array.from({ length: 4 }).map((_, idx) => (
                  <Grid item xs={12} md={6} key={`sk-${idx}`}>
                    <Skeleton variant="rounded" height={210} />
                  </Grid>
                ))}
            </Grid>
          ) : (
            <Stack spacing={2}>
              {visibleJobs.map((job) => {
                const alreadyApplied =
                  user?.role === "EMPLOYEE" && appliedJobs.includes(job.id);
                return (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={
                      alreadyApplied ? null : () => handleApplyClick(job.id)
                    }
                    isApplied={alreadyApplied}
                    showApplyButton={
                      user?.role !== "RECRUITER" && user?.role !== "ADMIN"
                    }
                    onViewCompany={() => handleViewCompany(job)}
                  />
                );
              })}

              {isFetchingMore &&
                visibleJobs.length < filteredJobs.length &&
                Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton key={`sk-l-${idx}`} variant="rounded" height={220} />
                ))}
            </Stack>
          )}

          <Box ref={sentinelRef} sx={{ height: 1, mt: 2 }} aria-hidden="true" />
        </Box>
      </Box>

      {/* Mobile filter drawer */}
      <Drawer
        anchor="left"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      >
        <Box sx={{ width: 320, p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight={900}>
              Filters
            </Typography>
            <Button onClick={() => setMobileFiltersOpen(false)}>Done</Button>
          </Box>

          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs, companies, skills..."
            label="Search"
            fullWidth
            size="small"
            InputProps={{ startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} /> }}
            sx={{ mt: 2, mb: 2 }}
          />

          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="m-jobTypes-label">Job Types</InputLabel>
            <Select
              labelId="m-jobTypes-label"
              multiple
              value={selectedJobTypes}
              label="Job Types"
              onChange={(e) => setSelectedJobTypes(e.target.value)}
              renderValue={(selected) =>
                selected.length ? `${selected.length} selected` : "All"
              }
            >
              {jobTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Checkbox checked={selectedJobTypes.indexOf(type) > -1} />
                    <ListItemText primary={type} />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="m-industries-label">Industries</InputLabel>
            <Select
              labelId="m-industries-label"
              multiple
              value={selectedIndustries}
              label="Industries"
              onChange={(e) => setSelectedIndustries(e.target.value)}
              renderValue={(selected) =>
                selected.length ? `${selected.length} selected` : "All"
              }
            >
              {industries.map((ind) => (
                <MenuItem key={ind} value={ind}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Checkbox checked={selectedIndustries.indexOf(ind) > -1} />
                    <ListItemText primary={ind} />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="m-locations-label">Locations</InputLabel>
            <Select
              labelId="m-locations-label"
              multiple
              value={selectedLocations}
              label="Locations"
              onChange={(e) => setSelectedLocations(e.target.value)}
              renderValue={(selected) =>
                selected.length ? `${selected.length} selected` : "All"
              }
            >
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Checkbox checked={selectedLocations.indexOf(city) > -1} />
                    <ListItemText primary={city} />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
              />
            }
            label="Remote only"
            sx={{ mb: 1 }}
          />

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight={800} mb={0.5}>
              Salary (min, optional)
            </Typography>
            <Slider
              value={salaryMin}
              min={0}
              max={salaryMax}
              step={5000}
              onChange={(_, v) => setSalaryMin(v)}
              disabled={!hasAnySalary}
              aria-label="Minimum salary filter"
            />
          </Box>

          <Button fullWidth variant="outlined" onClick={clearFilters} sx={{ mb: 2 }}>
            Clear filters
          </Button>
        </Box>
      </Drawer>

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
              industry{" "}
              <Typography>industry: {selectedCompany.industry}</Typography>
              <Typography>
                company size: {selectedCompany.companySize}
              </Typography>
              <Typography>
                location:
                {selectedCompany.city},{selectedCompany.country}
              </Typography>
              <Typography>mission: {selectedCompany.mission}</Typography>
              <Typography>
                company description: {selectedCompany.companyDescription}
              </Typography>
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
