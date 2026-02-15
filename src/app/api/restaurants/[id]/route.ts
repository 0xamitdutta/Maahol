import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// ---------------------------------------------------------------------------
// In-memory cache for individual place details (1-hour TTL)
// ---------------------------------------------------------------------------
const detailCache = new Map<
  string,
  { data: Record<string, unknown>; fetchedAt: number }
>();
const CACHE_TTL_MS = 60 * 60 * 1000;

// ---------------------------------------------------------------------------
// Map Google's priceLevel enum to rupee symbols
// ---------------------------------------------------------------------------
function formatPriceLevel(priceLevel?: string): string {
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

function photoUrl(photoName: string, maxWidth = 800): string {
  return `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${maxWidth}&key=${API_KEY}`;
}

// ---------------------------------------------------------------------------
// GET /api/restaurants/[id]
// ---------------------------------------------------------------------------
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    return NextResponse.json(
      {
        error:
          "Google Places API key not configured. Set GOOGLE_PLACES_API_KEY in .env.local",
      },
      { status: 500 }
    );
  }

  const { id: placeId } = await params;

  // Check cache
  const cached = detailCache.get(placeId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json(cached.data);
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask":
            "id,displayName,formattedAddress,rating,userRatingCount,priceLevel,editorialSummary,photos,types,primaryType,currentOpeningHours,location,googleMapsUri,reviews",
        },
      }
    );

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Google Places API error (${res.status}): ${error}`);
    }

    const place = await res.json();

    const displayName = place.displayName as { text: string } | undefined;
    const editorialSummary = place.editorialSummary as
      | { text: string }
      | undefined;
    const photos = (place.photos as Array<{ name: string }>) ?? [];
    const location = place.location as
      | { latitude: number; longitude: number }
      | undefined;
    const currentOpeningHours = place.currentOpeningHours as
      | { openNow: boolean; weekdayDescriptions?: string[] }
      | undefined;
    const reviews = (place.reviews as Array<{
      authorAttribution: { displayName: string };
      text: { text: string };
      rating: number;
    }>) ?? [];

    const result = {
      id: place.id ?? placeId,
      name: displayName?.text ?? "Unknown",
      address: place.formattedAddress ?? "",
      rating: place.rating ?? 0,
      userRatingCount: place.userRatingCount ?? 0,
      priceLevel: formatPriceLevel(place.priceLevel),
      description: editorialSummary?.text ?? "",
      photos: photos.slice(0, 6).map((p: { name: string }) => photoUrl(p.name, 1200)),
      openNow: currentOpeningHours?.openNow ?? null,
      weekdayHours: currentOpeningHours?.weekdayDescriptions ?? [],
      lat: location?.latitude ?? 0,
      lng: location?.longitude ?? 0,
      googleMapsUri: place.googleMapsUri ?? "",
      types: place.types ?? [],
      reviews: reviews.slice(0, 3).map((r) => ({
        author: r.authorAttribution?.displayName ?? "Anonymous",
        text: r.text?.text ?? "",
        rating: r.rating ?? 0,
      })),
    };

    detailCache.set(placeId, { data: result, fetchedAt: Date.now() });
    return NextResponse.json(result);
  } catch (err) {
    console.error("Failed to fetch restaurant details:", err);
    return NextResponse.json(
      { error: "Failed to fetch restaurant details from Google Places API" },
      { status: 500 }
    );
  }
}
