import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Vibeometer from '@/components/restaurant/Vibeometer';
import { MapPin, Clock, Info } from 'lucide-react';
import Link from 'next/link';

// Mock Data for the detail page (in a real app, fetch based on ID)
const RESTAURANT_DATA = {
  id: 'olive-bar',
  name: 'Olive Bar & Kitchen',
  location: 'Bandra West, Mumbai',
  price: '₹₹₹',
  rating: 4.8,
  description: "The iconic Mediterranean getaway in the heart of the city. A place where rustic charm meets modern elegance.",
  images: [
    '/images/restaurant_detail_hero_1771077722744.png', 
    '/images/olive_bar_kitchen_1771077692903.png', 
    '/images/the_steps_cafe_1771077677972.png'
  ], 
  experience: "Maahol brings the soul of authentic earth-to-table dining to the heart of the city. Inspired by the warmth of terracotta and the tranquility of dusk, our space is designed for those who seek more than just a meal—they seek an atmosphere that breathes.",
  curatorTip: {
    author: "Sofia V.",
    text: "Best time to visit is just before sunset. The way the light hits the white walls is pure magic. Order the truffle risotto."
  },
  vibeStats: [
    { label: 'Lighting', value: 8.5 },
    { label: 'Volume', value: 4.0 }, // Low volume
    { label: 'Energy', value: 6.5 },
    { label: 'Conversation Friendly', value: 9.0 }
  ]
};

export default function RestaurantPage({ params }: { params: { id: string } }) {
  // In a real app, use params.id to fetch data
  const venue = RESTAURANT_DATA; 

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-16">
        {/* Gallery Header (Placeholder) */}
        <div className="h-64 md:h-96 w-full bg-gray-200 relative grid grid-cols-4 gap-1 p-1">
            <div className={`col-span-2 row-span-2 relative`}>
                 <img src={venue.images[0]} alt="Main View" className="w-full h-full object-cover" />
            </div>
            <div className={`col-span-1 row-span-1 relative`}>
                <img src={venue.images[1]} alt="Detail View 1" className="w-full h-full object-cover" />
            </div>
            <div className={`col-span-1 row-span-2 relative`}>
                <img src={venue.images[2]} alt="Detail View 2" className="w-full h-full object-cover" />
            </div>
             <div className="col-span-1 row-span-1 bg-gray-100 relative flex items-center justify-center text-gray-400 text-sm">
                +5 Photos
             </div>
        </div>

        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <div className="lg:w-2/3 space-y-8">
                    <div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                            <span>{venue.location}</span>
                            <span>•</span>
                            <span>{venue.price}</span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{venue.name}</h1>
                        <p className="text-lg text-gray-600 leading-relaxed">{venue.description}</p>
                    </div>

                    <div className="border-t border-gray-100 pt-8">
                        <h2 className="text-2xl font-bold mb-4 font-serif">The Experience</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {venue.experience}
                        </p>
                    </div>

                     <div className="border-t border-gray-100 pt-8">
                        <h2 className="text-2xl font-bold mb-4 font-serif">Curator's Tip</h2>
                         <div className="bg-gray-50 p-6 rounded-2xl flex gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                            <div>
                                <p className="text-gray-800 italic mb-2">"{venue.curatorTip.text}"</p>
                                <p className="text-sm font-bold text-gray-900">— {venue.curatorTip.author}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/3 space-y-6">
                    <div className="sticky top-24 space-y-6">
                        <Vibeometer ratings={venue.vibeStats} />

                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold mb-4">Make a Reservation</h3>
                            <button className="w-full btn btn-primary mb-3">Book a Table</button>
                            <button className="w-full btn btn-outline">View Menu</button>
                        </div>
                        
                         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex items-start space-x-3 text-sm text-gray-600 mb-3">
                                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                                <p>Union Park, Khar West, Mumbai, Maharashtra 400052</p>
                            </div>
                             <div className="flex items-start space-x-3 text-sm text-gray-600">
                                <Clock size={18} className="mt-0.5 flex-shrink-0" />
                                <p>Open today • 12:00 PM – 1:30 AM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
