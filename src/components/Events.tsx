"use client";

import Link from "next/link";
import content from "@/content/homepage.json";
import ArcRing from "@/components/ArcRing";

export default function Events() {
  const { eyebrow, headline, featured, mosaic } = content.events;

  return (
    <section
      id="events-section"
      className="relative bg-white py-12 md:py-16 overflow-hidden w-full select-none"
    >
      {/* Signature ArcRing decoration */}
      <ArcRing
        className="-top-40 -left-40"
        opacity={0.06}
        size="w-[480px] h-[480px]"
        strokeWidth={1}
      />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative flex flex-col items-center">
        {/* Eyebrow */}
        <div className="text-[10px] sm:text-xs font-black tracking-[0.25em] text-[#BD924D] mb-5 uppercase text-center">
          {eyebrow}
        </div>

        {/* Standard Two-Color Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#231F20] tracking-tight mb-12 text-center leading-tight">
          OUR <span className="text-brand-gold">EVENTS</span>
        </h2>

        {/* Featured + Mosaic Collage Container */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-visible shadow-[0_20px_50px_rgba(42,32,24,0.08)] border border-gray-200/40 relative">
          
          {/* LEFT: Featured Image Card */}
          <Link
            href={`/events?event=${featured.id || "money-alpha-summit"}`}
            className="block relative group overflow-hidden rounded-t-3xl lg:rounded-t-none lg:rounded-l-3xl h-[380px] lg:h-[540px] cursor-pointer transition-all duration-300 hover:shadow-[0_25px_50px_rgba(0,0,0,0.22)] hover:-translate-y-1.5 z-10 hover:z-30"
          >
            <img
              src={featured.image}
              alt="Mukesh Gupta addressing clients at WealthKare Event"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle gold overlay border inside featured image */}
            <div className="absolute inset-0 border-r border-[#BD924D]/10 pointer-events-none" />

            {/* Slide-up Caption Panel */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#221A10]/95 border-t border-[#BD924D]/25 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
              <span className="block text-[8px] font-black text-brand-gold tracking-[0.2em] uppercase mb-1.5">
                Featured Summit
              </span>
              <p className="text-white/95 text-[11px] sm:text-xs font-semibold leading-relaxed">
                {featured.caption}
              </p>
            </div>
          </Link>

          {/* RIGHT: 2x3 Mosaic Grid (6 images) */}
          <div className="relative rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl overflow-hidden grid grid-cols-2 grid-rows-3 h-[450px] lg:h-[540px]">
            {mosaic.map((item, idx) => {
              // The last two images (bottom-right of the 2x3 grid) are indices 4 and 5
              const isRear = idx >= 4;

              return (
                <Link
                  key={item.id}
                  href={`/events?event=${item.id}`}
                  className="relative group overflow-hidden cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-250 ease-out group-hover:scale-110"
                  />
                  {/* Subtle border between collage tiles */}
                  <div className="absolute inset-0 border border-white/5 pointer-events-none" />

                  {/* Subtle gold border/glow overlay on hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#BD924D] group-hover:shadow-[inset_0_0_12px_rgba(189,146,77,0.3)] transition-all duration-250 pointer-events-none z-25" />

                  {/* Caption strip sliding up from bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#221A10]/90 border-t border-[#BD924D]/25 py-2 px-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-250 ease-out z-20">
                    <p className="text-white text-[9px] sm:text-[10px] font-bold tracking-wide text-center truncate">
                      {item.caption}
                    </p>
                  </div>

                  {/* Rear fading shadow overlays for bottom two cells */}
                  {isRear && (
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/85 to-black/95 mix-blend-multiply transition-all duration-250 group-hover:opacity-0 pointer-events-none z-10" />
                  )}
                </Link>
              );
            })}

            {/* Centered VIEW MORE Pill CTA Button over lower part */}
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-6 z-20 pointer-events-none">
              <Link
                href="/events"
                className="bg-[#BD924D] hover:bg-[#a67e3f] text-white px-10 py-3.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all shadow-md hover:shadow-lg pointer-events-auto transform hover:scale-[1.03] duration-200"
              >
                View More
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
