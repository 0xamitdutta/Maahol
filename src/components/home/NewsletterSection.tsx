'use client';

export default function NewsletterSection() {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="rounded-[3rem] bg-[#d8544f] px-6 py-20 text-center md:px-20 md:py-32">
          <h2 className="mb-6 font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Be part of the inner circle.
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/90">
            Get curated weekend guides and access to exclusive "off-the-map" spot launches across India.
          </p>

          <form className="mx-auto flex max-w-md flex-col items-center gap-4 md:flex-row">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full rounded-full border border-white/20 bg-white/20 px-6 py-3 text-white placeholder:text-white/60 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button 
              type="button"
              className="w-full rounded-full bg-white px-8 py-3 font-bold text-[#d8544f] transition-transform hover:scale-105 md:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
