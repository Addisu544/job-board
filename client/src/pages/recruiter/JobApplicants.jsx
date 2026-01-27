import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import api from "../../services/api";
import ApplicantCard from "../../components/ApplicantCard";

const JobApplicants = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get(`/jobs/${jobId}/applications`).then((res) => {
      setApplications(res.data.applications);
    });
  }, [jobId]);

  return (
    <>
      <Typography variant="h6" mb={2}>
        Applicants
      </Typography>

      {applications.map((app) => (
        <ApplicantCard key={app.id} application={app} />
      ))}
    </>
  );
};

export default JobApplicants;
