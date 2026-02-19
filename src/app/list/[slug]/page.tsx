'use client';

import { COLLECTIONS } from '@/data/collections';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import React, { use, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

// Compact inline vibeometer for list items
function InlineVibeometer({ stats }: { stats: { label: string; value: number }[] }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3">
      {stats.map((stat) => (
        <div key={stat.label} className="min-w-[140px] flex-1">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500 font-medium">{stat.label}</span>
            <span className="text-gray-800 font-bold">{stat.value}/10</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#d8544f] rounded-full transition-all duration-1000"
              style={{ width: `${(stat.value / 10) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Photo carousel for each list item
function PhotoCarousel({ placeId, delay = 0 }: { placeId: string; delay?: number }) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      fetch(`/api/restaurants/${encodeURIComponent(placeId)}`)
        .then((res) => res.ok ? res.json() : null)
        .then((data) => {
          if (!cancelled && data?.photos?.length) {
            setPhotos(data.photos);
          }
          if (!cancelled) setLoading(false);
        })
        .catch(() => { if (!cancelled) setLoading(false); });
    }, delay);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [placeId, delay]);

  if (loading) {
    return (
      <div className="flex gap-3 overflow-hidden rounded-xl">
        {[1, 2, 3].map((i) => (
          <div key={i} className="min-w-[280px] md:min-w-[360px] aspect-[4/3] bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (photos.length === 0) return null;

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 380;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className="relative group/carousel">
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto no-scrollbar rounded-xl snap-x snap-mandatory"
      >
        {photos.map((url, idx) => (
          <div
            key={idx}
            className="min-w-[280px] md:min-w-[360px] aspect-[4/3] flex-shrink-0 snap-start rounded-xl overflow-hidden bg-gray-100"
          >
            <img
              src={url}
              alt={`Photo ${idx + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {/* Navigation arrows */}
      {photos.length > 1 && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity cursor-pointer border-none"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity cursor-pointer border-none"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}
    </div>
  );
}

export default function ListPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const collection = COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 px-6 md:px-16">
          {/* Subtle background accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-[#D9534F]/5 blur-[120px] pointer-events-none" />

          <div className="container mx-auto max-w-3xl relative z-10">
            {/* Back Link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-[#171212] mb-4 leading-[1.1]">
              {collection.title}
            </h1>

            {/* Byline */}
            <p className="text-sm text-gray-500 mb-6">
              Curated by{' '}
              <span className="font-semibold text-gray-800">{collection.curatedBy}</span>
              {' • '}
              Updated {collection.updatedAgo}
            </p>

            {/* Intro Blurb */}
            <p className="text-lg md:text-xl leading-relaxed text-[#171212]/70">
              {collection.introBlurb}
            </p>

            {/* Divider */}
            <div className="mt-12 h-px bg-gray-200" />
          </div>
        </section>

        {/* List Items */}
        <section className="px-6 md:px-16 pb-24">
          <div className="container mx-auto max-w-3xl">
            <div className="space-y-16">
              {collection.items.map((item, index) => (
                <article key={item.placeId} className="group">
                  {/* Number + Name */}
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-6xl md:text-7xl font-serif font-bold text-[#d8544f]/15 leading-none select-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Link
                      href={`/restaurant/${item.placeId}`}
                      className="text-2xl md:text-3xl font-bold text-[#171212] hover:text-[#d8544f] transition-colors font-serif"
                    >
                      {item.name}
                    </Link>
                  </div>

                  {/* Photo Carousel */}
                  <div className="mb-6">
                    <PhotoCarousel placeId={item.placeId} delay={index * 800} />
                  </div>

                  {/* The "Why" */}
                  <p className="text-base md:text-lg leading-relaxed text-[#171212]/70 mb-6">
                    {item.whyText}
                  </p>

                  {/* Inline Vibeometer */}
                  <div className="bg-gray-50/80 rounded-xl px-5 py-4 border border-gray-100">
                    <InlineVibeometer stats={item.vibeStats} />
                  </div>

                  {/* Divider between items */}
                  {index < collection.items.length - 1 && (
                    <div className="mt-16 h-px bg-gray-100" />
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
