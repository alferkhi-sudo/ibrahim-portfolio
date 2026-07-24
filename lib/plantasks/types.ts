export const EVENT_CATEGORIES = [
  "work",
  "workout",
  "hobby",
  "cinema",
  "filming",
  "sleep",
  "other",
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export const CATEGORY_COLORS: Record<EventCategory, string> = {
  work: "#5B7FDE",
  workout: "#FF6B4A",
  hobby: "#F2B84B",
  cinema: "#E63950",
  filming: "#8B5CF6",
  sleep: "#6C7BFF",
  other: "#9AA3B2",
};

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  work: "Work",
  workout: "Workout",
  hobby: "Hobby",
  cinema: "Cinema",
  filming: "Filming",
  sleep: "Sleep",
  other: "Other",
};

export interface PlantasksEvent {
  id: string;
  user_id: string;
  title: string;
  category: EventCategory;
  start_at: string; // ISO timestamptz
  end_at: string; // ISO timestamptz
  all_day: boolean;
  rrule: string | null;
  parent_event_id: string | null;
  excluded_dates: string[];
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type NewPlantasksEvent = Omit<
  PlantasksEvent,
  "id" | "user_id" | "created_at" | "updated_at"
>;
