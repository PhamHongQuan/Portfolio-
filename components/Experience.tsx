"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";

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
    period: `${t("Nov 2024" as any)} - ${t("Present" as any)}`,
    description: [
      t("Developed Laravel applications with controllers, services, middleware, API, Blade templates, and queues" as any),
      t("Built RESTful APIs with CRUD operations, authentication, authorization, and validation" as any),
      t("Designed and optimized MySQL databases with efficient queries" as any),
      t("Created responsive UI using JavaScript, HTML, and Tailwind CSS with AJAX/Fetch integration" as any),
      t("Documented APIs with Swagger and tested with Postman" as any),
      t("Set up development and deployment environments using Docker" as any),
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
    <Section id="experience" className="bg-zinc-950 relative">
      {/* Background accent */}
      <div className="absolute -right-48 top-1/3 w-[500px] h-[500px] bg-gradient-to-l from-purple-600/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t("Professional Experience" as any)}
          </h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="relative pl-8 sm:pl-10 group"
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 top-2 w-3 h-3 bg-zinc-700 rounded-full border-2 border-zinc-950 group-hover:bg-purple-500 group-hover:scale-125 transition-all duration-300"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                />

                <motion.div
                  className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 sm:p-6 group-hover:border-zinc-600 transition-all duration-300"
                  whileHover={{ x: 8, transition: { duration: 0.2 } }}
                >
                  <div className="mb-4">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-lg sm:text-xl text-zinc-400 mb-2">{exp.company}</p>
                    <span className="text-sm text-zinc-500 inline-block px-3 py-1 bg-zinc-800 rounded-full">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <motion.li
                        key={i}
                        className="text-zinc-400 flex items-start group-hover:text-zinc-300 transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + i * 0.05 }}
                      >
                        <span className="text-purple-500 mr-3 text-xl">▹</span>
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
