import type { MetadataRoute } from "next";
import { getAllMovieSlugs } from "@/lib/mdx";
import { cities } from "@/data/photography";
import { cityGuides } from "@/lib/data/cityGuides";
import { locales } from "@/i18n/request";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ibrahimferkh.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // Home
    routes.push({ url: `${BASE_URL}/${locale}`, lastModified: now });

    // Photography
    routes.push({ url: `${BASE_URL}/${locale}/photography`, lastModified: now });
    for (const city of cities) {
      routes.push({
        url: `${BASE_URL}/${locale}/photography/${city.slug}`,
        lastModified: now,
      });
    }

    // Travel
    routes.push({ url: `${BASE_URL}/${locale}/travel`, lastModified: now });
    routes.push({ url: `${BASE_URL}/${locale}/travel/maps`, lastModified: now });
    for (const [citySlug, guides] of Object.entries(cityGuides)) {
      routes.push({
        url: `${BASE_URL}/${locale}/travel/maps/${citySlug}`,
        lastModified: now,
      });
      for (const guide of guides) {
        routes.push({
          url: `${BASE_URL}/${locale}/travel/maps/${citySlug}/${guide.id}`,
          lastModified: now,
        });
      }
    }

    // Movies
    routes.push({ url: `${BASE_URL}/${locale}/movies`, lastModified: now });
    for (const slug of getAllMovieSlugs()) {
      routes.push({
        url: `${BASE_URL}/${locale}/movies/${slug}`,
        lastModified: now,
      });
    }

    // Videography
    routes.push({ url: `${BASE_URL}/${locale}/videography`, lastModified: now });
  }

  return routes;
}
