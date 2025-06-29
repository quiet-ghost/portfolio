"use client";

import dynamic from "next/dynamic";
import Hero from "../components/portfolio/Hero";
import { AnimatedBackground } from "../components/ui/animated-background";

const About = dynamic(() => import("../components/portfolio/About").then(mod => ({ default: mod.About })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg" />
});

const Experience = dynamic(() => import("../components/portfolio/Experience").then(mod => ({ default: mod.Experience })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg" />
});

const TechStack = dynamic(() => import("../components/portfolio/TechStack").then(mod => ({ default: mod.TechStack })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg" />
});

const Education = dynamic(() => import("../components/portfolio/Education").then(mod => ({ default: mod.Education })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg" />
});

const Projects = dynamic(() => import("../components/portfolio/Projects").then(mod => ({ default: mod.Projects })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg" />
});

const AvailableForProjects = dynamic(() => import("../components/portfolio/AvailableForProjects").then(mod => ({ default: mod.AvailableForProjects })), {
  loading: () => <div className="h-32 animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg" />
});

const Contact = dynamic(() => import("../components/portfolio/Contact").then(mod => ({ default: mod.Contact })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg" />
});

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
