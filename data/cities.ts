export interface MapGuide {
  id: string;
  title: string;
  description: string;
  price: string;
}

export interface CityMeta {
  slug: string;
  name: string;
  image: string;
  subtitle: string;
  comingSoon?: boolean;
  guides?: MapGuide[];
}

export const citiesList: CityMeta[] = [
  {
    slug: "paris",
    name: "Paris",
    image: "/images/travel/paris-hero.jpg",
    subtitle: "The City of Light",
    guides: [
      {
        id: "full-paris-guide",
        title: "Full Paris Guide",
        description: "The complete curated list — every neighbourhood, café, restaurant, and hidden gem worth your time.",
        price: "TBD",
      },
      {
        id: "paris-coffee-shops",
        title: "Paris Coffee Shops",
        description: "The best specialty coffee spots across Paris, from Saint-Germain to the 10th.",
        price: "TBD",
      },
      {
        id: "lebanese-restaurants",
        title: "Lebanese Restaurants",
        description: "A curated list of the finest Lebanese dining in Paris — from casual to refined.",
        price: "TBD",
      },
      {
        id: "paris-boulangeries",
        title: "Paris Boulangeries",
        description: "The essential boulangeries — where to find the perfect croissant and baguette.",
        price: "TBD",
      },
    ],
  },
  {
    slug: "rouen",
    name: "Rouen",
    image: "/images/travel/rouen-hero.jpg",
    subtitle: "The City of a Hundred Spires",
    comingSoon: true,
  },
];
