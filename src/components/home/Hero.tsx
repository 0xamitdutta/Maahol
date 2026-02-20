'use client';

import { ChevronDown, MapPin, Check } from 'lucide-react';
import { useState } from 'react';

interface HeroProps {
  city: string;
  setCity: (city: string) => void;
}

export default function Hero({ city, setCity }: HeroProps) {
  const [vibe, setVibe] = useState('Date Night');
  const [showVibeDropdown, setShowVibeDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Goa', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata'];
  const VIBES_LIST = [
    { icon: '🕯️', label: 'Romantic' },
    { icon: '🎉', label: 'Celebration' },
    { icon: '💼', label: 'Business Lunch' },
    { icon: '☕', label: 'Quiet Conversation' },
    { icon: '🌙', label: 'Late Night' },
    { icon: '🎶', label: 'Live Music' },
    { icon: '👥', label: 'Group Dining' },
    { icon: '🍷', label: 'Wine & Dine' },
    { icon: '⚡', label: 'High Energy' },
    { icon: '🌿', label: 'Peaceful & Calm' },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center px-4 pt-32 pb-16 text-center bg-[#F4F0E6]">
      <div className="container relative z-10 mx-auto max-w-4xl">
        {/* Main Heading */}
        <h1
          className="mb-8 text-5xl font-bold text-[#1A1A1A] md:text-6xl lg:text-7xl leading-tight"
          style={{ fontFamily: 'var(--font-playfair-display), Georgia, serif' }}
        >
          Where is the night going?
        </h1>

        {/* Mad Libs Selector */}
        <div className="text-xl font-sans text-[#1A1A1A] md:text-2xl lg:text-3xl leading-relaxed flex flex-wrap items-center justify-center gap-x-2 gap-y-4">
          <span>I&apos;m looking for a</span>

          {/* Vibe Selector */}
          <div className="relative inline-block text-left">
            <button
              onClick={() => { setShowVibeDropdown(!showVibeDropdown); setShowCityDropdown(false); }}
              className="inline-flex items-center gap-1 font-bold text-[#d8544f] border-b-[3px] border-[#d8544f]/30 hover:border-[#d8544f] transition-colors cursor-pointer bg-transparent p-0 pb-0.5"
            >
              {vibe}
              <ChevronDown size={22} className="text-[#d8544f]" strokeWidth={2.5} />
            </button>
            
            {/* Vibe Dropdown */}
            {showVibeDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowVibeDropdown(false);
                  }}
                />
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-[#FDFBF7] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-2 z-50 min-w-[260px] flex flex-col">
                  <div className="px-4 py-3 flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">CHOOSE YOUR VIBE</span>
                  </div>
                  <div className="flex flex-col gap-1 max-h-[320px] overflow-y-auto px-2 pb-2">
                    {VIBES_LIST.map((v) => {
                      const isSelected = v.label === vibe || (vibe === 'Date Night' && v.label === 'Romantic');
                      return (
                        <button
                          key={v.label}
                          onClick={() => { setVibe(v.label); setShowVibeDropdown(false); }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-[15px] flex items-center gap-3 transition-colors cursor-pointer border-none ${
                            isSelected 
                              ? 'bg-[#d8544f]/10 text-[#d8544f] font-medium' 
                              : 'text-[#1A1A1A]/80 hover:bg-gray-100 bg-transparent'
                          }`}
                        >
                          <span className="text-[18px] leading-none">{v.icon}</span>
                          <span>{v.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-1 pt-3 pb-2 border-t border-gray-100 text-center">
                    <a href="/search" className="text-[13px] text-[#d8544f] hover:text-[#c4433f] font-medium transition-colors">
                      or browse all restaurants &rarr;
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>

          <span>spot in</span>

          {/* City Selector */}
          <div className="relative inline-block text-left">
            <button
              onClick={() => { setShowCityDropdown(!showCityDropdown); setShowVibeDropdown(false); }}
              className="inline-flex items-center gap-1 font-bold text-[#d8544f] border-b-[3px] border-[#d8544f]/30 hover:border-[#d8544f] transition-colors cursor-pointer bg-transparent p-0 pb-0.5"
            >
              {city}
              <ChevronDown size={22} className="text-[#d8544f]" strokeWidth={2.5} />
            </button>

            {/* City Dropdown */}
            {showCityDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCityDropdown(false);
                  }}
                />
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-[#FDFBF7] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-2 z-50 min-w-[220px]">
                  <div className="px-4 py-3 flex items-center">
                    <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">SELECT CITY</span>
                  </div>
                  <div className="flex flex-col gap-1 px-2 pb-2 max-h-[320px] overflow-y-auto">
                    {cities.map((c) => {
                      const isSelected = c === city;
                      return (
                        <button
                          key={c}
                          onClick={() => { setCity(c); setShowCityDropdown(false); }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-[15px] flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected 
                              ? 'bg-[#d8544f]/10 text-[#d8544f] border border-[#d8544f]/30' 
                              : 'text-[#1A1A1A]/80 bg-gray-100/60 hover:bg-gray-200/60 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <MapPin size={16} strokeWidth={1.5} className={isSelected ? "text-[#d8544f]" : "text-gray-500"} />
                            <span className={isSelected ? 'font-medium' : ''}>{c}</span>
                          </div>
                          {isSelected && <Check size={16} strokeWidth={2} className="text-[#d8544f]" />}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-1 pt-3 pb-2 border-t border-gray-100 text-left px-4">
                    <a href="/search" className="text-[13px] text-[#d8544f] hover:text-[#c4433f] font-medium transition-colors">
                      View All Cities &rarr;
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Explore Button */}
        <div className="mt-10">
          <a
            href="/search"
            className="inline-flex items-center px-8 py-3 text-[16px] font-medium text-white bg-[#d8544f] rounded-full hover:bg-[#c4433f] transition-colors shadow-sm"
          >
            Explore
          </a>
        </div>

        {/* Down Arrow */}
        <button
          onClick={() => document.getElementById('vibe-shortcuts')?.scrollIntoView({ behavior: 'smooth' })}
          className="block mx-auto mt-12 opacity-80 hover:opacity-100 transition-opacity cursor-pointer border-none bg-transparent p-0"
          aria-label="Scroll down"
        >
          <ChevronDown size={28} className="mx-auto text-[#1A1A1A]" />
        </button>
      </div>
    </section>
  );
}