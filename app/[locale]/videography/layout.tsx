import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Videography — Ibrahim",
  description:
    "Stories in motion — a new chapter in visual storytelling. Coming soon.",
};

export default function VideographyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
