"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";

function StatCard({ stat, index }: { stat: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="text-center p-8 bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors"
    >
      <div className="text-4xl font-bold mb-2 text-white">
        {stat.split(" ")[0]}
      </div>
      <div className="text-sm text-zinc-500">
        {stat.split(" ").slice(1).join(" ")}
      </div>
    </motion.div>
  );
}

export default function About() {
  const { t } = useLanguage();
  
  const highlights = [
    { text: t("I'm a " as any), highlight: t("Fullstack developer" as any), rest: t(" with experience building web systems using Laravel and ReactJS." as any) },
    { text: t("I have experience " as any), highlight: t("developing APIs, handling backend logic, and implementing user interfaces." as any), rest: t(" I care about code structure, performance, and system scalability." as any) },
    { text: t("My goal is to " as any), highlight: t("build stable, maintainable products" as any), rest: t(" that meet real-world needs." as any) },
  ];

  return (
    <Section id="about" className="bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            {t("Who I Am" as any)}
          </h2>
        </motion.div>

        <motion.div
          className="space-y-6 text-base sm:text-xl leading-relaxed mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <p className="text-zinc-300">
                {item.text}
                <span className="font-semibold text-white">
                  {item.highlight}
                </span>
                {item.rest}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[t("1+ Years" as any), t("GPA 3.25/4" as any), t("TOEIC 590" as any)].map((stat, index) => (
            <StatCard key={stat} stat={stat} index={index} />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
