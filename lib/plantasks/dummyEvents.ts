import type { PlantasksEvent } from "./types";
import { addDays } from "./calendarMath";

let counter = 0;
function id() {
  counter += 1;
  return `dummy-${counter}`;
}

function iso(d: Date, hours = 0, minutes = 0): string {
  const copy = new Date(d);
  copy.setHours(hours, minutes, 0, 0);
  return copy.toISOString();
}

/**
 * Hardcoded events anchored to "today" so the grid always has something to
 * show regardless of when this runs. Replaced by real Supabase rows in
 * Phase 5 — the shape matches PlantasksEvent exactly so the swap is a
 * drop-in.
 */
export function makeDummyEvents(): PlantasksEvent[] {
  const today = new Date();
  const now = new Date().toISOString();

  return [
    {
      id: id(),
      user_id: "dummy",
      title: "Morning gym",
      category: "workout",
      start_at: iso(today, 7, 0),
      end_at: iso(today, 8, 0),
      all_day: false,
      rrule: null,
      parent_event_id: null,
      excluded_dates: [],
      notes: null,
      created_at: now,
      updated_at: now,
    },
    {
      id: id(),
      user_id: "dummy",
      title: "Client call",
      category: "work",
      start_at: iso(today, 10, 30),
      end_at: iso(today, 11, 30),
      all_day: false,
      rrule: null,
      parent_event_id: null,
      excluded_dates: [],
      notes: null,
      created_at: now,
      updated_at: now,
    },
    {
      id: id(),
      user_id: "dummy",
      title: "Edit reel",
      category: "filming",
      start_at: iso(addDays(today, 1), 14, 0),
      end_at: iso(addDays(today, 1), 16, 0),
      all_day: false,
      rrule: null,
      parent_event_id: null,
      excluded_dates: [],
      notes: null,
      created_at: now,
      updated_at: now,
    },
    {
      id: id(),
      user_id: "dummy",
      title: "Normandy shoot trip",
      category: "filming",
      start_at: iso(addDays(today, 2)),
      end_at: iso(addDays(today, 4)),
      all_day: true,
      rrule: null,
      parent_event_id: null,
      excluded_dates: [],
      notes: "Bring the A7C II and both primes.",
      created_at: now,
      updated_at: now,
    },
    {
      id: id(),
      user_id: "dummy",
      title: "Dune: Part Two rewatch",
      category: "cinema",
      start_at: iso(addDays(today, 3), 20, 0),
      end_at: iso(addDays(today, 3), 22, 45),
      all_day: false,
      rrule: null,
      parent_event_id: null,
      excluded_dates: [],
      notes: null,
      created_at: now,
      updated_at: now,
    },
    {
      id: id(),
      user_id: "dummy",
      title: "Pottery class",
      category: "hobby",
      start_at: iso(addDays(today, 5), 18, 0),
      end_at: iso(addDays(today, 5), 20, 0),
      all_day: false,
      rrule: null,
      parent_event_id: null,
      excluded_dates: [],
      notes: null,
      created_at: now,
      updated_at: now,
    },
    {
      id: id(),
      user_id: "dummy",
      title: "Wind down",
      category: "sleep",
      start_at: iso(today, 23, 0),
      end_at: iso(addDays(today, 1), 7, 0),
      all_day: false,
      rrule: null,
      parent_event_id: null,
      excluded_dates: [],
      notes: null,
      created_at: now,
      updated_at: now,
    },
    {
      id: id(),
      user_id: "dummy",
      title: "Dentist",
      category: "other",
      start_at: iso(addDays(today, -2), 9, 0),
      end_at: iso(addDays(today, -2), 9, 30),
      all_day: false,
      rrule: null,
      parent_event_id: null,
      excluded_dates: [],
      notes: null,
      created_at: now,
      updated_at: now,
    },
  ];
}
