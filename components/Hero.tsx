"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center px-6 py-20 sm:px-8 sm:py-24 overflow-x-hidden"
    >
      {/* Optimized gradient backgrounds - static for performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-purple-600/20 via-purple-500/10 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <motion.div
        className="max-w-5xl mx-auto text-center relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {t("Quan Pham" as any)}
        </motion.h1>

        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-zinc-400 mb-8 font-light"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {t("Fullstack Web Developer" as any)}
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {t("Building user-friendly interfaces and stable server systems with clean, maintainable code from frontend to backend." as any)}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            onClick={() => scrollToSection("projects")}
            className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-white text-black font-medium rounded-lg w-full sm:w-auto overflow-hidden text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative z-10">{t("View Projects" as any)}</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400"
              initial={{ x: "-100%", opacity: 0 }}
              whileHover={{ x: 0, opacity: 0.2 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          
          <motion.button
            onClick={() => scrollToSection("contact")}
            className="group relative px-6 py-3 sm:px-8 sm:py-4 border-2 border-zinc-700 text-white font-medium rounded-lg w-full sm:w-auto overflow-hidden text-sm sm:text-base"
            whileHover={{ scale: 1.05, borderColor: "#ffffff" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative z-10">{t("Contact Me" as any)}</span>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Smooth scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        onClick={() => scrollToSection("about")}
      >
        <motion.div
          className="w-6 h-10 border-2 border-zinc-700 rounded-full flex justify-center p-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
