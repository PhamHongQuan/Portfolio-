"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { Briefcase, ChevronRight } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export default function Experience() {
  const { t } = useLanguage();
  
  const experiences: ExperienceItem[] = [
    {
      company: t("Tech Company"),
      role: t("Backend Developer"),
      period: `2022 - ${t("Present")}`,
      description: [
        t("Architected and developed RESTful APIs serving 100k+ daily requests"),
        t("Optimized database queries reducing response time by 40%"),
        t("Implemented authentication and authorization using Spring Security"),
        t("Collaborated with frontend team to deliver seamless user experiences"),
      ],
    },
    {
      company: t("Software Solutions Inc"),
      role: t("Junior Java Developer"),
      period: "2020 - 2022",
      description: [
        t("Developed microservices using Spring Boot and Docker"),
        t("Implemented CI/CD pipelines improving deployment efficiency"),
        t("Wrote comprehensive unit and integration tests"),
        t("Participated in code reviews and mentored junior developers"),
      ],
    },
  ];
  
  return (
    <Section id="experience" className="bg-zinc-950">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            {t("Professional Experience")}
          </h2>
        </motion.div>

        <div className="relative">
          <motion.div 
            className="absolute left-0 top-0 bottom-0 w-0.5 bg-zinc-800"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                className="relative pl-8 sm:pl-10 group"
              >
                <motion.div
                  className="absolute left-0 top-2 w-3 h-3 bg-zinc-700 rounded-full border-2 border-zinc-950"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                  whileHover={{ 
                    scale: 1.5,
                    backgroundColor: "#ffffff",
                    transition: { duration: 0.2 }
                  }}
                />

                <motion.div
                  className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 sm:p-6 will-change-transform"
                  whileHover={{ 
                    x: 10,
                    y: -5,
                    borderColor: "#52525b",
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <motion.div
                          whileHover={{ 
                            rotate: 360,
                            transition: { duration: 0.4, ease: "easeInOut" }
                          }}
                        >
                          <Briefcase className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors duration-200" />
                        </motion.div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-zinc-100 transition-colors">
                          {exp.role}
                        </h3>
                      </div>
                      <p className="text-base sm:text-lg text-zinc-400 mb-2 group-hover:text-zinc-300 transition-colors">{exp.company}</p>
                      <span className="text-sm text-zinc-500 inline-block px-3 py-1 bg-zinc-800 rounded-md group-hover:bg-zinc-700 transition-colors">
                        {exp.period}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-2.5">
                    {exp.description.map((item, i) => (
                      <motion.li
                        key={i}
                        className="text-zinc-400 flex items-start text-sm sm:text-base group-hover:text-zinc-300 transition-colors duration-200"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + i * 0.05 }}
                      >
                        <motion.div
                          whileHover={{ 
                            scale: 1.5,
                            x: 3,
                            transition: { duration: 0.15 }
                          }}
                        >
                          <ChevronRight className="w-4 h-4 text-zinc-500 mr-2 mt-0.5 flex-shrink-0" />
                        </motion.div>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
