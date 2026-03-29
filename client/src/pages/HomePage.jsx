import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import CategorySection from "../components/home/CategorySection";
import FeaturedCompanies from "../components/home/FeaturedCompanies";
import JobList from "./JobList";
import HowItWorks from "../components/home/HowItWorks";
import Testimonials from "../components/home/Testimonials";
import Footer from "../components/home/Footer";

function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CategorySection />
      <FeaturedCompanies />
      <JobList />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </>
  );
}

export default HomePage;
