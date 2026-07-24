import { createClient } from "@/lib/supabase/client";
import type { NewPlantasksEvent, PlantasksEvent } from "./types";

export async function fetchEvents(): Promise<PlantasksEvent[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("start_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as PlantasksEvent[];
}

export async function createEvent(
  userId: string,
  event: NewPlantasksEvent
): Promise<PlantasksEvent> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("events")
    .insert({ ...event, user_id: userId })
    .select()
    .single();

  if (error) throw error;
  return data as PlantasksEvent;
}

export async function updateEvent(
  id: string,
  patch: Partial<PlantasksEvent>
): Promise<PlantasksEvent> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("events")
    .update(patch)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as PlantasksEvent;
}

export async function deleteEvent(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw error;
}
