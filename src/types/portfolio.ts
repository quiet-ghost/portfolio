export type MainSectionName = "projects" | "experience" | "education";

export type PaneName = "contact" | "resume" | "socials";

export interface SocialLink {
  label: string;
  url: string;
}

export interface ProfileData {
  fullName: string;
  headline: string;
  location: string;
  about: string;
  email: string;
  availability: {
    status: "open" | "limited" | "closed";
    label: string;
    note: string;
  };
  resumePath: string;
  avatar: string;
  socials: SocialLink[];
  focusAreas: string[];
}

export interface ProjectData {
  id: string;
  order: number;
  title: string;
  summary: string;
  status: "active" | "archived" | "in-progress";
  technologies: string[];
  repository: string;
  liveUrl?: string;
}

export interface ExperienceData {
  id: string;
  order: number;
  type: "work" | "education";
  role: string;
  organization: string;
  location: string;
  period: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationCertificate {
  title: string;
  provider: string;
  date: string;
  imagePath: string;
}

export interface EducationData {
  id: string;
  order: number;
  title: string;
  institution: string;
  term: string;
  status: "completed" | "in-progress" | "upcoming";
  kind: "course" | "certification";
  skills: string[];
  description: string;
  link?: string;
  hours?: number;
  certificate?: EducationCertificate;
}

export interface Keybind {
  key: string;
  label: string;
  runMain?: MainSectionName;
  openPane?: Extract<PaneName, "contact" | "socials">;
}

export interface PortfolioClientData {
  typedName: string;
  typedHeadline: string;
  typedAbout: string;
  resumeHref: string;
  emailHref: string;
  projectsData: ProjectData[];
  experienceData: ExperienceData[];
  educationData: EducationData[];
}
