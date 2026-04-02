// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Typography } from "@mui/material";
// import api from "../../services/api";
// import ApplicantCard from "../../components/ApplicantCard";

// const JobApplicants = () => {
//   const { jobId } = useParams();
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     api.get(`/jobs/${jobId}/applications`).then((res) => {
//       setApplications(res.data.applications);
//     });
//   }, [jobId]);

//   return (
//     <>
//       <Typography variant="h6" mb={2}>
//         Applicants
//       </Typography>

//       {applications.map((app) => (
//         <ApplicantCard key={app.id} application={app} />
//       ))}
//     </>
//   );
// };

// export default JobApplicants;

import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import api from "../../services/api";
import ApplicantCard from "../../components/ApplicantCard";

const STATUS_OPTIONS = ["PENDING", "SHORTLISTED", "PASSED", "DECLINED"];

const JobApplicants = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // UX-only filtering/sorting
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortDir, setSortDir] = useState("desc");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/jobs/${jobId}/applications`);
        if (!mounted) return;
        setApplications(res.data.applications || []);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [jobId]);

  const handleStatusChange = (applicationId, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === applicationId ? { ...app, status: newStatus } : app)),
    );
  };

  const visibleApplications = useMemo(() => {
    const q = search.trim().toLowerCase();

    const filtered = applications.filter((app) => {
      const name = app?.employee?.user?.fullName || "";
      const matchesSearch = !q || name.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    const sorted = [...filtered].sort((a, b) => {
      const aTime = a?.appliedAt ? new Date(a.appliedAt).getTime() : 0;
      const bTime = b?.appliedAt ? new Date(b.appliedAt).getTime() : 0;
      return sortDir === "desc" ? bTime - aTime : aTime - bTime;
    });

    return sorted;
  }, [applications, search, statusFilter, sortDir]);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 } }}>
      <Stack spacing={2} mb={2}>
        <Typography variant="h4" fontWeight={900}>
          Job Applicants
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review candidates, update status, and preview CVs.
        </Typography>

        <Paper variant="outlined" sx={{ p: 1.5 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1.5}
            alignItems="center"
            justifyContent="space-between"
          >
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              size="small"
              InputProps={{
                startAdornment: (
                  <Box sx={{ display: "flex", alignItems: "center", mr: 0.5 }}>
                    <SearchIcon fontSize="small" />
                  </Box>
                ),
              }}
              sx={{ minWidth: 280 }}
            />

            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="ALL">All</MenuItem>
                  {STATUS_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Chip
                label={`Showing: ${visibleApplications.length}`}
                color="primary"
                variant="outlined"
              />

              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel id="sort-label">Sort</InputLabel>
                <Select
                  labelId="sort-label"
                  value={sortDir}
                  label="Sort"
                  onChange={(e) => setSortDir(e.target.value)}
                >
                  <MenuItem value="desc">Newest</MenuItem>
                  <MenuItem value="asc">Oldest</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Paper>
      </Stack>

      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 4 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 900 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 900, width: 220 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 900, width: 340 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <TableRow key={`sk-${idx}`}>
                  <TableCell colSpan={3}>
                    <Skeleton variant="rounded" height={76} />
                  </TableCell>
                </TableRow>
              ))
            ) : visibleApplications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                    No applicants found for your filters.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              visibleApplications.map((app) => (
                <ApplicantCard
                  key={app.id}
                  application={app}
                  jobId={jobId}
                  onStatusChange={handleStatusChange}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default JobApplicants;
