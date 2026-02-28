import { Toaster } from "@/components/ui/sonner";
import CommunitySection from "./components/CommunitySection";
import FoodSection from "./components/FoodSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LanguageSection from "./components/LanguageSection";
import Navbar from "./components/Navbar";
import PGSection from "./components/PGSection";
import ProfileSetupModal from "./components/ProfileSetupModal";
import TransportSection from "./components/TransportSection";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PGSection />
        <FoodSection />
        <TransportSection />
        <LanguageSection />
        <CommunitySection />
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
      <ProfileSetupModal />
    </>
  );
}
