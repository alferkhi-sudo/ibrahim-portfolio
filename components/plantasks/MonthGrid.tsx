"use client";

import { useEffect, useRef, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { CATEGORY_COLORS } from "@/lib/plantasks/types";
import type { EventOccurrence } from "@/lib/plantasks/recurrence";
import {
  getMonthMatrix,
  getMultiDaySegmentsByWeek,
  isMultiDay,
  isSameDay,
  isSameMonth,
} from "@/lib/plantasks/calendarMath";
import DayCell from "./DayCell";
import MultiDayBar, { LANE_HEIGHT, LANE_GAP } from "./MultiDayBar";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const GRID_GAP_PX = 4; // Tailwind gap-1

export default function MonthGrid({
  viewDate,
  events,
  onSelectDay,
  onSelectEvent,
  onMoveEvent,
  onResizeEvent,
}: {
  viewDate: Date;
  events: EventOccurrence[];
  onSelectDay: (date: Date) => void;
  onSelectEvent: (event: EventOccurrence) => void;
  onMoveEvent: (event: EventOccurrence, newDate: Date) => void;
  onResizeEvent: (event: EventOccurrence, edge: "start" | "end", dayDelta: number) => void;
}) {
  const weeks = getMonthMatrix(viewDate);
  const segmentsByWeek = getMultiDaySegmentsByWeek(events, weeks);
  const singleDayEvents = events.filter((e) => !isMultiDay(e));
  const today = new Date();

  const gridRowRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);
  const [activeDragEvent, setActiveDragEvent] = useState<EventOccurrence | null>(null);
  const [resizing, setResizing] = useState<{
    event: EventOccurrence;
    edge: "start" | "end";
    startX: number;
  } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  useEffect(() => {
    if (!resizing) return;

    document.body.style.cursor = "ew-resize";

    function handleUp(e: PointerEvent) {
      if (!resizing) return;
      const width = gridRowRef.current?.getBoundingClientRect().width ?? 560;
      const dayWidth = (width - GRID_GAP_PX * 6) / 7;
      const dayDelta = Math.round((e.clientX - resizing.startX) / dayWidth);
      onResizeEvent(resizing.event, resizing.edge, dayDelta);
      setResizing(null);
    }

    window.addEventListener("pointerup", handleUp);
    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("pointerup", handleUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resizing]);

  // Bring today into view (away from the fixed tab bar/app-bar) whenever
  // the visible month changes to include it — the grid is taller than most
  // viewports, so without this "today" can land right behind the tab bar.
  useEffect(() => {
    const id = setTimeout(() => {
      todayRef.current?.scrollIntoView({ block: "center", behavior: "instant" as ScrollBehavior });
    }, 150);
    return () => clearTimeout(id);
  }, [viewDate]);

  function handleDragStart(e: DragStartEvent) {
    setActiveDragEvent((e.active.data.current?.event as EventOccurrence) ?? null);
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveDragEvent(null);
    const { active, over } = e;
    if (!over) return;
    const draggedEvent = active.data.current?.event as EventOccurrence | undefined;
    if (!draggedEvent) return;
    onMoveEvent(draggedEvent, new Date(over.id as string));
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-2">
        {/* Weekday header */}
        <div className="grid grid-cols-7 px-1">
          {WEEKDAY_LABELS.map((label) => (
            <span
              key={label}
              className="text-center text-[10px] font-semibold uppercase tracking-wider text-white/35"
            >
              {label}
            </span>
          ))}
        </div>

        {/* Weeks */}
        <div className="flex flex-col gap-1.5">
          {weeks.map((week, weekIndex) => {
            const segments = segmentsByWeek[weekIndex];
            const laneCount = segments.reduce((max, s) => Math.max(max, s.lane + 1), 0);
            const barsHeight = laneCount > 0 ? laneCount * LANE_HEIGHT + (laneCount - 1) * LANE_GAP : 0;
            // Reserve space in the day cell for the bars, plus the same 6px
            // breathing room the cell already gives itself above its content.
            const topOffset = barsHeight > 0 ? barsHeight + 6 : 0;

            return (
              <div key={weekIndex} className="relative">
                <div ref={weekIndex === 0 ? gridRowRef : undefined} className="grid grid-cols-7 gap-1">
                  {week.map((date) => {
                    const isToday = isSameDay(date, today);
                    return (
                      <div key={date.toISOString()} ref={isToday ? todayRef : undefined}>
                        <DayCell
                          date={date}
                          inCurrentMonth={isSameMonth(date, viewDate)}
                          isToday={isToday}
                          events={singleDayEvents.filter((e) =>
                            isSameDay(new Date(e.start_at), date)
                          )}
                          topOffset={topOffset}
                          onSelectDay={onSelectDay}
                          onSelectEvent={(event) => onSelectEvent(event as EventOccurrence)}
                        />
                      </div>
                    );
                  })}
                </div>

                {laneCount > 0 && (
                  <div
                    className="pointer-events-none absolute inset-x-0 grid grid-cols-7 gap-1"
                    style={{
                      top: 6,
                      gridTemplateRows: `repeat(${laneCount}, ${LANE_HEIGHT}px)`,
                      rowGap: LANE_GAP,
                      height: barsHeight,
                    }}
                  >
                    {segments.map((segment) => (
                      <MultiDayBar
                        key={segment.event.id}
                        segment={segment}
                        onClick={() => onSelectEvent(segment.event as EventOccurrence)}
                        onResizeStart={(edge, clientX) =>
                          setResizing({ event: segment.event as EventOccurrence, edge, startX: clientX })
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <DragOverlay>
        {activeDragEvent && (
          <div
            className="flex items-center gap-1 rounded-md px-1.5 py-[3px] text-[11px] font-medium text-white shadow-lg"
            style={{
              backgroundColor: `${CATEGORY_COLORS[activeDragEvent.category]}55`,
              boxShadow: `0 4px 16px 0 ${CATEGORY_COLORS[activeDragEvent.category]}aa`,
            }}
          >
            {activeDragEvent.title}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
