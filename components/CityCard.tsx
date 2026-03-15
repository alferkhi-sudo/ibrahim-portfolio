"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface CityCardProps {
  name: string;
  subtitle?: string;
  image: string;
  href: string;
  comingSoon?: boolean;
}

export default function CityCard({ name, subtitle, image, href, comingSoon }: CityCardProps) {
  const card = (
    <motion.div
      whileHover={comingSoon ? undefined : { scale: 1.03 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative aspect-[4/5] rounded-xl overflow-hidden border border-white/5 ${comingSoon ? "cursor-default" : "cursor-pointer group"}`}
    >
      {image ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
      ) : (
        <div className="absolute inset-0 placeholder-image transition-transform duration-700 group-hover:scale-110" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {comingSoon && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <span className="text-xs uppercase tracking-widest text-white/60 border border-white/20 px-4 py-2 rounded-full">
            Coming Soon
          </span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight">
          {name}
        </h3>
        {subtitle && (
          <p className="mt-1 text-xs md:text-sm text-white/50 font-light">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );

  if (comingSoon) return card;

  return <Link href={href}>{card}</Link>;
}
