/** Site base URL — set NEXT_PUBLIC_SITE_URL in your environment for production */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ibrahimferkh.com";

/** Centralised social media links — update here and they propagate everywhere */
export const SOCIAL_LINKS = {
  instagram: {
    url: "https://instagram.com/ibrahimferkh",
    handle: "@ibrahimferkh",
  },
  instagramFrames: {
    url: "https://instagram.com/framebyibrahim",
    handle: "@framebyibrahim",
  },
  letterboxd: {
    url: "https://letterboxd.com/ibra14",
    handle: "ibra14",
  },
  x: {
    url: "https://x.com/ibrahimferkh",
    handle: "@ibrahimferkh",
  },
} as const;
