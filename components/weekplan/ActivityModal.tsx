"use client";

import { useEffect, useRef, useState } from "react";
import { CATEGORIES, DAYS, Category, Day } from "./types";

type Activity = {
  id: string;
  day: Day;
  title: string;
  startTime: string;
  endTime: string;
  category: Category;
  isDefault: boolean;
};

type Props = {
  initialDay?: Day;
  activity?: Activity | null;
  onSave: (data: Omit<Activity, "id" | "isDefault">) => Promise<void>;
  onDelete?: () => Promise<void>;
  onClose: () => void;
};

export default function ActivityModal({ initialDay, activity, onSave, onDelete, onClose }: Props) {
  const [title, setTitle] = useState(activity?.title ?? "");
  const [startTime, setStartTime] = useState(activity?.startTime ?? "08:00");
  const [endTime, setEndTime] = useState(activity?.endTime ?? "09:00");
  const [category, setCategory] = useState<Category>(activity?.category ?? "WORK");
  const [day, setDay] = useState<Day>(activity?.day ?? initialDay ?? "MON");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave({ title, startTime, endTime, category, day });
    setSaving(false);
  }

  async function handleDelete() {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    setDeleting(true);
    await onDelete?.();
    setDeleting(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[var(--border-md)] bg-[var(--bg-card)] shadow-2xl"
        style={{ animation: "modal-in 0.18s ease" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
          <h2 className="text-base font-semibold">
            {activity ? "Edit Activity" : "Add Activity"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[var(--fg-muted)] transition hover:bg-[var(--bg-elevated)] hover:text-[var(--fg)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="modal-label">Title</label>
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Morning run"
              className="modal-input"
            />
          </div>

          {/* Day */}
          <div>
            <label className="modal-label">Day</label>
            <select value={day} onChange={(e) => setDay(e.target.value as Day)} className="modal-input">
              {DAYS.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>

          {/* Times */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="modal-label">Start</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="modal-input"
              />
            </div>
            <div>
              <label className="modal-label">End</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="modal-input"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="modal-label">Category</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value as Category)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                    category === cat.value
                      ? "border-transparent ring-2 ring-accent"
                      : "border-[var(--border)] hover:border-[var(--border-md)]"
                  }`}
                >
                  <span className={`h-3 w-3 rounded-sm flex-shrink-0 ${cat.dot}`} />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            {activity && onDelete && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  confirmDelete
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                }`}
              >
                {deleting ? "Deleting…" : confirmDelete ? "Confirm delete?" : "Delete"}
              </button>
            )}
            <div className="flex-1" />
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--fg-muted)] transition hover:bg-[var(--bg-elevated)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Saving…" : activity ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>

      <style jsx global>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.96) translateY(4px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--fg-muted);
          margin-bottom: 0.375rem;
        }
        .modal-input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid var(--border-md);
          background: var(--bg-elevated);
          color: var(--fg);
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .modal-input:focus {
          border-color: #c8a97e;
          box-shadow: 0 0 0 3px rgba(200,169,126,0.15);
        }
      `}</style>
    </div>
  );
}
