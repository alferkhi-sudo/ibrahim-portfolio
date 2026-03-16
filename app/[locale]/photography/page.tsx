"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionReveal from "@/components/SectionReveal";
import ScrollIndicator from "@/components/ScrollIndicator";

const cities = [
  { slug: "paris", name: "Paris" },
  { slug: "venice", name: "Venice" },
  { slug: "milano", name: "Milano" },
  { slug: "st-moritz", name: "St. Moritz" },
];

function CitySection({
  city,
  locale,
  exploreLabel,
}: {
  city: { slug: string; name: string };
  locale: string;
  exploreLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="min-h-[80vh] md:min-h-screen flex items-center py-16 md:py-24">
      <motion.div style={{ opacity }} className="w-full max-w-7xl mx-auto px-5 md:px-10 lg:px-6">
        <SectionReveal delay={0.1}>
          <h2
            style={{ fontSize: "clamp(2.5rem, 8vw, 8rem)" }}
            className="font-bold text-[var(--fg)] tracking-tighter mb-8 md:mb-12"
          >
            {city.name}
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
          {[1, 2, 3].map((n) => (
            <SectionReveal key={n} delay={n * 0.15}>
              <motion.div style={{ y: n === 2 ? y : undefined }}>
                <div
                  className="placeholder-image rounded-xl overflow-hidden w-full"
                  style={{
                    aspectRatio: n === 2 ? "3/4" : "4/3",
                  }}
                >
                  <span>{city.name} Photo {n}</span>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.5}>
          <Link
            href={`/${locale}/photography/${city.slug}`}
            className="inline-flex items-center gap-2 text-base md:text-lg font-medium text-accent hover:opacity-80 transition-opacity duration-300 py-2"
          >
            {exploreLabel}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </SectionReveal>
      </motion.div>
    </div>
  );
}

export default function PhotographyPage() {
  const t = useTranslations("photography");
  const { locale } = useParams();

  return (
    <>
      <section className="flex flex-col px-5 md:px-10 lg:px-6 pt-28 md:pt-36 pb-10 md:pb-16 gap-12 md:gap-0 md:min-h-[85vh] md:justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-start justify-between"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] font-mono">
            01 — Visual Archive
          </span>
          <Link
            href="https://instagram.com/framebyibrahim"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] md:text-xs uppercase tracking-widest text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-300"
          >
            @framebyibrahim ↗
          </Link>
        </motion.div>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ fontSize: "clamp(4rem, 17vw, 15rem)" }}
            className="font-bold tracking-tighter leading-[0.88] text-[var(--fg)]"
          >
            Photo-<br />graphy
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-5"
          >
            <p className="text-base md:text-lg text-[var(--fg-muted)] font-light italic max-w-xs">
              &ldquo;{t("tagline")}&rdquo;
            </p>
            <div className="flex gap-5 text-[10px] uppercase tracking-[0.25em] text-[var(--fg-muted)] font-mono">
              {cities.map((c, i) => (
                <span key={c.slug}>{String(i + 1).padStart(2, "0")} {c.name}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {cities.map((city) => (
        <CitySection
          key={city.slug}
          city={city}
          locale={locale as string}
          exploreLabel={t("explore")}
        />
      ))}
    </>
  );
}
