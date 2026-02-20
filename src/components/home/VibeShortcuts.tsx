'use client';

const VIBE_SHORTCUTS = [
  { emoji: '🕯️', label: 'Romantic' },
  { emoji: '🎉', label: 'Celebration' },
  { emoji: '💼', label: 'Business Lunch' },
  { emoji: '🌙', label: 'Late Night' },
  { emoji: '☕', label: 'Quiet Conversation' },
];

export default function VibeShortcuts() {
  return (
    <section id="vibe-shortcuts" className="py-12 px-6 md:px-16 bg-[#FDFBF7]">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 
          className="text-3xl font-bold text-[#1A1A1A]"
          style={{ fontFamily: 'var(--font-playfair-display), Georgia, serif' }}
        >
          Vibe Shortcuts
        </h2>
        <p className="mt-2 mb-8 text-[15px] font-medium text-[#1A1A1A]">Quick Vibe Search</p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {VIBE_SHORTCUTS.map((item) => (
            <button
              key={item.label}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#d8544f]/20 bg-transparent text-[15px] font-medium text-[#c4433f] hover:bg-[#d8544f]/5 transition-all cursor-pointer shadow-sm"
            >
              <span className="text-lg leading-none">{item.emoji}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
