'use client';

export default function NewsletterSection() {
  return (
    <section className="bg-[#d8544f] py-16 px-6 md:px-16">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="mb-4 font-serif text-3xl font-bold italic text-white md:text-4xl lg:text-5xl">
          Be part of the inner circle.
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-sm text-white/80 leading-relaxed">
          Get curated weekend guides and access to exclusive
          &quot;off-the-map&quot; spot launches across India.
        </p>

        <form className="mx-auto flex max-w-md flex-col items-center gap-3 md:flex-row">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full rounded-md bg-white px-5 py-3 text-sm text-[#171212] placeholder:text-[#171212]/40 focus:outline-none focus:ring-2 focus:ring-white/50 border-none"
          />
          <button
            type="button"
            className="w-full rounded-md bg-white px-6 py-3 text-sm font-bold text-[#d8544f] transition-transform hover:scale-105 md:w-auto cursor-pointer border-none whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
