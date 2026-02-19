'use client';

import React, { useEffect, useState, use } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MapPin, Clock, ExternalLink, Heart, Image as ImageIcon, Phone, Globe, ChevronDown, ThumbsUp, Star, Wine, TreePine, Music } from 'lucide-react';
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

// Derive a readable cuisine type from Google types
function getCuisineType(types: string[]): string {
  const typeMap: Record<string, string> = {
    indian_restaurant: 'Indian',
    italian_restaurant: 'Italian',
    chinese_restaurant: 'Chinese',
    japanese_restaurant: 'Japanese',
    thai_restaurant: 'Thai',
    mexican_restaurant: 'Mexican',
    french_restaurant: 'French',
    mediterranean_restaurant: 'Mediterranean',
    american_restaurant: 'American',
    korean_restaurant: 'Korean',
    seafood_restaurant: 'Seafood',
    steak_house: 'Steakhouse',
    pizza_restaurant: 'Pizza',
    sushi_restaurant: 'Sushi',
    cafe: 'Café',
    coffee_shop: 'Coffee',
    bar: 'Bar & Lounge',
    fine_dining_restaurant: 'Fine Dining',
    restaurant: 'Restaurant',
    bakery: 'Bakery',
  };
  for (const t of types) {
    if (typeMap[t]) return typeMap[t];
  }
  return 'Restaurant';
}

// Generate vibe data for the vibeometer display
function generateVibeData(detail: RestaurantDetail) {
  const isUpscale = detail.priceLevel.length >= 3;
  const isCafe = detail.types.some(t => t.includes('cafe') || t.includes('coffee'));

  return {
    noise: {
      value: isUpscale ? 25 : isCafe ? 35 : 65,
      label: isUpscale ? 'LOW' : isCafe ? 'MODERATE' : 'LIVELY',
    },
    lighting: {
      value: isUpscale ? 80 : isCafe ? 50 : 40,
      label: isUpscale ? 'DIM / ATMOSPHERIC' : isCafe ? 'BRIGHT' : 'MOODY',
    },
    crowd: {
      value: isUpscale ? 30 : isCafe ? 45 : 60,
      label: isUpscale ? 'CHILL' : isCafe ? 'SOCIAL' : 'BUZZING',
    },
  };
}

// Placeholder ambiance features based on restaurant type
function getAmbianceFeatures(detail: RestaurantDetail) {
  const isUpscale = detail.priceLevel.length >= 3;
  const isBar = detail.types.some(t => t.includes('bar'));
  const isCafe = detail.types.some(t => t.includes('cafe') || t.includes('coffee'));

  if (isUpscale) {
    return [
      { icon: 'wine', label: 'Curated Wine List' },
      { icon: 'patio', label: 'Patio Seating' },
      { icon: 'music', label: 'Acoustic Jazz' },
    ];
  }
  if (isBar) {
    return [
      { icon: 'wine', label: 'Craft Cocktails' },
      { icon: 'music', label: 'Live Music' },
      { icon: 'patio', label: 'Rooftop Seating' },
    ];
  }
  if (isCafe) {
    return [
      { icon: 'patio', label: 'Garden Seating' },
      { icon: 'music', label: 'Lo-Fi Beats' },
      { icon: 'wine', label: 'Specialty Coffee' },
    ];
  }
  return [
    { icon: 'wine', label: 'Curated Wine List' },
    { icon: 'patio', label: 'Patio Seating' },
    { icon: 'music', label: 'Acoustic Jazz' },
  ];
}

// Ambiance feature icon component
function AmbianceIcon({ type }: { type: string }) {
  const iconClass = "w-8 h-8 text-[#171212]/60";
  switch (type) {
    case 'wine': return <Wine className={iconClass} />;
    case 'patio': return <TreePine className={iconClass} />;
    case 'music': return <Music className={iconClass} />;
    default: return <Wine className={iconClass} />;
  }
}

