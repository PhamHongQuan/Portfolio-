export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}
