import { Star, Bookmark } from 'lucide-react';
import Link from 'next/link';
import type { Restaurant } from '@/types';

export default function VenueCard({ venue }: { venue: Restaurant }) {
  // Mock status for design fidelity – in a real app this would come from operating hours + current time logic
  const status = venue.openNow ? "OPEN NOW" : "CLOSED";

  return (
    <div className="group block">
      {/* Image Container */}
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-gray-100">
        {venue.imageUrl ? (
          <img
            src={venue.imageUrl}
            alt={venue.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-serif italic text-lg bg-gray-200">
            {venue.name}
          </div>
        )}

        {/* Bookmark Button */}
        <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-900 hover:bg-white transition-colors z-10">
          <Bookmark size={16} strokeWidth={1.5} />
        </button>

        {/* Tags Overlay */}
        {venue.tags && venue.tags.length > 0 && (
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 max-w-[90%]">
            {venue.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag} 
                className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold tracking-wider uppercase text-gray-900 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Title & Rating */}
        <div className="flex justify-between items-start">
          <Link href={`/restaurant/${venue.id}`}>
            <h3 className="text-xl font-bold text-[#171212] leading-tight group-hover:text-[#d8544f] transition-colors font-serif">
              {venue.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 shrink-0 mt-1">
            <Star size={14} className="fill-[#d8544f] text-[#d8544f]" />
            <span className="text-sm font-bold text-[#171212]">{venue.rating || 4.5}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[#171212]/70 leading-relaxed line-clamp-2">
          {venue.description || `Experience the unique vibe of ${venue.name}. A perfect spot for ${venue.vibes?.[0]?.toLowerCase() || 'dining'} in the heart of ${venue.location}.`}
        </p>

        {/* Footer Info */}
        <div className="pt-2 flex items-center justify-between text-xs font-medium tracking-wide uppercase text-[#171212]/50 border-t border-gray-100 mt-3">
          <div className="flex gap-3">
            <span>{status}</span>
            <span>·</span>
            <span className="text-[#171212]/70">{venue.priceLevel}</span>
          </div>
          
          <Link 
            href={`/restaurant/${venue.id}`}
            className="text-[#d8544f] hover:text-[#c0352f] transition-colors flex items-center gap-1 group/link"
          >
            View Detail 
            <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
