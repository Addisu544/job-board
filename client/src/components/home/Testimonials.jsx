import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  IconButton,
  Skeleton,
  alpha,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { motion as Motion } from "framer-motion";
import { useMemo, useState } from "react";

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Frontend Engineer",
    text: "HireHub matched me with product roles in under a week. The search experience is clean and fast.",
  },
  {
    name: "Nisha Kapoor",
    role: "Talent Partner",
    text: "As a recruiter, I filled two urgent positions in one hiring cycle. Candidate quality is excellent.",
  },
  {
    name: "Rahul S.",
    role: "Data Analyst",
    text: "I love how everything is organized: filters, profile, and one-click apply flow.",
  },
  {
    name: "Kavya Iyer",
    role: "HR Lead",
    text: "The platform feels modern and trustworthy. We consistently receive better-fit applicants.",
  },
];

const Testimonials = ({ loading = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = useMemo(() => testimonials[activeIndex], [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" textAlign="center" mb={1}>
        What Users Say
      </Typography>
      <Typography variant="body1" textAlign="center" color="text.secondary" mb={4}>
        Trusted by professionals and hiring teams worldwide.
      </Typography>

      <Motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
      >
        <Card
          sx={(theme) => ({
            borderRadius: 4,
            border: `1px solid ${alpha(theme.palette.divider, 0.35)}`,
            backdropFilter: "blur(10px)",
            backgroundColor: alpha(
              theme.palette.mode === "light" ? "#ffffff" : theme.palette.background.paper,
              0.65,
            ),
            boxShadow: theme.shadows[4],
          })}
        >
          <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
            {loading ? (
              <Stack spacing={1.2}>
                <Skeleton variant="rounded" height={90} />
                <Skeleton width="40%" />
              </Stack>
            ) : (
              <Stack spacing={2.5}>
                <Typography variant="h5" sx={{ lineHeight: 1.45 }}>
                  "{active.text}"
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1.2}>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    {active.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography fontWeight={700}>{active.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {active.role}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            )}
          </CardContent>
        </Card>
      </Motion.div>

      <Stack direction="row" justifyContent="center" spacing={1} mt={2}>
        <IconButton
          aria-label="Previous testimonial"
          onClick={handlePrev}
          disabled={loading}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton aria-label="Next testimonial" onClick={handleNext} disabled={loading}>
          <ChevronRightIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Testimonials;
