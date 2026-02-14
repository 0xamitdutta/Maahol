import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VenueCard, { VenueProps } from '@/components/search/VenueCard';

// Mock Data matching the Stitch content + extras
const VENUES: VenueProps[] = [
  {
    id: 'olive-bar',
    name: 'Olive Bar & Kitchen',
    location: 'Bandra West',
    price: '₹₹₹',
    rating: 4.8,
    imageColor: 'bg-blue-100',
    tags: ['Mediterranean', 'Date Night']
  },
  {
    id: 'the-daily',
    name: 'The Daily All Day',
    location: 'Koregaon Park',
    price: '₹₹',
    rating: 4.5,
    imageColor: 'bg-green-100',
    tags: ['Cafe', 'Work Friendly']
  },
  {
    id: 'slow-tide',
    name: 'Slow Tide',
    location: 'Anjuna',
    price: '₹₹',
    rating: 4.7,
    imageColor: 'bg-orange-100',
    tags: ['Beach', 'Sunset']
  },
  {
    id: 'subko',
    name: 'Subko Roastery',
    location: 'Bandra West',
    price: '₹₹',
    rating: 4.9,
    imageColor: 'bg-amber-100',
    tags: ['Coffee', 'Artisanal']
  },
  {
    id: 'earthen-oven',
    name: 'Earthen Oven',
    location: 'Bandra East',
    price: '₹₹₹',
    rating: 4.6,
    imageColor: 'bg-red-100',
    tags: ['North Indian', 'Family']
  },
  {
    id: 'veranda',
    name: 'Veranda',
    location: 'Pali Hill',
    price: '₹₹₹',
    rating: 4.4,
    imageColor: 'bg-indigo-100',
    tags: ['Modern Indian', 'Rooftop']
  }
];

export default function SearchPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">The best Date Night spots</h1>
            <p className="text-gray-500">Showing results for "Date Night" in Bandra & nearby</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full md:w-64 flex-shrink-0 space-y-8 h-fit md:sticky md:top-24">
               <div>
                  <h3 className="font-semibold mb-3">Vibe</h3>
                  <div className="space-y-2">
                    {['Date Night', 'Party', 'Chill', 'Work'].map(vibe => (
                      <label key={vibe} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked={vibe === 'Date Night'} />
                        <span className="text-sm text-gray-600">{vibe}</span>
                      </label>
                    ))}
                  </div>
               </div>

               <div>
                  <h3 className="font-semibold mb-3">Price</h3>
                  <div className="flex gap-2">
                    {['₹', '₹₹', '₹₹₹', '₹₹₹₹'].map(price => (
                      <button key={price} className="px-3 py-1 text-sm border border-gray-200 rounded-full hover:border-primary hover:text-primary transition-colors">
                        {price}
                      </button>
                    ))}
                  </div>
               </div>
            </aside>

            {/* Results Grid */}
            <div className="flex-grow">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {VENUES.map(venue => (
                   <VenueCard key={venue.id} venue={venue} />
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
