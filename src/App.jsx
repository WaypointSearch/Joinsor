import { useState } from "react";
import { COLORS } from "./constants";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import OnboardingModal from "./components/OnboardingModal";
import {
  ValueProps,
  Commission,
  HowItWorks,
  Areas,
  FAQ,
  CallToAction,
  Footer,
} from "./components/PageSections";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openOnboardingModal() {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeOnboardingModal() {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  }

  return (
    <div style={{ margin: 0, padding: 0, overflowX: "hidden", background: COLORS.sand }}>
      <Nav onApplyClick={openOnboardingModal} />
      <Hero onApplyClick={openOnboardingModal} />
      <ValueProps />
      <Commission onApplyClick={openOnboardingModal} />
      <HowItWorks onApplyClick={openOnboardingModal} />
      <Areas />
      <FAQ />
      <CallToAction onApplyClick={openOnboardingModal} />
      <Footer />

      {isModalOpen && <OnboardingModal onClose={closeOnboardingModal} />}
    </div>
  );
}
