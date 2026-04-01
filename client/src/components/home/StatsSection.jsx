import { Box, Typography, Grid, Paper, Skeleton, Stack } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import BoltIcon from "@mui/icons-material/Bolt";
import { motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { label: "Jobs Posted", value: 12000, icon: WorkOutlineIcon, suffix: "+" },
  { label: "Hiring Companies", value: 3200, icon: ApartmentIcon, suffix: "+" },
  { label: "Active Candidates", value: 54000, icon: GroupOutlinedIcon, suffix: "+" },
  { label: "Avg. Apply Time", value: 5, icon: BoltIcon, suffix: " min" },
];

const Counter = ({ end, suffix = "" }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frameId;
    let startTime;
    const duration = 950;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.floor(progress * end));
      if (progress < 1) frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [end]);

  return (
    <Typography variant="h3" fontWeight={700}>
      {value.toLocaleString()}
      {suffix}
    </Typography>
  );
};
 
const StatsSection = ({ loading = false }) => {
  return (
    <Box sx={{ px: { xs: 0, md: 1 } }}  >
      <Grid container spacing={2.5} justifyContent={"center"}  >
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  textAlign: "left",
                  height: "100%",
                }}
              >
                {loading ? (
                  <Stack spacing={1}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton width="70%" height={42} />
                    <Skeleton width="60%" />
                  </Stack>
                ) : (
                  <Stack spacing={1}>
                    <Box
                      sx={(theme) => ({
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: theme.palette.action.hover,
                      })}
                    >
                      <stat.icon color="primary" />
                    </Box>
                    <Counter end={stat.value} suffix={stat.suffix} />
                    <Typography color="text.secondary">{stat.label}</Typography>
                  </Stack>
                )}
              </Paper>
            </Motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsSection;
