"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ReviewCardProps {
  title: string;
  year: number;
  rating: number;
  excerpt: string;
  poster: string;
  slug: string;
  locale: string;
}

export default function ReviewCard({
  title,
  year,
  rating,
  excerpt,
  poster,
  slug,
  locale,
}: ReviewCardProps) {
  return (
    <Link href={`/${locale}/movies/${slug}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="group cursor-pointer"
      >
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 md:mb-4 border border-[var(--border)]">
          {poster ? (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${poster})` }}
            />
          ) : (
            <div className="absolute inset-0 placeholder-image transition-transform duration-700 group-hover:scale-110">
              <span className="text-[var(--fg-subtle)]">{title}</span>
            </div>
          )}
        </div>

        <h3 className="text-base md:text-lg font-semibold text-[var(--fg)] tracking-tight">
          {title}
        </h3>

        <div className="flex items-center gap-2 md:gap-3 mt-1">
          <span className="text-xs md:text-sm text-[var(--fg-muted)]">{year}</span>
          <span className="text-xs md:text-sm font-medium text-accent">
            {rating}/10
          </span>
        </div>

        <p className="mt-1.5 md:mt-2 text-xs md:text-sm text-[var(--fg-muted)] leading-relaxed line-clamp-2">
          {excerpt}
        </p>
      </motion.div>
    </Link>
  );
}
