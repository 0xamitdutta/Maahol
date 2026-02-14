import { Star, MapPin } from 'lucide-react';
import Link from 'next/link';

export interface VenueProps {
  id: string;
  name: string;
  location: string;
  price: string; // e.g. '₹₹₹'
  rating: number;
  image?: string;
  imageColor?: string; // Fallback
  tags?: string[];
}

export default function VenueCard({ venue }: { venue: VenueProps }) {
  return (
    <Link href={`/restaurant/${venue.id}`} className="group block">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3">
        {venue.image ? (
          <img 
            src={venue.image} 
            alt={venue.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
             <div className={`absolute inset-0 ${venue.imageColor || 'bg-gray-100'} transition-transform duration-500 group-hover:scale-105`}>
                <div className="absolute inset-0 flex items-center justify-center text-gray-500/50 font-medium">
                    {venue.name}
                </div>
            </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md flex items-center shadow-sm">
          <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
          <span className="text-xs font-bold text-gray-900">{venue.rating}</span>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">
          {venue.name}
        </h3>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin size={14} className="mr-1" />
          <span>{venue.location}</span>
          <span className="mx-2">•</span>
          <span>{venue.price}</span>
        </div>
      </div>
    </Link>
  );
}
