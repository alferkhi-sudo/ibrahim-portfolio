"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import BackgroundShapes from "./BackgroundShapes";

export default function InteractiveHero() {
  const grainRef            = useRef<SVGFETurbulenceElement>(null);
  const rafRef              = useRef<number>(0);
  const frameRef            = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  // Animate SVG feTurbulence seed → authentic film-grain flicker
  // Skip for users who prefer reduced motion
  useEffect(() => {
    if (prefersReducedMotion) return;

    const tick = () => {
      frameRef.current++;
      // Update every 3rd frame (~20 fps) for that classic grain feel
      if (frameRef.current % 3 === 0 && grainRef.current) {
        grainRef.current.setAttribute(
          "seed",
          String(Math.floor(Math.random() * 1000))
        );
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // Stop grain after 4.5 s — it has fully faded by then
    const stop = setTimeout(() => cancelAnimationFrame(rafRef.current), 4500);
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(stop);
    };
  }, [prefersReducedMotion]);

  return (
    <section className="relative h-[calc(10vh_+_79vw_+_116px)] md:h-screen bg-[var(--bg)] overflow-hidden">

      {/* Organic background shapes */}
      <BackgroundShapes />

      {/* ── LAYER 1 · Base portrait (always visible, never animated) ── */}
      <div className="absolute inset-0 flex items-end justify-center pb-8 md:pb-12">
        <div className="relative w-[88vw] md:w-[85vw] max-w-[1000px] h-[79vw] md:h-[80vh] overflow-hidden">
          <Image
            src="/images/hero/Portrait.png"
            alt="Ibrahim"
            fill
            className="object-contain object-center md:object-bottom"
            priority
            quality={100}
          />
        </div>
      </div>

      {/* ── LAYER 2 · Developing portrait — the film develop animation ── */}
      <motion.div
        className="absolute inset-0 flex items-end justify-center pb-8 md:pb-12 z-[4]"
        initial={prefersReducedMotion ? false : {
          filter:
            "brightness(0.12) saturate(0) sepia(1.8) blur(8px) contrast(2.4)",
          opacity: 0.85,
        }}
        animate={{
          filter: "brightness(1.02) saturate(1.0) sepia(0) blur(0px) contrast(1.0)",
          opacity: 1,
        }}
        transition={prefersReducedMotion ? { duration: 0 } : {
          duration: 3.6,
          ease: [0.22, 0.1, 0.22, 1.0],
        }}
      >
        <div className="relative w-[88vw] md:w-[85vw] max-w-[1000px] h-[79vw] md:h-[80vh] overflow-hidden">
          <Image
            src="/images/hero/Portrait-variant.png"
            alt="Ibrahim"
            fill
            className="object-contain object-center md:object-bottom"
            priority
            quality={100}
            style={{ filter: "brightness(1.08) saturate(1.05)" }}
          />
        </div>
      </motion.div>

      {/* ── LAYER 3 · Amber chemical wash (darkroom developer tray) ── */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 z-[5] pointer-events-none"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 4.0, ease: [0.4, 0, 0.15, 1], delay: 0 }}
          style={{
            background:
              "radial-gradient(ellipse 80% 90% at 50% 55%, rgba(195,128,38,0.58) 0%, rgba(135,65,12,0.68) 55%, rgba(70,22,4,0.78) 100%)",
          }}
        />
      )}

      {/* ── LAYER 4 · Dark vignette — lifts as image develops ── */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 z-[5] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2.8, ease: "easeOut", delay: 0.15 }}
          style={{
            background:
              "radial-gradient(ellipse 52% 62% at 50% 50%, transparent 20%, rgba(0,0,0,0.88) 100%)",
          }}
        />
      )}

      {/* ── LAYER 5 · Film grain (mix-blend overlay, fades out) ── */}
      <motion.div
        className="absolute inset-0 z-[6] pointer-events-none"
        initial={{ opacity: prefersReducedMotion ? 0 : 0.6 }}
        animate={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 4.2, ease: "easeIn", delay: 0.2 }}
        style={{ mixBlendMode: "overlay" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="film-grain-filter" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              ref={grainRef}
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="4"
              seed="2"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#film-grain-filter)"
            opacity="0.42"
          />
        </svg>
      </motion.div>

      {/* Top gradient — keeps navbar readable */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/20 to-transparent pointer-events-none z-[7]" />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[8%] md:h-[28%] pointer-events-none z-[7]"
        style={{ background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)" }}
      />

      {/* ── TEXT — slides in after image has developed ── */}
      <div className="absolute inset-0 flex items-start md:items-end justify-center md:justify-start pt-[10vh] md:pt-0 px-6 md:p-12 lg:p-16 pointer-events-none z-[20]">
        <div className="text-center md:text-left">
          <motion.h1
            className="font-black tracking-tighter leading-[0.85] uppercase"
            style={{ fontSize: "clamp(3rem, 12vw, 11rem)", color: "var(--fg)" }}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.3 : 1.0,
              delay: prefersReducedMotion ? 0 : 2.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            Ibrahim
          </motion.h1>

          <motion.p
            className="mt-2 md:mt-4 text-base md:text-lg tracking-wide text-center md:text-left"
            style={{ color: "#888" }}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.9, delay: prefersReducedMotion ? 0.1 : 2.6, ease: "easeOut" }}
          >
            Lens. Screen. Moments.
          </motion.p>
        </div>
      </div>

      {/* ── SCROLL INDICATOR — appears after everything settles ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 3.4, duration: 0.8 }}
      >
        <motion.svg
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--fg)"
          strokeWidth="1.5"
        >
          <path d="M7 10l5 5 5-5" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
