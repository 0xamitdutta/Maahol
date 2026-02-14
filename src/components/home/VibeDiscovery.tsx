import { Lightbulb, Volume2 } from 'lucide-react';

export default function VibeDiscovery() {
  return (
    <section className="py-24 px-6 md:px-16">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 items-center">
        {/* Mood Board Image */}
        <div className="order-2 md:order-1">
            <div className="relative aspect-square overflow-hidden rounded-3xl">
                <img 
                    src="/images/mood-board.png" 
                    alt="Mood Board" 
                    className="h-full w-full object-cover"
                />
            </div>
        </div>

        {/* Content */}
        <div className="order-1 md:order-2">
          <h2 className="mb-6 font-serif text-4xl font-bold md:text-6xl text-[#171212]">Vibe-First Discovery</h2>
          <p className="mb-8 text-lg leading-relaxed text-[#171212]/70">
            We believe discovery should be emotional, not just categorical. Instead of searching for "Italian food," find spaces by their lighting, soundscapes, and energy levels.
          </p>
          
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Lightbulb size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-[#171212]">Mood Lighting</h4>
                    <p className="text-sm text-[#171212]/60">From candlelight to neon, find the glow that matches your night.</p>
                </div>
            </li>
            <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Volume2 size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-[#171212]">Sound Profiles</h4>
                    <p className="text-sm text-[#171212]/60">Filter by decibels: from hushed whispers to bass-heavy floors.</p>
                </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
