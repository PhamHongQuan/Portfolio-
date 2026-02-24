"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { useLanguage } from "@/contexts/LanguageContext";

const getContactLinks = (t: (key: any) => string) => [
  {
    label: t("Email" as any),
    value: "quan54877@gmail.com",
    href: "mailto:quan54877@gmail.com",
    icon: "📧",
  },
  {
    label: t("Phone" as any),
    value: "0364 543 7696",
    href: "tel:0364543769",
    icon: "📱",
  },
  {
    label: t("Website" as any),
    value: "hquanpham.id.vn",
    href: "https://hquanpham.id.vn",
    icon: "🌐",
  },
];

export default function Contact() {
  const { t } = useLanguage();
  const contactLinks = getContactLinks(t);
  
  return (
    <Section id="contact" className="bg-zinc-950">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            {t("Get In Touch" as any)}
          </h2>
          <p className="text-xl text-zinc-400 px-4 sm:px-0 leading-relaxed">
            {t("I'm always open to discussing new opportunities, interesting projects, or just having a technical conversation." as any)}
          </p>
        </motion.div>

        <div className="space-y-5">
          {contactLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                x: 10,
                scale: 1.02,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="group block bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5 flex-grow">
                  <motion.div 
                    className="text-4xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {link.icon}
                  </motion.div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-zinc-500 mb-1">
                      {link.label}
                    </div>
                    <div className="text-base sm:text-lg font-semibold text-white">
                      {link.value}
                    </div>
                  </div>
                </div>
                <motion.div 
                  className="text-2xl text-zinc-600 group-hover:text-white transition-colors"
                  whileHover={{ x: 5 }}
                >
                  →
                </motion.div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="mt-12 pt-8 border-t border-zinc-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-zinc-500 text-sm px-4 sm:px-0">
            © {new Date().getFullYear()} {t("Pham Hong Quan" as any)}. {t("Built with Next.js & Framer Motion." as any)}
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
