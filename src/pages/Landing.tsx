import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ServiceAreasSection } from "@/components/landing/ServiceAreasSection";
import { VehicleTypesSection } from "@/components/landing/VehicleTypesSection";
import { CTASection } from "@/components/landing/CTASection";
import { LandingFooter } from "@/components/landing/LandingFooter";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ServiceAreasSection />
        <VehicleTypesSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default Landing;
