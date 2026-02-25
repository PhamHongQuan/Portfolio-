"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { Briefcase, ChevronRight, Calendar } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
}

const getExperiences = (t: (key: any) => string): ExperienceItem[] => [
  {
    company: t("Rada360 Technology JSC" as any),
    role: t("Fullstack PHP Developer" as any),
    period: `${t("Dec 2024" as any)} - ${t("Jan 2026" as any)}`,
    description: [
      t("Designed and developed RESTful API for booking system and AI chatbot" as any),
      t("Built Service layer architecture to separate business logic from controllers, improving maintainability and testability" as any),
      t("Implemented queue for webhook processing and asynchronous message sending, improving performance and reducing response time" as any),
      t("Designed and optimized MySQL queries for booking, promotion, and user management features" as any),
      t("Built UI with Tailwind CSS and handled frontend interactions using JavaScript (AJAX/Fetch)" as any),
      t("Deployed Docker for local and development environments; used Swagger and Postman for API documentation and testing" as any),
      t("Performed debugging, testing, and maintenance of production systems" as any),
    ],
  },
  {
    company: t("Nong Lam University" as any),
    role: t("IT Student" as any),
    period: `${t("Sep 2021" as any)} - ${t("Dec 2025" as any)}`,
    description: [
      t("Major in Information Technology with GPA 3.25/4" as any),
      t("Learned Java (Spring Boot), PHP (Laravel), ReactJS, and database systems" as any),
      t("Participated in various academic projects and practical exercises" as any),
      t("Achieved TOEIC 590 certification for reading English technical documentation" as any),
    ],
  },
];

export default function Experience() {
  const { t } = useLanguage();
  const experiences = getExperiences(t);
  
  return (
    <Section id="experience" className="bg-zinc-900">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            {t("Professional Experience" as any)}
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline */}
          <motion.div 
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-700 rounded-full"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                }}
                className="relative pl-10 sm:pl-12 group"
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-[-7px] top-6 w-4 h-4 rounded-full border-2 border-zinc-900 bg-white transition-transform duration-200 hover:scale-150"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                />

                <div className="bg-zinc-950/90 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 sm:p-8 transition-colors duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-zinc-800 rounded-xl border border-zinc-700">
                          <Briefcase className="w-6 h-6 text-zinc-400" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                          {exp.role}
                        </h3>
                      </div>
                      <p className="text-base sm:text-lg text-zinc-300 mb-3 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl">
                      <Calendar className="w-4 h-4 text-zinc-400" />
                      <span className="text-sm font-semibold text-zinc-300">
                        {exp.period}
                      </span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <li
                        key={i}
                        className="text-zinc-400 flex items-start text-sm sm:text-base"
                      >
                        <ChevronRight className="w-4 h-4 text-zinc-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
