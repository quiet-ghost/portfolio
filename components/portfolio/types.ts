export interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export interface TechItem {
  name: string;
  category: string;
}

export interface Project {
  title: string;
  description: string;
  githubUrl: string;
  demoUrl: string;
  technologies: string[];
} 