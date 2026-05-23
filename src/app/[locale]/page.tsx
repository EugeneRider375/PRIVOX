import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import PlatformPillarsSection from '@/components/sections/PlatformPillarsSection';
import SystemLayersSection from '@/components/sections/SystemLayersSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import UseCasesSection from '@/components/sections/UseCasesSection';
import PilotProjectsSection from '@/components/sections/PilotProjectsSection';
import TechEcosystemSection from '@/components/sections/TechEcosystemSection';
import DashboardPreviewSection from '@/components/sections/DashboardPreviewSection';
import WhyPrivoxSection from '@/components/sections/WhyPrivoxSection';

export default function HomePage() {
  return (
    <main className="bg-[#030712] min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <PlatformPillarsSection />
      <SystemLayersSection />
      <FeaturesSection />
      <UseCasesSection />
      <PilotProjectsSection />
      <TechEcosystemSection />
      <DashboardPreviewSection />
      <WhyPrivoxSection />
      <Footer />
    </main>
  );
}
