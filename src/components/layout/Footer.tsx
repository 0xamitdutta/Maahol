import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-10 bg-[#f0ede6]">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <img src="/images/logo.svg" alt="Maahol Logo" className="h-16 w-auto" />
            </div>
            <p className="text-sm text-[#171212]/50 leading-relaxed max-w-xs">
              An exquisite inside restaurant discovery platform with vibe-first approach.
            </p>
          </div>

          {/* Discover */}
          <div>
            <h4 className="font-semibold mb-3 text-[#171212]/80 uppercase tracking-wider text-xs">
              Discover
            </h4>
            <ul className="space-y-2 text-sm text-[#171212]/60">
              <li><Link href="#" className="hover:text-[#d8544f] transition-colors">Mumbai</Link></li>
              <li><Link href="#" className="hover:text-[#d8544f] transition-colors">Delhi</Link></li>
              <li><Link href="#" className="hover:text-[#d8544f] transition-colors">Bangalore</Link></li>
              <li><Link href="#" className="hover:text-[#d8544f] transition-colors">Goa</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-3 text-[#171212]/80 uppercase tracking-wider text-xs">
              Social
            </h4>
            <ul className="space-y-2 text-sm text-[#171212]/60">
              <li><Link href="#" className="hover:text-[#d8544f] transition-colors">Instagram</Link></li>
              <li><Link href="#" className="hover:text-[#d8544f] transition-colors">Substack</Link></li>
              <li><Link href="#" className="hover:text-[#d8544f] transition-colors">Twitter</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200 text-center text-xs text-[#171212]/40">
          <p>Copyright · Privacy/Terms</p>
        </div>
      </div>
    </footer>
  );
}
