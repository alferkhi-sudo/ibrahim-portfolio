import { RRule } from "rrule";
import type { PlantasksEvent } from "./types";
import { isSameDay } from "./calendarMath";

/**
 * A single event as rendered on the grid: either a real DB row (one-off or
 * an exception override) or a "virtual" occurrence generated on the fly
 * from a recurring base event's RRULE. Virtual occurrences are never
 * persisted directly — editing/deleting one either rewrites the base row
 * ("all events in series") or spins off a real exception row + excludes
 * that date from the base ("just this event").
 */
export interface EventOccurrence extends PlantasksEvent {
  isVirtual: boolean;
  seriesId: string | null;
}

/**
 * Expands every recurring base event (rrule set, not itself an exception)
 * into its occurrences within [rangeStart, rangeEnd], skipping dates in the
 * base's excluded_dates. One-off events and exception rows pass through
 * unchanged. The base row's own literal date is NEVER rendered directly —
 * it only ever appears via expansion, so all edits go through the
 * occurrence-scope flow instead of mutating a row the user never "sees".
 */
export function expandEvents(
  events: PlantasksEvent[],
  rangeStart: Date,
  rangeEnd: Date
): EventOccurrence[] {
  const result: EventOccurrence[] = [];

  for (const event of events) {
    if (event.rrule && !event.parent_event_id) {
      let rule: RRule;
      try {
        const options = RRule.parseString(event.rrule);
        rule = new RRule({ ...options, dtstart: new Date(event.start_at) });
      } catch {
        continue;
      }

      const durationMs = new Date(event.end_at).getTime() - new Date(event.start_at).getTime();
      const excludedDates = event.excluded_dates.map((d) => new Date(d));
      const occurrences = rule.between(rangeStart, rangeEnd, true);

      for (const occDate of occurrences) {
        if (excludedDates.some((ex) => isSameDay(ex, occDate))) continue;

        const start = occDate;
        const end = new Date(occDate.getTime() + durationMs);

        result.push({
          ...event,
          id: `${event.id}::${occDate.toISOString()}`,
          start_at: start.toISOString(),
          end_at: end.toISOString(),
          isVirtual: true,
          seriesId: event.id,
        });
      }
    } else {
      result.push({
        ...event,
        isVirtual: false,
        seriesId: event.parent_event_id,
      });
    }
  }

  return result;
}
