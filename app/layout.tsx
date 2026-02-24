import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import SettingsMenu from "@/components/SettingsMenu";
import ThemeTransition from "@/components/ThemeTransition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Quan Pham - Java Backend Developer",
  description: "Personal portfolio of Quan Pham - passionate about building scalable backend systems with clean code and engineering excellence.",
  keywords: ["Java", "Backend Developer", "Spring Boot", "REST API", "MySQL", "PostgreSQL"],
  authors: [{ name: "Quan Pham" }],
  openGraph: {
    title: "Quan Pham - Java Backend Developer",
    description: "Personal portfolio showcasing my journey in backend development",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            {/* Theme transition animation */}
            <ThemeTransition />
            
            {/* Top right controls */}
            <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex items-center gap-2 md:gap-4">
              {/* Mobile: Settings Menu */}
              <div className="md:hidden">
                <SettingsMenu />
              </div>
              
              {/* Desktop: Separate buttons */}
              <div className="hidden md:flex items-center gap-4">
                <ThemeSwitcher />
                <LanguageSwitcher />
              </div>
            </div>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
