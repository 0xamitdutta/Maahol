'use client';

const VIBE_SHORTCUTS = [
  { emoji: '💕', label: 'Romantic' },
  { emoji: '🎉', label: 'Celebration' },
  { emoji: '💼', label: 'Business Lunch' },
  { emoji: '🌙', label: 'Late Night' },
  { emoji: '🍵', label: 'Quiet Conversation' },
];

export default function VibeShortcuts() {
  return (
    <section id="vibe-shortcuts" className="py-12 px-6 md:px-16 bg-[#f0ede6]">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] md:text-3xl">
          Vibe Shortcuts
        </h2>
        <p className="mt-1 mb-8 text-sm text-[#1A1A1A]/50">Quick Vibe Search</p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {VIBE_SHORTCUTS.map((item) => (
            <button
              key={item.label}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#c9b99a] bg-transparent text-sm font-medium text-[#3d3528] hover:bg-[#e8e1d4] transition-colors cursor-pointer"
            >
              <span className="text-base">{item.emoji}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
