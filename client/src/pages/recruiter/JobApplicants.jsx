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

  // ✅ update application status locally
  const handleStatusChange = (applicationId, newStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus } : app,
      ),
    );
  };

  return (
    <>
      <Typography variant="h6" mb={2}>
        Applicants
      </Typography>

      {applications.map((app) => (
        <ApplicantCard
          key={app.id}
          application={app}
          jobId={jobId}
          onStatusChange={handleStatusChange}
        />
      ))}
    </>
  );
};

export default JobApplicants;
