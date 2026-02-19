'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { COLLECTIONS } from '@/data/collections';

export default function CuratedCollections() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 420;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-6 md:px-16">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary/60">
              Curation 02
            </p>
            <h2 className="font-serif text-4xl font-bold md:text-5xl text-[#171212]">
              The Maahol Edit
            </h2>
          </div>
          {/* Scroll Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer bg-white"
            >
              <ChevronLeft size={18} className="text-gray-600" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer bg-white"
            >
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll of Cards — same sizing as Trending */}
        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar">
          {COLLECTIONS.map((collection) => (
            <Link
              key={collection.slug}
              href={`/list/${collection.slug}`}
              className="group min-w-[300px] md:min-w-[400px] snap-start cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-200">
                {/* Cover Image */}
                <img
                  src={collection.coverImage}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Place Count Badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                  <span className="text-[11px] font-bold text-white tracking-wide">
                    {collection.placeCount} Places
                  </span>
                </div>

                {/* Text Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-1 leading-tight">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-white/75 font-sans">
                    {collection.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
