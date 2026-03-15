import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { cityGuides } from "@/lib/data/cityGuides";

export default async function GuidePage({
  params: { locale, city: citySlug, guide: guideId },
}: {
  params: { locale: string; city: string; guide: string };
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _t = await getTranslations("travel");
  const guides = cityGuides[citySlug];
  const guide = guides?.find((g) => g.id === guideId);

  if (!guide) notFound();

  const cityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-10 md:pb-14 px-5 md:px-10 lg:px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/${locale}/travel/maps/${citySlug}`}
            className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors mb-8 py-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to {cityName}
          </Link>

          <p className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-4">
            Google Maps List
          </p>

          <h1
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            className="font-bold text-[var(--fg)] tracking-tight leading-tight mb-6"
          >
            {guide.title}
          </h1>

          <p className="text-base md:text-lg text-[var(--fg-muted)] font-light leading-relaxed max-w-xl">
            {guide.longDescription}
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-5 md:px-10 lg:px-6">
        <div className="border-t border-[var(--border)]" />
      </div>

      {/* What's included */}
      <section className="px-5 md:px-10 lg:px-6 py-10 md:py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-8">
            What&apos;s included
          </h2>

          <ul className="space-y-4">
            {guide.includes.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--fg-subtle)]" />
                <span className="text-base md:text-lg text-[var(--fg)] font-light leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-5 md:px-10 lg:px-6">
        <div className="border-t border-[var(--border)]" />
      </div>

      {/* Purchase */}
      <section className="px-5 md:px-10 lg:px-6 py-10 md:py-14">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-1">
              Price
            </p>
            <p className="text-3xl md:text-4xl font-bold text-[var(--fg)] tracking-tight">
              {guide.price}
            </p>
          </div>

          {/* Payment integration coming soon */}
          <button
            disabled
            className="inline-flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-[var(--fg-subtle)] border border-[var(--border)] px-8 py-4 rounded-full cursor-not-allowed"
          >
            Buy — Coming Soon
          </button>
        </div>
      </section>
    </>
  );
}
