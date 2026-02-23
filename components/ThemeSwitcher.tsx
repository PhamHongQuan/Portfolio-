"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, toggleTheme, isTransitioning } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      disabled={isTransitioning}
      className="relative w-12 h-12 md:w-14 md:h-14 bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 rounded-full flex items-center justify-center overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.1 }}
      whileHover={{ scale: isTransitioning ? 1 : 1.05 }}
      whileTap={{ scale: isTransitioning ? 1 : 0.95 }}
    >
      {/* Sun icon (light mode) */}
      <motion.svg
        className="absolute w-6 h-6 text-yellow-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        initial={{ rotate: 0, opacity: theme === "light" ? 1 : 0, scale: theme === "light" ? 1 : 0 }}
        animate={{ 
          rotate: theme === "light" ? 0 : 180,
          opacity: theme === "light" ? 1 : 0,
          scale: theme === "light" ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
      </motion.svg>

      {/* Moon icon (dark mode) */}
      <motion.svg
        className="absolute w-6 h-6 text-blue-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        initial={{ rotate: 0, opacity: theme === "dark" ? 1 : 0, scale: theme === "dark" ? 1 : 0 }}
        animate={{ 
          rotate: theme === "dark" ? 0 : -180,
          opacity: theme === "dark" ? 1 : 0,
          scale: theme === "dark" ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </motion.svg>
    </motion.button>
  );
}
