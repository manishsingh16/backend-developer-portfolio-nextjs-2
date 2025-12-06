import { Database, Server, Code2, Wrench, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Experience, Project, SkillCategory, SocialLink } from './types';

export const PERSONAL_INFO = {
  name: "Manish Kumar Singh",
  role: "Backend Architect & API Specialist",
  tagline: "Building scalable, high-performance digital infrastructure.",
  email: "manishsj97@gmail.com",
  phone: "+91-8958272723",
  location: "Aligarh, Uttar Pradesh",
  about: "I am a dedicated Software Developer specializing in Backend technologies. My passion lies in architecting robust server-side logic, optimizing database interactions, and building seamless APIs. With a strong foundation in Node.js and Laravel, I transform complex requirements into efficient, scalable code solutions. I focus on clean architecture, performance optimization, and secure data handling.",
};

export const EXPERIENCE_DATA: Experience[] = [
  {
    company: "Mamily",
    role: "Software Developer (Backend)",
    period: "Feb 2024 – Present",
    description: "Spearheading backend architecture for a high-traffic health-tech platform.",
    achievements: [
      "Engineered microservices using Node.js, improving system fault tolerance by 30%.",
      "Optimized MySQL database queries, reducing API response time by 40% for core endpoints.",
      "Integrated third-party health APIs ensuring secure PHI data handling compliance.",
      "Automated deployment pipelines using CI/CD tools, cutting deployment time in half."
    ],
    tech: ["Node.js", "Express", "MySQL", "AWS", "Redis"]
  },
  {
    company: "JPR Technosoft LLP",
    role: "Software Developer",
    period: "Feb 2021 – Feb 2024",
    description: "Delivered comprehensive full-stack solutions for diverse client requirements.",
    achievements: [
      "Developed and maintained 10+ scalable web applications using Laravel and React.",
      "Implemented RESTful APIs for mobile application consumption.",
      "Collaborated with cross-functional teams to deliver projects 15% ahead of schedule.",
      "Refactored legacy codebases to modern standards, improving maintainability."
    ],
    tech: ["Laravel", "PHP", "React", "SQL", "JavaScript"]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    title: "Meditation & Wellness App",
    category: "Health Tech",
    image: "https://picsum.photos/800/600?random=1",
    description: "A robust backend system supporting real-time audio streaming, user progress tracking, and subscription management for a meditation platform.",
    techStack: ["Node.js", "Express", "MySQL", "AWS S3", "Stripe API"]
  },
  {
    title: "Highway & Logistics App",
    category: "Logistics",
    image: "https://picsum.photos/800/600?random=2",
    description: "Complex fare calculation logic and route optimization for a highway logistics application. Handles real-time location tracking data.",
    techStack: ["Laravel", "Google Maps API", "Redis", "PostgreSQL"]
  },
  {
    title: "Aaranya Health",
    category: "Healthcare",
    image: "https://picsum.photos/800/600?random=3",
    description: "Patient management system with appointment scheduling, telemedicine integration, and secure electronic health records (EHR).",
    techStack: ["Node.js", "Socket.io", "MongoDB", "WebRTC"]
  },
  {
    title: "Handy Service Provider",
    category: "On-Demand Services",
    image: "https://picsum.photos/800/600?random=4",
    description: "Marketplace platform connecting local service providers with customers. Features geo-fencing and instant booking capabilities.",
    techStack: ["PHP", "Laravel", "MySQL", "Firebase"]
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Backend Development",
    icon: Server,
    skills: ["Node.js", "Express.js", "Laravel", "PHP", "Python (Basic)"]
  },
  {
    title: "Database Management",
    icon: Database,
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Schema Design"]
  },
  {
    title: "Frontend & Tools",
    icon: Code2,
    skills: ["React.js", "HTML5/CSS3", "JavaScript (ES6+)", "Git/GitHub", "Postman"]
  },
  {
    title: "DevOps & Cloud",
    icon: Wrench,
    skills: ["AWS (EC2, S3)", "Docker", "CI/CD Pipelines", "Nginx", "Linux"]
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/manish-kumar-singh-757", icon: Linkedin },
  { platform: "Email", url: `mailto:${PERSONAL_INFO.email}`, icon: Mail },
  { platform: "Phone", url: `tel:${PERSONAL_INFO.phone}`, icon: Phone },
];