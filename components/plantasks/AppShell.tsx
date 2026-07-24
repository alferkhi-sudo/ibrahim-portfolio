"use client";

import { motion } from "framer-motion";

interface AppShellProps {
  title: string;
  onPrev?: () => void;
  onNext?: () => void;
  onSettings?: () => void;
  activeTab: "today" | "calendar";
  onTabChange: (tab: "today" | "calendar") => void;
  onAdd: () => void;
  children: React.ReactNode;
}

function IconChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function IconToday() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3v3M16 3v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="15" r="2" fill="currentColor" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3v3M16 3v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * The dedicated PlanTasks shell: top app-bar + bottom mobile tab bar
 * with a floating add button. No portfolio nav/footer anywhere near this.
 * Safe-area insets are respected so content isn't clipped by the notch
 * or home-indicator once installed as a standalone PWA.
 */
export default function AppShell({
  title,
  onPrev,
  onNext,
  onSettings,
  activeTab,
  onTabChange,
  onAdd,
  children,
}: AppShellProps) {
  return (
    <div className="relative flex min-h-[100dvh] flex-col text-white">
      {/* Top app-bar */}
      <header
        className="sticky top-0 z-40 border-b border-white/10 bg-black/20 backdrop-blur-2xl"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onPrev}
            disabled={!onPrev}
            className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-0"
            aria-label="Previous"
          >
            <IconChevronLeft />
          </button>

          <h1 className="text-base font-semibold tracking-tight">{title}</h1>

          <div className="flex items-center gap-1">
            <button
              onClick={onNext}
              disabled={!onNext}
              className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-0"
              aria-label="Next"
            >
              <IconChevronRight />
            </button>
            <button
              onClick={onSettings}
              className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Settings"
            >
              <IconSettings />
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable content */}
      <main className="relative flex-1 overflow-y-auto px-4 py-4 pb-28">{children}</main>

      {/* Bottom mobile tab bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}
      >
        <div
          className="flex items-center gap-1 rounded-full border border-white/15 bg-black/40 px-2 py-2 backdrop-blur-2xl"
          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 12px 40px -10px rgba(0,0,0,0.5)" }}
        >
          <TabButton
            active={activeTab === "today"}
            onClick={() => onTabChange("today")}
            icon={<IconToday />}
            label="Today"
          />

          <motion.button
            onClick={onAdd}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="mx-1 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg"
            aria-label="Add event"
          >
            <IconPlus />
          </motion.button>

          <TabButton
            active={activeTab === "calendar"}
            onClick={() => onTabChange("calendar")}
            icon={<IconCalendar />}
            label="Calendar"
          />
        </div>
      </nav>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`flex flex-col items-center gap-0.5 rounded-full px-4 py-2 text-[10px] font-medium transition-colors ${
        active ? "text-white" : "text-white/40"
      }`}
    >
      {icon}
      {label}
    </motion.button>
  );
}
