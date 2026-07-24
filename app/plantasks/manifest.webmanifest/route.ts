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
      icons: [
        { src: "/plantasks/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
        { src: "/plantasks/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
        { src: "/plantasks/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
        { src: "/plantasks/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      ],
    },
    { headers: { "Content-Type": "application/manifest+json" } }
  );
}
