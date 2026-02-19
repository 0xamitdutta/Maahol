'use client';

import Link from 'next/link';
import { Search, ChevronDown, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <img src="/images/logo.svg" alt="Maahol" className="h-9 w-auto" />
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-[#171212] hover:text-[#d8544f] transition-colors">
            Home
          </Link>
          <Link href="#" className="text-sm font-medium text-[#171212]/70 hover:text-[#d8544f] transition-colors">
            Restaurants
          </Link>
          <Link href="#" className="text-sm font-medium text-[#171212]/70 hover:text-[#d8544f] transition-colors">
            About
          </Link>
          <button className="p-1.5 text-[#171212]/60 hover:text-[#d8544f] transition-colors">
            <Search size={18} />
          </button>
          <button className="flex items-center gap-1 text-sm font-medium text-[#171212]/70 hover:text-[#d8544f] transition-colors">
            CITIES <ChevronDown size={14} />
          </button>
          <Link href="#" className="text-sm font-medium tracking-wider text-[#171212]/70 hover:text-[#d8544f] transition-colors">
            JOURNAL
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          <button className="hidden md:inline-flex items-center px-5 py-2 text-sm font-medium text-[#d8544f] border border-[#d8544f] rounded-md hover:bg-[#d8544f]/5 transition-colors">
            Sign In
          </button>
          <button className="hidden md:inline-flex items-center px-5 py-2 text-sm font-medium text-white bg-[#d8544f] rounded-md hover:bg-[#c4433f] transition-colors">
            Book a Table
          </button>
          <button className="p-2 text-[#171212]/50 hover:text-[#171212] transition-colors">
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
