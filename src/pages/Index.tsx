import CustomCursor from "@/components/CustomCursor";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WorkSection from "@/components/WorkSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import AwardsSection from "@/components/AwardsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      {/* Skip to content */}
      <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-lime focus:text-background focus:px-4 focus:py-2 font-mono text-sm">
        Skip to content
      </a>

      <CustomCursor />
      <BackgroundCanvas />
      <ScrollProgress />
      <div className="noise-overlay" />

      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <WorkSection />
        <AboutSection />
        <SkillsSection />
        <AwardsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
};

export default Index;
