"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeTransition() {
  const { isTransitioning, theme } = useTheme();

  // Generate particles (very minimal for max FPS)
  const particles = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 3,
    delay: Math.random() * 0.4,
  }));

  return (
    <AnimatePresence>
      {isTransitioning && (
        <>
          {/* Main wipe with scale effect */}
          <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
            style={{
              backgroundImage: theme === "light" 
                ? "linear-gradient(to right, #ffffff 0%, #f9fafb 100%)"
                : "linear-gradient(to right, #0a0a0a 0%, #18181b 100%)",
              willChange: "transform",
            }}
            initial={{ x: "100%", scale: 1.05 }}
            animate={{ x: "-100%", scale: 1 }}
            exit={{ x: "-100%", scale: 0.95 }}
            transition={{
              duration: 1.6,
              ease: [0.76, 0, 0.24, 1],
            }}
          />

          {/* Radial glow from center */}
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] pointer-events-none"
            style={{
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              backgroundImage: theme === "light"
                ? "radial-gradient(circle, rgba(234, 179, 8, 0.3) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 70%)"
                : "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)",
              filter: "blur(50px)",
              willChange: "transform, opacity",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.4,
              ease: [0.33, 1, 0.68, 1],
              times: [0, 0.3, 0.7, 1],
            }}
          />

          {/* Single shimmer layer */}
          {[0].map((delay, index) => (
            <motion.div
              key={`shimmer-${index}`}
              className="fixed inset-0 z-[10000] pointer-events-none"
              style={{
                backgroundImage: theme === "light"
                  ? "linear-gradient(90deg, transparent 0%, rgba(234, 179, 8, 0.25) 50%, transparent 100%)"
                  : "linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.25) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                willChange: "transform, opacity",
              }}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "-100%", opacity: 0.6 }}
              exit={{ x: "-200%", opacity: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.65, 0, 0.35, 1],
                delay: delay,
              }}
            />
          ))}

          {/* Particles/Stars effect */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="fixed z-[10000] pointer-events-none rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: theme === "light" ? "#fbbf24" : "#60a5fa",
                boxShadow: theme === "light" 
                  ? "0 0 8px rgba(251, 191, 36, 0.6)"
                  : "0 0 8px rgba(96, 165, 250, 0.6)",
                willChange: "transform, opacity",
              }}
              initial={{ 
                scale: 0, 
                opacity: 0,
                x: 50,
              }}
              animate={{ 
                scale: [0, 1.2, 0],
                opacity: [0, 0.9, 0],
                x: [-50, 0, -50],
                rotate: [0, 180],
              }}
              transition={{
                duration: 1.3,
                delay: particle.delay,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            />
          ))}

          {/* Light rays - minimal for FPS */}
          {[0, 180].map((rotation, index) => (
            <motion.div
              key={`ray-${index}`}
              className="fixed top-1/2 left-1/2 z-[9998] pointer-events-none"
              style={{
                width: "2px",
                height: "200px",
                transformOrigin: "top center",
                backgroundImage: theme === "light"
                  ? "linear-gradient(to bottom, rgba(234, 179, 8, 0.3), transparent)"
                  : "linear-gradient(to bottom, rgba(139, 92, 246, 0.3), transparent)",
                rotate: `${rotation}deg`,
                willChange: "transform, opacity",
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ 
                scaleY: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 1.2,
                delay: index * 0.15,
                ease: [0.33, 1, 0.68, 1],
              }}
            />
          ))}
          
          {/* Icon with complex animation */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-[10001] pointer-events-none"
            style={{
              filter: theme === "light"
                ? "drop-shadow(0 0 15px rgba(234, 179, 8, 0.5))"
                : "drop-shadow(0 0 15px rgba(59, 130, 246, 0.5))",
              willChange: "transform, opacity",
            }}
            initial={{ 
              scale: 0, 
              rotate: 0, 
              opacity: 0,
              x: "-50%",
              y: "-50%",
            }}
            animate={{ 
              scale: [0, 1.2, 1],
              rotate: [0, 360],
              opacity: [0, 1, 1, 0],
              x: "-50%",
              y: "-50%",
            }}
            transition={{
              duration: 2,
              ease: [0.34, 1.2, 0.64, 1],
              times: [0, 0.7, 1],
            }}
          >
            {theme === "light" ? (
              <svg
                className="w-24 h-24 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <circle cx="12" cy="12" r="4" fill="currentColor" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
              </svg>
            ) : (
              <svg
                className="w-24 h-24 text-blue-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </motion.div>

          {/* Ripple ring */}
          {[0].map((delay, index) => (
            <motion.div
              key={`ripple-${index}`}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9997] pointer-events-none rounded-full border-2"
              style={{
                borderColor: theme === "light" 
                  ? "rgba(234, 179, 8, 0.25)" 
                  : "rgba(139, 92, 246, 0.25)",
                willChange: "transform, opacity",
              }}
              initial={{ 
                scale: 0,
                opacity: 0.6,
                width: "100px",
                height: "100px",
              }}
              animate={{ 
                scale: [0, 2.5],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 1.4,
                delay: delay,
                ease: [0.33, 1, 0.68, 1],
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  );
}
