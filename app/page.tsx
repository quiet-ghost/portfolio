"use client";

import { About } from "../components/portfolio/About";
import { Contact } from "../components/portfolio/Contact";
import { Education } from "../components/portfolio/Education";
import { Experience } from "../components/portfolio/Experience";
import { Hero } from "../components/portfolio/Hero";
import { Projects } from "../components/portfolio/Projects";
import { TechStack } from "../components/portfolio/TechStack";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <About />
      <Experience />
      <TechStack />
      <Education />
      <Projects />
      <Contact />
    </div>
  );
}
