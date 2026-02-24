"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { Server, Database, Laptop, Wrench, type LucideIcon } from "lucide-react";

interface SkillGroup {
  title: string;
  skills: string[];
  icon: LucideIcon;
}

export default function Skills() {
  const { t } = useLanguage();
  
  const skillGroups: SkillGroup[] = [
    {
      title: t("Backend"),
      skills: ["Java", "Spring Boot", "REST API", "Authentication"],
      icon: Server,
    },
    {
      title: t("Database"),
      skills: ["MySQL", "PostgreSQL"],
      icon: Database,
    },
    {
      title: t("Frontend"),
      skills: ["React", "Next.js basics"],
      icon: Laptop,
    },
    {
      title: t("Other"),
      skills: ["Git", "Docker", "Linux"],
      icon: Wrench,
    },
  ];
  
  return (
    <Section id="skills">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            {t("Technical Expertise")}
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">{t("Core technologies and tools")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  borderColor: "#52525b",
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                className="group bg-zinc-900 border border-zinc-800 rounded-lg p-6 cursor-pointer relative overflow-hidden will-change-transform"
              >
                <motion.div
                  className="absolute -top-10 -right-10 w-32 h-32 bg-zinc-800 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                />
                
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <motion.div
                    className="p-2 bg-zinc-800 rounded-lg"
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.4 }
                    }}
                  >
                    <Icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors duration-200" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white">
                    {group.title}
                  </h3>
                </div>
                
                <ul className="space-y-2.5 relative z-10">
                  {group.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skill}
                      className="text-zinc-400 flex items-center gap-2 group-hover:text-zinc-300 transition-colors duration-200"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                    >
                      <motion.span 
                        className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-white transition-colors duration-200"
                        whileHover={{ 
                          scale: 2,
                          transition: { duration: 0.15 }
                        }}
                      />
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
