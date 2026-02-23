"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useRef } from "react";
import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";

function StatCard({ stat, index }: { stat: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group text-center p-6 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-zinc-600 transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      {/* Gradient glow on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ transform: "translateZ(-1px)" }}
      />
      
      <div style={{ transform: "translateZ(40px)" }} className="relative z-10">
        <div className="text-3xl font-bold text-white mb-2">
          {stat.split(" ")[0]}
        </div>
        <div className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
          {stat.split(" ").slice(1).join(" ")}
        </div>
      </div>

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

export default function About() {
  const { t } = useLanguage();
  
  const highlights = [
    { text: t("I'm a") + " ", highlight: t("Java Backend Developer"), rest: " " + t("passionate about building scalable, high-performance systems that power modern applications.") },
    { text: t("With expertise in") + " ", highlight: t("Spring Boot, REST APIs, and microservices architecture"), rest: t(", I focus on writing clean, maintainable code that stands the test of time.") },
    { text: t("I believe in") + " ", highlight: t("engineering fundamentals, continuous learning"), rest: t(", and the value of well-architected solutions over quick fixes.") },
  ];

  return (
    <Section id="about" className="bg-zinc-950 relative">
      {/* Background accent */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-l from-blue-600/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t("Who I Am")}
          </h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="space-y-6 text-lg md:text-xl leading-relaxed">
          {highlights.map((item, index) => (
            <motion.p
              key={index}
              className="text-zinc-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {item.text}
              <span className="text-white font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {item.highlight}
              </span>
              {item.rest}
            </motion.p>
          ))}
        </div>

        {/* Stats with 3D effect */}
        <motion.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ perspective: "1500px" }}
        >
          {[t("2+ Years"), t("10+ Projects"), t("Clean Code")].map((stat, index) => (
            <StatCard key={stat} stat={stat} index={index} />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
