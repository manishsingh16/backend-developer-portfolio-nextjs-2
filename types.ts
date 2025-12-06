import { LucideIcon } from "lucide-react";

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  tech: string[];
}

export interface Project {
  title: string;
  category: string;
  image: string;
  description: string;
  techStack: string[];
  link?: string;
  github?: string;
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: LucideIcon;
}