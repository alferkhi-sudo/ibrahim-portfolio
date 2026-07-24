"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/plantasks/login");
    router.refresh();
  }

  return (
    <motion.button
      onClick={handleSignOut}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
    >
      Sign out
    </motion.button>
  );
}
