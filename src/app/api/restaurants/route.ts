import { NextRequest, NextResponse } from "next/server";
import type { Restaurant, City } from "@/types";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

const VALID_CITIES: City[] = ["Delhi", "Bangalore", "Mumbai"];

// ---------------------------------------------------------------------------
// In-memory cache: city → { data, fetchedAt }
// TTL = 1 hour — avoids hammering the API during development
// ---------------------------------------------------------------------------
const cache = new Map<
  string,
  { data: Restaurant[]; fetchedAt: number }
>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

// ---------------------------------------------------------------------------
// Map Google's priceLevel enum to rupee symbols
// ---------------------------------------------------------------------------
function formatPriceLevel(
  priceLevel?: string
): string {
  switch (priceLevel) {
    case "PRICE_LEVEL_INEXPENSIVE":
      return "₹";
    case "PRICE_LEVEL_MODERATE":
      return "₹₹";
    case "PRICE_LEVEL_EXPENSIVE":
      return "₹₹₹";
    case "PRICE_LEVEL_VERY_EXPENSIVE":
      return "₹₹₹₹";
    default:
      return "₹₹";
  }
}

// ---------------------------------------------------------------------------
// Build a Google Places photo URL from a photo resource name
// ---------------------------------------------------------------------------
function photoUrl(photoName: string, maxWidth = 800): string {
  return `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${maxWidth}&key=${API_KEY}`;
}

// ---------------------------------------------------------------------------
// Derive simple tags from the place's primary type and other types
// ---------------------------------------------------------------------------
function deriveTags(place: Record<string, unknown>): string[] {
  const tags: string[] = [];
  const types = (place.types as string[]) ?? [];

  const TYPE_LABELS: Record<string, string> = {
    restaurant: "Restaurant",
    cafe: "Cafe",
    bar: "Bar",
    bakery: "Bakery",
    meal_delivery: "Delivery",
    meal_takeaway: "Takeaway",
    night_club: "Nightlife",
    fine_dining_restaurant: "Fine Dining",
    indian_restaurant: "Indian",
    chinese_restaurant: "Chinese",
    italian_restaurant: "Italian",
    japanese_restaurant: "Japanese",
    seafood_restaurant: "Seafood",
    vegetarian_restaurant: "Vegetarian",
    vegan_restaurant: "Vegan",
    steak_house: "Steakhouse",
    pizza_restaurant: "Pizza",
    brunch_restaurant: "Brunch",
    ice_cream_shop: "Desserts",
    coffee_shop: "Coffee",
  };

  for (const type of types) {
    if (TYPE_LABELS[type]) {
      tags.push(TYPE_LABELS[type]);
    }
  }

  return tags.length > 0 ? tags.slice(0, 3) : ["Restaurant"];
}

// ---------------------------------------------------------------------------
// Extract a short location (neighbourhood) from the formatted address
// e.g. "123, Linking Road, Bandra West, Mumbai, Maharashtra 400050, India"
//   → "Bandra West"
// ---------------------------------------------------------------------------
function extractNeighborhood(formattedAddress: string, city: City): string {
  const parts = formattedAddress.split(",").map((p) => p.trim());
  // Usually the neighborhood is the 2nd-to-last part before the city name.
  // Try to find a part that is NOT the city, state, country, or zip.
  const skipWords = [
    city,
    "India",
    "Maharashtra",
    "Karnataka",
    "Delhi",
    "New Delhi",
    "NCT",
  ];

  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];
    // Skip parts that contain numbers (zip codes) or known skip words
    if (/\d/.test(part)) continue;
    if (skipWords.some((w) => part.toLowerCase().includes(w.toLowerCase())))
      continue;
    return part;
  }

  return city;
}

