import { Lightbulb, Volume2 } from 'lucide-react';

export default function VibeDiscovery() {
  return (
    <section className="py-20 px-6 md:px-16 bg-[#f0ede6]">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 items-center">
        {/* Mood Board Image */}
        <div className="order-2 md:order-1">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f0ede6]">
            <img
              src="/images/mood-board.png"
              alt="Mood Board"
              className="h-full w-full object-cover"
            />
            {/* Mood Board Label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-lg shadow-sm">
              <span className="text-xs font-semibold text-[#171212]/70 tracking-wide">Mood Board</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="order-1 md:order-2">
          <h2 className="mb-5 font-serif text-3xl font-bold md:text-5xl text-[#171212]">
            Vibe-First Discovery
          </h2>
          <p className="mb-8 text-base leading-relaxed text-[#171212]/60">
            We believe discovery should be emotional, not just categorical.
            Instead of searching for &quot;Italian food,&quot; find spaces by their
            lighting, soundscapes, and energy levels.
          </p>

          <ul className="space-y-5">
            <li className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d8544f] text-white">
                <Lightbulb size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#171212] text-sm">Mood Lighting</h4>
                <p className="text-sm text-[#171212]/50 mt-0.5">
                  From candlelight to neon. Find the glow that matches your night.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d8544f] text-white">
                <Volume2 size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#171212] text-sm">Sound Profiles</h4>
                <p className="text-sm text-[#171212]/50 mt-0.5">
                  Filter by decibels, from hushed whispers to bass-heavy beats.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
