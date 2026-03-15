"use client";

import dynamic from "next/dynamic";
import InteractiveHero from "@/components/InteractiveHero";
import ScrollMarquee from "@/components/ScrollMarquee";

// Lazy-load below-the-fold components for faster initial page load
const ScrollRevealText  = dynamic(() => import("@/components/ScrollRevealText"));
const EditorialSections = dynamic(() => import("@/components/EditorialSections"));
const SocialFanOut      = dynamic(() => import("@/components/SocialFanOut"));

export default function HomePage() {
  return (
    <>
      {/* ─── INTERACTIVE HERO ─── */}
      <InteractiveHero />

      {/* ─── SCROLL MARQUEE ─── */}
      <ScrollMarquee />

      {/* ─── SCROLL REVEAL TEXT ─── */}
      <ScrollRevealText />

      {/* ─── EDITORIAL SECTION BLOCKS ─── */}
      <EditorialSections />

      {/* ─── SOCIAL FAN-OUT ─── */}
      <SocialFanOut />
    </>
  );
}
