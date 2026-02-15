export type City = "Delhi" | "Bangalore" | "Mumbai";

export const CITIES: City[] = ["Delhi", "Bangalore", "Mumbai"];

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
  address: string; // Full formatted address
  openNow: boolean | null;
  lat: number;
  lng: number;
  googleMapsUri: string;
}
