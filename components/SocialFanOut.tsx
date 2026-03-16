"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { cloudinary } from "@/lib/cloudinary";

/* Tiny dark placeholder shown while each card image loads */
const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+";

/* ─── Card data (with real images) ─── */
const CARDS = [
  {
    id: 0,
    image: cloudinary("images/home/social-5"),
    label: "MIDNIGHT",
  },
  {
    id: 1,
    image: cloudinary("images/home/social-3"),
    label: "LA HAINE",
  },
  {
    id: 2,
    image: cloudinary("images/home/social-2"),
    label: "VENICE",
  },
  {
    id: 3,
    image: cloudinary("images/home/social-0"),
    label: "PARIS",
  },
  {
    id: 4,
    image: cloudinary("images/home/social-1"),
    label: "ST. MORITZ",
  },
  {
    id: 5,
    image: cloudinary("images/home/social-6"),
    label: "VENEZIA",
  },
  {
    id: 6,
    image: cloudinary("images/home/social-4"),
    label: "PORTRAIT",
  },
];

/* Rotation + x-offset configs */
const DESKTOP = {
  angles:  [-18, -12, -5,  0,  5,  12, 18],
  xSteps:  [-240, -160, -80, 0, 80, 160, 240],
  zBase:   [1,  2,  3,  7,  3,  2,  1],
  cardW:   190,
};

const MOBILE = {
  angles:  [-12, -6,  0,  6,  12],
  xSteps:  [-100, -50, 0,  50, 100],
  zBase:   [1,  2,  7,  2,  1],
  cardW:   118,
  slice:   [1, 6] as [number, number], // indices from CARDS
};

/* Push amount when a card is hovered */
function getPush(i: number, hovered: number | null): number {
  if (hovered === null || i === hovered) return 0;
  const dist = i - hovered;
  const dir  = dist < 0 ? -1 : 1;
  const abs  = Math.abs(dist);
  return dir * (abs === 1 ? 14 : abs === 2 ? 8 : 4);
}

/* ─── Main component ─── */
export default function SocialFanOut() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = useTranslations("home") as any;

  const [isMobile, setIsMobile]   = useState(false);
  const [hovered,  setHovered]    = useState<number | null>(null);
  /* Track whether the fan-out animation has finished so hover
     responses use instant transitions instead of staggered ones */
  const [ready, setReady]         = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView     = useInView(containerRef, { once: true, margin: "-120px" });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    let timeout: ReturnType<typeof setTimeout>;
    const check = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMobile(window.innerWidth < 768), 150);
    };
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("resize", check);
      clearTimeout(timeout);
    };
  }, []);

  /* Mark as ready after fan-out completes (~1.2 s max stagger) */
  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setReady(true), 1400);
    return () => clearTimeout(t);
  }, [isInView]);

  const cfg   = isMobile ? MOBILE : DESKTOP;
  const cards = isMobile ? CARDS.slice(...MOBILE.slice) : CARDS;

  const cardW  = cfg.cardW;
  const cardH  = Math.round(cardW * (4 / 3));
  /* Container tall enough to absorb the hover lift (-20px) + card height */
  const wrapH  = cardH + 60;

  const socials = [
    { name: "LETTERBOXD", href: "https://letterboxd.com/ibra14" },
    { name: "INSTAGRAM",  href: "https://instagram.com/ibrahimferkh"  },
    { name: "X",          href: "https://x.com/ibrahimferkh"          },
  ];

  return (
    <section className="bg-[var(--bg-card)] py-20 md:py-32 overflow-hidden">
      {/* ── Title ── */}
      <div className="page-px text-center mb-14 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Camera icon */}
          <div className="flex justify-center mb-6">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[var(--fg-subtle)]"
            >
              <rect
                x="2" y="5" width="20" height="15" rx="3"
                stroke="currentColor" strokeWidth="1.5"
              />
              <circle
                cx="12" cy="12.5" r="3.5"
                stroke="currentColor" strokeWidth="1.5"
              />
              <path
                d="M8 5L9.5 2.5h5L16 5"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              />
            </svg>
          </div>

          <h2
            style={{
              fontSize: "clamp(3rem, 7.5vw, 7rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
            }}
            className="font-black uppercase text-[var(--fg)]"
          >
            {t("socialsTitle1")}
          </h2>
          <h2
            style={{
              fontSize: "clamp(3rem, 7.5vw, 7rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
            }}
            className="font-light uppercase text-[var(--fg-muted)]"
          >
            {t("socialsTitle2")}
          </h2>
        </motion.div>
      </div>

      {/* ── Card fan ── */}
      <div ref={containerRef} className="relative flex justify-center px-4">
        <div
          className="relative w-full"
          style={{ maxWidth: 840, height: wrapH }}
        >
          {cards.map((card, i) => {
            const angle    = cfg.angles[i];
            const baseX    = cfg.xSteps[i];
            const pushX    = ready ? getPush(i, hovered) : 0;
            const isHov    = hovered === i;
            const zIdx     = isHov ? 50 : cfg.zBase[i];

            /* Fan-out delay only on the initial entrance animation */
            const delay    = ready ? 0 : i * 0.065;

            return (
              <motion.div
                key={card.id}
                className="absolute cursor-pointer"
                style={{
                  left:       "50%",
                  top:        "50%",
                  width:      cardW,
                  height:     cardH,
                  marginLeft: -cardW / 2,
                  marginTop:  -cardH / 2,
                  zIndex:     zIdx,
                }}
                animate={
                  isInView
                    ? {
                        x:       baseX + pushX,
                        y:       isHov ? -20 : 0,
                        rotate:  angle,
                        scale:   isHov ? 1.08 : 1,
                        opacity: 1,
                      }
                    : { x: 0, y: 0, rotate: 0, scale: 0.8, opacity: 0 }
                }
                initial={false}
                transition={{
                  x:       { duration: ready ? 0.28 : 0.65, delay, ease: [0.22, 1, 0.36, 1] },
                  y:       { duration: 0.28, ease: "easeOut" },
                  rotate:  { duration: ready ? 0.28 : 0.65, delay, ease: [0.22, 1, 0.36, 1] },
                  scale:   { duration: 0.25, ease: "easeOut" },
                  opacity: { duration: 0.4, delay },
                }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={()  => setHovered(null)}
              >
                <div
                  className="relative w-full h-full rounded-[18px] overflow-hidden"
                  style={{
                    boxShadow:   isHov
                      ? "0 24px 64px rgba(0,0,0,0.22), 0 8px 20px rgba(0,0,0,0.14)"
                      : "0 8px 28px rgba(0,0,0,0.13), 0 2px 6px rgba(0,0,0,0.08)",
                    transition:  "box-shadow 0.3s ease",
                  }}
                >
                  <Image
                    src={card.image}
                    alt={card.label}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 150px, 200px"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Follow text + links ── */}
      <div className="page-px mt-20 md:mt-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[var(--fg-muted)] text-lg md:text-xl italic font-light mb-8">
            {t("socialsFollow")}
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-[11px] md:text-[13px] font-bold uppercase tracking-[0.22em] text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors duration-300 group"
              >
                {s.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[var(--fg)] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
