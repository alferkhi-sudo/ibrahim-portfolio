"use client";

import { useTranslations } from "next-intl";
import SectionReveal from "./SectionReveal";
import { SOCIAL_LINKS } from "@/lib/constants";

const socialLinks = [
  {
    name: "Instagram",
    href: SOCIAL_LINKS.instagram.url,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="8" cy="12" r="4" opacity="0.8" />
        <circle cx="16" cy="12" r="4" opacity="0.8" />
      </svg>
    ),
  },
  {
    name: "X",
    href: SOCIAL_LINKS.x.url,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="bg-[var(--bg-card)] pt-20 md:pt-32 pb-8 md:pb-12 px-5 md:px-10 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Big statement */}
        <SectionReveal>
          <h2
            style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
            className="font-bold text-[var(--fg)] tracking-tight mb-12 md:mb-16"
          >
            {t("footerStatement")}
          </h2>
        </SectionReveal>

        {/* Social icons */}
        <div className="flex items-center gap-5 md:gap-6 mb-12 md:mb-16">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-300 p-1"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--fg-muted)]">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
          <p className="text-xs text-[var(--fg-subtle)]">
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