// ---------------------------------------------------------------------------
// Map a single place from Google's response to our Restaurant type
// ---------------------------------------------------------------------------
function mapPlace(
  place: Record<string, unknown>,
  city: City
): Restaurant {
  const displayName = place.displayName as { text: string } | undefined;
  const editorialSummary = place.editorialSummary as
    | { text: string }
    | undefined;
  const photos = (place.photos as Array<{ name: string }>) ?? [];
  const location = place.location as { latitude: number; longitude: number } | undefined;
  const currentOpeningHours = place.currentOpeningHours as
    | { openNow: boolean }
    | undefined;

  const formattedAddress = (place.formattedAddress as string) ?? "";

  return {
    id: (place.id as string) ?? "",
    name: displayName?.text ?? "Unknown",
    location: extractNeighborhood(formattedAddress, city),
    city,
    rating: (place.rating as number) ?? 0,
    userRatingCount: (place.userRatingCount as number) ?? 0,
    priceLevel: formatPriceLevel(place.priceLevel as string | undefined),
    description:
      editorialSummary?.text ?? "",
    imageUrl: photos.length > 0 ? photoUrl(photos[0].name) : null,
    photos: photos.slice(0, 5).map((p) => photoUrl(p.name)),
    tags: deriveTags(place),
    address: formattedAddress,
    openNow: currentOpeningHours?.openNow ?? null,
    lat: location?.latitude ?? 0,
    lng: location?.longitude ?? 0,
    googleMapsUri: (place.googleMapsUri as string) ?? "",
  };
}

// ---------------------------------------------------------------------------
// Fetch a single page from Text Search (New) API
// ---------------------------------------------------------------------------
async function fetchPage(
  city: City,
  pageToken?: string
): Promise<{
  places: Record<string, unknown>[];
  nextPageToken?: string;
}> {
  const body: Record<string, unknown> = {
    textQuery: `best restaurants in ${city}, India`,
    languageCode: "en",
    pageSize: 20,
  };

  if (pageToken) {
    body.pageToken = pageToken;
  }

  const res = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY!,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.priceLevel,places.editorialSummary,places.photos,places.types,places.primaryType,places.currentOpeningHours,places.location,places.googleMapsUri,nextPageToken",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Google Places API error (${res.status}): ${error}`);
  }

  return res.json();
}

// ---------------------------------------------------------------------------
// Fetch up to `maxResults` restaurants for a city (paginated)
// ---------------------------------------------------------------------------
async function fetchRestaurantsForCity(
  city: City,
  maxResults = 50
): Promise<Restaurant[]> {
  const allPlaces: Record<string, unknown>[] = [];
  let pageToken: string | undefined;

  // Fetch up to 3 pages (20 results each = 60 max)
  for (let page = 0; page < 3 && allPlaces.length < maxResults; page++) {
    const response = await fetchPage(city, pageToken);
    const places = response.places ?? [];
    allPlaces.push(...places);
    pageToken = response.nextPageToken;
    if (!pageToken) break;
  }

  return allPlaces.slice(0, maxResults).map((place) => mapPlace(place, city));
}

// ---------------------------------------------------------------------------
// GET /api/restaurants?city=Mumbai
// ---------------------------------------------------------------------------
export async function GET(request: NextRequest) {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    return NextResponse.json(
      { error: "Google Places API key not configured. Set GOOGLE_PLACES_API_KEY in .env.local" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const cityParam = searchParams.get("city") ?? "Mumbai";

  if (!VALID_CITIES.includes(cityParam as City)) {
    return NextResponse.json(
      { error: `Invalid city. Use one of: ${VALID_CITIES.join(", ")}` },
      { status: 400 }
    );
  }

  const city = cityParam as City;

  // Check cache
  const cached = cache.get(city);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json(cached.data);
  }

  try {
    const restaurants = await fetchRestaurantsForCity(city);
    cache.set(city, { data: restaurants, fetchedAt: Date.now() });
    return NextResponse.json(restaurants);
  } catch (err) {
    console.error("Failed to fetch restaurants:", err);
    return NextResponse.json(
      { error: "Failed to fetch restaurants from Google Places API" },
      { status: 500 }
    );
  }
}
