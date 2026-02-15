'use client';

import { useEffect, useState, use } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Vibeometer from '@/components/restaurant/Vibeometer';
import { MapPin, Clock, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface RestaurantDetail {
  id: string;
  name: string;
  address: string;
  rating: number;
  userRatingCount: number;
  priceLevel: string;
  description: string;
  photos: string[];
  openNow: boolean | null;
  weekdayHours: string[];
  lat: number;
  lng: number;
  googleMapsUri: string;
  types: string[];
  reviews: Array<{
    author: string;
    text: string;
    rating: number;
  }>;
}

// Generate vibe stats from the data we have (placeholder logic until LLM enrichment)
function generateVibeStats(detail: RestaurantDetail) {
  // Use rating and price as proxies for vibe attributes
  const baseEnergy = Math.min(10, detail.rating * 1.2);
  const isUpscale = detail.priceLevel.length >= 3;

  return [
    { label: 'Lighting', value: isUpscale ? 8.5 : 6.0 },
    { label: 'Volume', value: isUpscale ? 4.0 : 7.0 },
    { label: 'Energy', value: Math.round(baseEnergy * 10) / 10 },
    { label: 'Conversation Friendly', value: isUpscale ? 9.0 : 6.5 },
  ];
}

export default function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [venue, setVenue] = useState<RestaurantDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/restaurants/${encodeURIComponent(id)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load restaurant');
        return res.json();
      })
      .then((data: RestaurantDetail) => {
        if (!cancelled) {
          setVenue(data);
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
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow pt-16">
          <div className="h-64 md:h-96 w-full bg-gray-200 animate-pulse" />
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-4 w-1/3 bg-gray-200 rounded" />
              <div className="h-8 w-2/3 bg-gray-200 rounded" />
              <div className="h-20 w-full bg-gray-100 rounded" />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Error State
  if (error || !venue) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow pt-16 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p className="text-xl mb-2">Could not load restaurant</p>
            <p className="text-sm mb-4">{error}</p>
            <Link href="/" className="text-primary underline">Back to Home</Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const vibeStats = generateVibeStats(venue);

  // Extract neighborhood from address
  const neighborhood = venue.address.split(',').slice(0, 2).join(', ');

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow pt-16">
        {/* Photo Gallery */}
        <div className="h-64 md:h-96 w-full bg-gray-200 relative grid grid-cols-4 gap-1 p-1">
          {venue.photos[0] && (
            <div className="col-span-2 row-span-2 relative">
              <img src={venue.photos[0]} alt="Main View" className="w-full h-full object-cover" />
            </div>
          )}
          {venue.photos[1] && (
            <div className="col-span-1 row-span-1 relative">
              <img src={venue.photos[1]} alt="Detail View 1" className="w-full h-full object-cover" />
            </div>
          )}
          {venue.photos[2] && (
            <div className="col-span-1 row-span-2 relative">
              <img src={venue.photos[2]} alt="Detail View 2" className="w-full h-full object-cover" />
            </div>
          )}
          {venue.photos.length > 3 && (
            <div className="col-span-1 row-span-1 bg-gray-100 relative flex items-center justify-center text-gray-400 text-sm">
              +{venue.photos.length - 3} Photos
            </div>
          )}
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3 space-y-8">
              <div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                  <span>{neighborhood}</span>
                  <span>•</span>
                  <span>{venue.priceLevel}</span>
                  <span>•</span>
                  <span>★ {venue.rating} ({venue.userRatingCount} reviews)</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{venue.name}</h1>
                {venue.description && (
                  <p className="text-lg text-gray-600 leading-relaxed">{venue.description}</p>
                )}
              </div>

              {/* Reviews (replaces "The Experience" section) */}
              {venue.reviews.length > 0 && (
                <div className="border-t border-gray-100 pt-8">
                  <h2 className="text-2xl font-bold mb-4 font-serif">What People Say</h2>
                  <div className="space-y-4">
                    {venue.reviews.map((review, idx) => (
                      <div key={idx} className="bg-gray-50 p-6 rounded-2xl flex gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex-shrink-0 flex items-center justify-center text-primary font-bold text-sm">
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-gray-800 italic mb-2">&ldquo;{review.text}&rdquo;</p>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-gray-900">— {review.author}</p>
                            <span className="text-yellow-500 text-sm">{"★".repeat(review.rating)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-6">
              <div className="sticky top-24 space-y-6">
                <Vibeometer ratings={vibeStats} />

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Visit</h3>
                  {venue.googleMapsUri && (
                    <a
                      href={venue.googleMapsUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full btn btn-primary mb-3 flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={16} />
                      Open in Google Maps
                    </a>
                  )}
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-start space-x-3 text-sm text-gray-600 mb-3">
                    <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                    <p>{venue.address}</p>
                  </div>
                  {venue.weekdayHours.length > 0 && (
                    <div className="flex items-start space-x-3 text-sm text-gray-600">
                      <Clock size={18} className="mt-0.5 flex-shrink-0" />
                      <div>
                        {venue.openNow !== null && (
                          <p className={`font-medium mb-1 ${venue.openNow ? 'text-green-600' : 'text-red-500'}`}>
                            {venue.openNow ? 'Open now' : 'Closed'}
                          </p>
                        )}
                        {venue.weekdayHours.map((h, i) => (
                          <p key={i} className="text-xs text-gray-400">{h}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
