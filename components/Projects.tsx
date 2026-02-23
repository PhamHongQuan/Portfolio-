"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useRef } from "react";
import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";

interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  // Initial tilt forward (-5deg on X axis) + mouse movement
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-13deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1500px",
      }}
      className="group relative bg-zinc-950 border border-zinc-800 rounded-xl p-4 sm:p-6 flex flex-col cursor-pointer"
    >
      {/* Gradient border glow on hover */}
      <motion.div 
        className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-blue-500/50 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 -z-10"
        style={{ transform: "translateZ(-1px)" }}
      />
      
      {/* Inner glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.15), transparent 70%)",
          transform: "translateZ(1px)",
        }}
      />
      
      {/* Card content with 3D depth */}
      <div className="relative" style={{ transform: "translateZ(50px)" }}>
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base text-zinc-400 mb-6 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
          {project.description}
        </p>
        
        {/* Tech stack tags */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <motion.span
                key={tech}
                className="text-sm px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full border border-zinc-700 hover:border-zinc-500 hover:text-white transition-all duration-200"
                whileHover={{ scale: 1.1, y: -2 }}
                style={{ transform: "translateZ(20px)" }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-3" style={{ transform: "translateZ(30px)" }}>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 border border-zinc-700 text-center text-white rounded-lg relative overflow-hidden group/btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">{t("GitHub")}</span>
            <motion.div
              className="absolute inset-0 bg-zinc-800"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-white text-black text-center rounded-lg font-medium relative overflow-hidden group/btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{t("Live Demo")}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          )}
        </div>
      </div>

      {/* Shadow depth effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.5)",
          opacity: 0,
        }}
        animate={{
          opacity: [0, 0],
        }}
        whileHover={{
          opacity: 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
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
    <Section id="projects" className="bg-zinc-900 relative">
      {/* Subtle background accent */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-l from-blue-600/10 via-blue-500/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t("Selected Projects")}
          </h2>
          <p className="text-zinc-400 text-lg">{t("Featured work showcasing backend expertise")}</p>
        </motion.div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
