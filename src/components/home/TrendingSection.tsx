const TRENDING_VENUES = [
  {
    name: "The Steps Cafe",
    description: "Artisanal coffee and quiet corners for modern thinkers.",
    rating: 4.8,
    image: "/images/venue-1.png",
    tags: ["DIMLY LIT", "ACOUSTIC"]
  },
  {
    name: "Olive Bar & Kitchen",
    description: "The iconic Mediterranean getaway in the heart of the city.",
    rating: 4.9,
    image: "/images/venue-2.png",
    tags: ["OUTDOOR", "HIGH ENERGY"]
  },
  {
    name: "Subko Roastery",
    description: "Precision roasts meet heritage architecture.",
    rating: 4.7,
    image: "/images/venue-3.png",
    tags: ["INDUSTRIAL", "CRAFTED"]
  },
];

interface TrendingSectionProps {
  city: string;
}

export default function TrendingSection({ city = "Bandra" }: TrendingSectionProps) {
  return (
    <section className="py-24 px-6 md:px-16 bg-white/50">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary/60">Curation 01</p>
            <h2 className="font-serif text-4xl font-bold md:text-5xl text-[#171212]">Trending in {city}</h2>
          </div>
          <a href="#" className="hidden md:flex items-center text-sm font-bold text-primary hover:gap-4 transition-all gap-2">
            See all {city} spots <span className="text-lg">→</span>
          </a>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar">
          {TRENDING_VENUES.map((venue) => (
            <div key={venue.name} className="group min-w-[300px] md:min-w-[400px] snap-start cursor-pointer">
              <div className="relative mb-6 aspect-[3/4] overflow-hidden rounded-2xl bg-gray-200">
                <img 
                  src={venue.image} 
                  alt={venue.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                    {venue.tags.map(tag => (
                        <span key={tag} className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                            {tag}
                        </span>
                    ))}
                </div>
              </div>
              <h3 className="mb-1 text-xl font-bold text-[#171212]">{venue.name}</h3>
              <p className="text-sm text-[#171212]/60">{venue.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
