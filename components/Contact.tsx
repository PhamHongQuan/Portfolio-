"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
}

export default function Contact() {
  const { t } = useLanguage();
  
  const contactLinks: ContactLink[] = [
    {
      label: t("Email"),
      value: "quan.pham@example.com",
      href: "mailto:quan.pham@example.com",
      icon: Mail,
    },
    {
      label: "GitHub",
      value: "github.com/quanpham",
      href: "https://github.com",
      icon: Github,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/quanpham",
      href: "https://linkedin.com",
      icon: Linkedin,
    },
  ];
  
  return (
    <Section id="contact" className="bg-zinc-950">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t("Get In Touch")}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 px-4 sm:px-0">
            {t("I'm always open to discussing new opportunities, interesting projects, or just having a technical conversation.")}
          </p>
        </motion.div>

        <div className="space-y-4">
          {contactLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ 
                  x: 10,
                  borderColor: "#52525b",
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                className="group block bg-zinc-900 border border-zinc-800 rounded-lg p-5 relative overflow-hidden will-change-transform"
              >
                <motion.div
                  className="absolute inset-0 bg-zinc-800 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                />
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4 flex-grow">
                    <motion.div
                      className="p-3 bg-zinc-800 rounded-lg"
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1,
                        transition: { duration: 0.4 }
                      }}
                    >
                      <Icon className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors duration-200" />
                    </motion.div>
                    <div className="text-left">
                      <div className="text-sm text-zinc-500 mb-1 group-hover:text-zinc-400 transition-colors duration-200">
                        {link.label}
                      </div>
                      <div className="text-base sm:text-lg text-white group-hover:text-zinc-100 transition-colors duration-200">
                        {link.value}
                      </div>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ 
                      x: 5,
                      y: -5,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                  >
                    <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors duration-200" />
                  </motion.div>
                </div>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          className="mt-12 pt-8 border-t border-zinc-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-zinc-500 text-sm px-4 sm:px-0">
            © {new Date().getFullYear()} {t("Quan Pham")}. {t("Built with Next.js & Framer Motion.")}
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
