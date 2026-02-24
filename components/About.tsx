"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, FolderGit2, Code2 } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  return (
    <Section id="about" className="bg-zinc-950">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {t("Who I Am")}
          </h2>
        </motion.div>

        <motion.div
          className="space-y-5 text-base sm:text-lg leading-relaxed text-zinc-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p>
            {t("I'm a")} <span className="text-white font-medium">{t("Java Backend Developer")}</span> {t("passionate about building scalable, high-performance systems that power modern applications.")}
          </p>
          <p>
            {t("With expertise in")} <span className="text-white font-medium">{t("Spring Boot, REST APIs, and microservices architecture")}</span>{t(", I focus on writing clean, maintainable code that stands the test of time.")}
          </p>
          <p>
            {t("I believe in")} <span className="text-white font-medium">{t("engineering fundamentals, continuous learning")}</span>{t(", and the value of well-architected solutions over quick fixes.")}
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { stat: t("2+ Years"), icon: Calendar },
            { stat: t("10+ Projects"), icon: FolderGit2 },
            { stat: t("Clean Code"), icon: Code2 }
          ].map(({ stat, icon: Icon }, index) => (
            <motion.div
              key={stat}
              className="group text-center p-6 bg-zinc-900/50 rounded-lg border border-zinc-800 cursor-pointer will-change-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ 
                y: -8,
                borderColor: "#52525b",
                transition: { duration: 0.2, ease: "easeOut" }
              }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 bg-zinc-800 rounded-lg mb-3"
                whileHover={{ 
                  rotate: 360,
                  scale: 1.15,
                  transition: { duration: 0.4, ease: "easeInOut" }
                }}
              >
                <Icon className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors duration-200" />
              </motion.div>
              <div className="text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-200">
                {stat.split(" ")[0]}
              </div>
              <div className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors duration-200">
                {stat.split(" ").slice(1).join(" ")}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
