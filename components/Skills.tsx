"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useRef } from "react";
import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";

interface SkillGroup {
  title: string;
  skills: string[];
  gradient: string;
}

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
      className="group relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 overflow-hidden cursor-pointer"
    >
      {/* Gradient background on hover */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${group.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        style={{ transform: "translateZ(-1px)" }}
      />
      
      {/* Content with depth */}
      <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
        <h3 className="text-xl font-semibold mb-4 text-white group-hover:scale-105 transition-transform duration-300">
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
  
  const skillGroups: SkillGroup[] = [
    {
      title: t("Backend"),
      skills: ["Java", "Spring Boot", "REST API", "Authentication"],
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      title: t("Database"),
      skills: ["MySQL", "PostgreSQL"],
      gradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      title: t("Frontend"),
      skills: ["React", "Next.js basics"],
      gradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      title: t("Other"),
      skills: ["Git", "Docker", "Linux"],
      gradient: "from-orange-500/10 to-red-500/10",
    },
  ];
  
  return (
    <Section id="skills" className="relative">
      {/* Background accent */}
      <div className="absolute -left-48 top-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-600/10 via-purple-500/5 to-transparent rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t("Technical Expertise")}
          </h2>
          <p className="text-zinc-400 text-lg">{t("Core technologies and tools")}</p>
        </motion.div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ perspective: "1500px" }}
        >
          {skillGroups.map((group, index) => (
            <SkillCard key={group.title} group={group} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