// Placeholder must-try dishes
function getMustTryDishes() {
  return [
    { name: 'Butter Garlic Crab', price: '₹1,450', spicy: true, image: '/images/dishes/dish1.jpg' },
    { name: 'Lobster Thermidor', price: '₹1,800', spicy: true, image: '/images/dishes/dish2.jpg' },
    { name: 'Bastian Caesar Salad', price: '₹650', spicy: false, image: '/images/dishes/dish3.jpg' },
    { name: 'Truffle Mac & Cheese', price: '₹950', spicy: false, image: '/images/dishes/dish4.jpg' },
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
      <main className="min-h-screen flex flex-col bg-[#FAF7F2]">
        <Navbar />
        <div className="flex-grow pt-16">
          <div className="h-[400px] w-full bg-gray-200 animate-pulse" />
          <div className="container mx-auto px-6 py-8 max-w-7xl">
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
      <main className="min-h-screen flex flex-col bg-[#FAF7F2]">
        <Navbar />
        <div className="flex-grow pt-16 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p className="text-xl mb-2">Could not load restaurant</p>
            <p className="text-sm mb-4">{error}</p>
            <Link href="/" className="text-[#D9534F] underline">Back to Home</Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const vibeData = generateVibeData(venue);
  const ambianceFeatures = getAmbianceFeatures(venue);
  const mustTryDishes = getMustTryDishes();
  const cuisineType = getCuisineType(venue.types);
  const neighborhood = venue.address.split(',').slice(0, 2).join(', ');

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <div className="flex-grow pt-16">
        {/* ── HERO IMAGE ── */}
        <div className="relative w-full h-[320px] md:h-[420px] overflow-hidden">
          {venue.photos[0] ? (
            <img
              src={venue.photos[0]}
              alt={venue.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        {/* ── THUMBNAIL STRIP ── */}
        <div className="container mx-auto px-6 max-w-7xl -mt-12 relative z-10">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {venue.photos.slice(0, 5).map((photo, idx) => (
              <div
                key={idx}
                className="relative min-w-[140px] w-[140px] h-[95px] rounded-xl overflow-hidden border-2 border-white shadow-md flex-shrink-0"
              >
                <img src={photo} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
            {venue.photos.length > 5 && (
              <div className="relative min-w-[140px] w-[140px] h-[95px] rounded-xl overflow-hidden border-2 border-white shadow-md flex-shrink-0 bg-gray-800/80 flex items-center justify-center cursor-pointer hover:bg-gray-800/90 transition-colors">
                <div className="text-center text-white">
                  <ImageIcon className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs font-medium">View All Photos</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RESTAURANT HEADER ── */}
        <div className="container mx-auto px-6 max-w-7xl mt-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#171212]">{venue.name}</h1>
                {venue.openNow !== null && (
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                    venue.openNow
                      ? 'bg-[#D9534F]/10 text-[#D9534F]'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {venue.openNow ? 'Open Now' : 'Closed'}
                  </span>
                )}
              </div>
              <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-[#171212]/60">
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-[#D9534F]" />
                  {neighborhood}
                </span>
                <span className="flex items-center gap-1">
                  💰 {venue.priceLevel} · {cuisineType}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  {venue.rating} ({venue.userRatingCount} reviews)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-[#171212] hover:border-gray-300 transition-colors shadow-sm">
                <Heart size={16} />
                Save
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D9534F] text-sm font-medium text-white hover:bg-[#c4433f] transition-colors shadow-sm">
                Reserve
              </button>
            </div>
          </div>
        </div>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div className="container mx-auto px-6 max-w-7xl mt-10 pb-16">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* LEFT COLUMN */}
            <div className="lg:w-[62%] space-y-10">

              {/* The Experience */}
              <section>
                <p className="text-xs font-bold uppercase tracking-widest text-[#171212]/40 mb-2">The Experience</p>
                <p className="text-base md:text-lg leading-relaxed text-[#171212]/70">
                  {venue.description || `${venue.name} brings the soul of authentic dining to the heart of the city. Inspired by the warmth of terracotta and the hush of carefully designed spaces, every visit is crafted for those who seek more than just a meal—they seek an atmosphere that breathes.`}
                </p>
              </section>

              {/* Vibeometer */}
              <section>
                <p className="text-xs font-bold uppercase tracking-widest text-[#171212]/40 mb-1">The Vibeometer Section</p>
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#171212]">The Vibeometer</h2>
                  <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-400 cursor-help">i</span>
                </div>

                <div className="space-y-6">
                  {/* Noise Level */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#171212]/80 mb-2">
                      Noise Level: <span className="text-[#171212]">{vibeData.noise.label}</span>
                    </p>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                      <div className="h-full bg-[#D9534F] rounded-full transition-all duration-1000" style={{ width: `${vibeData.noise.value}%` }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-[#171212]/40 uppercase tracking-wide">
                      <span>Whisper</span>
                      <span>Lively</span>
                      <span>Energetic</span>
                    </div>
                  </div>

                  {/* Lighting */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#171212]/80 mb-2">
                      Lighting: <span className="text-[#171212]">{vibeData.lighting.label}</span>
                    </p>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                      <div className="h-full bg-[#D9534F] rounded-full transition-all duration-1000" style={{ width: `${vibeData.lighting.value}%` }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-[#171212]/40 uppercase tracking-wide">
                      <span>Bright</span>
                      <span>Moody</span>
                      <span>Candlelit</span>
                    </div>
                  </div>

                  {/* Crowd */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#171212]/80 mb-2">
                      Crowd: <span className="text-[#171212]">{vibeData.crowd.label}</span>
                    </p>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                      <div className="h-full bg-[#D9534F] rounded-full transition-all duration-1000" style={{ width: `${vibeData.crowd.value}%` }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-[#171212]/40 uppercase tracking-wide">
                      <span>Solitary</span>
                      <span>Social</span>
                      <span>Buzzing</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Ambiance Features */}
              <section>
                <p className="text-xs font-bold uppercase tracking-widest text-[#171212]/40 mb-4">Ambiance Features</p>
                <div className="grid grid-cols-3 gap-4">
                  {ambianceFeatures.map((feature) => (
                    <div key={feature.label} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center text-center shadow-sm">
                      <AmbianceIcon type={feature.icon} />
                      <span className="mt-3 text-sm font-medium text-[#171212]/80">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Must-Try Dishes */}
              <section>
                <p className="text-xs font-bold uppercase tracking-widest text-[#171212]/40 mb-1">Must-Try Dishes Section</p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#171212] mb-5">Must-Try Dishes</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mustTryDishes.map((dish) => (
                    <div key={dish.name} className="group">
                      <div className="aspect-square rounded-2xl overflow-hidden bg-gray-200 mb-2">
                        <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
                          <span className="text-3xl">🍽️</span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-[#171212]">{dish.name}</p>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-[#171212]/60">{dish.price}</span>
                        <span className={`w-2 h-2 rounded-full ${dish.spicy ? 'bg-red-500' : 'bg-green-500'}`} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-5">
                  <button className="text-[#D9534F] text-sm font-medium hover:underline">View Full Menu</button>
                </div>
              </section>

              {/* Reviews */}
              {venue.reviews.length > 0 && (
                <section>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#171212]/40 mb-1">What People Are Saying (Reviews)</p>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#171212] mb-5">What People Are Saying</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {venue.reviews.slice(0, 4).map((review, idx) => (
                      <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-[#D9534F]/10 rounded-full flex items-center justify-center text-[#D9534F] font-bold text-sm">
                              {review.author.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#171212]">{review.author}</p>
                              <p className="text-xs text-[#171212]/40">Recent</p>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-[#171212]/70 leading-relaxed line-clamp-3">{review.text}</p>
                        <div className="flex items-center gap-1 mt-3 text-[#171212]/30">
                          <ThumbsUp size={13} />
                          <span className="text-xs">{Math.floor(Math.random() * 3) + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-6">
                    <button className="px-6 py-2.5 rounded-full border border-[#D9534F] text-[#D9534F] text-sm font-medium hover:bg-[#D9534F]/5 transition-colors">
                      Read All Reviews
                    </button>
                  </div>
                </section>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="lg:w-[38%]">
              <div className="sticky top-24 space-y-5">

                {/* Curator's Tip */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#171212]/40 mb-3">Curator&apos;s Tip</p>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-[#D9534F]/10 rounded-full flex items-center justify-center text-[#D9534F] font-bold text-sm">S</div>
                    <span className="text-sm font-semibold text-[#171212]">Sofia V.</span>
                  </div>
                  <p className="text-sm italic text-[#171212]/60 leading-relaxed">
                    &ldquo;The corner table near the window offers the best view of the sunset while remaining secluded enough for intimate conversation. Don&apos;t skip the burnt honey ricotta—it&apos;s transformative.&rdquo;
                  </p>
                </div>

                {/* Restaurant Information */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#171212]/40 mb-1">Restaurant Information Card</p>
                  <h3 className="text-lg font-bold text-[#171212] mb-4">Restaurant Information</h3>
                  <div className="space-y-3 text-sm text-[#171212]/70">
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[#171212]/40" />
                      <span>{venue.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#171212]/40">🍽</span>
                      <span>Cuisine: {cuisineType}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-[#171212]/40" />
                      <span>+1 (555) 012-3456</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock size={16} className="mt-0.5 flex-shrink-0 text-[#171212]/40" />
                      <div>
                        {venue.openNow !== null && (
                          <span className={`font-medium ${venue.openNow ? 'text-green-600' : 'text-red-500'}`}>
                            {venue.openNow ? 'Open Now' : 'Closed'}
                          </span>
                        )}
                        {venue.weekdayHours.length > 0 && (
                          <span className="text-[#171212]/50"> | {venue.weekdayHours[0]}</span>
                        )}
                        {venue.weekdayHours.length > 1 && (
                          <button className="ml-1 text-[#171212]/40 inline-flex items-center">
                            <ChevronDown size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                    {venue.googleMapsUri && (
                      <div className="flex items-center gap-3">
                        <Globe size={16} className="text-[#171212]/40" />
                        <a href={venue.googleMapsUri} target="_blank" rel="noopener noreferrer" className="text-[#D9534F] hover:underline">
                          www.maahol.com
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Make a Reservation */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#171212]/40 mb-1">Make a Reservation Card</p>
                  <h3 className="text-lg font-bold text-[#171212] mb-4">Make a Reservation</h3>
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Date"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#171212] bg-white focus:outline-none focus:border-[#D9534F]/50 transition-colors"
                        readOnly
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#171212]/30">📅</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#171212]/50 bg-white appearance-none focus:outline-none focus:border-[#D9534F]/50 transition-colors">
                          <option>Time</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#171212]/30 pointer-events-none" />
                      </div>
                      <div className="relative">
                        <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#171212]/50 bg-white appearance-none focus:outline-none focus:border-[#D9534F]/50 transition-colors">
                          <option>Party Size</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#171212]/30 pointer-events-none" />
                      </div>
                    </div>
                    <button className="w-full py-2.5 rounded-lg bg-[#D9534F] text-white text-sm font-medium hover:bg-[#c4433f] transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>

                {/* Location Map */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#171212]/40 mb-3">Location Map</p>
                  <div className="rounded-xl overflow-hidden mb-3 h-[180px] bg-gray-100">
                    {venue.lat && venue.lng ? (
                      <img
                        src={`https://maps.googleapis.com/maps/api/staticmap?center=${venue.lat},${venue.lng}&zoom=15&size=400x180&scale=2&markers=color:red%7C${venue.lat},${venue.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''}&style=feature:all|element:labels.text.fill|color:0x333333&style=feature:water|color:0xc9d6e3`}
                        alt="Location map"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        Map unavailable
                      </div>
                    )}
                  </div>
                  {venue.googleMapsUri && (
                    <a
                      href={venue.googleMapsUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium text-[#171212] hover:text-[#D9534F] transition-colors"
                    >
                      <ExternalLink size={14} />
                      Get Directions
                    </a>
                  )}
                </div>

                {/* You Might Also Like */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#171212]/40 mb-4">You Might Also Like</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { name: 'The Table', cuisine: 'Seafood' },
                      { name: 'O Pedro', cuisine: 'Goan Cuisine' },
                      { name: 'Masala Library', cuisine: 'Modern Indian' },
                    ].map((rec) => (
                      <div key={rec.name} className="text-center group cursor-pointer">
                        <div className="aspect-square rounded-xl overflow-hidden bg-gray-200 mb-2">
                          <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            <span className="text-2xl">🍽️</span>
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-[#171212] leading-tight">{rec.name}</p>
                        <div className="flex justify-center gap-0.5 my-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={8} className={i < 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                          ))}
                        </div>
                        <p className="text-[10px] text-[#171212]/40">{rec.cuisine}</p>
                      </div>
                    ))}
                  </div>
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
