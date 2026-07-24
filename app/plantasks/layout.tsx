import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "PlanTasks",
  description: "Private monthly planning calendar.",
  robots: { index: false, follow: false },
};

export default function PlantasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
