"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Load theme from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("theme") as Theme;
      if (saved && (saved === "light" || saved === "dark")) {
        setThemeState(saved);
        document.documentElement.classList.toggle("light", saved === "light");
      }
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    if (theme === newTheme) return;
    
    // Start transition
    setIsTransitioning(true);
    
    // Wait for animation to start, then change theme
    setTimeout(() => {
      setThemeState(newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("light", newTheme === "light");
      
      // End transition after animation completes (with buffer)
      setTimeout(() => {
        setIsTransitioning(false);
      }, 2500);
    }, 100);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
