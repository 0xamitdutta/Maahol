export interface CollectionItem {
  placeId: string;
  name: string;
  photoUrls: string[];
  whyText: string;
  vibeStats: { label: string; value: number }[];
}

export interface CuratedCollection {
  slug: string;
  title: string;
  subtitle: string;
  placeCount: number;
  coverImage: string;
  curatedBy: string;
  updatedAgo: string;
  introBlurb: string;
  items: CollectionItem[];
}

export const COLLECTIONS: CuratedCollection[] = [
  {
    slug: "first-date-safe-list",
    title: "The First Date Safe List",
    subtitle: "5 spots with good lighting and low noise.",
    placeCount: 5,
    coverImage: "/images/collections/first-date-cover.png",
    curatedBy: "Amit",
    updatedAgo: "2 days ago",
    introBlurb:
      "First dates are nerve-wracking enough without having to worry about yelling over a DJ. These 5 restaurants have the perfect combination of soft lighting, ambient music, and conversation-friendly seating. We've personally tested the noise levels and ambiance so you can focus on what matters.",
    items: [
      {
        placeId: "ChIJL_P_aXENCDkRLlj9z_cSsHY",
        name: "Indian Accent",
        photoUrls: [],
        whyText:
          "Indian Accent nails the balance between impressive and relaxed. The lighting is warm but not dim, the service is attentive without hovering, and the inventive tasting menu gives you plenty to talk about. It's the kind of place that makes you look like you have great taste — without trying too hard.",
        vibeStats: [
          { label: "Lighting", value: 9 },
          { label: "Noise Level", value: 3 },
          { label: "Conversation Friendly", value: 9.5 },
        ],
      },
      {
        placeId: "ChIJW4t4T5YFDTkRb6s6OXz3Cjk",
        name: "Olive Bar & Kitchen",
        photoUrls: [],
        whyText:
          "Set in a whitewashed heritage building amid Mehrauli's ancient ruins, Olive feels like a Mediterranean escape. The courtyard seating under fairy lights is pure magic after sundown. The background music is always a low, tasteful hum — perfect for leaning in close.",
        vibeStats: [
          { label: "Lighting", value: 8.5 },
          { label: "Noise Level", value: 4 },
          { label: "Conversation Friendly", value: 9 },
        ],
      },
      {
        placeId: "ChIJGwLgwJAFDTkRk_JEIiQWdz4",
        name: "Lavaash by Saby",
        photoUrls: [],
        whyText:
          "Armenian-inspired food in a gorgeous art-filled space — Lavaash is a conversation starter by design. The quirky interiors give you something to talk about, the portions are shareable, and the dimly-lit corners feel intimate without being cave-like. Plus, the cocktails are strong enough to calm the nerves.",
        vibeStats: [
          { label: "Lighting", value: 7.5 },
          { label: "Noise Level", value: 4.5 },
          { label: "Conversation Friendly", value: 8.5 },
        ],
      },
      {
        placeId: "ChIJodgF9j8dDTkRPbnohH9HcZo",
        name: "Diggin Cafe",
        photoUrls: [],
        whyText:
          "If your idea of a first date is casual and afternoon-friendly, Diggin is your spot. The garden seating in Chanakyapuri is lush and Instagram-ready — which yes, matters. It's low-pressure, the pasta is solid, and no one's judging you for ordering dessert first.",
        vibeStats: [
          { label: "Lighting", value: 8 },
          { label: "Noise Level", value: 5 },
          { label: "Conversation Friendly", value: 8 },
        ],
      },
      {
        placeId: "ChIJk9GNBygaDTkRQPfShJATXGw",
        name: "The Piano Man Jazz Club",
        photoUrls: [],
        whyText:
          "For the date that wants to feel like a scene from a Woody Allen film. Live jazz, low lighting, and craft cocktails — The Piano Man is effortlessly cool. Sit close, listen to the music, and let the atmosphere do half the work. Just don't talk during the solos.",
        vibeStats: [
          { label: "Lighting", value: 7 },
          { label: "Noise Level", value: 6 },
          { label: "Conversation Friendly", value: 7 },
        ],
      },
    ],
  },
  {
    slug: "monsoon-survival-guide",
    title: "The Monsoon Survival Guide",
    subtitle: "5 cafes that are your shelter during the rains.",
    placeCount: 5,
    coverImage: "/images/collections/monsoon-guide-cover.png",
    curatedBy: "Amit",
    updatedAgo: "5 days ago",
    introBlurb:
      "Mumbai rains are chaotic. The roads flood, the trains stop, and your Uber cancels three times. But here's the silver lining: these 5 cafes turn a rainy nightmare into a cozy, coffee-fueled escape. We picked them for their window seats, warm lighting, and the ability to make you forget there's a storm outside.",
    items: [
      {
        placeId: "ChIJ411x2R3H5zsR9GhEwaaM5_w",
        name: "Subko Coffee Roasters",
        photoUrls: [],
        whyText:
          "We picked Subko not just for the coffee — though it's some of the best in Bandra — but because the WiFi actually works during a storm. The high ceilings and industrial design feel open even when the rain is closing in. Order a pour-over, grab the window seat, and watch Bandra drown in style.",
        vibeStats: [
          { label: "Lighting", value: 8 },
          { label: "Noise Level", value: 3.5 },
          { label: "Cozy Factor", value: 9 },
        ],
      },
      {
        placeId: "ChIJlUzK8aPO5zsRjHE22F9DmW4",
        name: "Leaping Windows",
        photoUrls: [],
        whyText:
          "A board game cafe during a monsoon downpour? Genius. Leaping Windows in Versova is warm, nerdy, and stocked with over 100 board games. The chai is spiced perfectly and the atmosphere breeds the kind of competitive banter that makes you forget you're stranded. Bring a friend, make one there.",
        vibeStats: [
          { label: "Lighting", value: 7 },
          { label: "Noise Level", value: 5 },
          { label: "Cozy Factor", value: 9.5 },
        ],
      },
      {
        placeId: "ChIJJ30sCjfO5zsRd-Zp_fWKHAo",
        name: "Kala Ghoda Cafe",
        photoUrls: [],
        whyText:
          "Tucked into the art district, Kala Ghoda Cafe is the kind of place where you can nurse a latte for three hours and nobody cares. The stone walls keep it cool, the filter coffee keeps you warm, and the bookshelf in the corner is actually curated. Perfect monsoon hideout for the introverts.",
        vibeStats: [
          { label: "Lighting", value: 7.5 },
          { label: "Noise Level", value: 3 },
          { label: "Cozy Factor", value: 8.5 },
        ],
      },
      {
        placeId: "ChIJGSByQi7P5zsR9c7m_mmW41I",
        name: "The Nutcracker",
        photoUrls: [],
        whyText:
          "The Nutcracker in Bandra is like stepping into a Wes Anderson set — pastel walls, mismatched china, and cakes that belong in a museum. During monsoon, the tiny indoor space becomes a cozy capsule. Their rose-pistachio cake and masala chai combo is peak rainy day comfort.",
        vibeStats: [
          { label: "Lighting", value: 8.5 },
          { label: "Noise Level", value: 4 },
          { label: "Cozy Factor", value: 9 },
        ],
      },
      {
        placeId: "ChIJhzyGAbrO5zsRNuP4VrWGavc",
        name: "Birdsong Cafe",
        photoUrls: [],
        whyText:
          "Bandra's Birdsong has the largest windows in the neighbourhood, which means front-row seats to the monsoon drama. The organic menu is light and clean — exactly what you want when the humidity is at 98%. Their cold brews are exceptional, and the breeze off the rain is free air conditioning.",
        vibeStats: [
          { label: "Lighting", value: 8 },
          { label: "Noise Level", value: 4.5 },
          { label: "Cozy Factor", value: 8 },
        ],
      },
    ],
  },
  {
    slug: "work-from-anywhere",
    title: "Work From Anywhere",
    subtitle: "5 cafes with fast WiFi and great coffee.",
    placeCount: 5,
    coverImage: "/images/collections/work-cafe-cover.png",
    curatedBy: "Amit",
    updatedAgo: "1 week ago",
    introBlurb:
      "Working from home is overrated — your bed is too close, your fridge is too tempting, and your motivation dies somewhere between the second snooze and the third scroll. These 5 cafes have fast WiFi, plenty of power outlets, and the kind of ambient noise that actually helps you focus. Tested with Zoom calls.",
    items: [
      {
        placeId: "ChIJm96RBJ8FDTkRf73Q8oI-WCg",
        name: "Blue Tokai Coffee Roasters",
        photoUrls: [],
        whyText:
          "Blue Tokai is the unofficial co-working space of every freelancer in Delhi. Champa Gali's outpost is the best — the outdoor seating is quiet, the single-origin coffee is genuinely excellent, and the WiFi can handle a Zoom call without dropping. Just don't hog the power strip.",
        vibeStats: [
          { label: "Lighting", value: 8.5 },
          { label: "Noise Level", value: 3 },
          { label: "WiFi Speed", value: 8.5 },
        ],
      },
      {
        placeId: "ChIJPzGMUPkFDTkRJIbfPNhWD4o",
        name: "Ama Cafe",
        photoUrls: [],
        whyText:
          "Hidden in the lanes of Hauz Khas Village, Ama Cafe doesn't look like a productivity hub from outside — but the quiet upstairs seating, consistent WiFi, and bottomless coffee refills make it one. The vibe is creative and chill. Come at 10am, leave at 6pm feeling like you actually accomplished something.",
        vibeStats: [
          { label: "Lighting", value: 7.5 },
          { label: "Noise Level", value: 4 },
          { label: "WiFi Speed", value: 7.5 },
        ],
      },
      {
        placeId: "ChIJ73aFJXEFDTkRi0889xEwBlI",
        name: "Kunzum Travel Cafe",
        photoUrls: [],
        whyText:
          "Kunzum is a pay-what-you-like cafe in Hauz Khas, which already makes it legendary. But beyond the economics, it's a genuinely great workspace: quiet, community-driven, and filled with travellers and remote workers. The chai is free, the conversations are optional, and nobody rushes you out.",
        vibeStats: [
          { label: "Lighting", value: 7 },
          { label: "Noise Level", value: 3.5 },
          { label: "WiFi Speed", value: 7 },
        ],
      },
      {
        placeId: "ChIJiTvljhUdDTkRIbZh-6lKEsE",
        name: "Cafe Dori",
        photoUrls: [],
        whyText:
          "Nestled inside the Dhan Mill Compound, Cafe Dori is where South Delhi's creative class goes to pretend to work (and sometimes actually work). The Japanese-minimalist aesthetic is calming, the matcha is on point, and the seating is spaced enough for laptop privacy. A premium workspace disguised as a cafe.",
        vibeStats: [
          { label: "Lighting", value: 9 },
          { label: "Noise Level", value: 2.5 },
          { label: "WiFi Speed", value: 8 },
        ],
      },
      {
        placeId: "ChIJrSWnOVIODTkRIjRqpKpHD6A",
        name: "The Rose Cafe",
        photoUrls: [],
        whyText:
          "Saket's The Rose Cafe looks like a Pinterest board come to life — pastel interiors, hanging plants, and natural light pouring in from every direction. The European-style brunch menu keeps your energy up, and the back section is quiet enough for deep work. Instagram-friendly and productivity-approved.",
        vibeStats: [
          { label: "Lighting", value: 9.5 },
          { label: "Noise Level", value: 4 },
          { label: "WiFi Speed", value: 7.5 },
        ],
      },
    ],
  },
];
