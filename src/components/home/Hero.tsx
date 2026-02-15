'use client'; // Needed for client-side interactivity

import { ArrowDown } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import { useState } from 'react';

interface HeroProps {
    city: string;
    setCity: (city: string) => void;
}

export default function Hero({ city, setCity }: HeroProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  const cities = ["Delhi", "Bangalore", "Mumbai"];
  
  const handleCityClick = () => {
    const currentIndex = cities.indexOf(city);
    const nextIndex = (currentIndex + 1) % cities.length;
    setCity(cities[nextIndex]);
  };

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center md:py-32">
      
      {/* Background Gradient Spot (Optional for warmth) */}
      <div className="absolute top-[-20%] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#D9534F]/5 blur-[120px]" />

      <div className="container relative z-10 mx-auto max-w-5xl">
        <h1 className="mb-8 font-serif text-5xl font-bold italic text-[#1A1A1A] md:text-7xl lg:text-8xl">
          Where is the night going?
        </h1>

        {/* Mad Libs Search */}
        <div className="relative inline-block text-2xl font-sans font-normal leading-relaxed text-[#1A1A1A] md:text-4xl lg:text-5xl">
            <span>I am looking for a </span>
            
            {/* The Vibe Selector */}
            <div 
              className="group relative inline-flex mx-2 min-w-[200px] justify-center"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
                <div className="cursor-pointer font-medium text-[#D9534F] underline decoration-[#D9534F]/30 decoration-2 underline-offset-8 transition-all hover:decoration-[#D9534F] hover:decoration-4">
                  {isHovering ? (
                    <span>Date Night</span> // Static text on hover so they can click
                  ) : (
                    <Typewriter
                      options={{
                        strings: ['Date Night', 'Work Cafe', 'Sunday Brunch', 'Hidden Gem'],
                        autoStart: true,
                        loop: true,
                        delay: 75,
                        deleteSpeed: 50,
                        cursor: '|', // The blinking cursor style
                      }}
                    />
                  )}
                </div>
            </div>

            <span> spot in </span>
            
            {/* The City Selector */}
            <div className="group relative inline-block mx-2">
                <span 
                    onClick={handleCityClick}
                    className="cursor-pointer font-medium text-[#1A1A1A] underline decoration-[#1A1A1A]/30 decoration-2 underline-offset-8 transition-all hover:decoration-[#1A1A1A] hover:decoration-4 select-none"
                >
                  {city}
                </span>
            </div>
            <span>.</span>
        </div>
        
        {/* Floating Arrow */}
        <div className="mt-24 animate-bounce opacity-40">
            <ArrowDown size={32} className="mx-auto text-[#1A1A1A]" />
        </div>
      </div>
    </section>
  );
}