import type { Metadata, Viewport } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "PlanTasks",
  description: "Private monthly planning calendar.",
  robots: { index: false, follow: false },
  manifest: "/plantasks/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PlanTasks",
  },
  icons: {
    apple: "/plantasks/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b0c10",
};

export default function PlantasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0b0c10] font-sans antialiased">{children}</body>
    </html>
  );
}
