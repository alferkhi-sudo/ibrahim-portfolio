"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface SectionBlockProps {
  title: string[];
  description?: string;
  href: string;
  comingSoon?: boolean;
}

export default function SectionBlock({
  title,
  description,
  href,
  comingSoon = false,
}: SectionBlockProps) {
  const content = (
    <motion.div
      whileHover={comingSoon ? {} : { scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`
        relative aspect-[4/3] md:aspect-[3/2] rounded-xl overflow-hidden
        bg-surface flex flex-col items-start justify-end p-6 md:p-10
        border border-white/5
        ${comingSoon ? "opacity-50" : "cursor-pointer group"}
      `}
    >
      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {comingSoon && (
          <span className="inline-block px-3 py-1 mb-4 text-[10px] font-medium tracking-[0.1em] uppercase text-accent border border-accent/30 rounded-full">
            Coming Soon
          </span>
        )}
        {title.map((line, i) => (
          <h2
            key={i}
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
            className="font-black text-white tracking-tighter leading-[0.9] uppercase"
          >
            {line}
          </h2>
        ))}
        {description && (
          <p className="mt-3 text-sm text-[#888888] max-w-xs">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );

  if (comingSoon) {
    return <div>{content}</div>;
  }

  return <Link href={href}>{content}</Link>;
}
