import { useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const statusMeta = (status) => {
  switch (status) {
    case "PENDING":
      return { chipLabel: "Pending", color: "info", dotTop: 6, timeline: "Applied" };
    case "SHORTLISTED":
      return {
        chipLabel: "Interview",
        color: "warning",
        dotTop: 34,
        timeline: "Interview scheduled",
      };
    case "PASSED":
      // Requirement asks status chips include Pending/Interview/Rejected.
      // For offers we still show "Interview" chip, but timeline indicates offer.
      return { chipLabel: "Interview", color: "success", dotTop: 62, timeline: "Offer ready" };
    case "DECLINED":
      return { chipLabel: "Rejected", color: "error", dotTop: 34, timeline: "Rejected" };
    default:
      return { chipLabel: status || "Unknown", color: "default", dotTop: 34, timeline: status || "Unknown" };
  }
};

const formatLocation = (job) => {
  const city = job?.city || "";
  const country = job?.country || "";
  if (!city && !country) return "Location not listed";
  return [city, country].filter(Boolean).join(", ");
};

const AppliedJobCard = ({ application }) => {
  const { job, status, appliedAt } = application;
  const meta = useMemo(() => statusMeta(status), [status]);

  return (
    <Card
      elevation={0}
      sx={(theme) => ({
        mb: 2,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        background:
          theme.palette.mode === "light"
            ? "rgba(255,255,255,0.7)"
            : "rgba(17,28,52,0.65)",
        backdropFilter: "blur(10px)",
        boxShadow: theme.shadows[1],
      })}
    >
      <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          {/* Timeline rail + status dot */}
          <Box
            aria-hidden="true"
            sx={{
              width: 40,
              minWidth: 40,
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 12,
                bottom: 10,
                width: 2,
                borderRadius: 999,
                backgroundColor: "divider",
                opacity: 0.9,
              }}
            />
            <Box
              sx={(theme) => ({
                position: "absolute",
                top: meta.dotTop,
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor:
                  theme.palette[meta.color]?.main || theme.palette.primary.main,
                boxShadow: `0 0 0 6px ${
                  theme.palette[meta.color]?.main
                    ? theme.palette[meta.color].main
                    : theme.palette.primary.main
                }22`,
              })}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              gap={2}
              flexWrap="wrap"
            >
              <Box sx={{ minWidth: 220, flex: 1 }}>
                <Stack direction="row" spacing={1.25} alignItems="center" flexWrap="wrap">
                  <Typography variant="h6" sx={{ fontWeight: 900 }}>
                    {job?.title || "Untitled role"}
                  </Typography>
                  <Chip size="small" label={meta.chipLabel} color={meta.color} />
                </Stack>

                <Stack direction="row" spacing={1.5} alignItems="center" mt={1} flexWrap="wrap">
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <PlaceOutlinedIcon fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {formatLocation(job)}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <WorkOutlineOutlinedIcon fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {job?.jobType || job?.workMode || "Role details not listed"}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

              <Stack direction="row" spacing={1} alignItems="center" sx={{ whiteSpace: "nowrap" }}>
                <FiberManualRecordIcon sx={{ fontSize: 10, color: "primary.main" }} />
                <Typography variant="body2" color="text.secondary">
                  {meta.timeline}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" mt={2}>
              <AccessTimeOutlinedIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                Applied {appliedAt ? new Date(appliedAt).toLocaleDateString() : "recently"}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AppliedJobCard;
