import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import api from "../../services/api";
import JobCardRecruiter from "../../components/JobCardRecruiter";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs/me").then((res) => {
      setJobs(res.data.jobs);
    });
  }, []);

  return (
    <>
      <Typography variant="h6" mb={2}>
        My Jobs
      </Typography>

      {jobs.map((job) => (
        <JobCardRecruiter key={job.id} job={job} />
      ))}
    </>
  );
};

export default MyJobs;
