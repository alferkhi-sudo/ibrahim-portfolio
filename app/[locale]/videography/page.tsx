"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ComingSoon from "@/components/ComingSoon";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function VideographyPage() {
  const t = useTranslations("videography");

  return (
    <>
      <section className="relative h-[70vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 placeholder-image" />
        <div className="absolute inset-0 bg-[#0a0a0a]/50" />
        <div className="relative z-10 text-center px-5 md:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
            className="font-bold text-white tracking-tight"
          >
            {t("title")}
          </motion.h1>
        </div>
      </section>

      <section className="bg-[var(--bg)] min-h-[50vh] flex flex-col justify-center">
        <ComingSoon
          title={t("comingSoon")}
          description={t("comingSoonDesc")}
        />

        <div className="text-center pb-16 md:pb-24">
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            href={SOCIAL_LINKS.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-300 py-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            {t("followJourney")}
          </motion.a>
        </div>
      </section>
    </>
  );
}
