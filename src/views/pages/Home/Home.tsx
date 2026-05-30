import React from "react";
import { HeroSection } from "@/views/sections/HeroSection/HeroSection";
import { StackSection } from "@/views/sections/StackSection/StackSection";
import { AboutSection } from "@/views/sections/AboutSection/AboutSection";
import { WorkSection } from "@/views/sections/WorkSection/WorkSection";
import { ProjectsSection } from "@/views/sections/ProjectsSection/ProjectsSection";
import { ContactSection } from "@/views/sections/ContactSection/ContactSection";
import { ScrollDotNav } from "@/components/layout/ScrollDotNav/ScrollDotNav";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const Home: React.FC = () => (
  <>
    <ScrollDotNav sections={SECTIONS} />
    <HeroSection />
    <StackSection />
    <AboutSection />
    <WorkSection />
    <ProjectsSection />
    <ContactSection />
  </>
);
