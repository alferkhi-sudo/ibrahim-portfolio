"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: ReactNode;
  fullHeight?: boolean;
  overlay?: boolean;
}

export default function HeroSection({
  title,
  subtitle,
  backgroundImage,
  children,
  fullHeight = true,
  overlay = true,
}: HeroSectionProps) {
  return (
    <section
      className={`relative ${fullHeight ? "h-[70vh] md:h-screen" : "h-[50vh] md:h-[70vh]"} flex items-center justify-center overflow-hidden`}
    >
      {backgroundImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : (
        <div className="absolute inset-0 placeholder-image" />
      )}

      {overlay && (
        <div className="absolute inset-0 bg-[#0a0a0a]/50" />
      )}

      <div className="relative z-10 text-center px-5 md:px-6 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-bold text-white tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-white/60 font-light tracking-wide"
          >
            {subtitle}
          </motion.p>
        )}

        {children}
      </div>
    </section>
  );
}
