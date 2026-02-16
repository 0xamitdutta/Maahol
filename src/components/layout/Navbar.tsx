import Link from 'next/link';
import { Search, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flight-logo-link">
            <img src="/images/logo.svg" alt="Maahol" className="h-10 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#" className="text-sm font-medium text-[#171212]/80 hover:text-primary transition-colors">
            Cities
          </Link>
          <Link href="#" className="text-sm font-medium text-[#171212]/80 hover:text-primary transition-colors">
            Vibes
          </Link>
          <Link href="#" className="text-sm font-medium text-[#171212]/80 hover:text-primary transition-colors">
            Stories
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-[#171212]/60 hover:text-primary transition-colors">
            <Search size={20} />
          </button>
          <button className="md:hidden p-2 text-gray-600">
            <Menu size={20} />
          </button>
          <button className="hidden md:block rounded-full bg-[#D9534F] px-6 py-2 text-sm font-medium text-white transition-all hover:bg-[#c4433f]">
  Join the Club
</button>
        </div>
      </div>
    </nav>
  );
}
