'use client';

import { useEffect, useState, useRef } from 'react';
import type { Restaurant } from '@/types';
import Link from 'next/link';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

interface TrendingSectionProps {
  city: string;
}

// Map vibe tags to display colors
const TAG_STYLES: Record<string, string> = {
  RELAXED: 'bg-[#2a2a2a]/80 text-white',
  ACOUSTIC: 'bg-[#2a2a2a]/80 text-white',
  OUTDOOR: 'bg-[#2a2a2a]/80 text-white',
  'HIGH ENERGY': 'bg-[#2a2a2a]/80 text-white',
  INDUSTRIAL: 'bg-[#2a2a2a]/80 text-white',
  CRAFTED: 'bg-[#2a2a2a]/80 text-white',
};

// Status indicator colors
const STATUS_INDICATORS = ['green', 'orange', 'green'] as const;
const STATUS_ICONS: Record<string, { symbol: string; color: string }> = {
  green: { symbol: '●', color: '#22c55e' },
  orange: { symbol: '▲', color: '#f97316' },
};

export default function TrendingSection({ city = 'Mumbai' }: TrendingSectionProps) {
  const [venues, setVenues] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Extract neighborhood from the first venue for the header
  const neighborhood = 'Bandra';

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/restaurants?city=${encodeURIComponent(city)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load restaurants');
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

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 380;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section id="trending" className="py-16 px-6 md:px-16 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold md:text-4xl text-[#171212]">
              Trending in {neighborhood}
            </h2>
            <p className="mt-1 text-sm italic text-[#171212]/50">Curated by Sofia V.</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Scroll Arrows */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer bg-white"
              >
                <ChevronLeft size={16} className="text-gray-500" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer bg-white"
              >
                <ChevronRight size={16} className="text-gray-500" />
              </button>
            </div>
            <Link
              href={`/search?city=${encodeURIComponent(city)}`}
              className="hidden md:flex items-center text-sm font-semibold text-[#d8544f] hover:gap-3 transition-all gap-1.5"
            >
              See all {neighborhood} spots <span className="text-base">→</span>
            </Link>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="mb-4 aspect-[4/5] rounded-2xl bg-gray-200" />
                <div className="h-5 w-3/4 rounded bg-gray-200 mb-2" />
                <div className="h-3 w-1/2 rounded bg-gray-100" />
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
          <div ref={scrollRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {venues.map((venue, index) => {
              const statusType = STATUS_INDICATORS[index % STATUS_INDICATORS.length];
              const statusIcon = STATUS_ICONS[statusType];
              const displayTags = venue.tags.slice(0, 2).map(t => t.toUpperCase());

              return (
                <Link
                  key={venue.id}
                  href={`/restaurant/${venue.id}`}
                  className="group cursor-pointer"
                >
                  {/* Card Image */}
                  <div className="relative mb-3 aspect-[4/5] overflow-hidden rounded-2xl bg-gray-200">
                    {venue.imageUrl ? (
                      <img
                        src={venue.imageUrl}
                        alt={venue.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                        {venue.name}
                      </div>
                    )}

                    {/* Vibe Tags — bottom left */}
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                      {displayTags.map(tag => (
                        <span
                          key={tag}
                          className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${TAG_STYLES[tag] || 'bg-[#2a2a2a]/80 text-white'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Rating Badge — bottom right */}
                    <div className="absolute bottom-4 right-4 bg-[#d8544f] px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                      <span className="text-white text-[10px]">★</span>
                      <span className="text-xs font-bold text-white">{venue.rating}</span>
                    </div>

                    {/* Heart Icon — top right */}
                    <button
                      className="absolute top-4 right-4 p-1.5 text-white/70 hover:text-white transition-colors"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    >
                      <Heart size={22} strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* Card Info */}
                  <div className="px-1">
                    {/* Name + Status */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="text-base font-bold text-[#171212]">{venue.name}</h3>
                      <span style={{ color: statusIcon.color, fontSize: '10px' }}>{statusIcon.symbol}</span>
                    </div>

                    {/* Vibeometer Bar + Price */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-[#171212]/50 font-medium">Vibeometer</span>
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden max-w-[100px]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(venue.rating / 5) * 100}%`,
                            background: `linear-gradient(90deg, #d8544f, #e8837f)`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-[#171212]/60 font-medium">{venue.priceLevel}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#171212]/60 leading-relaxed line-clamp-2">
                      {venue.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
