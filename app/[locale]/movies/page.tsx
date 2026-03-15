import type { Metadata } from "next";
import { getAllMovies } from "@/lib/mdx";
import MoviesClient from "./MoviesClient";

export const metadata: Metadata = {
  title: "Cinema — Ibrahim",
  description: "Reviews, reflections, and a deep love for film. From Cannes to the everyday screen.",
};

export default async function MoviesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const movies = getAllMovies();

  return <MoviesClient movies={movies} locale={locale} />;
}
