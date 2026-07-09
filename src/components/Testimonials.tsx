"use client";

import { useEffect, useState, useRef } from "react";
import ArcRing from "@/components/ArcRing";
import content from "@/content/homepage.json";

export default function Testimonials() {
  const { eyebrow, headline, disclaimer, items } = content.testimonials;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Collapse expanded slide on navigation to avoid visual weirdness
  const nextSlide = () => {
    setExpandedId(null);
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setExpandedId(null);
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Auto-advance loop (5 seconds). Resets on activeIndex/expandedId change.
  // The auto-scroll pauses if hovered or if any testimonial is expanded.
  useEffect(() => {
    if (isHovered || expandedId !== null) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeIndex, isHovered, expandedId]);

  // Global click listener to collapse card if clicking anywhere else
  useEffect(() => {
    const handleGlobalClick = () => {
      setExpandedId(null);
    };
    if (expandedId !== null) {
      window.addEventListener("click", handleGlobalClick);
    }
    return () => {
      window.removeEventListener("click", handleGlobalClick);
    };
  }, [expandedId]);

  return (
    <section
      id="testimonials-section"
      className="relative bg-[#221A10] py-10 md:py-12 overflow-hidden w-full select-none shadow-[inset_0_24px_48px_rgba(0,0,0,0.25),inset_0_-24px_48px_rgba(0,0,0,0.25)]"
    >
      {/* Faint ArcRing decoration behind */}
      <ArcRing
        className="-bottom-40 -right-40"
        opacity={0.08}
        size="w-[520px] h-[520px]"
        strokeWidth={1}
      />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative flex flex-col items-center">
        {/* Eyebrow */}
        <div className="text-[10px] sm:text-xs font-black tracking-[0.25em] text-[#BD924D] mb-5 uppercase text-center">
          {eyebrow}
        </div>

        {/* Standard Two-Color Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FCF9F5] tracking-tight mb-16 text-center leading-tight">
          In Their <span className="text-brand-gold">Words</span>
        </h2>

        {/* 3D Stacked Carousel Container with dynamic height on expansion */}
        <div
          className="relative w-full max-w-[850px] transition-all duration-300 flex items-center justify-center mb-10"
          style={{ height: expandedId ? (isMobile ? "480px" : "380px") : (isMobile ? "340px" : "280px") }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 sm:left-4 z-40 w-11 h-11 rounded-full bg-[#2A2018] hover:bg-[#382C22] border border-[#BD924D]/30 flex items-center justify-center transition-all shadow-md hover:shadow-lg cursor-pointer text-white hover:text-brand-gold"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 sm:right-4 z-40 w-11 h-11 rounded-full bg-[#2A2018] hover:bg-[#382C22] border border-[#BD924D]/30 flex items-center justify-center transition-all shadow-md hover:shadow-lg cursor-pointer text-white hover:text-brand-gold"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Track wrapper */}
          <div className="relative w-full max-w-[480px] h-full flex items-center justify-center">
            {items.map((item, idx) => {
              // Calculate index diff with circular wrapping
              let diff = idx - activeIndex;
              if (diff < -items.length / 2) diff += items.length;
              if (diff > items.length / 2) diff -= items.length;

              const isCenter = diff === 0;
              const isLeft = diff === -1;
              const isRight = diff === 1;
              const isVisible = isCenter || isLeft || isRight;
              const isExpanded = expandedId === item.id;

              // Calculate transition styles
              let style: React.CSSProperties = {};
              if (isCenter) {
                style = {
                  transform: "translateX(0) scale(1)",
                  zIndex: isExpanded ? 50 : 30,
                  opacity: 1,
                };
              } else if (isLeft) {
                style = {
                  transform: isMobile ? "translateX(0) scale(0.8)" : "translateX(-45%) scale(0.85)",
                  zIndex: 20,
                  opacity: isMobile ? 0 : 0.3,
                  pointerEvents: "none",
                };
              } else if (isRight) {
                style = {
                  transform: isMobile ? "translateX(0) scale(0.8)" : "translateX(45%) scale(0.85)",
                  zIndex: 20,
                  opacity: isMobile ? 0 : 0.3,
                  pointerEvents: "none",
                };
              } else {
                const translateXVal = diff > 0 ? "80%" : "-80%";
                style = {
                  transform: isMobile ? "translateX(0) scale(0.7)" : `translateX(${translateXVal}) scale(0.75)`,
                  zIndex: 10,
                  opacity: 0,
                  pointerEvents: "none",
                };
              }

              return (
                <div
                  key={item.id}
                  className={`absolute w-full bg-[#FCF9F5] rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 ease-out select-none ${
                    isCenter ? "border-2 border-brand-gold shadow-[0_15px_40px_rgba(189,146,77,0.15)]" : "border border-[#FAF7F2]/20 shadow-[0_12px_30px_rgba(0,0,0,0.15)]"
                  } ${
                    !isVisible ? "pointer-events-none" : ""
                  } ${
                    isExpanded 
                      ? "h-auto min-h-[260px] sm:min-h-[220px] shadow-[0_20px_50px_rgba(189,146,77,0.3)] pb-6" 
                      : "h-[260px] sm:h-[220px]"
                  }`}
                  style={style}
                >
                  {/* Rating Stars */}
                  <div className="flex justify-between items-center w-full mb-2">
                    <div className="flex gap-0.5 text-brand-gold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Quote text wrapper with transition */}
                  <div 
                    className="relative overflow-hidden transition-all duration-300 flex-grow mb-2"
                    style={{ 
                      maxHeight: isExpanded ? "400px" : (isMobile ? "90px" : "65px") 
                    }}
                  >
                    <p className={`text-xs sm:text-sm text-gray-600 font-semibold leading-relaxed text-left italic ${
                      !isExpanded ? "line-clamp-3" : ""
                    }`}>
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Read More button */}
                  {isCenter && (
                    <div className="flex justify-start mb-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedId(isExpanded ? null : item.id);
                        }}
                        className="text-left text-[10px] font-black text-brand-gold uppercase tracking-wider focus:outline-none hover:underline cursor-pointer"
                      >
                        {isExpanded ? "Read less" : "Read more"}
                      </button>
                    </div>
                  )}

                  {/* Author Meta details */}
                  <div className="flex items-center justify-between mt-auto w-full border-t border-gray-200/50 pt-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar Placeholder (Gray circle with initials) */}
                      {item.initials && (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-xs font-black tracking-wider flex-shrink-0 select-none uppercase">
                          {item.initials}
                        </div>
                      )}
                      <div className="flex flex-col items-start text-left">
                        <span className="block text-xs font-black text-[#231F20] tracking-wide">
                          {item.author}
                        </span>
                        <span className="block text-[9px] font-bold text-gray-400 tracking-wider uppercase mt-0.5">
                          {item.tag}
                        </span>
                      </div>
                    </div>
                    {/* Subtle quote icon */}
                    <span className="text-3xl text-brand-gold/25 font-serif leading-none select-none">&rdquo;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compliance disclaimer microline */}
        <div className="text-[9px] sm:text-[10px] text-gray-300/60 font-bold tracking-wider text-center max-w-lg mt-6 leading-relaxed">
          {disclaimer}
        </div>
      </div>
    </section>
  );
}
