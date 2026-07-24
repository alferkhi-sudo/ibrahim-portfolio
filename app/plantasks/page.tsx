import { createClient } from "@/lib/supabase/server";
import GlassPanel from "@/components/plantasks/GlassPanel";
import AppBackground from "@/components/plantasks/AppBackground";
import SignOutButton from "@/components/plantasks/SignOutButton";

// Phase 2 placeholder — proves the auth gate works end-to-end.
// Replaced by the real month grid + app shell in Phase 3/4.
export default async function PlantasksPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <AppBackground />
      <GlassPanel className="w-full max-w-sm p-8 text-center">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
          Auth gate — Phase 2
        </p>
        <h1 className="mb-1 text-xl font-semibold text-white">You&apos;re in</h1>
        <p className="mb-6 text-sm text-white/50">{user?.email}</p>
        <SignOutButton />
      </GlassPanel>
    </div>
  );
}
