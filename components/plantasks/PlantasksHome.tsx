"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppShell from "./AppShell";
import AppBackground from "./AppBackground";
import MonthGrid from "./MonthGrid";
import CategoryLegend from "./CategoryLegend";
import DayDetailSheet from "./DayDetailSheet";
import GlassPanel from "./GlassPanel";
import SignOutButton from "./SignOutButton";
import { addDays, addMonths, dateOnly, getMonthMatrix, isSameDay } from "@/lib/plantasks/calendarMath";
import { fetchEvents, createEvent, updateEvent, deleteEvent } from "@/lib/plantasks/api";
import { expandEvents, type EventOccurrence } from "@/lib/plantasks/recurrence";
import type { EventCategory, NewPlantasksEvent, PlantasksEvent } from "@/lib/plantasks/types";

export default function PlantasksHome({ email, userId }: { email?: string; userId: string }) {
  const [activeTab, setActiveTab] = useState<"today" | "calendar">("calendar");
  const [viewDate, setViewDate] = useState(() => new Date());
  const [events, setEvents] = useState<PlantasksEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hidden, setHidden] = useState<Set<EventCategory>>(new Set());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch(() => setError("Couldn't load your events. Try refreshing."))
      .finally(() => setLoading(false));
  }, []);

  const monthLabel = useMemo(
    () => viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    [viewDate]
  );

  const expandedEvents = useMemo(() => {
    const weeks = getMonthMatrix(viewDate);
    const rangeStart = weeks[0][0];
    const rangeEnd = weeks[weeks.length - 1][6];
    return expandEvents(events, rangeStart, rangeEnd);
  }, [events, viewDate]);

  const visibleEvents = useMemo(
    () => expandedEvents.filter((e) => !hidden.has(e.category)),
    [expandedEvents, hidden]
  );

  const selectedDayEvents = useMemo(() => {
    if (!selectedDate) return [];
    return visibleEvents
      .filter((e) => {
        const start = new Date(e.start_at);
        const end = new Date(e.end_at);
        const day = selectedDate;
        return (
          (start <= day && end >= day) || isSameDay(start, day) || isSameDay(end, day)
        );
      })
      .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());
  }, [selectedDate, visibleEvents]);

  function toggleCategory(category: EventCategory) {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  async function handleCreate(newEvent: NewPlantasksEvent) {
    try {
      const created = await createEvent(userId, newEvent);
      setEvents((prev) => [...prev, created]);
    } catch {
      setError("Couldn't save that event. Try again.");
    }
  }

  async function handleUpdate(id: string, patch: Partial<PlantasksEvent>) {
    try {
      const updated = await updateEvent(id, patch);
      setEvents((prev) => prev.map((e) => (e.id === id ? updated : e)));
    } catch {
      setError("Couldn't save your changes. Try again.");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch {
      setError("Couldn't delete that event. Try again.");
    }
  }

  // Excludes this occurrence's date from its base series and spins off a
  // standalone exception row carrying `patch`. Shared by the day sheet's
  // "just this event" scope and by drag/resize, which always act on a
  // single occurrence regardless of whether it came from a series.
  async function createExceptionOverride(occurrence: EventOccurrence, patch: Partial<PlantasksEvent>) {
    const base = events.find((e) => e.id === occurrence.seriesId);
    if (!base) return;
    try {
      await updateEvent(base.id, {
        excluded_dates: [...base.excluded_dates, occurrence.start_at],
      });
      const created = await createEvent(userId, {
        title: patch.title ?? occurrence.title,
        category: patch.category ?? occurrence.category,
        start_at: patch.start_at ?? occurrence.start_at,
        end_at: patch.end_at ?? occurrence.end_at,
        all_day: patch.all_day ?? occurrence.all_day,
        rrule: null,
        parent_event_id: base.id,
        excluded_dates: [],
        notes: patch.notes ?? occurrence.notes,
      });
      setEvents((prev) => [
        ...prev.map((e) =>
          e.id === base.id ? { ...e, excluded_dates: [...e.excluded_dates, occurrence.start_at] } : e
        ),
        created,
      ]);
    } catch {
      setError("Couldn't update this occurrence. Try again.");
    }
  }

  async function handleEditOccurrence(
    occurrence: EventOccurrence,
    patch: Partial<PlantasksEvent>,
    scope: "this" | "all"
  ) {
    // Non-virtual rows (one-offs and existing exceptions) are already
    // isolated to a single date — just edit the row directly regardless
    // of the scope the sheet resolved (it only prompts for virtual ones).
    if (!occurrence.isVirtual) {
      return handleUpdate(occurrence.id, patch);
    }
    if (scope === "all") {
      return handleUpdate(occurrence.seriesId!, patch);
    }
    return createExceptionOverride(occurrence, patch);
  }

  // Drag-to-move a single-day chip to a new date (same time-of-day).
  // Dragging one instance of a recurring series always moves just that
  // instance — moving the whole series is a deliberate edit-sheet action,
  // not something a quick drag should silently do.
  async function handleMoveEvent(occurrence: EventOccurrence, newDate: Date) {
    const dayDelta = Math.round(
      (dateOnly(newDate).getTime() - dateOnly(new Date(occurrence.start_at)).getTime()) / 86400000
    );
    if (dayDelta === 0) return;

    const patch = {
      start_at: addDays(new Date(occurrence.start_at), dayDelta).toISOString(),
      end_at: addDays(new Date(occurrence.end_at), dayDelta).toISOString(),
    };

    if (occurrence.isVirtual) {
      return createExceptionOverride(occurrence, patch);
    }
    return handleUpdate(occurrence.id, patch);
  }

  // Edge-resize a multi-day bar — extends/shrinks the span by whole days,
  // never touching time-of-day. Clamped so the dragged edge can't cross
  // the fixed one.
  async function handleResizeEvent(occurrence: EventOccurrence, edge: "start" | "end", dayDelta: number) {
    if (dayDelta === 0) return;

    const start = new Date(occurrence.start_at);
    const end = new Date(occurrence.end_at);

    let newStart = start;
    let newEnd = end;
    if (edge === "start") {
      newStart = addDays(start, dayDelta);
      if (dateOnly(newStart) > dateOnly(end)) newStart = new Date(end.getFullYear(), end.getMonth(), end.getDate(), start.getHours(), start.getMinutes());
    } else {
      newEnd = addDays(end, dayDelta);
      if (dateOnly(newEnd) < dateOnly(start)) newEnd = new Date(start.getFullYear(), start.getMonth(), start.getDate(), end.getHours(), end.getMinutes());
    }

    const patch = { start_at: newStart.toISOString(), end_at: newEnd.toISOString() };

    if (occurrence.isVirtual) {
      return createExceptionOverride(occurrence, patch);
    }
    return handleUpdate(occurrence.id, patch);
  }

  async function handleDeleteOccurrence(occurrence: EventOccurrence, scope: "this" | "all") {
    if (!occurrence.isVirtual) {
      return handleDelete(occurrence.id);
    }

    if (scope === "all") {
      return handleDelete(occurrence.seriesId!);
    }

    // scope === "this": soft-delete just this date from the base series.
    const base = events.find((e) => e.id === occurrence.seriesId);
    if (!base) return;
    await handleUpdate(base.id, { excluded_dates: [...base.excluded_dates, occurrence.start_at] });
  }

  function goToday() {
    const today = new Date();
    setViewDate(today);
    setActiveTab("today");
    setSelectedDate(today);
  }

  return (
    <>
      <AppBackground />
      <AppShell
        title={monthLabel}
        onPrev={() => setViewDate((d) => addMonths(d, -1))}
        onNext={() => setViewDate((d) => addMonths(d, 1))}
        onSettings={() => setSettingsOpen((v) => !v)}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === "today") goToday();
        }}
        onAdd={() => setSelectedDate(new Date())}
      >
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          <CategoryLegend hidden={hidden} onToggle={toggleCategory} />

          {error && (
            <div className="flex items-center justify-between rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
              <button onClick={() => setError(null)} className="text-red-200/60 hover:text-red-100">
                ✕
              </button>
            </div>
          )}

          {loading ? (
            <p className="py-12 text-center text-sm text-white/30">Loading your calendar…</p>
          ) : (
            <MonthGrid
              viewDate={viewDate}
              events={visibleEvents}
              onSelectDay={setSelectedDate}
              onSelectEvent={(event) => setSelectedDate(new Date(event.start_at))}
              onMoveEvent={handleMoveEvent}
              onResizeEvent={handleResizeEvent}
            />
          )}
        </div>
      </AppShell>

      <DayDetailSheet
        date={selectedDate}
        events={selectedDayEvents}
        onClose={() => setSelectedDate(null)}
        onCreate={handleCreate}
        onEditOccurrence={handleEditOccurrence}
        onDeleteOccurrence={handleDeleteOccurrence}
      />

      <AnimatePresence>
        {settingsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSettingsOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="fixed right-4 z-50"
              style={{ top: "calc(env(safe-area-inset-top) + 3.5rem)" }}
            >
              <GlassPanel className="p-4">
                <p className="mb-3 max-w-[12rem] truncate text-xs text-white/50">{email}</p>
                <SignOutButton />
              </GlassPanel>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
