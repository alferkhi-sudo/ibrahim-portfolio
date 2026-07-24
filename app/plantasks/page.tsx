import { createClient } from "@/lib/supabase/server";
import PlantasksHome from "@/components/plantasks/PlantasksHome";

export default async function PlantasksPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <PlantasksHome email={user?.email} />;
}
