"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ArcRing from "@/components/ArcRing";
import content from "@/content/homepage.json";

const CARDS_PER_PAGE = 4;

export default function WhatWeOffer() {
  const { eyebrow, items } = content.services;
  const [page, setPage] = useState(0);
  const [wordsVisible, setWordsVisible] = useState(false);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  const totalPages = Math.ceil(items.length / CARDS_PER_PAGE);

  // Split subtext into words for word-by-word reveal
  const subtextFull =
    "From mutual funds to unlisted equities, we offer every solution your wealth journey needs — all under one trusted roof. Eight services. One relationship.";
  const words = subtextFull.split(" ");

  // Intersection observer: trigger word-by-word reveal once
  useEffect(() => {
    const el = subtextRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWordsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Group items into pages
  const pages = Array.from({ length: totalPages }, (_, i) =>
    items.slice(i * CARDS_PER_PAGE, (i + 1) * CARDS_PER_PAGE)
  );

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <section
      id="what-we-offer"
      className="relative bg-[#FAF7F2] py-10 md:py-12 overflow-hidden w-full select-none border-t border-gray-100 shadow-[inset_0_10px_20px_rgba(35,31,32,0.015),inset_0_-10px_20px_rgba(35,31,32,0.015)]"
    >
      {/* Faint ArcRing motifs */}
      <ArcRing
        className="-top-40 -left-40"
        opacity={0.15}
        size="w-[520px] h-[520px]"
        strokeWidth={1}
      />
      <ArcRing
        className="-bottom-40 -right-40"
        opacity={0.15}
        size="w-[520px] h-[520px]"
        strokeWidth={1}
      />

      {/* Heading Group */}
      <div className="flex flex-col items-center text-center mb-10 z-10 relative px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#231F20] tracking-tight mb-5 text-center">
          What We <span className="text-brand-gold">Offer</span>
        </h2>

        {/* Subtext with word-by-word reveal — balanced wrapping */}
        <p
          ref={subtextRef}
          className="max-w-xl mx-auto text-sm md:text-[15px] text-gray-600 font-medium leading-relaxed"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          {words.map((word, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: wordsVisible ? 1 : 0,
                transform: wordsVisible ? "translateY(0)" : "translateY(6px)",
                transition: wordsVisible
                  ? `opacity 0.4s ease ${(i * 0.07).toFixed(2)}s, transform 0.4s ease ${(i * 0.07).toFixed(2)}s`
                  : "none",
                marginRight: i < words.length - 1 ? "0.28em" : 0,
              }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* Carousel — page-based, 4 cards per page */}
      <div className="relative w-full max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Slide track */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {pages.map((pageCards, pageIdx) => (
              <div key={pageIdx} className="min-w-full grid grid-cols-4 gap-5">
                {pageCards.map((item, cardIdx) => (
                  <div
                    key={cardIdx}
                    className="relative h-[390px] rounded-[20px] overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/40"
                  >
                    {/* Photo */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={item.image}
                        alt={item.restingTitle}
                        fill
                        sizes="(max-width: 1152px) 25vw, 264px"
                        priority={pageIdx === 0}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Resting gradient — fades out on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#BD924D]/90 via-[#BD924D]/20 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none" />

                    {/* Resting title — fades out on hover */}
                    <h3 className="absolute bottom-5 left-5 text-white text-lg font-extrabold z-20 tracking-tight group-hover:opacity-0 transition-opacity duration-200 leading-tight drop-shadow-sm">
                      {item.restingTitle}
                    </h3>

                    {/* Hover panel — slides up from bottom */}
                    <div className="absolute inset-0 bg-[#BD924D] text-white p-5 flex flex-col justify-between transition-transform duration-350 ease-in-out translate-y-full group-hover:translate-y-0 z-30">
                      <div>
                        <h4 className="text-sm font-black tracking-tight mb-2.5 uppercase leading-tight border-b border-white/25 pb-2 w-full">
                          {item.hoverTitle}
                        </h4>
                        <p className="text-[11px] sm:text-xs font-medium leading-relaxed opacity-90">
                          {item.description}
                        </p>
                      </div>
                      <Link
                        href="/what-we-offer"
                        className="inline-block border border-white text-white bg-transparent hover:bg-white hover:text-[#BD924D] transition-colors duration-300 text-[9px] font-black tracking-widest px-4 py-2 rounded-full uppercase self-start mt-2"
                      >
                        VIEW MORE
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8 z-10 relative">
        {/* Previous button */}
        <button
          onClick={prev}
          disabled={page === 0}
          className="w-11 h-8 rounded-full bg-[#BD924D] disabled:opacity-35 hover:bg-[#a67e3f] text-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
          aria-label="Previous page"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page dots */}
        <div className="flex gap-2 items-center">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Page ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === page
                  ? "w-5 h-2 bg-[#BD924D]"
                  : "w-2 h-2 bg-[#BD924D]/30 hover:bg-[#BD924D]/60"
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={next}
          disabled={page === totalPages - 1}
          className="w-11 h-8 rounded-full bg-[#BD924D] disabled:opacity-35 hover:bg-[#a67e3f] text-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
          aria-label="Next page"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
