'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VenueCard from '@/components/search/VenueCard';
import type { Restaurant, City } from '@/types';
import { CITIES } from '@/types';

function SearchContent() {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get('city') ?? 'Mumbai';
  const city: City = CITIES.includes(cityParam as City) ? (cityParam as City) : 'Mumbai';

  const [venues, setVenues] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setPage(1);

    fetch(`/api/restaurants?city=${encodeURIComponent(city)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load restaurants');
        return res.json();
      })
      .then((data: Restaurant[]) => {
        if (!cancelled) {
          setVenues(data);
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

  const totalPages = Math.ceil(venues.length / PAGE_SIZE);
  const pagedVenues = venues.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Top Restaurants in {city}</h1>
        <p className="text-gray-500">
          {loading
            ? 'Loading…'
            : `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, venues.length)} of ${venues.length} spots in ${city}`}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8 h-fit md:sticky md:top-24">
          {/* City Selector */}
          <div>
            <h3 className="font-semibold mb-3">City</h3>
            <div className="flex gap-2">
              {CITIES.map((c) => (
                <a
                  key={c}
                  href={`/search?city=${encodeURIComponent(c)}`}
                  className={`px-4 py-2 text-sm rounded-full border transition-colors whitespace-nowrap ${
                    c === city
                      ? 'bg-[#d8544f] text-white border-[#d8544f]'
                      : 'border-gray-200 hover:border-[#d8544f] hover:text-[#d8544f]'
                  }`}
                >
                  {c}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Vibe</h3>
            <div className="space-y-2">
              {['Date Night', 'Party', 'Chill', 'Work'].map(vibe => (
                <label key={vibe} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                  <span className="text-sm text-gray-600">{vibe}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Price</h3>
            <div className="flex gap-2">
              {['₹', '₹₹', '₹₹₹', '₹₹₹₹'].map(price => (
                <button key={price} className="px-3 py-1 text-sm border border-gray-200 rounded-full hover:border-primary hover:text-primary transition-colors">
                  {price}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="flex-grow">
          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] rounded-2xl bg-gray-200 mb-3" />
                  <div className="h-5 w-3/4 rounded bg-gray-200 mb-2" />
                  <div className="h-4 w-1/2 rounded bg-gray-100" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg mb-2">Could not load restaurants</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Results */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pagedVenues.map(venue => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 text-sm font-medium rounded-full border border-gray-200 transition-colors hover:border-[#d8544f] hover:text-[#d8544f] disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`w-10 h-10 text-sm font-medium rounded-full border transition-colors ${
                        p === page
                          ? 'bg-[#d8544f] text-white border-[#d8544f]'
                          : 'border-gray-200 hover:border-[#d8544f] hover:text-[#d8544f]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 text-sm font-medium rounded-full border border-gray-200 transition-colors hover:border-[#d8544f] hover:text-[#d8544f] disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          <Suspense fallback={
            <div className="animate-pulse">
              <div className="h-8 w-1/3 bg-gray-200 rounded mb-4" />
              <div className="h-4 w-1/4 bg-gray-100 rounded" />
            </div>
          }>
            <SearchContent />
          </Suspense>
        </div>
      </div>
      <Footer />
    </main>
  );
}
