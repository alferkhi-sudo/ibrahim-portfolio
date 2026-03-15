import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import SectionReveal from "@/components/SectionReveal";
import { cityGuides } from "@/lib/data/cityGuides";

export async function generateMetadata({
  params: { city: citySlug },
}: {
  params: { city: string };
}): Promise<Metadata> {
  const cityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
  const guides = cityGuides[citySlug];
  if (guides) {
    return {
      title: `${cityName} Maps & Lists — Ibrahim`,
      description: `Curated Google Maps guides for ${cityName}. Hand-picked restaurants, cafés, and hidden gems.`,
    };
  }
  return {
    title: `${cityName} Guide — Ibrahim`,
    description: `Explore ${cityName} with curated spot recommendations from Ibrahim.`,
  };
}

interface Spot {
  name: string;
  description: string;
  neighborhood?: string;
  maps_link?: string;
}

interface Category {
  name: string;
  spots: Spot[];
}

interface CityData {
  city: string;
  hero_image: string;
  categories: Category[];
}

function getCityData(citySlug: string): CityData | null {
  const filePath = path.join(process.cwd(), "content/travel", `${citySlug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

export default async function CityMapsPage({
  params: { locale, city: citySlug },
}: {
  params: { locale: string; city: string };
}) {
  const t = await getTranslations("travel");
  const guides = cityGuides[citySlug];

  // If city has guides, render the purchasable guides view
  if (guides) {
    const cityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
    return (
      <>
        <section className="relative h-[40vh] md:h-[50vh] flex items-end overflow-hidden">
          <div className="absolute inset-0 placeholder-image" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 lg:px-6 pb-8 md:pb-12 w-full">
            <Link
              href={`/${locale}/travel/maps`}
              className="inline-flex items-center gap-2 text-sm text-[#888888] hover:text-white transition-colors mb-3 md:mb-4 py-1"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {t("backToMaps")}
            </Link>
            <h1
              style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              className="font-bold text-white tracking-tight"
            >
              {cityName}
            </h1>
            <p className="mt-2 text-sm md:text-base text-[#888888] font-light">
              {t("cityGuideTagline")}
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-5 md:px-10 lg:px-6 py-10 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {guides.map((guide, i) => (
              <SectionReveal key={guide.id} delay={i * 0.1}>
                <Link href={`/${locale}/travel/maps/${citySlug}/${guide.id}`}>
                  <div className="group relative flex flex-col justify-between border border-[var(--border)] rounded-xl p-6 md:p-8 bg-[var(--bg-card)] hover:border-[var(--border-md)] transition-colors duration-300 min-h-[220px] cursor-pointer">
                    <div>
                      <h2 className="text-lg md:text-xl font-bold text-[var(--fg)] tracking-tight mb-3 group-hover:opacity-80 transition-opacity">
                        {guide.title}
                      </h2>
                      <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
                        {guide.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-[var(--fg-muted)]">
                        {t("googleMapsList")}
                      </span>
                      <span className="text-xs uppercase tracking-widest text-[var(--fg)] border border-[var(--border-md)] px-4 py-2 rounded-full">
                        {guide.price}
                      </span>
                    </div>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </section>
      </>
    );
  }

  // Default: render spots from JSON content
  const data = getCityData(citySlug);

  if (!data) {
    notFound();
  }

  return (
    <>
      <section className="relative h-[40vh] md:h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 placeholder-image" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 lg:px-6 pb-8 md:pb-12 w-full">
          <Link
            href={`/${locale}/travel/maps`}
            className="inline-flex items-center gap-2 text-sm text-[#888888] hover:text-white transition-colors mb-3 md:mb-4 py-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t("backToMaps")}
          </Link>
          <h1
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
            className="font-bold text-white tracking-tight"
          >
            {data.city}
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 md:px-10 lg:px-6 py-10 md:py-16">
        {data.categories.map((category, catIndex) => (
          <SectionReveal key={category.name} delay={catIndex * 0.1}>
            <div className="mb-14 md:mb-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--fg)] tracking-tight mb-6 md:mb-10">
                {category.name}
              </h2>

              <div className="space-y-6 md:space-y-8">
                {category.spots.map((spot) => (
                  <div
                    key={spot.name}
                    className="group border-b border-[var(--border)] pb-6 md:pb-8 last:border-0"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4">
                      <div className="min-w-0">
                        <h3 className="text-base md:text-lg font-semibold text-[var(--fg)] tracking-tight">
                          {spot.name}
                        </h3>
                        <p className="mt-1 text-[var(--fg-muted)] leading-relaxed text-sm md:text-base">
                          {spot.description}
                        </p>
                        {spot.neighborhood && (
                          <span className="inline-block mt-2 text-xs font-medium text-[var(--fg-muted)] bg-[var(--bg-elevated)] px-2.5 py-1 rounded-full">
                            {spot.neighborhood}
                          </span>
                        )}
                      </div>
                      {spot.maps_link && (
                        <a
                          href={spot.maps_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors py-1 self-start"
                        >
                          {t("openInMaps")} &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        ))}
      </section>
    </>
  );
}
