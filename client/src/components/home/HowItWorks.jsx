import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Skeleton,
  Stack,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { motion as Motion } from "framer-motion";

const steps = [
  {
    title: "Create your profile",
    text: "Set your skills, role interests, and preferences in minutes.",
    icon: PersonAddAlt1Icon,
  },
  {
    title: "Discover best-fit roles",
    text: "Use smart search and filters to shortlist the right opportunities.",
    icon: TravelExploreIcon,
  },
  {
    title: "Apply and get hired",
    text: "Track applications, connect with recruiters, and land interviews.",
    icon: TaskAltIcon,
  },
];

const HowItWorks = ({ loading = false }) => {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" textAlign="center" mb={1}>
        How It Works
      </Typography>
      <Typography variant="body1" textAlign="center" color="text.secondary" mb={4}>
        A simple 3-step flow to accelerate your hiring journey.
      </Typography>

      <Grid container spacing={2.5}>
        {steps.map((step, index) => (
          <Grid item xs={12} md={4} key={step.title}>
            <Motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
            >
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  {loading ? (
                    <Stack spacing={1}>
                      <Skeleton variant="circular" width={44} height={44} />
                      <Skeleton width="75%" />
                      <Skeleton width="90%" />
                    </Stack>
                  ) : (
                    <Stack spacing={1.2}>
                      <Box
                        sx={(theme) => ({
                          width: 44,
                          height: 44,
                          borderRadius: 2,
                          display: "grid",
                          placeItems: "center",
                          backgroundColor: theme.palette.action.hover,
                        })}
                      >
                        <step.icon color="primary" />
                      </Box>
                      <Typography variant="h6">{step.title}</Typography>
                      <Typography color="text.secondary">{step.text}</Typography>
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWorks;
