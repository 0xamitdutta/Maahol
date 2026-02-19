'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface HeroProps {
  city: string;
  setCity: (city: string) => void;
}

export default function Hero({ city, setCity }: HeroProps) {
  const [vibe, setVibe] = useState('Date Night');
  const [showVibeDropdown, setShowVibeDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const cities = ['Mumbai', 'Delhi', 'Bangalore'];
  const vibes = ['Date Night', 'Work Cafe', 'Sunday Brunch', 'Hidden Gem', 'Late Night', 'Celebration'];

  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 pb-12 text-center bg-[#FDFBF7]">
      <div className="container relative z-10 mx-auto max-w-4xl">
        {/* Main Heading */}
        <h1
          className="mb-10 text-5xl font-bold text-[#1A1A1A] md:text-6xl lg:text-7xl leading-tight"
          style={{ fontFamily: 'var(--font-playfair-display), Georgia, serif' }}
        >
          Where is the night going?
        </h1>

        {/* Mad Libs Selector */}
        <div className="text-xl font-sans text-[#1A1A1A] md:text-2xl lg:text-3xl leading-relaxed">
          <span>I&apos;m looking for a </span>

          {/* Vibe Selector */}
          <span className="relative inline-block">
            <span className="text-[#1A1A1A]/40 font-normal">[</span>
            <button
              onClick={() => { setShowVibeDropdown(!showVibeDropdown); setShowCityDropdown(false); }}
              className="inline-flex items-center gap-1 font-bold text-[#1A1A1A] hover:text-[#d8544f] transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              {vibe}
              <ChevronDown size={18} className="inline text-[#1A1A1A]/40" />
            </button>
            <span className="text-[#1A1A1A]/40 font-normal">]</span>
            
            {/* Vibe Dropdown */}
            {showVibeDropdown && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 min-w-[200px]">
                {vibes.map((v) => (
                  <button
                    key={v}
                    onClick={() => { setVibe(v); setShowVibeDropdown(false); }}
                    className={`w-full text-left px-5 py-2.5 text-sm font-medium transition-colors cursor-pointer border-none ${
                      v === vibe ? 'bg-[#d8544f]/5 text-[#d8544f]' : 'text-[#1A1A1A]/80 hover:bg-gray-50'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}
          </span>

          <span> spot in </span>

          {/* City Selector */}
          <span className="relative inline-block">
            <span className="text-[#1A1A1A]/40 font-normal">[</span>
            <button
              onClick={() => { setShowCityDropdown(!showCityDropdown); setShowVibeDropdown(false); }}
              className="inline-flex items-center gap-1 font-bold text-[#1A1A1A] hover:text-[#d8544f] transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              {city}
              <ChevronDown size={18} className="inline text-[#1A1A1A]/40" />
            </button>
            <span className="text-[#1A1A1A]/40 font-normal">]</span>

            {/* City Dropdown */}
            {showCityDropdown && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 min-w-[180px]">
                {cities.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCity(c); setShowCityDropdown(false); }}
                    className={`w-full text-left px-5 py-2.5 text-sm font-medium transition-colors cursor-pointer border-none ${
                      c === city ? 'bg-[#d8544f]/5 text-[#d8544f]' : 'text-[#1A1A1A]/80 hover:bg-gray-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </span>
        </div>

        {/* Down Arrow */}
        <button
          onClick={() => document.getElementById('vibe-shortcuts')?.scrollIntoView({ behavior: 'smooth' })}
          className="block mx-auto mt-16 opacity-40 hover:opacity-70 transition-opacity cursor-pointer border-none bg-transparent p-0"
          aria-label="Scroll down"
        >
          <ChevronDown size={28} className="mx-auto text-[#1A1A1A]" />
        </button>
      </div>

      {/* Click outside to close dropdowns */}
      {(showVibeDropdown || showCityDropdown) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setShowVibeDropdown(false); setShowCityDropdown(false); }}
        />
      )}
    </section>
  );
}