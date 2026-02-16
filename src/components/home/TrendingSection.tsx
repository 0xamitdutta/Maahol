'use client';

import { useEffect, useState } from 'react';
import type { Restaurant } from '@/types';
import Link from 'next/link';

interface TrendingSectionProps {
  city: string;
}

export default function TrendingSection({ city = "Mumbai" }: TrendingSectionProps) {
  const [venues, setVenues] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/restaurants?city=${encodeURIComponent(city)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load restaurants");
        return res.json();
      })
      .then((data: Restaurant[]) => {
        if (!cancelled) {
          setVenues(data.slice(0, 6));
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [city]);

  return (
    <section id="trending" className="py-24 px-6 md:px-16 bg-white/50">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary/60">Curation 01</p>
            <h2 className="font-serif text-4xl font-bold md:text-5xl text-[#171212]">Trending in {city}</h2>
          </div>
          <Link href={`/search?city=${encodeURIComponent(city)}`} className="hidden md:flex items-center text-sm font-bold text-primary hover:gap-4 transition-all gap-2">
            See all {city} spots <span className="text-lg">→</span>
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[300px] md:min-w-[400px] snap-start animate-pulse">
                <div className="mb-6 aspect-[3/4] rounded-2xl bg-gray-200" />
                <div className="h-5 w-3/4 rounded bg-gray-200 mb-2" />
                <div className="h-4 w-1/2 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">Could not load restaurants</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Venue Cards */}
        {!loading && !error && (
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar">
            {venues.map((venue) => (
              <Link
                key={venue.id}
                href={`/restaurant/${venue.id}`}
                className="group min-w-[300px] md:min-w-[400px] snap-start cursor-pointer"
              >
                <div className="relative mb-6 aspect-[3/4] overflow-hidden rounded-2xl bg-gray-200">
                  {venue.imageUrl ? (
                    <img
                      src={venue.imageUrl}
                      alt={venue.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                      {venue.name}
                    </div>
                  )}
                  <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                    {venue.tags.map(tag => (
                      <span key={tag} className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Rating badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center shadow-sm">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-xs font-bold text-gray-900">{venue.rating}</span>
                  </div>
                </div>
                <h3 className="mb-1 text-xl font-bold text-[#171212]">{venue.name}</h3>
                <p className="text-sm text-[#171212]/60">
                  {venue.location} • {venue.priceLevel}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
