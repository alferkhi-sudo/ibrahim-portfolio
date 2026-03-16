export interface MapGuide {
  id: string;
  title: string;
  description: string;
  price: string;
  longDescription: string;
  includes: string[];
}

export const cityGuides: Record<string, MapGuide[]> = {
  paris: [
    {
      id: "full-paris-guide",
      title: "Full Paris Guide",
      description: "The complete curated list — every neighbourhood, café, restaurant, and hidden gem worth your time.",
      price: "€19.99",
      longDescription: "Everything you need for the perfect Paris trip in one Google Maps list. Curated from multiple visits across all arrondissements — no tourist traps, only the good stuff.",
      includes: [
        "50+ hand-picked spots across all categories",
        "Restaurants, cafés, boulangeries & patisseries",
        "Hidden gems and neighbourhood favourites",
        "Organised by arrondissement for easy navigation",
        "Regular updates as new places open",
      ],
    },
    {
      id: "paris-coffee-shops",
      title: "Paris Coffee Shops",
      description: "The best specialty coffee spots across Paris, from Saint-Germain to the 10th.",
      price: "€4.49",
      longDescription: "Paris has quietly become one of Europe's best specialty coffee cities. This list cuts through the noise and takes you straight to the cups worth your time.",
      includes: [
        "20+ specialty coffee shops",
        "Third-wave and independent roasters",
        "Spots with good wifi & work-friendly vibes",
        "Morning and afternoon picks by neighbourhood",
        "Notes on best drinks to order",
      ],
    },
    {
      id: "lebanese-restaurants",
      title: "Lebanese Restaurants",
      description: "A curated list of the finest Lebanese dining in Paris — from casual to refined.",
      price: "€4.49",
      longDescription: "Paris has one of the most vibrant Lebanese communities outside of Beirut. This list guides you to the best — from quick mezze stops to full sit-down experiences.",
      includes: [
        "15+ Lebanese restaurants and spots",
        "Casual street food to sit-down dining",
        "Best spots for mezze, grills & sweets",
        "Covers multiple arrondissements",
        "Personally vetted and regularly revisited",
      ],
    },
    {
      id: "paris-boulangeries",
      title: "Paris Boulangeries",
      description: "The essential boulangeries — where to find the perfect croissant and baguette.",
      price: "€4.49",
      longDescription: "A morning in Paris is defined by where you get your croissant. This list is the result of years of early mornings and butter-stained fingers — only the best made the cut.",
      includes: [
        "25+ boulangeries across Paris",
        "Award-winning and neighbourhood classics",
        "Best for croissants, pain au chocolat & baguettes",
        "Sorted by arrondissement",
        "Personally tested on every visit",
      ],
    },
  ],
};
