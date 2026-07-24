import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * PlanTasks uses its own dedicated Supabase project — isolated from the
 * weekplan feature's project (NEXT_PUBLIC_SUPABASE_URL / ANON_KEY).
 */
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_PLANTASKS_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_PLANTASKS_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — session refresh is handled
            // by middleware instead, so this can be safely ignored.
          }
        },
      },
    }
  );
}

/**
 * Bypasses RLS via the service role key. Server-only — never import this
 * from a Client Component. Not used by default CRUD (which relies on RLS
 * via the session-scoped client above); reserved for admin-style tasks.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_PLANTASKS_SUPABASE_URL!,
    process.env.PLANTASKS_SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
