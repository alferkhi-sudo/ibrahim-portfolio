import { NextResponse } from "next/server";

// Scoped PWA manifest for /plantasks only — independent of the main
// portfolio, which has no manifest of its own.
export async function GET() {
  return NextResponse.json(
    {
      name: "PlanTasks",
      short_name: "PlanTasks",
      description: "Private monthly planning calendar.",
      start_url: "/plantasks",
      scope: "/plantasks",
      display: "standalone",
      orientation: "portrait",
      background_color: "#0b0c10",
      theme_color: "#0b0c10",
      // Apple-only: iOS reads the apple-touch-icon <link> in layout.tsx for
      // the home-screen icon, not this array. Kept minimal for any other
      // WebKit-based reader that does check the manifest.
      icons: [
        { src: "/plantasks/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    { headers: { "Content-Type": "application/manifest+json" } }
  );
}
