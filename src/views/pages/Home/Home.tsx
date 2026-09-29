import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HeroSection } from "@/views/sections/HeroSection/HeroSection";
import { AboutSection } from "@/views/sections/AboutSection/AboutSection";
import { ProjectsSection } from "@/views/sections/ProjectsSection/ProjectsSection";
import { WorkSection } from "@/views/sections/WorkSection/WorkSection";
import { CredentialsSection } from "@/views/sections/CredentialsSection/CredentialsSection";
import { AtlasSection } from "@/views/sections/AtlasSection/AtlasSection";
import { StackSection } from "@/views/sections/StackSection/StackSection";
import { ContactSection } from "@/views/sections/ContactSection/ContactSection";
import { useSEO } from "@/hooks/useSEO";
import { scrollToSection } from "@/utils/scrollToSection";

export const Home: React.FC = () => {
  const location = useLocation();

  // Arriving via /#section (from another page): scroll once the curtain lifts
  useEffect(() => {
    const id = location.hash.slice(1);
    if (!id) return;
    const t = setTimeout(() => scrollToSection(id), 700);
    return () => clearTimeout(t);
  }, [location.key, location.hash]);

  useSEO({
    title: "Ricky Chen — Software Engineer · AI & Full-Stack Developer, Sydney",
    description:
      "Sydney-based software engineer and Master of AI candidate (UTS). Ex-Samsung R&D. Builds LLM chatbots, AI workflows and full-stack platforms.",
    image: "/media/flow/hero-uluru-dawn.jpg",
    type: "profile",
  });

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <WorkSection />
      <CredentialsSection />
      <AtlasSection />
      <StackSection />
      <ContactSection />
    </>
  );
};
