import type { PlantasksEvent } from "./types";

/** Midnight-normalized copy of a date (local time). */
export function dateOnly(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function addDays(d: Date, days: number): Date {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function addMonths(d: Date, months: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + months, 1);
}

/**
 * Full weeks (Sunday-first) covering the given month, including the
 * leading/trailing days borrowed from the previous/next month so every
 * row has exactly 7 days.
 */
export function getMonthMatrix(viewDate: Date): Date[][] {
  const firstOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const lastOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);

  const gridStart = addDays(firstOfMonth, -firstOfMonth.getDay());
  const trailing = 6 - lastOfMonth.getDay();
  const gridEnd = addDays(lastOfMonth, trailing);

  const weeks: Date[][] = [];
  let cursor = gridStart;
  while (cursor <= gridEnd) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(addDays(cursor, i));
    }
    weeks.push(week);
    cursor = addDays(cursor, 7);
  }
  return weeks;
}

/** True when the event spans more than one calendar day. */
export function isMultiDay(event: Pick<PlantasksEvent, "start_at" | "end_at">): boolean {
  const start = dateOnly(new Date(event.start_at));
  const end = dateOnly(new Date(event.end_at));
  return start.getTime() !== end.getTime();
}

export interface MultiDaySegment {
  event: PlantasksEvent;
  startCol: number; // 0-6, column within the week
  span: number; // number of columns
  lane: number; // vertical stacking row within the week's bar area
}

/**
 * Clips every multi-day event to each week row it intersects and assigns a
 * non-overlapping vertical "lane" per week (simple greedy interval packing —
 * lanes reset each week, which is standard month-view behavior).
 */
export function getMultiDaySegmentsByWeek(
  events: PlantasksEvent[],
  weeks: Date[][]
): MultiDaySegment[][] {
  const multiDay = events.filter(isMultiDay);

  return weeks.map((week) => {
    const weekStart = week[0];
    const weekEnd = week[6];

    const segments = multiDay
      .map((event) => {
        const evStart = dateOnly(new Date(event.start_at));
        const evEnd = dateOnly(new Date(event.end_at));
        if (evEnd < weekStart || evStart > weekEnd) return null;

        const clippedStart = evStart < weekStart ? weekStart : evStart;
        const clippedEnd = evEnd > weekEnd ? weekEnd : evEnd;
        const startCol = Math.round(
          (clippedStart.getTime() - weekStart.getTime()) / 86400000
        );
        const span =
          Math.round((clippedEnd.getTime() - clippedStart.getTime()) / 86400000) + 1;

        return { event, startCol, span, lane: 0 };
      })
      .filter((s): s is MultiDaySegment => s !== null)
      .sort((a, b) => a.startCol - b.startCol || b.span - a.span);

    const laneEnds: number[] = []; // last occupied column per lane
    for (const seg of segments) {
      let lane = laneEnds.findIndex((end) => end < seg.startCol);
      if (lane === -1) {
        lane = laneEnds.length;
        laneEnds.push(-1);
      }
      seg.lane = lane;
      laneEnds[lane] = seg.startCol + seg.span - 1;
    }

    return segments;
  });
}
