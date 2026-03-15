export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CityPhotography {
  slug: string;
  name: string;
  heroImage: string;
  featuredPhotos: Photo[];
  allPhotos: Photo[];
}

export const cities: CityPhotography[] = [
  {
    slug: "paris",
    name: "Paris",
    heroImage: "/images/photography/paris/hero.jpg",
    featuredPhotos: [
      {
        src: "/images/photography/paris/1.jpg",
        alt: "Paris Photo 1",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/photography/paris/2.jpg",
        alt: "Paris Photo 2",
        width: 800,
        height: 1200,
      },
      {
        src: "/images/photography/paris/3.jpg",
        alt: "Paris Photo 3",
        width: 1200,
        height: 900,
      },
    ],
    allPhotos: [
      {
        src: "/images/photography/paris/1.jpg",
        alt: "Paris Photo 1",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/photography/paris/2.jpg",
        alt: "Paris Photo 2",
        width: 800,
        height: 1200,
      },
      {
        src: "/images/photography/paris/3.jpg",
        alt: "Paris Photo 3",
        width: 1200,
        height: 900,
      },
      {
        src: "/images/photography/paris/4.jpg",
        alt: "Paris Photo 4",
        width: 1000,
        height: 1400,
      },
      {
        src: "/images/photography/paris/5.jpg",
        alt: "Paris Photo 5",
        width: 1400,
        height: 900,
      },
      {
        src: "/images/photography/paris/6.jpg",
        alt: "Paris Photo 6",
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    slug: "venice",
    name: "Venice",
    heroImage: "/images/photography/venice/hero.jpg",
    featuredPhotos: [
      {
        src: "/images/photography/venice/1.jpg",
        alt: "Venice Photo 1",
        width: 1200,
        height: 900,
      },
      {
        src: "/images/photography/venice/2.jpg",
        alt: "Venice Photo 2",
        width: 900,
        height: 1200,
      },
      {
        src: "/images/photography/venice/3.jpg",
        alt: "Venice Photo 3",
        width: 1200,
        height: 800,
      },
    ],
    allPhotos: [
      {
        src: "/images/photography/venice/1.jpg",
        alt: "Venice Photo 1",
        width: 1200,
        height: 900,
      },
      {
        src: "/images/photography/venice/2.jpg",
        alt: "Venice Photo 2",
        width: 900,
        height: 1200,
      },
      {
        src: "/images/photography/venice/3.jpg",
        alt: "Venice Photo 3",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/photography/venice/4.jpg",
        alt: "Venice Photo 4",
        width: 1000,
        height: 1300,
      },
      {
        src: "/images/photography/venice/5.jpg",
        alt: "Venice Photo 5",
        width: 1400,
        height: 900,
      },
      {
        src: "/images/photography/venice/6.jpg",
        alt: "Venice Photo 6",
        width: 800,
        height: 1200,
      },
    ],
  },
  {
    slug: "milano",
    name: "Milano",
    heroImage: "/images/photography/milano/hero.jpg",
    featuredPhotos: [
      {
        src: "/images/photography/milano/1.jpg",
        alt: "Milano Photo 1",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/photography/milano/2.jpg",
        alt: "Milano Photo 2",
        width: 800,
        height: 1200,
      },
      {
        src: "/images/photography/milano/3.jpg",
        alt: "Milano Photo 3",
        width: 1200,
        height: 900,
      },
    ],
    allPhotos: [
      {
        src: "/images/photography/milano/1.jpg",
        alt: "Milano Photo 1",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/photography/milano/2.jpg",
        alt: "Milano Photo 2",
        width: 800,
        height: 1200,
      },
      {
        src: "/images/photography/milano/3.jpg",
        alt: "Milano Photo 3",
        width: 1200,
        height: 900,
      },
      {
        src: "/images/photography/milano/4.jpg",
        alt: "Milano Photo 4",
        width: 1000,
        height: 1400,
      },
      {
        src: "/images/photography/milano/5.jpg",
        alt: "Milano Photo 5",
        width: 1400,
        height: 900,
      },
      {
        src: "/images/photography/milano/6.jpg",
        alt: "Milano Photo 6",
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    slug: "st-moritz",
    name: "St. Moritz",
    heroImage: "/images/photography/st-moritz/hero.jpg",
    featuredPhotos: [
      {
        src: "/images/photography/st-moritz/1.jpg",
        alt: "St. Moritz Photo 1",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/photography/st-moritz/2.jpg",
        alt: "St. Moritz Photo 2",
        width: 900,
        height: 1200,
      },
      {
        src: "/images/photography/st-moritz/3.jpg",
        alt: "St. Moritz Photo 3",
        width: 1200,
        height: 900,
      },
    ],
    allPhotos: [
      {
        src: "/images/photography/st-moritz/1.jpg",
        alt: "St. Moritz Photo 1",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/photography/st-moritz/2.jpg",
        alt: "St. Moritz Photo 2",
        width: 900,
        height: 1200,
      },
      {
        src: "/images/photography/st-moritz/3.jpg",
        alt: "St. Moritz Photo 3",
        width: 1200,
        height: 900,
      },
      {
        src: "/images/photography/st-moritz/4.jpg",
        alt: "St. Moritz Photo 4",
        width: 1000,
        height: 1400,
      },
      {
        src: "/images/photography/st-moritz/5.jpg",
        alt: "St. Moritz Photo 5",
        width: 1400,
        height: 900,
      },
      {
        src: "/images/photography/st-moritz/6.jpg",
        alt: "St. Moritz Photo 6",
        width: 1200,
        height: 800,
      },
    ],
  },
];

export function getCityBySlug(slug: string): CityPhotography | undefined {
  return cities.find((c) => c.slug === slug);
}
