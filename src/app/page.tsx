'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import VibeShortcuts from '@/components/home/VibeShortcuts';
import TrendingSection from '@/components/home/TrendingSection';
import VibeDiscovery from '@/components/home/VibeDiscovery';
import NewsletterSection from '@/components/home/NewsletterSection';
import { useState } from 'react';

export default function Home() {
  const [city, setCity] = useState("Mumbai");

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <Hero city={city} setCity={setCity} />
        <VibeShortcuts />
        <TrendingSection city={city} />
        <VibeDiscovery />
        <NewsletterSection />
      </div>

      <Footer />
    </main>
  );
}
