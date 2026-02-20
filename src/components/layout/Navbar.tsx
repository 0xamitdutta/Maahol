'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import SearchOverlay from '@/components/search/SearchOverlay';

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2.5">
          <img src="/images/logo.svg" alt="Maahol Logo" className="h-16 w-auto py-1" />
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-[15px] font-medium text-[#1A1A1A] hover:text-[#d8544f] transition-colors">
            Explore
          </Link>
          <Link href="#" className="text-[15px] font-medium text-[#1A1A1A]/70 hover:text-[#d8544f] transition-colors">
            Stories
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-[#1A1A1A]/80 hover:text-[#d8544f] transition-colors"
            aria-label="Open Search"
          >
            <Search size={22} strokeWidth={2} />
          </button>
          <button className="hidden md:inline-flex items-center px-6 py-2.5 text-[15px] font-medium text-white bg-[#d8544f] rounded-full hover:bg-[#c4433f] transition-colors shadow-sm">
            Sign In
          </button>
        </div>
      </div>
      
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </nav>
  );
}
