"use client";

import { motion } from "framer-motion";
import { EVENT_CATEGORIES, CATEGORY_COLORS, CATEGORY_LABELS, type EventCategory } from "@/lib/plantasks/types";

export default function CategoryLegend({
  hidden,
  onToggle,
}: {
  hidden: Set<EventCategory>;
  onToggle: (category: EventCategory) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {EVENT_CATEGORIES.map((category) => {
        const isHidden = hidden.has(category);
        const color = CATEGORY_COLORS[category];
        return (
          <motion.button
            key={category}
            onClick={() => onToggle(category)}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
              isHidden
                ? "border-white/10 text-white/30"
                : "border-white/15 text-white/80"
            }`}
            style={{
              backgroundColor: isHidden ? "transparent" : `${color}1a`,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: isHidden ? "#555" : color,
                boxShadow: isHidden ? "none" : `0 0 4px ${color}`,
              }}
            />
            {CATEGORY_LABELS[category]}
          </motion.button>
        );
      })}
    </div>
  );
}
