"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useRef } from "react";
import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: string;
}

function ContactCard({ link, index }: { link: ContactLink; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
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
    <motion.a
      ref={ref}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group block bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden cursor-pointer"
    >
      {/* Gradient background on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ transform: "translateZ(-1px)" }}
      />
      
      {/* Content with depth */}
      <div 
        className="relative z-10 flex items-center justify-between"
        style={{ transform: "translateZ(40px)" }}
      >
        <div className="text-left flex-grow">
          <div className="text-sm text-zinc-500 mb-1 group-hover:text-zinc-400 transition-colors">
            {link.label}
          </div>
          <div className="text-lg text-white group-hover:text-blue-300 transition-colors">
            {link.value}
          </div>
        </div>
        <motion.div 
          className="text-4xl"
          whileHover={{ scale: 1.3, rotate: 15 }}
          transition={{ type: "spring", stiffness: 400 }}
          style={{ transform: "translateZ(20px)" }}
        >
          {link.icon}
        </motion.div>
      </div>

      {/* Border highlight */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border-2 border-white/10"
        style={{ transform: "translateZ(50px)" }}
      />

      {/* Shadow depth */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          opacity: 0,
        }}
        whileHover={{
          opacity: 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  
  const contactLinks = [
    {
      label: t("Email"),
      value: "quan.pham@example.com",
      href: "mailto:quan.pham@example.com",
      icon: "📧",
    },
    {
      label: "GitHub",
      value: "github.com/quanpham",
      href: "https://github.com",
      icon: "💻",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/quanpham",
      href: "https://linkedin.com",
      icon: "💼",
    },
  ];
  
  return (
    <Section id="contact" className="bg-zinc-950 relative">
      {/* Background accent */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t("Get In Touch")}
          </h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-xl text-zinc-400 px-4 sm:px-0">
            {t("I'm always open to discussing new opportunities, interesting projects, or just having a technical conversation.")}
          </p>
        </motion.div>

        <div className="space-y-6" style={{ perspective: "1500px" }}>
          {contactLinks.map((link, index) => (
            <ContactCard key={link.label} link={link} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-16 pt-8 border-t border-zinc-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-zinc-500 text-sm px-4 sm:px-0">
            © {new Date().getFullYear()} {t("Quan Pham")}. {t("Built with Next.js & Framer Motion.")}
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
