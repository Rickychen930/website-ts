import React from "react";
import { HeroSection } from "@/views/sections/HeroSection/HeroSection";
import { AboutSection } from "@/views/sections/AboutSection/AboutSection";
import { ProjectsSection } from "@/views/sections/ProjectsSection/ProjectsSection";
import { WorkSection } from "@/views/sections/WorkSection/WorkSection";
import { AtlasSection } from "@/views/sections/AtlasSection/AtlasSection";
import { StackSection } from "@/views/sections/StackSection/StackSection";
import { ContactSection } from "@/views/sections/ContactSection/ContactSection";
import { useSEO } from "@/hooks/useSEO";

export const Home: React.FC = () => {
  useSEO({
    title: "Ricky Chen — Fullstack & AI Engineer, Sydney",
    description:
      "Portfolio of Ricky Chen, a Sydney-based fullstack and AI engineer. Selected works, chronology and a field atlas of Australia.",
    type: "profile",
  });

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <WorkSection />
      <AtlasSection />
      <StackSection />
      <ContactSection />
    </>
  );
};
