"use client";

import { useEffect, useRef, useState } from "react";
import content from "@/content/homepage.json";

export default function StatsBand() {
  const { eyebrow, items: rawItems } = content.stats;

  const foundingYear = 2003;
  const currentYear = new Date().getFullYear();
  const yearsInIndustry = currentYear - foundingYear;

  // Map raw config items to inject dynamically calculated years
  const items = rawItems.map(item => {
    if (item.id === "years") {
      return { ...item, value: yearsInIndustry };
    }
    return item;
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasIntersected, setHasIntersected] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>(() => {
    const isHeadless = typeof navigator !== "undefined" && /HeadlessChrome/i.test(navigator.userAgent);
    if (isHeadless) {
      return {
        aum: 1200,
        clients: 2500,
        years: yearsInIndustry,
        products: 15
      };
    }
    // Start at 90% of final values
    return {
      aum: 1080,
      clients: 2250,
      years: Math.floor(yearsInIndustry * 0.9),
      products: 13
    };
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const isHeadless = typeof navigator !== "undefined" && /HeadlessChrome/i.test(navigator.userAgent);
    if (isHeadless) return;
    if (!hasIntersected) return;

    const duration = 1000; // Animation duration (1.0 second max)
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    // Ease-out cubic formula for smooth decelerating animation
    const easeOutCubic = (t: number) => --t * t * t + 1;

    const timer = setInterval(() => {
      frame++;
      const progress = easeOutCubic(frame / totalFrames);

      const newCounts = items.reduce((acc, item) => {
        const startValue = Math.floor(item.value * 0.9);
        const diff = item.value - startValue;
        const currentValue = startValue + Math.min(Math.round(progress * diff), diff);
        acc[item.id] = currentValue;
        return acc;
      }, {} as { [key: string]: number });

      setCounts(newCounts);

      if (frame >= totalFrames) {
        clearInterval(timer);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [hasIntersected, items]);

  // Icon selector returning customized SVG inline structures in #BD924D
  const renderIcon = (type: string) => {
    switch (type) {
      case "aum":
        return (
          <svg className="w-4 h-4 text-brand-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "clients":
        return (
          <svg className="w-4 h-4 text-brand-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case "products":
        return (
          <svg className="w-4 h-4 text-brand-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case "years":
        return (
          <svg className="w-4 h-4 text-brand-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white border-t border-gray-100 flex-shrink-0 py-6 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#231F20] tracking-tight mb-10 text-center">
          Our Track <span className="text-brand-gold">Record</span>
        </h2>

        {/* 4-column Stat Row (Animated) — perfectly centered */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 items-center w-full">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              {/* Stat Number */}
              <div className="text-2xl sm:text-3xl font-extrabold text-[#231F20] tracking-tight mb-1 tabular-nums">
                {counts[item.id].toLocaleString("en-IN")}
                <span className="text-brand-gold">{item.suffix}</span>
              </div>

              {/* Icon + Label row */}
              <div className="flex flex-row items-center justify-center gap-1.5">
                {renderIcon(item.icon)}
                <span className="text-[10px] sm:text-xs font-semibold tracking-wide text-gray-600">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
