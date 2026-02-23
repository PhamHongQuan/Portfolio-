"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      {/* Switch container */}
      <div className="relative bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 rounded-full p-1 w-24 h-10 md:w-28 md:h-12">
        {/* Animated slider background */}
        <motion.div
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          animate={{
            x: language === "en" ? 4 : "calc(100% + 4px)",
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />
        
        {/* Labels */}
        <div className="relative flex h-full items-center">
          <motion.button
            onClick={() => setLanguage("en")}
            className={`flex-1 text-sm font-medium transition-colors duration-300 z-10 ${
              language === "en" ? "text-white" : "text-zinc-500"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            EN
          </motion.button>
          <motion.button
            onClick={() => setLanguage("vi")}
            className={`flex-1 text-sm font-medium transition-colors duration-300 z-10 ${
              language === "vi" ? "text-white" : "text-zinc-500"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VI
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
