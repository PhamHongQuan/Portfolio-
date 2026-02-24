"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { Github, ExternalLink, Sparkles } from "lucide-react";

interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
}

export default function Projects() {
  const { t } = useLanguage();
  
  const projects: Project[] = [
    {
      title: t("E-Commerce API"),
      description: t("RESTful API for an e-commerce platform with authentication, payment integration, and order management. Handles 50k+ daily transactions."),
      techStack: ["Spring Boot", "MySQL", "JWT", "Docker"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.example.com",
    },
    {
      title: t("Task Management System"),
      description: t("Microservices-based task management system with real-time notifications, role-based access control, and comprehensive reporting."),
      techStack: ["Java", "PostgreSQL", "Redis", "Spring Security"],
      githubUrl: "https://github.com",
    },
    {
      title: t("Data Analytics Pipeline"),
      description: t("Automated data processing pipeline that aggregates, transforms, and analyzes business metrics from multiple sources."),
      techStack: ["Spring Batch", "MySQL", "REST API", "Docker"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.example.com",
    },
  ];
  
  return (
    <Section id="projects" className="bg-zinc-900">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            {t("Selected Projects")}
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">{t("Featured work showcasing backend expertise")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ 
                y: -12,
                borderColor: "#52525b",
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="group bg-zinc-950 border border-zinc-800 rounded-xl p-5 sm:p-6 flex flex-col relative overflow-hidden will-change-transform"
            >
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-zinc-800 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
              />
              
              <div className="flex items-start justify-between mb-3 relative z-10">
                <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-zinc-100 transition-colors duration-200">
                  {project.title}
                </h3>
                <motion.div
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.2,
                    transition: { duration: 0.4, ease: "easeInOut" }
                  }}
                >
                  <Sparkles className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors duration-200" />
                </motion.div>
              </div>
              
              <p className="text-sm sm:text-base text-zinc-400 mb-5 leading-relaxed group-hover:text-zinc-300 transition-colors duration-200 relative z-10">
                {project.description}
              </p>
              
              <div className="mb-5 relative z-10">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                      whileHover={{ 
                        scale: 1.1,
                        y: -3,
                        borderColor: "#71717a",
                        transition: { duration: 0.15 }
                      }}
                      className="text-xs sm:text-sm px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full border border-zinc-700 transition-colors cursor-default will-change-transform"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 mt-auto relative z-10">
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 border border-zinc-700 text-white rounded-lg transition-all flex items-center justify-center gap-2 will-change-transform"
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: "#71717a",
                    transition: { duration: 0.15 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-4 h-4" />
                  <span>{t("GitHub")}</span>
                </motion.a>
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-white text-black rounded-lg font-medium transition-colors flex items-center justify-center gap-2 will-change-transform"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "#e4e4e7",
                      transition: { duration: 0.15 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{t("Live Demo")}</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
