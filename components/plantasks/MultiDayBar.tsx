"use client";

import { motion } from "framer-motion";
import { CATEGORY_COLORS } from "@/lib/plantasks/types";
import type { MultiDaySegment } from "@/lib/plantasks/calendarMath";

export const LANE_HEIGHT = 22;
export const LANE_GAP = 4;

export default function MultiDayBar({
  segment,
  onClick,
  onResizeStart,
}: {
  segment: MultiDaySegment;
  onClick?: () => void;
  onResizeStart?: (edge: "start" | "end", clientX: number) => void;
}) {
  const { event, startCol, span, lane } = segment;
  const color = CATEGORY_COLORS[event.category];

  return (
    <motion.button
      onClick={onClick}
      layout
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="group pointer-events-auto relative flex items-center overflow-hidden rounded-md px-2.5 text-left"
      style={{
        gridColumn: `${startCol + 1} / span ${span}`,
        gridRow: lane + 1,
        height: LANE_HEIGHT,
        backgroundColor: `${color}33`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.2), 0 0 10px 0 ${color}55`,
        borderLeft: `2px solid ${color}`,
      }}
    >
      {/* Resize handles — widened invisible hit areas at each edge */}
      <span
        onPointerDown={(e) => {
          e.stopPropagation();
          onResizeStart?.("start", e.clientX);
        }}
        className="absolute inset-y-0 left-0 z-10 flex w-3 cursor-ew-resize items-center justify-center"
      >
        <span className="h-2/3 w-0.5 rounded-full bg-white/0 transition-colors group-hover:bg-white/40" />
      </span>

      <span className="truncate text-[11px] font-medium text-white/90">
        {event.title}
      </span>

      <span
        onPointerDown={(e) => {
          e.stopPropagation();
          onResizeStart?.("end", e.clientX);
        }}
        className="absolute inset-y-0 right-0 z-10 flex w-3 cursor-ew-resize items-center justify-center"
      >
        <span className="h-2/3 w-0.5 rounded-full bg-white/0 transition-colors group-hover:bg-white/40" />
      </span>
    </motion.button>
  );
}
