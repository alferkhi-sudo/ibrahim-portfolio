"use client";

import { motion } from "framer-motion";
import { CATEGORY_COLORS } from "@/lib/plantasks/types";
import type { MultiDaySegment } from "@/lib/plantasks/calendarMath";

export const LANE_HEIGHT = 22;
export const LANE_GAP = 4;

export default function MultiDayBar({
  segment,
  onClick,
}: {
  segment: MultiDaySegment;
  onClick?: () => void;
}) {
  const { event, startCol, span, lane } = segment;
  const color = CATEGORY_COLORS[event.category];

  return (
    <motion.button
      onClick={onClick}
      layout
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="pointer-events-auto flex items-center overflow-hidden rounded-md px-1.5 text-left"
      style={{
        gridColumn: `${startCol + 1} / span ${span}`,
        gridRow: lane + 1,
        height: LANE_HEIGHT,
        backgroundColor: `${color}33`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.2), 0 0 10px 0 ${color}55`,
        borderLeft: `2px solid ${color}`,
      }}
    >
      <span className="truncate text-[11px] font-medium text-white/90">
        {event.title}
      </span>
    </motion.button>
  );
}
