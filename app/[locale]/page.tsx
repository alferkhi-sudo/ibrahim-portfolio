"use client";

import InteractiveHero from "@/components/InteractiveHero";
import ScrollMarquee from "@/components/ScrollMarquee";
import ScrollRevealText from "@/components/ScrollRevealText";
import EditorialSections from "@/components/EditorialSections";
import SocialFanOut from "@/components/SocialFanOut";

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
