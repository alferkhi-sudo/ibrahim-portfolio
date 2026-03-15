import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Travel — Ibrahim",
  description:
    "My favorite spots in every city I visit. Curated guides, Google Maps lists, and hidden gems.",
};

export default function TravelLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
