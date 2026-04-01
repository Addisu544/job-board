import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import CategorySection from "../components/home/CategorySection";
import FeaturedCompanies from "../components/home/FeaturedCompanies";
import JobList from "./JobList";
import HowItWorks from "../components/home/HowItWorks";
import Testimonials from "../components/home/Testimonials";
import Footer from "../components/home/Footer";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 850);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 6, md: 8 } }}>
      <HeroSection loading={loading} />
      <StatsSection loading={loading} />
      <CategorySection loading={loading} />
      <FeaturedCompanies loading={loading} />
      <HowItWorks loading={loading} />
      <Testimonials loading={loading} />
      <JobList />
      <Footer />
    </Box>
  );
}

export default HomePage;
