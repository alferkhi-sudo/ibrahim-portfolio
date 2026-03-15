import fs from "fs";
import path from "path";
import matter from "gray-matter";

const moviesDirectory = path.join(process.cwd(), "content/movies");

export interface MovieFrontmatter {
  title: string;
  director: string;
  year: number;
  rating: number;
  poster: string;
  genre: string[];
  excerpt: string;
  date: string;
  lang: string;
  slug: string;
}

export function getAllMovies(): MovieFrontmatter[] {
  const files = fs.readdirSync(moviesDirectory);
  const movies = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(moviesDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      return { ...data, slug } as MovieFrontmatter;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return movies;
}

export function getMovieBySlug(slug: string): {
  frontmatter: MovieFrontmatter;
  content: string;
} | null {
  const filePath = path.join(moviesDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    frontmatter: { ...data, slug } as MovieFrontmatter,
    content,
  };
}

export function getAllMovieSlugs(): string[] {
  const files = fs.readdirSync(moviesDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}
