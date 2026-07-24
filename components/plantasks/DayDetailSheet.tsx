"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  EVENT_CATEGORIES,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  type EventCategory,
  type NewPlantasksEvent,
  type PlantasksEvent,
} from "@/lib/plantasks/types";
import type { EventOccurrence } from "@/lib/plantasks/recurrence";
import GlassPanel from "./GlassPanel";

type Recurrence = "none" | "daily" | "weekly";
type EditScope = "this" | "all";

interface FormState {
  title: string;
  category: EventCategory;
  allDay: boolean;
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  recurrence: Recurrence;
  notes: string;
}

function toTimeInput(iso: string): string {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function blankForm(): FormState {
  return {
    title: "",
    category: "other",
    allDay: false,
    startTime: "09:00",
    endTime: "10:00",
    recurrence: "none",
    notes: "",
  };
}

function formFromEvent(event: PlantasksEvent): FormState {
  return {
    title: event.title,
    category: event.category,
    allDay: event.all_day,
    startTime: toTimeInput(event.start_at),
    endTime: toTimeInput(event.end_at),
    recurrence: event.rrule?.includes("DAILY") ? "daily" : event.rrule?.includes("WEEKLY") ? "weekly" : "none",
    notes: event.notes ?? "",
  };
}

function formatDayLabel(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatTimeRange(event: PlantasksEvent): string {
  if (event.all_day) return "All day";
  const start = new Date(event.start_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const end = new Date(event.end_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${start} – ${end}`;
}

export default function DayDetailSheet({
  date,
  events,
  onClose,
  onCreate,
  onEditOccurrence,
  onDeleteOccurrence,
}: {
  date: Date | null;
  events: EventOccurrence[];
  onClose: () => void;
  onCreate: (event: NewPlantasksEvent) => void;
  onEditOccurrence: (occurrence: EventOccurrence, patch: Partial<PlantasksEvent>, scope: EditScope) => void;
  onDeleteOccurrence: (occurrence: EventOccurrence, scope: EditScope) => void;
}) {
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [editingOccurrence, setEditingOccurrence] = useState<EventOccurrence | null>(null);
  const [editingScope, setEditingScope] = useState<EditScope>("this");
  const [form, setForm] = useState<FormState>(blankForm());
  const [scopePrompt, setScopePrompt] = useState<{
    action: "edit" | "delete";
    occurrence: EventOccurrence;
  } | null>(null);

  const isOpen = date !== null;

  function startAdd() {
    setForm(blankForm());
    setEditingOccurrence(null);
    setEditingId("new");
  }

  function startEdit(occurrence: EventOccurrence, scope: EditScope) {
    setForm(formFromEvent(occurrence));
    setEditingOccurrence(occurrence);
    setEditingScope(scope);
    setEditingId(occurrence.id);
  }

  function handleEditClick(occurrence: EventOccurrence) {
    if (occurrence.isVirtual) {
      setScopePrompt({ action: "edit", occurrence });
    } else {
      startEdit(occurrence, "this");
    }
  }

  function handleDeleteClick(occurrence: EventOccurrence) {
    if (occurrence.isVirtual) {
      setScopePrompt({ action: "delete", occurrence });
    } else {
      onDeleteOccurrence(occurrence, "this");
    }
  }

  function resolveScope(scope: EditScope) {
    if (!scopePrompt) return;
    const { action, occurrence } = scopePrompt;
    setScopePrompt(null);
    if (action === "edit") {
      startEdit(occurrence, scope);
    } else {
      onDeleteOccurrence(occurrence, scope);
    }
  }

  function cancelForm() {
    setEditingId(null);
    setEditingOccurrence(null);
  }

  function saveForm() {
    if (!date || !form.title.trim()) return;

    const rrule =
      form.recurrence === "daily" ? "FREQ=DAILY" : form.recurrence === "weekly" ? "FREQ=WEEKLY" : null;

    const buildTimestamp = (time: string) => {
      const [h, m] = time.split(":").map(Number);
      const d = new Date(date);
      d.setHours(h, m, 0, 0);
      return d.toISOString();
    };

    const startAt = form.allDay
      ? new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString()
      : buildTimestamp(form.startTime);
    const endAt = form.allDay
      ? new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString()
      : buildTimestamp(form.endTime);

    if (editingId === "new") {
      onCreate({
        title: form.title.trim(),
        category: form.category,
        start_at: startAt,
        end_at: endAt,
        all_day: form.allDay,
        rrule,
        parent_event_id: null,
        excluded_dates: [],
        notes: form.notes.trim() || null,
      });
    } else if (editingOccurrence) {
      onEditOccurrence(
        editingOccurrence,
        {
          title: form.title.trim(),
          category: form.category,
          start_at: startAt,
          end_at: endAt,
          all_day: form.allDay,
          rrule,
          notes: form.notes.trim() || null,
        },
        editingScope
      );
    }

    setEditingId(null);
    setEditingOccurrence(null);
  }

  function handleClose() {
    setEditingId(null);
    setEditingOccurrence(null);
    setScopePrompt(null);
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && date && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}
          >
            <GlassPanel className="max-h-[80vh] w-full max-w-lg overflow-y-auto p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-white">{formatDayLabel(date)}</h2>
                <button
                  onClick={handleClose}
                  className="rounded-full p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {scopePrompt && (
                <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="mb-3 text-sm text-white/80">
                    {scopePrompt.action === "edit" ? "Edit" : "Delete"} “{scopePrompt.occurrence.title}” —
                    this is part of a repeating series.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => resolveScope("this")}
                      className="flex-1 rounded-2xl border border-white/15 py-2.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
                    >
                      Just this event
                    </button>
                    <button
                      onClick={() => resolveScope("all")}
                      className="flex-1 rounded-2xl border border-white/15 py-2.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
                    >
                      All events
                    </button>
                  </div>
                  <button
                    onClick={() => setScopePrompt(null)}
                    className="mt-2 w-full text-xs text-white/40 hover:text-white/60"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {editingId === null && !scopePrompt && (
                <>
                  <div className="mb-4 flex flex-col gap-2">
                    {events.length === 0 && (
                      <p className="py-6 text-center text-sm text-white/30">No events this day.</p>
                    )}
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3"
                      >
                        <span
                          className="h-2 w-2 flex-shrink-0 rounded-full"
                          style={{
                            backgroundColor: CATEGORY_COLORS[event.category],
                            boxShadow: `0 0 6px ${CATEGORY_COLORS[event.category]}`,
                          }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <p className="truncate text-sm font-medium text-white">{event.title}</p>
                            {(event.isVirtual || event.rrule) && (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 text-white/30">
                                <path
                                  d="M17 2.1l4 4-4 4M3 12.6v-2a4 4 0 014-4h14M7 21.9l-4-4 4-4M21 11.4v2a4 4 0 01-4 4H3"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                          <p className="text-xs text-white/40">{formatTimeRange(event)}</p>
                        </div>
                        <button
                          onClick={() => handleEditClick(event)}
                          className="rounded-full p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                          aria-label="Edit"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(event)}
                          className="rounded-full p-2 text-white/40 transition-colors hover:bg-red-500/20 hover:text-red-300"
                          aria-label="Delete"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    onClick={startAdd}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="w-full rounded-2xl bg-white/90 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
                  >
                    + Add event
                  </motion.button>
                </>
              )}

              {editingId !== null && (
                <div className="flex flex-col gap-3">
                  {editingOccurrence && (
                    <p className="text-xs text-white/40">
                      {editingScope === "this" ? "Editing just this event" : "Editing all events in this series"}
                    </p>
                  )}

                  <input
                    autoFocus
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="Event title"
                    className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30"
                  />

                  <div className="flex flex-wrap gap-1.5">
                    {EVENT_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setForm((f) => ({ ...f, category: cat }))}
                        className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                          form.category === cat ? "border-white/30 text-white" : "border-white/10 text-white/40"
                        }`}
                        style={{
                          backgroundColor: form.category === cat ? `${CATEGORY_COLORS[cat]}26` : "transparent",
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: CATEGORY_COLORS[cat] }}
                        />
                        {CATEGORY_LABELS[cat]}
                      </button>
                    ))}
                  </div>

                  <label className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
                    <span className="text-sm text-white/70">All day</span>
                    <input
                      type="checkbox"
                      checked={form.allDay}
                      onChange={(e) => setForm((f) => ({ ...f, allDay: e.target.checked }))}
                      className="h-4 w-4 accent-white"
                    />
                  </label>

                  {!form.allDay && (
                    <div className="flex gap-3">
                      <input
                        type="time"
                        value={form.startTime}
                        onChange={(e) => setForm((f) => ({ ...f, startTime: e.target.value }))}
                        className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/30"
                      />
                      <input
                        type="time"
                        value={form.endTime}
                        onChange={(e) => setForm((f) => ({ ...f, endTime: e.target.value }))}
                        className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/30"
                      />
                    </div>
                  )}

                  {!(editingOccurrence && editingScope === "this") && (
                    <select
                      value={form.recurrence}
                      onChange={(e) => setForm((f) => ({ ...f, recurrence: e.target.value as Recurrence }))}
                      className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/30"
                    >
                      <option className="bg-[#1a1a1f]" value="none">Does not repeat</option>
                      <option className="bg-[#1a1a1f]" value="daily">Repeats daily</option>
                      <option className="bg-[#1a1a1f]" value="weekly">Repeats weekly</option>
                    </select>
                  )}

                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    placeholder="Notes (optional)"
                    rows={2}
                    className="w-full resize-none rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={cancelForm}
                      className="flex-1 rounded-2xl border border-white/15 py-3 text-sm font-medium text-white/70 transition-colors hover:text-white"
                    >
                      Cancel
                    </button>
                    <motion.button
                      onClick={saveForm}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="flex-1 rounded-2xl bg-white/90 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
                    >
                      Save
                    </motion.button>
                  </div>
                </div>
              )}
            </GlassPanel>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
