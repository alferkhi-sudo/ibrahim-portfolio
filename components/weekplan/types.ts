export type Day = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
export type Category =
  | "WORK"
  | "TRAINING"
  | "MEALS"
  | "CREATIVE"
  | "WELLNESS_ERRAND"
  | "ROUTINE"
  | "FREE";

export type Activity = {
  id: string;
  day: Day;
  title: string;
  startTime: string;
  endTime: string;
  category: Category;
  isDefault: boolean;
};

export const DAYS: { value: Day; label: string; labelFr: string; short: string }[] = [
  { value: "MON", label: "Monday",    labelFr: "Lundi",    short: "Mon" },
  { value: "TUE", label: "Tuesday",   labelFr: "Mardi",    short: "Tue" },
  { value: "WED", label: "Wednesday", labelFr: "Mercredi", short: "Wed" },
  { value: "THU", label: "Thursday",  labelFr: "Jeudi",    short: "Thu" },
  { value: "FRI", label: "Friday",    labelFr: "Vendredi", short: "Fri" },
  { value: "SAT", label: "Saturday",  labelFr: "Samedi",   short: "Sat" },
  { value: "SUN", label: "Sunday",    labelFr: "Dimanche", short: "Sun" },
];

export const CATEGORIES: { value: Category; label: string; dot: string; bg: string; text: string; border: string }[] = [
  { value: "WORK",            label: "Work",           dot: "bg-blue-500",    bg: "bg-blue-500/15",   text: "text-blue-700 dark:text-blue-300",   border: "border-blue-500/30" },
  { value: "TRAINING",        label: "Training",       dot: "bg-green-500",   bg: "bg-green-500/15",  text: "text-green-700 dark:text-green-300",  border: "border-green-500/30" },
  { value: "MEALS",           label: "Meals",          dot: "bg-amber-500",   bg: "bg-amber-500/15",  text: "text-amber-700 dark:text-amber-300",  border: "border-amber-500/30" },
  { value: "CREATIVE",        label: "Creative",       dot: "bg-purple-500",  bg: "bg-purple-500/15", text: "text-purple-700 dark:text-purple-300", border: "border-purple-500/30" },
  { value: "WELLNESS_ERRAND", label: "Wellness/Errand",dot: "bg-pink-500",    bg: "bg-pink-500/15",   text: "text-pink-700 dark:text-pink-300",   border: "border-pink-500/30" },
  { value: "ROUTINE",         label: "Routine",        dot: "bg-gray-400",    bg: "bg-gray-400/15",   text: "text-gray-600 dark:text-gray-400",   border: "border-gray-400/30" },
  { value: "FREE",            label: "Free Time",      dot: "bg-transparent border border-blue-400", bg: "bg-transparent", text: "text-blue-500", border: "border-dashed border-blue-400/60" },
];

export function getCategoryStyle(cat: Category) {
  return CATEGORIES.find((c) => c.value === cat) ?? CATEGORIES[5];
}

export function timeToMin(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export function minToTime(m: number): string {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

// Grid constants
export const GRID_START = 390;  // 06:30 in minutes
export const GRID_END   = 1380; // 23:00 in minutes
export const PX_PER_MIN = 2;    // 2px per minute
export const TOTAL_HEIGHT = (GRID_END - GRID_START) * PX_PER_MIN; // 1980px
