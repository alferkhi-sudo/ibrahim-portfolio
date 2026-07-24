"use client";

import { motion } from "framer-motion";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { PlantasksEvent } from "@/lib/plantasks/types";
import { CATEGORY_COLORS } from "@/lib/plantasks/types";

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function EventChip({
  event,
  onClick,
}: {
  event: PlantasksEvent;
  onClick?: (e: React.MouseEvent) => void;
}) {
  const color = CATEGORY_COLORS[event.category];
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: event.id,
    data: { event },
  });

  return (
    <motion.button
      ref={setNodeRef}
      onClick={onClick}
      layout
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="relative flex w-full items-center gap-1 overflow-hidden rounded-md px-1.5 py-[3px] text-left touch-none"
      style={{
        backgroundColor: `${color}26`, // ~15% opacity tint = frosted glass, not a flat sticker
        boxShadow: `0 0 8px 0 ${color}55`,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.3 : 1,
        zIndex: isDragging ? 10 : undefined,
      }}
      {...listeners}
      {...attributes}
    >
      <span
        className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 4px ${color}` }}
      />
      {!event.all_day && (
        <span className="flex-shrink-0 text-[10px] font-medium text-white/50">
          {formatTime(event.start_at)}
        </span>
      )}
      <span className="truncate text-[11px] font-medium text-white/90">
        {event.title}
      </span>
    </motion.button>
  );
}
