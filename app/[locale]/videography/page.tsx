"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ComingSoon from "@/components/ComingSoon";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function VideographyPage() {
  const t = useTranslations("videography");

  return (
    <>
      <section className="flex flex-col px-5 md:px-10 lg:px-6 pt-28 md:pt-36 pb-10 md:pb-16 gap-12 md:gap-0 md:min-h-[75vh] md:justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-start justify-between"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] font-mono">
            Motion / Visual Diary
          </span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] font-mono flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--fg-muted)] animate-pulse inline-block" />
            In Production
          </span>
        </motion.div>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ fontSize: "clamp(4rem, 17vw, 15rem)" }}
            className="font-bold tracking-tighter leading-[0.88] text-[var(--fg)]"
          >
            Video-<br />graphy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-8 md:mt-12 text-base md:text-lg text-[var(--fg-muted)] font-light italic max-w-xs"
          >
            &ldquo;Stories in motion — the frame never lies.&rdquo;
          </motion.p>
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
