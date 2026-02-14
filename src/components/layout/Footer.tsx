import Link from 'next/link';
import { Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
                <img src="/images/logo.svg" alt="Maahol" className="h-12 w-auto" />
            </div>
            <p className="text-sm text-[#171212]/60 leading-relaxed">
              Discover the soul of Indian cities through the lens of mood and atmosphere. Editorial curation for the modern explorer.
            </p>
          </div>

          {/* Discover */}
          <div>
            <h4 className="font-semibold mb-4 text-primary uppercase tracking-widest text-xs">Discover</h4>
            <ul className="space-y-2 text-sm text-[#171212]/80">
              <li><Link href="#" className="hover:text-primary">Mumbai</Link></li>
              <li><Link href="#" className="hover:text-primary">Delhi</Link></li>
              <li><Link href="#" className="hover:text-primary">Bengaluru</Link></li>
              <li><Link href="#" className="hover:text-primary">Goa</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-primary uppercase tracking-widest text-xs">Social</h4>
            <ul className="space-y-2 text-sm text-[#171212]/80">
              <li className="flex items-center space-x-2">
                <Instagram size={16} />
                <Link href="#" className="hover:text-primary">Instagram</Link>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <Link href="#" className="hover:text-primary">Substack</Link>
              </li>
              <li className="flex items-center space-x-2">
                <Twitter size={16} />
                <Link href="#" className="hover:text-primary">Twitter</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-primary uppercase tracking-widest text-xs">Legal</h4>
            <ul className="space-y-2 text-sm text-[#171212]/80">
              <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center text-sm text-[#171212]/40">
          <p>© 2026 Maahol Discovery Engine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
