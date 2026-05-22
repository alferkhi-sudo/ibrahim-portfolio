"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ActivityModal from "./ActivityModal";
import {
  Activity,
  Day,
  DAYS,
  CATEGORIES,
  getCategoryStyle,
  timeToMin,
  formatDuration,
  GRID_START,
  GRID_END,
  PX_PER_MIN,
  TOTAL_HEIGHT,
} from "./types";

// ─── Free time computation ────────────────────────────────────────────────────

function computeFreeTime(activities: Activity[]): number {
  const sorted = [...activities].sort(
    (a, b) => timeToMin(a.startTime) - timeToMin(b.startTime)
  );
  const wakeup = sorted.find((a) => a.title.toLowerCase().includes("wakeup"));
  const sleep  = sorted.find((a) => a.title.toLowerCase().includes("sleep"));
  if (!wakeup || !sleep) return 0;

  const dayStart = timeToMin(wakeup.endTime);
  const dayEnd   = timeToMin(sleep.startTime);
  const scheduled = sorted
    .filter((a) => !a.title.toLowerCase().includes("wakeup") && !a.title.toLowerCase().includes("sleep"))
    .reduce((acc, a) => acc + Math.max(0, timeToMin(a.endTime) - timeToMin(a.startTime)), 0);

  return Math.max(0, dayEnd - dayStart - scheduled);
}

// ─── Hour labels for the time axis ────────────────────────────────────────────

const HOUR_LABELS: { min: number; label: string }[] = [];
for (let m = GRID_START; m <= GRID_END; m += 60) {
  const h = Math.floor(m / 60);
  HOUR_LABELS.push({ min: m, label: `${String(h).padStart(2, "0")}:00` });
}

function minToTop(m: number): number {
  return (m - GRID_START) * PX_PER_MIN;
}

// ─── Activity block ───────────────────────────────────────────────────────────

function ActivityBlock({
  activity,
  onClick,
}: {
  activity: Activity;
  onClick: () => void;
}) {
  const style = getCategoryStyle(activity.category);
  const top    = minToTop(timeToMin(activity.startTime));
  const height = Math.max(
    (timeToMin(activity.endTime) - timeToMin(activity.startTime)) * PX_PER_MIN,
    20
  );
  const isFree = activity.category === "FREE";

  return (
    <button
      onClick={onClick}
      title={`${activity.title} ${activity.startTime}–${activity.endTime}`}
      className={`absolute left-0.5 right-0.5 rounded-md px-1.5 text-left transition-all hover:brightness-105 active:scale-[0.98] overflow-hidden group ${
        isFree
          ? `border ${style.border} bg-transparent ${style.text}`
          : `border ${style.border} ${style.bg} ${style.text}`
      }`}
      style={{ top, height }}
    >
      <span className="block truncate text-[10px] font-semibold leading-tight pt-0.5">
        {activity.title}
      </span>
      {height >= 32 && (
        <span className="block text-[9px] opacity-70 leading-tight">
          {activity.startTime}–{activity.endTime}
        </span>
      )}
    </button>
  );
}

// ─── Day column ───────────────────────────────────────────────────────────────

function DayColumn({
  day,
  activities,
  onAdd,
  onEdit,
}: {
  day: (typeof DAYS)[number];
  activities: Activity[];
  onAdd: () => void;
  onEdit: (a: Activity) => void;
}) {
  const freeMin = computeFreeTime(activities);

  return (
    <div className="flex flex-col min-w-[120px] flex-1">
      {/* Day header */}
      <div className="sticky top-0 z-10 bg-[var(--bg)] border-b border-[var(--border)] px-1 py-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--fg-muted)]">
          {day.short}
        </p>
        <button
          onClick={onAdd}
          title={`Add to ${day.label}`}
          className="mt-1 flex items-center justify-center w-6 h-6 mx-auto rounded-full border border-[var(--border-md)] text-[var(--fg-muted)] transition hover:border-accent hover:text-accent hover:bg-accent/10"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      {/* Grid body */}
      <div
        className="relative border-l border-[var(--border)]"
        style={{ height: TOTAL_HEIGHT }}
      >
        {/* Hour grid lines */}
        {HOUR_LABELS.map(({ min, label }) => (
          <div
            key={label}
            className="absolute left-0 right-0 border-t border-[var(--border)]"
            style={{ top: minToTop(min) }}
          />
        ))}

        {/* Activity blocks */}
        {activities.map((a) => (
          <ActivityBlock key={a.id} activity={a} onClick={() => onEdit(a)} />
        ))}
      </div>

      {/* Free time footer */}
      <div className="border-t border-[var(--border)] px-1 py-1.5 text-center">
        <p className="text-[9px] uppercase tracking-widest text-[var(--fg-subtle)]">Free</p>
        <p className="text-[11px] font-semibold text-blue-500">{formatDuration(freeMin)}</p>
      </div>
    </div>
  );
}

// ─── Mobile day accordion ─────────────────────────────────────────────────────

