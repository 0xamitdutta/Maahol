'use client';

import { Suspense, useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import VenueCard from '@/components/search/VenueCard';
import Footer from '@/components/layout/Footer';
import type { Restaurant, City, Vibe } from '@/types';
import { CITIES, VIBES } from '@/types';
import { Search, ChevronDown, X, Grid, List as ListIcon, Map as MapIcon, ChevronRight, User } from 'lucide-react';

// --- Type Definitions for Local State ---
type AcousticsLevel = 'WHISPER' | 'QUIET' | 'MODERATE' | 'LOUD' | 'ROAR';
type LightingType = 'Candlelit' | 'Dimly Lit' | 'Neon' | 'Natural';
type ViewMode = 'grid' | 'list' | 'map';

const NEIGHBORHOODS = ['Bandra', 'Fort', 'Colaba', 'Juhu', 'Lower Parel'];

function SearchContent() {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get('city') ?? 'Mumbai';
  const queryParam = searchParams.get('q') ?? '';
  const city: City = CITIES.includes(cityParam as City) ? (cityParam as City) : 'Mumbai';

  // --- State ---
  const [venues, setVenues] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [selectedVibes, setSelectedVibes] = useState<Set<Vibe>>(new Set());
  const [acoustics, setAcoustics] = useState<number>(50); // 0-100slider
  const [selectedLighting, setSelectedLighting] = useState<Set<LightingType>>(new Set(['Dimly Lit'])); // Default mock for design match
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('Bandra');
  const [selectedPrices, setSelectedPrices] = useState<Set<string>>(new Set());
  
  // View & Sort
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState('Recommended');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;

  // --- Fetch Data ---
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

  // --- Handlers ---
  const toggleVibe = (vibe: Vibe) => {
    setSelectedVibes(prev => {
      const next = new Set(prev);
      if (next.has(vibe)) next.delete(vibe);
      else next.add(vibe);
      return next;
    });
    setPage(1);
  };

  const toggleLighting = (light: LightingType) => {
    setSelectedLighting(prev => {
      const next = new Set(prev);
      if (next.has(light)) next.delete(light);
      else next.add(light);
      return next;
    });
  };

  const togglePrice = (price: string) => {
    setSelectedPrices(prev => {
      const next = new Set(prev);
      if (next.has(price)) next.delete(price);
      else next.add(price);
      return next;
    });
    setPage(1);
  };

  const clearFilter = (type: 'vibe'|'lighting'|'city', value: string) => {
    if (type === 'vibe') toggleVibe(value as Vibe);
    if (type === 'lighting') toggleLighting(value as LightingType);
    // City is a navigation change ideally, but for now we won't clear it via chip to keep it simple or redirect
  };

  // --- Derived State ---
  const filteredVenues = useMemo(() => {
    return venues.filter(v => {
      const matchesPrice = selectedPrices.size === 0 || selectedPrices.has(v.priceLevel);
      const matchesVibe = selectedVibes.size === 0 || v.vibes?.some(vibe => selectedVibes.has(vibe));
      // Neighborhood filter is mocked for now as strict equality if venue location matches or if we assume all are in Bandra for the "Trending in Bandra" context
      // For demo purposes, we'll be loose with location matching or just rely on the API for city
      const matchesNeighborhood = selectedNeighborhood === 'All' || !selectedNeighborhood || v.location?.includes(selectedNeighborhood) || true; // Show all for now to ensure results
      
      const searchQ = queryParam.toLowerCase();
      const matchesQuery = !searchQ || 
        v.name.toLowerCase().includes(searchQ) || 
        v.tags?.some(t => t.toLowerCase().includes(searchQ)) ||
        v.location.toLowerCase().includes(searchQ) ||
        v.description?.toLowerCase().includes(searchQ);

      return matchesPrice && matchesVibe && matchesNeighborhood && matchesQuery;
    });
  }, [venues, selectedPrices, selectedVibes, selectedNeighborhood, queryParam]);

  const pagedVenues = filteredVenues.slice(0, page * PAGE_SIZE);
  const totalSpots = venues.length; // Mock total for "of 142 spots"

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans text-gray-900">
      
      {/* --- Custom Navbar --- */}
      <nav className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-gray-200 h-20 flex items-center px-8 transition-all">
        <div className="flex items-center gap-12 w-full max-w-[1600px] mx-auto">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <h1 className="font-serif text-3xl tracking-tight text-[#171212]">The Maahol</h1>
          </Link>

          {/* Left Nav */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-[#d8544f] transition-colors">Home</Link>
            <button className="flex items-center gap-1 hover:text-[#d8544f] transition-colors">
              Products <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-1 hover:text-[#d8544f] transition-colors">
              Search tvinks <ChevronDown size={14} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400 group-focus-within:text-[#d8544f] transition-colors" />
              </div>
              <input 
                type="text" 
                defaultValue={queryParam}
                placeholder={`Italian restaurants in ${selectedNeighborhood}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = e.currentTarget.value;
                    const url = new URL(window.location.href);
                    if (val) url.searchParams.set('q', val);
                    else url.searchParams.delete('q');
                    window.location.href = url.toString();
                  }
                }}
                className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-[#d8544f]/50 focus:ring-4 focus:ring-[#d8544f]/5 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Right Nav */}
          <div className="hidden lg:flex items-center gap-6 ml-auto">
            <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-[#d8544f] uppercase tracking-wide">
              CITIES <ChevronDown size={14} />
            </button>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-[#d8544f] uppercase tracking-wide">
              JOURNAL
            </Link>
            <button className="text-sm font-medium text-gray-900 hover:text-[#d8544f]">
              Sign In
            </button>
            <button className="bg-[#d8544f] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#c0352f] transition-colors shadow-sm">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <div className="flex-grow flex max-w-[1600px] mx-auto w-full px-8 py-10 gap-12">
        
        {/* --- Sidebar Filters --- */}
        <aside className="w-[280px] flex-shrink-0 space-y-10 hidden md:block">
          
          {/* Current Filters */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Current Filters</h3>
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-1 bg-[#d8544f] text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-sm hover:bg-[#c0352f] transition-colors">
                Date Night <X size={14} />
              </button>
              <button className="flex items-center gap-1 bg-[#d8544f] text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-sm hover:bg-[#c0352f] transition-colors">
                {city} <X size={14} />
              </button>
            </div>
          </div>

          {/* Vibe Spectrum */}
          <div className="space-y-4">
             <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Vibe Spectrum</h3>
             <div className="space-y-3">
               {VIBES.map(vibe => (
                 <label key={vibe} className="flex items-center gap-3 cursor-pointer group">
                   <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedVibes.has(vibe as Vibe) ? 'border-[#d8544f]' : 'border-gray-300 group-hover:border-[#d8544f]'}`}>
                      {selectedVibes.has(vibe as Vibe) && <div className="w-2.5 h-2.5 rounded-full bg-[#d8544f]" />}
                   </div>
                   <span className="text-gray-700 group-hover:text-gray-900">{vibe}</span>
                   <input type="checkbox" className="hidden" checked={selectedVibes.has(vibe as Vibe)} onChange={() => toggleVibe(vibe as Vibe)} />
                 </label>
               ))}
             </div>
          </div>

          {/* Acoustics */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Acoustics</h3>
            <div className="px-1">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={acoustics} 
                onChange={(e) => setAcoustics(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#d8544f]"
              />
              <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wider">
                <span>Whisper</span>
                <span>Roar</span>
              </div>
            </div>
          </div>

          {/* Lighting */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Lighting</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Candlelit', 'Dimly Lit', 'Neon', 'Natural'].map((light) => (
                <button
                  key={light}
                  onClick={() => toggleLighting(light as LightingType)}
                  className={`px-3 py-2 text-sm border rounded-full transition-all ${
                    selectedLighting.has(light as LightingType)
                      ? 'border-[#d8544f] bg-[#d8544f]/5 text-[#d8544f] font-medium'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {light}
                </button>
              ))}
            </div>
          </div>

          {/* Neighborhoods */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Neighborhoods</h3>
            <div className="relative">
              <select 
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-lg focus:outline-none focus:border-[#d8544f] focus:ring-1 focus:ring-[#d8544f]"
              >
                {NEIGHBORHOODS.map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          {/* Collapsible Sections */}
          {['Cuisine Type', 'Price Range', 'Dietary'].map((section) => (
             <div key={section} className="py-4 border-t border-gray-100">
               <button className="flex items-center justify-between w-full group">
                 <h3 className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{section}</h3>
                 <span className="text-xs text-gray-400 font-normal">(collapsed) <ChevronDown size={14} className="inline ml-1" /></span>
               </button>
             </div>
          ))}

        </aside>

        {/* --- Main Content --- */}
        <main className="flex-1 min-w-0">
          
          {/* Header */}
          <div className="mb-8">
            <h2 className="font-serif text-5xl mb-4 text-[#171212]">
              {queryParam ? `Results for "${queryParam}"` : `Trending in ${selectedNeighborhood}`}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
              {queryParam 
                ? `Found ${filteredVenues.length} spots matching your search, filtered by lighting, acoustics, and the specific soul of the neighborhood.`
                : `Data-dense curation of the most atmospheric spots. Filtered by lighting, acoustics, and the specific soul of the neighborhood.`}
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sticky top-20 bg-[#FDFBF7] z-30 py-4">
            <div className="flex items-center gap-2">
               <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sort By:</span>
               <button className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-[#d8544f]">
                 {sortBy} <ChevronDown size={14} />
               </button>
            </div>

            <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <ListIcon size={18} />
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-md transition-all ${viewMode === 'map' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <MapIcon size={18} />
              </button>
            </div>
          </div>

          {/* Results Grid */}
          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
               {[1, 2, 3, 4, 5, 6].map(i => (
                 <div key={i} className="animate-pulse space-y-4">
                   <div className="aspect-[3/4] bg-gray-200 rounded-xl" />
                   <div className="h-6 w-3/4 bg-gray-200 rounded" />
                   <div className="h-4 w-full bg-gray-100 rounded" />
                   <div className="h-4 w-1/2 bg-gray-100 rounded" />
                 </div>
               ))}
             </div>
          ) : error ? (
            <div className="py-20 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                {pagedVenues.map(venue => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </div>

              {/* Load More */}
              <div className="mt-16 flex flex-col items-center gap-4">
                <button 
                  onClick={() => setPage(p => p + 1)}
                  disabled={page * PAGE_SIZE >= filteredVenues.length}
                  className="px-8 py-3 rounded-full border border-[#d8544f] text-[#d8544f] font-medium hover:bg-[#d8544f] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Load More Spots
                </button>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Showing {Math.min(pagedVenues.length, filteredVenues.length)} of {142} spots in {selectedNeighborhood}
                </p>
              </div>
            </>
          )}

          {/* Newsletter CTA */}
          <section className="mt-24 pt-16 border-t border-gray-200">
             <div className="bg-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-100 shadow-sm">
               <div className="max-w-lg space-y-2 text-center md:text-left">
                 <h3 className="font-serif text-3xl text-[#171212]">Efficiency meets discovery.</h3>
                 <p className="text-gray-500">
                   Join the club for data-backed weekend guides and exclusive access to unlisted spots before the crowds arrive.
                 </p>
               </div>
               <div className="flex w-full max-w-md gap-2">
                 <input 
                   type="email" 
                   placeholder="Email" 
                   className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#d8544f] focus:ring-1 focus:ring-[#d8544f]"
                 />
                 <button className="bg-[#d8544f] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#c0352f] transition-colors">
                   Join
                 </button>
               </div>
             </div>
          </section>

        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
