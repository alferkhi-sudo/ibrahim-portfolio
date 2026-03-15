import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getCityBySlug, cities as allCities } from "@/data/photography";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import SectionReveal from "@/components/SectionReveal";

export function generateStaticParams() {
  return allCities.map((city) => ({ city: city.slug }));
}

export default async function CityGalleryPage({
  params: { locale, city: citySlug },
}: {
  params: { locale: string; city: string };
}) {
  const t = await getTranslations("photography");
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  return (
    <>
      <section className="relative h-[45vh] md:h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 placeholder-image" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 lg:px-6 pb-8 md:pb-12 w-full">
          <Link
            href={`/${locale}/photography`}
            className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors mb-3 md:mb-4 py-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t("backToPhotography")}
          </Link>
          <h1
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
            className="font-bold text-white tracking-tight"
          >
            {city.name}
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-10 lg:px-6 py-10 md:py-16">
        <SectionReveal>
          <ImageGallery photos={city.allPhotos} />
        </SectionReveal>
      </section>
    </>
  );
}
