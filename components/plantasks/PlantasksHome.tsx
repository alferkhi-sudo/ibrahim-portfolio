"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppShell from "./AppShell";
import AppBackground from "./AppBackground";
import MonthGrid from "./MonthGrid";
import CategoryLegend from "./CategoryLegend";
import DayDetailSheet from "./DayDetailSheet";
import GlassPanel from "./GlassPanel";
import SignOutButton from "./SignOutButton";
import { addMonths, isSameDay } from "@/lib/plantasks/calendarMath";
import { makeDummyEvents } from "@/lib/plantasks/dummyEvents";
import type { EventCategory, NewPlantasksEvent, PlantasksEvent } from "@/lib/plantasks/types";

let localIdCounter = 0;
function localId() {
  localIdCounter += 1;
  return `local-${Date.now()}-${localIdCounter}`;
}

// Phase 4: real month grid, in-memory events (seeded with dummy data).
// Phase 5 swaps the local state mutations below for Supabase reads/writes —
// the shape is already identical to PlantasksEvent so the swap is a
// drop-in replacement, not a rewrite.
export default function PlantasksHome({ email }: { email?: string }) {
  const [activeTab, setActiveTab] = useState<"today" | "calendar">("calendar");
  const [viewDate, setViewDate] = useState(() => new Date());
  const [events, setEvents] = useState<PlantasksEvent[]>(() => makeDummyEvents());
  const [hidden, setHidden] = useState<Set<EventCategory>>(new Set());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const monthLabel = useMemo(
    () => viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    [viewDate]
  );

  const visibleEvents = useMemo(
    () => events.filter((e) => !hidden.has(e.category)),
    [events, hidden]
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

  function handleCreate(newEvent: NewPlantasksEvent) {
    const now = new Date().toISOString();
    setEvents((prev) => [
      ...prev,
      { ...newEvent, id: localId(), user_id: "local", created_at: now, updated_at: now },
    ]);
  }

  function handleUpdate(id: string, patch: Partial<PlantasksEvent>) {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...patch, updated_at: new Date().toISOString() } : e))
    );
  }

  function handleDelete(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
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
          <MonthGrid
            viewDate={viewDate}
            events={visibleEvents}
            onSelectDay={setSelectedDate}
            onSelectEvent={(event) => setSelectedDate(new Date(event.start_at))}
          />
        </div>
      </AppShell>

      <DayDetailSheet
        date={selectedDate}
        events={selectedDayEvents}
        onClose={() => setSelectedDate(null)}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
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
