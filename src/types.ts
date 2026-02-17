export type City = "Delhi" | "Bangalore" | "Mumbai";

export const CITIES: City[] = ["Delhi", "Bangalore", "Mumbai"];

export const VIBES = ["Date Night", "Party", "Chill", "Work"] as const;
export type Vibe = (typeof VIBES)[number];

export interface Restaurant {
  id: string; // Google Place ID
  name: string;
  location: string; // Neighborhood / short address
  city: City;
  rating: number;
  userRatingCount: number;
  priceLevel: string; // e.g. "₹₹₹"
  description: string;
  imageUrl: string | null;
  photos: string[]; // Array of photo URLs
  tags: string[];
  vibes: Vibe[]; // LLM-classified vibes
  address: string; // Full formatted address
  openNow: boolean | null;
  lat: number;
  lng: number;
  googleMapsUri: string;
}
