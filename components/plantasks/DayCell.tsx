"use client";

import { motion } from "framer-motion";
import { useDroppable } from "@dnd-kit/core";
import type { PlantasksEvent } from "@/lib/plantasks/types";
import EventChip from "./EventChip";

const MAX_VISIBLE_CHIPS = 3;

export default function DayCell({
  date,
  inCurrentMonth,
  isToday,
  events,
  topOffset,
  onSelectDay,
  onSelectEvent,
}: {
  date: Date;
  inCurrentMonth: boolean;
  isToday: boolean;
  events: PlantasksEvent[];
  topOffset: number;
  onSelectDay: (date: Date) => void;
  onSelectEvent: (event: PlantasksEvent) => void;
}) {
  const visible = events.slice(0, MAX_VISIBLE_CHIPS);
  const overflow = events.length - visible.length;

  const { setNodeRef, isOver } = useDroppable({
    id: date.toISOString(),
    data: { date },
  });

  return (
    <motion.div
      ref={setNodeRef}
      role="button"
      tabIndex={0}
      onClick={() => onSelectDay(date)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelectDay(date);
        }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`flex min-h-[92px] cursor-pointer flex-col items-stretch gap-0.5 rounded-xl border p-1.5 text-left transition-colors ${
        isOver
          ? "border-white/30 bg-white/[0.1]"
          : inCurrentMonth
            ? "border-white/5 bg-white/[0.03] hover:bg-white/[0.06]"
            : "border-transparent bg-transparent opacity-40"
      }`}
      style={{ paddingTop: topOffset + 6 }}
    >
      <span
        className={`mb-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold ${
          isToday ? "bg-white text-black" : "text-white/70"
        }`}
      >
        {date.getDate()}
      </span>

      <div className="flex flex-col gap-0.5">
        {visible.map((event) => (
          <EventChip
            key={event.id}
            event={event}
            onClick={(e) => {
              e.stopPropagation();
              onSelectEvent(event);
            }}
          />
        ))}
        {overflow > 0 && (
          <span className="px-1.5 text-[10px] font-medium text-white/40">
            +{overflow} more
          </span>
        )}
      </div>
    </motion.div>
  );
}
