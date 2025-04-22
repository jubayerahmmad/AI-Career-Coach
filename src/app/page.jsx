import CallToAct from "@/components/landing-page-components/CallToAct";
import Faqs from "@/components/landing-page-components/Faqs";
import Features from "@/components/landing-page-components/Features";
import HeroSection from "@/components/landing-page-components/HeroSection";
import HowItWorks from "@/components/landing-page-components/HowItWorks";
import Stats from "@/components/landing-page-components/Stats";
import Testimonial from "@/components/landing-page-components/Testimonial";

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

      {/* How it works section */}
      <HowItWorks />

      {/* Testimonial */}
      <Testimonial />

      {/* FAQ */}
      <Faqs />

      {/* CTA */}
      <CallToAct />
    </>
  );
};

export default Home;
