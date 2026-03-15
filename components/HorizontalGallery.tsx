"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";

interface GalleryItem {
  src: string;
  label: string;
  year: string;
}

interface HorizontalGalleryProps {
  title?: string;
  items?: GalleryItem[];
}

const defaultItems: GalleryItem[] = [
  { src: "/images/photography/paris/1.jpg", label: "PARIS", year: "2024" },
  { src: "/images/photography/venice/1.jpg", label: "VENICE", year: "2024" },
  { src: "/images/photography/milano/1.jpg", label: "MILANO", year: "2024" },
  { src: "/images/photography/st-moritz/1.jpg", label: "ST. MORITZ", year: "2025" },
  { src: "/images/photography/paris/2.jpg", label: "PARIS", year: "2024" },
  { src: "/images/photography/venice/2.jpg", label: "VENICE", year: "2024" },
  { src: "/images/photography/milano/2.jpg", label: "MILANO", year: "2024" },
  { src: "/images/photography/st-moritz/2.jpg", label: "ST. MORITZ", year: "2025" },
];

export default function HorizontalGallery({
  title,
  items = defaultItems,
}: HorizontalGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 md:py-24">
      {title && (
        <div className="page-px mb-8 md:mb-12">
          <SectionReveal>
            <p className="caption mb-2">{title}</p>
          </SectionReveal>
        </div>
      )}

      <div
        ref={containerRef}
        className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing"
        style={{
          paddingLeft: "var(--page-px)",
          paddingRight: "var(--page-px)",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {items.map((item, i) => (
          <motion.div
            key={`${item.label}-${i}`}
            className="flex-none w-[72vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw]"
            style={{ scrollSnapAlign: "start" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center placeholder-image transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.src})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="mt-3">
              <p className="caption">
                {item.label} &mdash; {item.year}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
