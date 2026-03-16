"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

/* ─── Gradient or Image ─── */
function GradImg({
  gradient,
  image,
  imageRotation = 0,
  label = "",
  className = "",
  style = {},
}: {
  gradient?: string;
  image?: string;
  imageRotation?: number;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (image) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden ${className}`}
        style={{
          ...style,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          className="w-full h-full"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            transform: imageRotation ? `rotate(${imageRotation}deg)` : undefined,
            imageOrientation: "from-image",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ background: gradient, ...style }}
    >
      {label && (
        <span className="text-white/20 text-[10px] uppercase tracking-[0.3em] select-none font-medium">
          {label}
        </span>
      )}
    </div>
  );
}

/* ─── CTA button ─── */
function CTAButton({ label, href }: { label: string; href: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18 }}
      className="w-fit"
    >
      <Link
        href={href}
        className="inline-flex items-center gap-3 px-7 py-[14px] bg-[var(--fg)] text-[var(--bg)] text-[13px] font-bold uppercase tracking-[0.15em] rounded-full hover:bg-[#c8a97e] transition-colors duration-300 group"
      >
        {label}
        <span className="transition-transform duration-300 group-hover:translate-x-1 text-sm">
          →
        </span>
      </Link>
    </motion.div>
  );
}

/* ─── Types ─── */
interface SmallImg {
  gradient?: string;
  image?: string;
  label: string;
  rotation: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

interface BlockProps {
  label: string;
  titleLines: string[];
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  comingSoon?: boolean;
  badgeLabel?: string;
  reversed: boolean;
  mainGradient?: string;
  mainImage?: string;
  imageRotation?: number;
  smallImgs: SmallImg[];
  grayscale?: boolean;
  locale: string;
  hasDivider?: boolean;
}

/* ─── Individual editorial block ─── */
function EditorialBlock(p: BlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  /* Text column */
  const textCol = (
    <motion.div
      className="flex flex-col justify-center gap-5 md:gap-7 py-8 md:py-0"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Label */}
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--fg-muted)]">
        {p.label}
      </p>

      {/* Title lines */}
      <div>
        {p.titleLines.map((line, i) => {
          const isLast = i === p.titleLines.length - 1;
          return (
            <motion.h2
              key={i}
              style={{
                fontSize: "clamp(3rem, 6.5vw, 6.5rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
              }}
              className={`font-black uppercase ${
                isLast ? "text-[var(--fg-muted)]" : "text-[var(--fg)]"
              }`}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                delay: 0.1 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.h2>
          );
        })}
      </div>

      {/* Description */}
      <p className="text-[var(--fg-muted)] text-base md:text-[1.05rem] leading-relaxed max-w-[360px]">
        {p.description}
      </p>

      {/* CTA / coming-soon badge */}
      {p.comingSoon ? (
        <span className="inline-flex items-center gap-2.5 text-[var(--fg-muted)] w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--fg-muted)] animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
            {p.badgeLabel}
          </span>
        </span>
      ) : p.ctaLabel && p.ctaHref ? (
        <CTAButton label={p.ctaLabel} href={`/${p.locale}${p.ctaHref}`} />
      ) : null}
    </motion.div>
  );

  /* Image column */
  const imgCol = (
    /* Outer padding creates room for scattered images that overflow the main image */
    <div className="relative py-[10%] px-[6%]">
      <motion.div
        className="relative"
        style={{ y: imgY }}
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Main image */}
        <div
          className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl shadow-black/60"
          style={{
            aspectRatio: "4/5",
            maxHeight: "clamp(320px, 55vh, 540px)",
            filter: p.grayscale
              ? "grayscale(1) brightness(0.65)"
              : "none",
          }}
        >
          <GradImg gradient={p.mainGradient} image={p.mainImage} imageRotation={p.imageRotation} label="" className="w-full h-full" />
        </div>

        {/* Scattered small images */}
        {p.smallImgs.map((img, i) => (
          <motion.div
            key={i}
            className="absolute overflow-hidden rounded-xl shadow-xl shadow-black/50"
            style={{
              width: "36%",
              aspectRatio: "3/4",
              top: img.top,
              bottom: img.bottom,
              left: img.left,
              right: img.right,
              rotate: img.rotation,
              zIndex: 10,
              filter: p.grayscale
                ? "grayscale(1) brightness(0.55)"
                : "none",
            }}
            initial={{
              opacity: 0,
              scale: 0.75,
              rotate: (img.rotation || 0) - 10,
            }}
            whileInView={{ opacity: 1, scale: 1, rotate: img.rotation }}
            viewport={{ once: true }}
            transition={{
              duration: 0.85,
              delay: 0.3 + i * 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <GradImg
              gradient={img.gradient}
              image={img.image}
              label={img.label}
              className="w-full h-full"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <div
      ref={ref}
      className={`py-14 md:py-24 ${p.hasDivider ? "border-b border-[var(--border)]" : ""}`}
    >
      {/* ── Desktop: side-by-side ── */}
      <div
        className="hidden md:grid items-center gap-12 lg:gap-20"
        style={{ gridTemplateColumns: "45fr 55fr" }}
      >
        {p.reversed ? (
          <>
            <div>{imgCol}</div>
            <div>{textCol}</div>
          </>
        ) : (
          <>
            <div>{textCol}</div>
            <div>{imgCol}</div>
          </>
        )}
      </div>

      {/* ── Mobile: image top, text bottom ── */}
      <div className="md:hidden flex flex-col gap-4">
        {imgCol}
        {textCol}
      </div>
    </div>
  );
}

/* ─── Main export ─── */
export default function EditorialSections() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = useTranslations("home") as any;
  const { locale } = useParams() as { locale: string };

  const blocks: Omit<BlockProps, "locale">[] = [
    /* Block 1 — Photography (text left, image right) */
    {
      label: t("photoLabel"),
      titleLines: [t("photoTitle1"), t("photoTitle2"), t("photoTitle3")],
      description: t("photoDescLong"),
      ctaLabel: t("photoCtaLabel"),
      ctaHref: "/photography",
      reversed: false,
      mainImage: "/images/home/photography-main.JPG",
      smallImgs: [
        {
          image: "/images/home/photography-venice.JPG",
          label: "Venice",
          rotation: -3,
          top: "-10%",
          right: "-8%",
        },
        {
          image: "/images/home/photography-como.jpg",
          label: "Como",
          rotation: 4,
          bottom: "-8%",
          right: "-5%",
        },
      ],
      hasDivider: true,
    },

    /* Block 2 — Cinema (image left, text right) */
    {
      label: t("cinemaLabel"),
      titleLines: [t("cinemaTitle1"), t("cinemaTitle2"), t("cinemaTitle3")],
      description: t("cinemaDescLong"),
      ctaLabel: t("cinemaCtaLabel"),
      ctaHref: "/movies",
      reversed: true,
      mainImage: "/images/home/cinema-main.jpg",
      smallImgs: [
        {
          image: "/images/home/cinema-review.jpg",
          label: "Review",
          rotation: -5,
          bottom: "-8%",
          left: "-5%",
        },
      ],
      hasDivider: true,
    },

    /* Block 3 — Travel (text left, image right) */
    {
      label: t("travelLabel"),
      titleLines: [t("travelTitle1"), t("travelTitle2"), t("travelTitle3")],
      description: t("travelDescLong"),
      ctaLabel: t("travelCtaLabel"),
      ctaHref: "/travel",
      reversed: false,
      mainImage: "/images/home/travel-main.jpg",
      smallImgs: [
        {
          image: "/images/home/travel-city.JPG",
          label: "City",
          rotation: -4,
          top: "-10%",
          right: "-8%",
        },
        {
          image: "/images/home/travel-map.JPG",
          label: "Map",
          rotation: 3,
          bottom: "-8%",
          right: "-5%",
        },
      ],
      hasDivider: true,
    },

    /* Block 4 — Videography (image left, text right) — coming soon */
    {
      label: t("videoLabel"),
      titleLines: [t("videoTitle1"), t("videoTitle2")],
      description: t("videoDescLong"),
      comingSoon: true,
      badgeLabel: t("videoComingSoon"),
      reversed: true,
      mainGradient:
        "linear-gradient(160deg,#2a2a2a 0%,#1a1a1a 100%)",
      smallImgs: [
        {
          gradient:
            "linear-gradient(145deg,#3a3a3a 0%,#282828 100%)",
          label: "Video",
          rotation: 2,
          top: "-10%",
          left: "-8%",
        },
      ],
      grayscale: true,
      hasDivider: false,
    },
  ];

  return (
    <section className="page-px bg-[var(--bg)] overflow-visible">
      <div className="max-w-[1400px] mx-auto">
        {blocks.map((block, i) => (
          <EditorialBlock key={i} {...block} locale={locale} />
        ))}
      </div>
    </section>
  );
}
