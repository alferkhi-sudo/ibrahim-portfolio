import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sondage — ShaiMaMa",
  description: "Aidez-nous à créer un restaurant à la hauteur de vos attentes.",
  robots: { index: false, follow: false },
};

export default function RestaurantFormLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
