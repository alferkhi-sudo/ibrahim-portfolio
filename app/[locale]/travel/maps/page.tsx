"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import SectionReveal from "@/components/SectionReveal";
import CityCard from "@/components/CityCard";
import { citiesList } from "@/data/cities";

export default function MapsPage() {
  const t = useTranslations("travel");
  const { locale } = useParams();

  return (
    <>
      <section className="pt-24 md:pt-32 pb-6 md:pb-8 px-5 md:px-10 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href={`/${locale}/travel`}
            className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors mb-6 md:mb-8 py-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t("backToTravel")}
          </Link>

          <h1
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
            className="font-bold text-[var(--fg)] tracking-tight"
          >
            {t("mapsAndLists")}
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-[var(--fg-muted)] font-light">
            {t("mapsAndListsDesc")}
          </p>
        </div>
      </section>

      <section className="px-5 md:px-10 lg:px-6 pb-16 md:pb-24 pt-8 md:pt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {citiesList.map((city, i) => (
            <SectionReveal key={city.slug} delay={i * 0.1}>
              <CityCard
                name={city.name}
                subtitle={city.subtitle}
                image={city.image}
                href={`/${locale}/travel/maps/${city.slug}`}
                comingSoon={city.comingSoon}
              />
            </SectionReveal>
          ))}
        </div>
      </section>
    </>
  );
}
