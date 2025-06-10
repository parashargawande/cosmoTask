import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { AppPreviewSection } from "@/components/AppPreviewSection";
import { WhyItWorksSection } from "@/components/WhyItWorksSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <AppPreviewSection />
      <WhyItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
