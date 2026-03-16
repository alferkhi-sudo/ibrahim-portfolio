import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { getMovieBySlug, getAllMovieSlugs, getAllMovies } from "@/lib/mdx";
import SectionReveal from "@/components/SectionReveal";
import ReviewCard from "@/components/ReviewCard";

const FEATURED_SLUGS = ["romeria", "500-days-of-summer"];

export function generateStaticParams() {
  const slugs = getAllMovieSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const movie = getMovieBySlug(slug);
  if (!movie) return {};
  const { frontmatter } = movie;
  return {
    title: `${frontmatter.title} (${frontmatter.year}) — Ibrahim`,
    description: frontmatter.excerpt,
  };
}

export default async function MovieReviewPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const t = await getTranslations("movies");
  const movie = getMovieBySlug(slug);

  if (!movie) {
    notFound();
  }

  const { frontmatter, content } = movie;
  const allMovies = getAllMovies();
  const relatedMovies = allMovies
    .filter((m) => FEATURED_SLUGS.includes(m.slug) && m.slug !== slug)
    .slice(0, 2);

  const paragraphs = content.split("\n\n").filter((p) => p.trim().length > 0);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] md:h-[60vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 blur-sm"
          style={{ backgroundImage: `url(${frontmatter.poster})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/20" />
      </section>

      {/* Content */}
      <section className="max-w-[680px] mx-auto px-5 md:px-6 -mt-12 md:-mt-20 relative z-10 pb-16 md:pb-24">
        <Link
          href={`/${locale}/movies`}
          className="inline-flex items-center gap-2 text-sm text-[#888888] hover:text-white transition-colors mb-6 md:mb-8 py-1"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {t("backToMovies")}
        </Link>

        <SectionReveal>
          <h1
            style={{ fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}
            className="font-bold text-white tracking-tight"
          >
            {frontmatter.title}
          </h1>
        </SectionReveal>

        {/* Meta info */}
        <SectionReveal delay={0.1}>
          <div className="mt-3 md:mt-4 flex flex-wrap items-center gap-3 md:gap-4">
            <span className="text-[#888888] text-sm md:text-base">{frontmatter.year}</span>
            <span className="text-[#888888] text-sm md:text-base">
              {t("directedBy")} {frontmatter.director}
            </span>
            <div className="flex flex-wrap gap-2">
              {frontmatter.genre.map((g) => (
                <span
                  key={g}
                  className="text-xs font-medium text-[#888888] bg-[#1a1a1a] px-2.5 py-1 rounded-full"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Rating */}
        <SectionReveal delay={0.2}>
          <div className="mt-6 md:mt-8 flex items-center gap-3">
            <span className="text-4xl md:text-5xl font-bold text-accent">
              {frontmatter.rating}
            </span>
            <span className="text-xl md:text-2xl text-[#888888]">/10</span>
          </div>
        </SectionReveal>

        {/* Review body */}
        <SectionReveal delay={0.3}>
          <div className="mt-8 md:mt-12 space-y-5 md:space-y-6">
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-base md:text-lg text-body leading-relaxed"
              >
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </SectionReveal>

        {/* Related Reviews */}
        {relatedMovies.length > 0 && (
          <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-white/10">
            <SectionReveal>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-6 md:mb-8">
                {t("youMightAlsoLike")}
              </h2>
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {relatedMovies.map((m, i) => (
                <SectionReveal key={m.slug} delay={i * 0.15}>
                  <ReviewCard
                    title={m.title}
                    year={m.year}
                    rating={m.rating}
                    excerpt={m.excerpt}
                    poster={m.poster}
                    slug={m.slug}
                    locale={locale}
                  />
                </SectionReveal>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
