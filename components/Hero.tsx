"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);
  
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center px-6 py-20 sm:px-8 sm:py-24 overflow-hidden bg-zinc-950"
    >
      {/* Animated particles */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-zinc-700 rounded-full"
              initial={{ 
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height,
                opacity: 0
              }}
              animate={{ 
                y: [null, Math.random() * dimensions.height],
                opacity: [0, 0.5, 0]
              }}
              transition={{ 
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight text-white whitespace-nowrap"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {t("Pham Hong Quan" as any)}
        </motion.h1>

        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-8 font-light text-zinc-400"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {t("Fullstack Web Developer" as any)}
        </motion.h2>

        <motion.p
          className="text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t("Building user-friendly interfaces and stable server systems with clean, maintainable code from frontend to backend." as any)}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            onClick={() => scrollToSection("projects")}
            className="px-8 py-4 bg-white text-black font-semibold rounded-xl w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {t("View Projects" as any)}
          </motion.button>
          
          <motion.button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-4 bg-transparent border-2 border-zinc-700 hover:border-white text-white font-semibold rounded-xl w-full sm:w-auto transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {t("Contact Me" as any)}
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        onClick={() => scrollToSection("about")}
        whileHover={{ scale: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-6 h-6 text-zinc-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
