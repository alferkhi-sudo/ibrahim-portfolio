"use client";

import { useState } from "react";
import AppShell from "./AppShell";
import GlassPanel from "./GlassPanel";
import AppBackground from "./AppBackground";
import SignOutButton from "./SignOutButton";

const MONTH_LABEL = new Date().toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});

// Phase 3 placeholder body — proves the shell "installs and opens like an
// app" feel. Replaced by the real month grid in Phase 4.
export default function PlantasksHome({ email }: { email?: string }) {
  const [activeTab, setActiveTab] = useState<"today" | "calendar">("calendar");

  return (
    <>
      <AppBackground />
      <AppShell
        title={MONTH_LABEL}
        onPrev={() => {}}
        onNext={() => {}}
        onSettings={() => {}}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAdd={() => {}}
      >
        <div className="flex min-h-[60vh] items-center justify-center">
          <GlassPanel className="w-full max-w-sm p-8 text-center">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
              App shell — Phase 3
            </p>
            <h2 className="mb-1 text-xl font-semibold text-white">
              {activeTab === "today" ? "Today" : "Month grid coming in Phase 4"}
            </h2>
            <p className="mb-6 text-sm text-white/50">{email}</p>
            <SignOutButton />
          </GlassPanel>
        </div>
      </AppShell>
    </>
  );
}
