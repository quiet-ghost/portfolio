"use client";

import { About } from "../components/portfolio/About";
import { AvailableForProjects } from "../components/portfolio/AvailableForProjects";
import { Contact } from "../components/portfolio/Contact";
import { Education } from "../components/portfolio/Education";
import { Experience } from "../components/portfolio/Experience";
import Hero from "../components/portfolio/Hero";
import { Projects } from "../components/portfolio/Projects";
import { TechStack } from "../components/portfolio/TechStack";
import { AnimatedBackground } from "../components/ui/animated-background";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative transition-colors duration-300">
      <AnimatedBackground />
      <div className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <TechStack />
        <Education />
        <Projects />
        <AvailableForProjects />
        <Contact />
      </div>
    </div>
  );
}
