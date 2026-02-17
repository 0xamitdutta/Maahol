import { GoogleGenAI } from "@google/genai";
import type { Restaurant, Vibe } from "@/types";
import { VIBES } from "@/types";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// ---------------------------------------------------------------------------
// Enrich restaurants with LLM-classified vibes using Gemini Flash
// Batches all restaurants into a single prompt for efficiency
// ---------------------------------------------------------------------------
export async function enrichWithVibes(
  restaurants: Restaurant[]
): Promise<Restaurant[]> {
  if (!GEMINI_API_KEY) {
    console.warn(
      "[vibes] GEMINI_API_KEY not set — skipping vibe enrichment"
    );
    return restaurants;
  }

  if (restaurants.length === 0) return restaurants;

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  // Build a compact summary for the LLM
  const restaurantSummaries = restaurants.map((r) => ({
    id: r.id,
    name: r.name,
    tags: r.tags,
    priceLevel: r.priceLevel,
    description: r.description || "No description",
  }));

  const prompt = `You are a restaurant vibe classifier for an Indian dining discovery app.

For each restaurant below, assign one or more vibes from this exact list: ${VIBES.join(", ")}.

Guidelines:
- "Date Night": Romantic, intimate, fine dining, upscale ambiance, candle-lit, scenic views
- "Party": Bars, nightlife, clubs, loud music, social drinking, lively atmosphere  
- "Chill": Casual cafes, brunch spots, relaxed vibes, coffee shops, laid-back
- "Work": Cafes with WiFi, quiet spaces, co-working friendly, coffee shops
- A restaurant can have multiple vibes (e.g. a trendy bar could be both "Party" and "Date Night")
- Every restaurant must have at least one vibe

Restaurants:
${JSON.stringify(restaurantSummaries, null, 2)}

Respond ONLY with a valid JSON object mapping restaurant IDs to arrays of vibes.
Example: {"ChIJ123": ["Date Night", "Chill"], "ChIJ456": ["Party"]}
Do not include any other text, markdown, or code fences.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        temperature: 0.1, // Low temperature for consistent classification
      },
    });

    const text = response.text?.trim();
    if (!text) {
      console.warn("[vibes] Empty response from Gemini");
      return restaurants;
    }

    // Strip potential markdown code fences
    const cleanJson = text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const vibeMap: Record<string, string[]> = JSON.parse(cleanJson);

    // Merge vibes into restaurant objects
    return restaurants.map((r) => {
      const assignedVibes = (vibeMap[r.id] ?? []).filter((v): v is Vibe =>
        VIBES.includes(v as Vibe)
      );
      return { ...r, vibes: assignedVibes };
    });
  } catch (err) {
    console.error("[vibes] Gemini enrichment failed:", err);
    return restaurants; // Graceful fallback — return without vibes
  }
}
