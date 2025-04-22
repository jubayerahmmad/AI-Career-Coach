import Features from "@/components/landing-page-components/Features";
import HeroSection from "@/components/landing-page-components/HeroSection";
import Stats from "@/components/landing-page-components/Stats";

const Home = () => {
  return (
    <>
      <div className="grid-background"></div>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <Features />

      {/* Stats Section */}
      <Stats />
    </>
  );
};

export default Home;
