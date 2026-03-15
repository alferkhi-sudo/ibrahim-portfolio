import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Photography — Ibrahim",
  description:
    "Cities, streets, and mountains through my lens. From Paris to the peaks of St. Moritz.",
};

export default function PhotographyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
