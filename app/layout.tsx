import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ibrahim — Creative Portfolio",
  description:
    "Exploring the world through lens, screen, and code. Photography, videography, travel, and cinema.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
