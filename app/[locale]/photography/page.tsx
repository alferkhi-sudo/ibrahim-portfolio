"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";

const cities = [
  { slug: "paris", name: "Paris" },
  { slug: "venice", name: "Venice" },
  { slug: "milano", name: "Milano" },
  { slug: "st-moritz", name: "St. Moritz" },
];

function CitySection({
  city,
}: {
  city: { slug: string; name: string };
}) {
  return (
    <div className="flex items-center py-10 md:py-14">
      <div className="w-full max-w-7xl mx-auto px-5 md:px-10 lg:px-6">
        <SectionReveal delay={0.1}>
          <h2
            style={{ fontSize: "clamp(2.5rem, 8vw, 8rem)" }}
            className="font-bold text-[var(--fg)] tracking-tighter mb-8 md:mb-12"
          >
            {city.name}
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.5}>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--fg-subtle)] font-mono py-2">
            Coming Soon
          </p>
        </SectionReveal>
      </div>
    </div>
  );
}

export default function PhotographyPage() {
  const t = useTranslations("photography");

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
        />
      ))}
    </>
  );
}
