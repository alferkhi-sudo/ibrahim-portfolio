"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageToggle from "./LanguageToggle";
import { useTheme } from "./ThemeProvider";
import { SOCIAL_LINKS } from "@/lib/constants";

interface NavbarProps {
  locale: string;
}

const navLinks = [
  { key: "photography", href: "/photography" },
  { key: "videography", href: "/videography" },
  { key: "travel", href: "/travel" },
  { key: "movies", href: "/movies" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: SOCIAL_LINKS.instagram.url,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Letterboxd",
    href: SOCIAL_LINKS.letterboxd.url,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="8" cy="12" r="4" opacity="0.8" />
        <circle cx="16" cy="12" r="4" opacity="0.8" />
      </svg>
    ),
  },
  {
    name: "X",
    href: SOCIAL_LINKS.x.url,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-md)] hover:bg-[var(--bg-card)] transition-colors duration-300 text-[var(--fg)]"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    pathname === `/${locale}${href}` || pathname.startsWith(`/${locale}${href}/`);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-6 h-16 flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="text-lg font-semibold text-[var(--fg)] tracking-tight z-[60] relative"
          >
            Ibrahim
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.href}`}
                className={`text-sm tracking-wide transition-colors duration-300 ${
                  isActive(link.href)
                    ? "text-[var(--fg)]"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex lg:hidden items-center gap-2 z-[60] relative">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-10 h-10 flex items-center justify-center text-[var(--fg)]"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <span className={`absolute block w-5 h-[1.5px] bg-current transition-all duration-300 ${mobileOpen ? "rotate-45" : "-translate-y-[5px]"}`} />
              <span className={`absolute block w-5 h-[1.5px] bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute block w-5 h-[1.5px] bg-current transition-all duration-300 ${mobileOpen ? "-rotate-45" : "translate-y-[5px]"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[var(--bg)] lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 md:gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={`/${locale}${link.href}`}
                    onClick={() => setMobileOpen(false)}
                    className={`text-3xl md:text-4xl font-bold tracking-tight transition-colors duration-300 ${
                      isActive(link.href)
                        ? "text-[var(--fg)]"
                        : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}

              {/* Language toggle inside mobile menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.46 }}
              >
                <LanguageToggle locale={locale} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.58 }}
                className="absolute bottom-12 left-0 right-0 flex justify-center gap-6"
              >
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-300 p-2"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
