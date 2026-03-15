import { getAllMovies } from "@/lib/mdx";
import MoviesClient from "./MoviesClient";

export default async function MoviesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const movies = getAllMovies();

  return <MoviesClient movies={movies} locale={locale} />;
}
