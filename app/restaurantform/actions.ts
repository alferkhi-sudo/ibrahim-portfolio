"use server";

import { createAdminClient } from "@/lib/supabase";

export async function submitSurvey(
  answers: Record<string, unknown>,
  userAgent?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = createAdminClient();
    const { error } = await admin.from("survey_responses").insert({
      answers,
      metadata: {
        submitted_at: new Date().toISOString(),
        user_agent: userAgent ?? "",
      },
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

export async function getAllResponses(): Promise<{
  data: Array<{ id: string; created_at: string; answers: Record<string, unknown>; metadata: Record<string, unknown> }> | null;
  error?: string;
}> {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("survey_responses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return { data: null, error: error.message };
    return { data };
  } catch (err) {
    return { data: null, error: String(err) };
  }
}
