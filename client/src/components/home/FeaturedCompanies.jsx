import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Skeleton,
} from "@mui/material";
import { motion as Motion } from "framer-motion";

const companies = [
  { name: "Google", industry: "Tech" },
  { name: "Amazon", industry: "E-commerce" },
  { name: "Meta", industry: "Social Media" },
  { name: "Microsoft", industry: "Software" },
  { name: "Apple", industry: "Consumer Tech" },
  { name: "Tesla", industry: "Automotive" },
  { name: "Netflix", industry: "Streaming" },
  { name: "Uber", industry: "Transportation" },
  { name: "SpaceX", industry: "Aerospace" },
];

const FeaturedCompanies = ({ loading = false }) => {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" textAlign="center" mb={1}>
        Top Companies Hiring
      </Typography>
      <Typography variant="body1" textAlign="center" color="text.secondary" mb={4}>
        Work with industry leaders actively recruiting across domains.
      </Typography>

      <Box
        sx={{
          overflowX: "auto",
          pb: 1,
          scrollbarWidth: "thin",
        }}
        aria-label="Featured companies carousel"
      >
        <Stack direction="row" spacing={2} sx={{ minWidth: "max-content", pr: 1 }}>
          {(loading ? Array.from({ length: 7 }) : companies).map((c, index) => (
            <Motion.div
              key={loading ? `skeleton-${index}` : c.name}
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card
                sx={{
                  minWidth: 220,
                  maxWidth: 240,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <CardContent>
                  {loading ? (
                    <Stack spacing={1.2}>
                      <Skeleton variant="circular" width={42} height={42} />
                      <Skeleton width="65%" />
                      <Skeleton width="55%" />
                    </Stack>
                  ) : (
                    <Stack direction="row" spacing={1.4} alignItems="center">
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        {c.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography fontWeight={700}>{c.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {c.industry}
                        </Typography>
                      </Box>
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Motion.div>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default FeaturedCompanies;
