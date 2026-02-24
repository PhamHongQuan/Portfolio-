"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent } from "react";
import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { Server, Database, Laptop, Wrench, type LucideIcon } from "lucide-react";

interface SkillGroup {
  title: string;
  skills: string[];
}

const getSkillGroups = (t: (key: any) => string): SkillGroup[] => [
  {
    title: t("Backend" as any),
    skills: ["PHP (Laravel)", "Java (Spring Boot)", "RESTful API", "Docker", "Swagger"],
  },
  {
    title: t("Database" as any),
    skills: ["MySQL", t("Database Design" as any), t("Query Optimization" as any)],
  },
  {
    title: t("Frontend" as any),
    skills: ["ReactJS", "JavaScript", "HTML", "Tailwind CSS", "AJAX/Fetch"],
  },
  {
    title: t("Other" as any),
    skills: ["Git/GitHub/GitLab", "Agile/Scrum", "Postman", t("AI Agent" as any)],
  },
];

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 overflow-hidden cursor-pointer transition-colors"
    >
      {/* Content with depth */}
      <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
        <h3 className="text-xl font-bold mb-5 text-white">
          {group.title}
        </h3>
        <ul className="space-y-2">
          {group.skills.map((skill, skillIndex) => (
            <motion.li
              key={skill}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: index * 0.1 + skillIndex * 0.05,
                duration: 0.3
              }}
              className="text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300 flex items-center gap-2"
              style={{ transform: "translateZ(10px)" }}
            >
              <motion.span 
                className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-white transition-colors duration-300"
                whileHover={{ scale: 1.5 }}
              />
              {skill}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Border highlight on hover */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border-2 border-white/10"
        style={{ transform: "translateZ(50px)" }}
      />

      {/* Shadow depth */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.4)",
          opacity: 0,
        }}
        whileHover={{
          opacity: 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function Skills() {
  const { t } = useLanguage();
  const skillGroups = getSkillGroups(t);
  
  return (
    <Section id="skills" className="bg-zinc-900">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            {t("Technical Expertise" as any)}
          </h2>
          <p className="text-zinc-400 text-xl">{t("Core technologies and tools" as any)}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, index) => (
            <SkillCard key={group.title} group={group} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
