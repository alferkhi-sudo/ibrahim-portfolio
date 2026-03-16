"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";

export default function TravelPage() {
  const t = useTranslations("travel");
  const { locale } = useParams();

  return (
    <>
      <section className="flex flex-col px-5 md:px-10 lg:px-6 pt-28 md:pt-36 pb-10 md:pb-16 gap-12 md:gap-0 md:min-h-[80vh] md:justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-start justify-between"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] font-mono">
            02 — Wanderlust
          </span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] font-mono">
            Maps &amp; Plans
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
            Travel
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-8 md:mt-12 text-base md:text-lg text-[var(--fg-muted)] font-light italic max-w-xs"
          >
            &ldquo;Every city has its own rhythm. I chase it.&rdquo;
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-5 md:px-10 lg:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          {/* Travel Plans - Coming Soon */}
          <SectionReveal>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[var(--border)]">
              <div className="absolute inset-0 placeholder-image" />
              <div className="absolute inset-0 bg-[#0a0a0a]/60" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-8">
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-[0.1em] uppercase text-accent border border-accent/30 rounded-full">
                  {t("comingSoon")}
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  {t("travelPlans")}
                </h2>
                <p className="mt-3 text-sm text-white/50 max-w-xs">
                  {t("travelPlansDesc")}
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* Maps & Lists */}
          <SectionReveal delay={0.2}>
            <Link href={`/${locale}/travel/maps`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group border border-[var(--border)]"
              >
                <div className="absolute inset-0 placeholder-image transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#0a0a0a]/50 group-hover:bg-[#0a0a0a]/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    {t("mapsAndLists")}
                  </h2>
                  <p className="mt-3 text-sm text-white/50 max-w-xs">
                    {t("mapsAndListsDesc")}
                  </p>
                  <svg
                    className="mt-4 text-white/50 group-hover:text-white transition-colors"
                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            </Link>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
