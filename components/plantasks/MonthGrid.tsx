"use client";

import type { PlantasksEvent } from "@/lib/plantasks/types";
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

export default function MonthGrid({
  viewDate,
  events,
  onSelectDay,
  onSelectEvent,
}: {
  viewDate: Date;
  events: PlantasksEvent[];
  onSelectDay: (date: Date) => void;
  onSelectEvent: (event: PlantasksEvent) => void;
}) {
  const weeks = getMonthMatrix(viewDate);
  const segmentsByWeek = getMultiDaySegmentsByWeek(events, weeks);
  const singleDayEvents = events.filter((e) => !isMultiDay(e));
  const today = new Date();

  return (
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
              <div className="grid grid-cols-7 gap-1">
                {week.map((date) => (
                  <DayCell
                    key={date.toISOString()}
                    date={date}
                    inCurrentMonth={isSameMonth(date, viewDate)}
                    isToday={isSameDay(date, today)}
                    events={singleDayEvents.filter((e) =>
                      isSameDay(new Date(e.start_at), date)
                    )}
                    topOffset={topOffset}
                    onSelectDay={onSelectDay}
                    onSelectEvent={onSelectEvent}
                  />
                ))}
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
                      onClick={() => onSelectEvent(segment.event)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