function MobileDaySection({
  day,
  activities,
  onAdd,
  onEdit,
}: {
  day: (typeof DAYS)[number];
  activities: Activity[];
  onAdd: () => void;
  onEdit: (a: Activity) => void;
}) {
  const [open, setOpen] = useState(true);
  const freeMin = computeFreeTime(activities);
  const sorted = [...activities].sort(
    (a, b) => timeToMin(a.startTime) - timeToMin(b.startTime)
  );

  return (
    <div className="border border-[var(--border)] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] transition"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">{day.label}</span>
          <span className="text-xs text-[var(--fg-muted)]">
            {formatDuration(freeMin)} free
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(); }}
            className="p-1 rounded-full border border-[var(--border-md)] text-[var(--fg-muted)] hover:border-accent hover:text-accent transition"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`text-[var(--fg-muted)] transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="divide-y divide-[var(--border)]">
          {sorted.map((a) => {
            const style = getCategoryStyle(a.category);
            return (
              <button
                key={a.id}
                onClick={() => onEdit(a)}
                className="w-full flex items-center gap-3 px-4 py-2.5 bg-[var(--bg)] hover:bg-[var(--bg-card)] transition text-left"
              >
                <span className={`h-2.5 w-2.5 rounded-sm flex-shrink-0 ${style.bg} border ${style.border}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{a.title}</p>
                  <p className="text-xs text-[var(--fg-muted)]">
                    {a.startTime} – {a.endTime}
                  </p>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${style.border} ${style.bg} ${style.text} flex-shrink-0`}>
                  {CATEGORIES.find((c) => c.value === a.category)?.label}
                </span>
              </button>
            );
          })}
          {sorted.length === 0 && (
            <p className="px-4 py-3 text-sm text-[var(--fg-subtle)]">No activities yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function WeekPlannerClient() {
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{
    open: boolean;
    day?: Day;
    activity?: Activity | null;
  }>({ open: false });

  const fetchActivities = useCallback(async () => {
    const res = await fetch("/api/weekplan/activities");
    if (res.status === 401) { router.push("/weekplan/login"); return; }
    setActivities(await res.json());
    setLoading(false);
  }, [router]);

  useEffect(() => { fetchActivities(); }, [fetchActivities]);

  function openAdd(day: Day) {
    setModal({ open: true, day, activity: null });
  }

  function openEdit(activity: Activity) {
    setModal({ open: true, day: activity.day, activity });
  }

  function closeModal() {
    setModal({ open: false });
  }

  async function handleSave(data: Omit<Activity, "id" | "isDefault">) {
    if (modal.activity) {
      // Edit
      const res = await fetch(`/api/weekplan/activities/${modal.activity.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const updated = await res.json();
      setActivities((prev) =>
        prev.map((a) => (a.id === modal.activity!.id ? updated : a))
      );
    } else {
      // Create
      const res = await fetch("/api/weekplan/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const created = await res.json();
      setActivities((prev) => [...prev, created]);
    }
    closeModal();
  }

  async function handleDelete() {
    if (!modal.activity) return;
    await fetch(`/api/weekplan/activities/${modal.activity.id}`, { method: "DELETE" });
    setActivities((prev) => prev.filter((a) => a.id !== modal.activity!.id));
    closeModal();
  }

  async function handleLogout() {
    await fetch("/api/weekplan-auth", { method: "DELETE" });
    router.push("/weekplan/login");
  }

  const byDay = (day: Day) => activities.filter((a) => a.day === day);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 md:px-6 h-14">
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-accent">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <h1 className="text-sm font-semibold tracking-tight">Week Planner</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="rounded-lg border border-[var(--border-md)] px-3 py-1.5 text-xs font-medium text-[var(--fg-muted)] transition hover:border-[var(--fg-subtle)] hover:text-[var(--fg)]"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Legend */}
        <div className="border-b border-[var(--border)] bg-[var(--bg-card)] px-4 md:px-6 py-2">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {CATEGORIES.filter((c) => c.value !== "FREE").map((cat) => (
              <div key={cat.value} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-sm ${cat.bg} border ${cat.border}`} />
                <span className="text-[10px] text-[var(--fg-muted)]">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
        ) : (
          <>
            {/* Desktop: 7-col grid */}
            <div className="hidden md:flex flex-1 overflow-x-auto">
              {/* Time axis */}
              <div className="sticky left-0 z-10 w-14 flex-shrink-0 bg-[var(--bg)] border-r border-[var(--border)]">
                {/* Header spacer */}
                <div className="h-[56px] border-b border-[var(--border)]" />
                {/* Hour labels */}
                <div className="relative" style={{ height: TOTAL_HEIGHT }}>
                  {HOUR_LABELS.map(({ min, label }) => (
                    <div
                      key={label}
                      className="absolute right-2 -translate-y-2"
                      style={{ top: minToTop(min) }}
                    >
                      <span className="text-[9px] text-[var(--fg-subtle)] font-mono">{label}</span>
                    </div>
                  ))}
                </div>
                {/* Footer spacer */}
                <div className="h-8 border-t border-[var(--border)]" />
              </div>

              {/* Day columns */}
              {DAYS.map((day) => (
                <DayColumn
                  key={day.value}
                  day={day}
                  activities={byDay(day.value)}
                  onAdd={() => openAdd(day.value)}
                  onEdit={openEdit}
                />
              ))}
            </div>

            {/* Mobile: vertical accordion */}
            <div className="md:hidden flex flex-col gap-3 p-4">
              {DAYS.map((day) => (
                <MobileDaySection
                  key={day.value}
                  day={day}
                  activities={byDay(day.value)}
                  onAdd={() => openAdd(day.value)}
                  onEdit={openEdit}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {modal.open && (
        <ActivityModal
          initialDay={modal.day}
          activity={modal.activity}
          onSave={handleSave}
          onDelete={modal.activity ? handleDelete : undefined}
          onClose={closeModal}
        />
      )}
    </>
  );
}
