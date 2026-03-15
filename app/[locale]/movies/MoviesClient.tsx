"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionReveal from "@/components/SectionReveal";
import ReviewCard from "@/components/ReviewCard";
import ScrollIndicator from "@/components/ScrollIndicator";
import type { MovieFrontmatter } from "@/lib/mdx";

interface MoviesClientProps {
  movies: MovieFrontmatter[];
  locale: string;
}

const FEATURED_REVIEWS = [
  {
    title: "Romeria",
    year: 2025,
    rating: 8,
    excerpt: "A poignant and quietly devastating coming of age story that lingers long after the credits roll. Director Carla Simón crafts a film of deep emotional intelligence.",
    poster: "/images/movies/romeria.jpg",
    slug: "romeria",
  },
  {
    title: "500 Days of Summer",
    year: 2009,
    rating: 9,
    excerpt: "A raw, unfiltered depiction of love, expectation, and self-deception. The film explores how people act according to their true intentions, not their words.",
    poster: "/images/movies/500-days-of-summer.jpg",
    slug: "500-days-of-summer",
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function MoviesClient({ movies: _, locale }: MoviesClientProps) {
  const t = useTranslations("movies");
  const passionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: passionRef,
    offset: ["start end", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] md:h-screen flex items-center justify-center overflow-hidden bg-[var(--bg)]">
        <div className="absolute inset-0 placeholder-image opacity-20" />
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 md:mt-6 text-base md:text-xl text-white/50 font-light italic max-w-md mx-auto"
          >
            {t("heroTagline")}
          </motion.p>
        </div>
        <ScrollIndicator />
      </section>

      {/* Passion Section */}
      <section ref={passionRef} className="py-20 md:py-32 px-5 md:px-6 bg-[var(--bg)]">
        <motion.div
          style={{ opacity: textOpacity }}
          className="max-w-3xl mx-auto text-center"
        >
          <SectionReveal>
            <h2
              style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
              className="font-bold text-[var(--fg)] tracking-tight mb-8 md:mb-12"
            >
              {t("passionTitle")}
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <p className="text-base md:text-lg text-[var(--fg-muted)] leading-relaxed mb-6 md:mb-8">
              {t("passionText1")}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.4}>
            <p className="text-base md:text-lg text-[var(--fg-muted)] leading-relaxed mb-6 md:mb-8">
              {t("passionText2")}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.6}>
            <p className="text-base md:text-lg text-[var(--fg-muted)] leading-relaxed">
              {t("passionText3")}
            </p>
          </SectionReveal>
        </motion.div>
      </section>

      {/* Featured Reviews */}
      <section className="py-16 md:py-24 px-5 md:px-10 lg:px-6 bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <h2
              style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
              className="font-bold text-[var(--fg)] tracking-tight mb-10 md:mb-16 text-center"
            >
              {t("featuredReviews")}
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24">
            {FEATURED_REVIEWS.map((movie, i) => (
              <SectionReveal key={movie.slug} delay={i * 0.15}>
                <ReviewCard
                  title={movie.title}
                  year={movie.year}
                  rating={movie.rating}
                  excerpt={movie.excerpt}
                  poster={movie.poster}
                  slug={movie.slug}
                  locale={locale}
                />
              </SectionReveal>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="border-t border-[var(--border-md)] pt-16 md:pt-24">
            <SectionReveal>
              <h3
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
                className="font-bold text-[var(--fg)] tracking-tight mb-8 md:mb-12 text-center"
              >
                More Reviews
              </h3>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="text-center py-16 md:py-20">
                <div className="inline-block">
                  <span className="text-[var(--fg-muted)] text-base md:text-lg font-light tracking-wide">
                    Coming Soon
                  </span>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Letterboxd Link */}
          <SectionReveal delay={0.5}>
            <div className="text-center mt-12 md:mt-16">
              <a
                href="https://letterboxd.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-300 font-medium py-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="8" cy="12" r="4" opacity="0.8" />
                  <circle cx="16" cy="12" r="4" opacity="0.8" />
                </svg>
                {t("seeAllRatings")}
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
