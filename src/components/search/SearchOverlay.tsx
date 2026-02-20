'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Search, X, Clock, TrendingUp, MapPin, ArrowRight } from 'lucide-react';
import type { Restaurant } from '@/types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_VIBES = [
  { icon: '🕯️', title: 'Romantic', desc: 'Candlelit, intimate spaces' },
  { icon: '🎉', title: 'Celebration', desc: 'Lively, party-ready spots' },
  { icon: '☕', title: 'Quiet Conversation', desc: 'Peaceful, low-noise' },
  { icon: '💼', title: 'Business Lunch', desc: 'Professional, quiet settings' },
  { icon: '🌙', title: 'Late Night', desc: 'Open past midnight' },
  { icon: '🎶', title: 'Live Music', desc: 'Acoustic, jazz, performances' },
];

const POPULAR_SEARCHES = [
  'Italian in Bandra', 'Best Biryani', 'Rooftop Restaurants', 'Veg-Friendly',
  'Date Night Spots', 'Late Night Eats', 'Seafood', 'Brunch Places'
];

const RECENT_SEARCHES = [
  'Italian restaurants in Bandra',
  'Romantic dinner spots Mumbai',
  'Best biryani'
];

const SUGGESTIONS = [
  'Italian restaurants in Bandra',
  'Italian fine dining',
  'Italian with outdoor seating',
  'Romantic Italian'
];

// Mock data for Top Matches to show while typing
const TOP_MATCHES: Partial<Restaurant>[] = [
  {
    id: 'm1',
    name: 'Cecconi\'s',
    tags: ['Italian', 'European'],
    location: 'Juhu',
    priceLevel: '$$$',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'm2',
    name: 'CinCin',
    tags: ['Italian'],
    location: 'BKC, Bandra',
    priceLevel: '$$',
    imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1000&auto=format&fit=crop',
  }
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
      setIsTyping(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  const handleSelectSearch = (term: string) => {
    setQuery(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
    onClose();
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 flex items-center justify-center p-4 sm:p-6 lg:p-8"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[800px] bg-[#FDFBF7] rounded-xl shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-500 hover:text-[#171212] transition-colors rounded-full hover:bg-gray-100 z-10"
        >
          <X size={20} />
        </button>

        <div className="px-10 pt-10 pb-12 overflow-y-auto max-h-[85vh]">
          {/* Search Input */}
          <form onSubmit={handleSearch} className="relative mb-10 group mt-4">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400 group-focus-within:text-[#d8544f] transition-colors" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search restaurants, cuisines, vibes, neighborhoods..."
              className="w-full bg-white text-base text-[#171212] placeholder-gray-500 py-3.5 pl-12 pr-12 rounded-lg border border-gray-200 focus:border-[#d8544f] focus:ring-1 focus:ring-[#d8544f] focus:outline-none transition-all shadow-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </form>

          <div className="min-h-[400px]">
            {!isTyping ? (
              /* EMPTY STATE */
              <div className="space-y-10 animate-in fade-in duration-300">
                {/* Quick Vibe Search */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-serif text-[26px] text-gray-900 leading-none mb-1">Quick Vibe Search</h3>
                    <p className="text-sm text-gray-600">Find restaurants by atmosphere</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {QUICK_VIBES.map((vibe, i) => (
                      <button 
                        key={i}
                        onClick={() => handleSelectSearch(vibe.title)}
                        className={`text-left p-3 rounded-lg border flex gap-3 transition-colors ${i === 0 ? 'bg-[#d8544f]/5 border-[#d8544f]/30' : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'}`}
                      >
                        <div className="text-xl shrink-0 mt-0.5">{vibe.icon}</div>
                        <div>
                          <div className={`text-[15px] font-medium leading-snug ${i === 0 ? 'text-gray-900' : 'text-gray-800'}`}>
                            {vibe.title}
                          </div>
                          <div className="text-[12px] text-gray-500 leading-snug mt-0.5">{vibe.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Searches */}
                <div className="space-y-4">
                  <h3 className="font-serif text-[26px] text-gray-900 leading-none">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((term, i) => (
                      <button 
                        key={i}
                        onClick={() => handleSelectSearch(term)}
                        className="px-4 py-1.5 rounded-full border border-[#d8544f]/20 text-[#d8544f] text-sm hover:bg-[#d8544f]/5 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Searches */}
                <div className="space-y-4 mt-12 relative">
                   <div className="flex items-end justify-between border-b border-gray-100/0 pb-1">
                      <h3 className="font-serif text-[26px] text-gray-900 leading-none">Recent Searches</h3>
                      <button className="text-sm text-[#d8544f] hover:underline underline-offset-4">Clear All</button>
                   </div>
                  <ul className="space-y-3 pt-2">
                    {RECENT_SEARCHES.map((term, i) => (
                      <li key={i}>
                        <button 
                          onClick={() => handleSelectSearch(term)}
                          className="flex items-center gap-3 text-[15px] text-gray-800 hover:text-[#d8544f] group w-full text-left transition-colors"
                        >
                          <Clock size={16} strokeWidth={1.5} className="text-gray-500 group-hover:text-[#d8544f] transition-colors" />
                          <span>{term}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
          ) : (
            /* TYPING STATE */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-24 animate-in slide-in-from-bottom-4 duration-500">
              {/* Suggestions */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-8">
                  Suggestions
                </h3>
                <ul className="space-y-5">
                  {SUGGESTIONS.map((term, i) => (
                    <li key={i}>
                      <button 
                        onClick={() => handleSelectSearch(term)}
                        className="flex items-center justify-between text-lg text-gray-600 hover:text-[#d8544f] group w-full text-left transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Search size={16} className="text-gray-300 group-hover:text-[#d8544f] transition-colors" />
                          <span>
                            <span className="font-semibold text-gray-900">{query}</span>
                            {term.toLowerCase().replace(query.toLowerCase(), '')}
                          </span>
                        </div>
                        <ArrowRight size={16} className="text-white group-hover:text-[#d8544f] transition-colors" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Top Matches */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-8">
                  Top Matches
                </h3>
                <div className="space-y-4">
                  {TOP_MATCHES.map((venue) => (
                    <button 
                      key={venue.id}
                      onClick={() => {
                        router.push(`/restaurant/${venue.id}`);
                        onClose();
                      }}
                      className="flex items-center gap-4 p-3 -ml-3 rounded-xl hover:bg-white group transition-all"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <img 
                          src={venue.imageUrl || ''} 
                          alt={venue.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <h4 className="font-serif text-xl text-gray-900 truncate">{venue.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <span className="truncate">{venue.tags?.join(', ')}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> {venue.location}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => handleSelectSearch(query)}
                  className="mt-6 text-[#d8544f] font-medium text-sm flex items-center gap-2 hover:gap-3 transition-all"
                >
                  See all results for "{query}" <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
