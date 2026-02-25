"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";

interface Project {
  title: string;
  role?: string;
  period?: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
}

const getProjects = (t: (key: any) => string): Project[] => [
  {
    title: t("AI360 - SaaS AI Chatbot Platform" as any),
    role: t("Fullstack PHP Developer" as any),
    period: `${t("Apr 2025" as any)} - ${t("Jan 2026" as any)}`,
    description: t("AI360 Description" as any),
    techStack: ["PHP (Laravel)", "RESTful API", "Webhooks", "Queue", "MySQL", "JavaScript"],
    githubUrl: "https://github.com",
    liveUrl: "https://ai.rada360.com",
  },
  {
    title: t("Rada360 - Booking System" as any),
    role: t("Frontend Developer" as any),
    period: `${t("Jun 2025" as any)} - ${t("Jan 2026" as any)}`,
    description: t("Rada360 Description" as any),
    techStack: ["HTML", "Tailwind CSS", "JavaScript", "API Integration", "Responsive Design"],
    githubUrl: "https://github.com",
    liveUrl: "https://rada360.com",
  },
  {
    title: t("Portfolio Website" as any),
    description: t("Modern, responsive portfolio website with bilingual support (English/Vietnamese), dark/light theme, and smooth animations. Built with Next.js and Tailwind CSS." as any),
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com",
    liveUrl: "https://hquanpham.id.vn",
  },
];

function ProjectCard({ project, index, t }: { project: Project; index: number; t: (key: any) => string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 sm:p-8 flex flex-col cursor-pointer transition-colors duration-200 h-full"
    >
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
          {project.title}
        </h3>
        {project.role && (
          <p className="text-sm sm:text-base text-zinc-300 font-medium mb-2">
            {project.role}
          </p>
        )}
        {project.period && (
          <p className="text-sm text-zinc-500 mb-4">
            {project.period}
          </p>
        )}
        <p className="text-sm sm:text-base text-zinc-400 mb-6 leading-relaxed flex-1">
          {project.description}
        </p>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-sm px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full border border-zinc-700 hover:border-zinc-600 hover:text-white transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 hover:border-white text-center text-white rounded-xl font-medium transition-colors duration-200"
          >
            {t("GitHub" as any)}
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-3 bg-white text-black text-center rounded-xl font-semibold hover:bg-zinc-100 transition-colors duration-200"
            >
              {t("Live Demo" as any)}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const projects = getProjects(t);
  
  return (
    <Section id="projects" className="bg-zinc-950">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            {t("Selected Projects" as any)}
          </h2>
          <p className="text-zinc-400 text-xl">{t("Featured work showcasing backend expertise" as any)}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} t={t} />
          ))}
        </div>
      </div>
    </Section>
  );
}
