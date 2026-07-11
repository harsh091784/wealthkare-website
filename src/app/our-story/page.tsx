"use client";

import { useRef, useEffect, useState } from "react";
import Header from "@/components/Header";
import ArcRing from "@/components/ArcRing";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export default function OurStoryPage() {
  const commitments = [
    "We recommend only what fits your goals — never what pays us most.",
    "We are transparent about how we are compensated.",
    "We explain the risks as plainly as the rewards.",
    "Your interests come before ours, always.",
    "We keep your information private and secure.",
    "We stay accountable — through regular reviews and honest conversations, in good markets and bad.",
  ];

  const getEthicsIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return (
          <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.25.588 1.81l-3.974 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      case 1:
        return (
          <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        );
      case 2:
        return (
          <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 3:
        return (
          <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 4:
        return (
          <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  const philosophyRef = useRef<HTMLDivElement>(null);
  const [philosophyVisible, setPhilosophyVisible] = useState(false);
  const introRef = useRef<HTMLDivElement>(null);
  const [introVisible, setIntroVisible] = useState(false);

  useEffect(() => {
    const philosophyEl = philosophyRef.current;
    const introEl = introRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === philosophyEl) {
              setPhilosophyVisible(true);
            } else if (entry.target === introEl) {
              setIntroVisible(true);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (philosophyEl) observer.observe(philosophyEl);
    if (introEl) observer.observe(introEl);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col bg-white min-h-screen select-none">

      <Header />
      {/* SECTION 1 — HERO (Dark, matches screenshot 1) */}
      <section className="relative bg-[#1A1819] text-white pt-4 pb-12 lg:pt-6 lg:pb-20 px-4 overflow-hidden select-none">
        {/* Scrim opacity reduced: event background photo is clearly more visible */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.25] mix-blend-luminosity z-0"
          style={{ backgroundImage: 'url("/images/events/event_mosaic_3.png")' }}
        />
        {/* Lighter scrim/gradient to protect text legibility on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-0" />
        
        <div className="w-full max-w-6xl mx-auto z-10 relative flex flex-col gap-6">
          {/* Breadcrumb inline inside Hero at the top-left */}
          <div className="-mt-2 -mb-2">
            <Breadcrumb
              light={true}
              items={[
                { label: "Home", href: "/" },
                { label: "Our Story" },
              ]}
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Hero Text block */}
            <div className="flex-grow max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 leading-none">
              Wealth<span className="text-[#BD924D]">Kare</span>
            </h1>
            <p className="text-lg sm:text-xl font-bold text-gray-300 leading-snug">
              Your trusted partner for wealth creation.
            </p>
          </div>

          {/* Right Staggered Event Photos Strip */}
          <div className="flex flex-col flex-shrink-0 items-start w-full lg:w-auto">
            <span className="block text-[8px] font-black text-brand-gold tracking-[0.25em] uppercase mb-4">
              Life @Wealthkare
            </span>
            
            <div className="flex flex-row gap-4 items-start select-none overflow-x-auto lg:overflow-visible scrollbar-none max-w-full pb-4 lg:pb-12 w-full">
              {/* Card 1 */}
              <div className="w-32 h-44 sm:w-36 sm:h-52 lg:w-44 lg:h-64 rounded-3xl overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex-shrink-0 lg:translate-y-0 transform hover:scale-[1.03] transition-all duration-300 border border-white/5">
                <img
                  src="/images/events/event_featured.jpg"
                  alt="Founder Speaking"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Card 2 */}
              <div className="w-32 h-44 sm:w-36 sm:h-52 lg:w-44 lg:h-64 rounded-3xl overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex-shrink-0 lg:translate-y-6 transform hover:scale-[1.03] transition-all duration-300 border border-white/5">
                <img
                  src="/images/events/event_mosaic_1.jpg"
                  alt="Team Standee"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Card 3 */}
              <div className="w-32 h-44 sm:w-36 sm:h-52 lg:w-44 lg:h-64 rounded-3xl overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex-shrink-0 lg:translate-y-12 transform hover:scale-[1.03] transition-all duration-300 border border-white/5">
                <img
                  src="/images/events/event_mosaic_2.jpg"
                  alt="Speaking Event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Intro paragraph below Hero Band (with warm container, motifs, and scroll reveals) */}
      <section
        ref={introRef}
        className="bg-gradient-to-b from-[#FCFAF7] to-[#F7F3EE] py-10 md:py-12 px-4 border-b border-gray-200/25 relative overflow-hidden select-none"
      >
        {/* Faint gold ArcRing behind this area */}
        <ArcRing className="absolute -right-40 -top-40 text-brand-gold pointer-events-none" opacity={0.03} size="w-[480px] h-[480px]" strokeWidth={1} />
        <ArcRing className="absolute -left-20 -bottom-40 text-brand-gold pointer-events-none" opacity={0.02} size="w-[360px] h-[360px]" strokeWidth={1} />

        <div
          className={`w-full max-w-4xl mx-auto flex flex-col items-start transition-all duration-1000 transform ${
            introVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Eyebrow label */}
          <span className="text-[10px] font-black text-brand-gold tracking-[0.25em] uppercase mb-4 pl-7">
            About Wealthkare
          </span>

          {/* Quote container with left gold vertical accent line */}
          <div className="flex gap-4 items-start relative max-w-3xl text-left pl-6 border-l-[3px] border-brand-gold/65 py-2">
            <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-relaxed">
              <span className="text-[#231F20] font-black">Wealthkare (WC Securities Pvt Ltd)</span> offers wealth management solutions spanning investment guidance, estate planning, investment management, and broking services &mdash; for <span className="text-brand-gold font-extrabold">individuals, institutions, HNIs, CXOs, salaried professionals, and seasoned investors</span>.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — OUR PHILOSOPHY (White, matches screenshot 2 top) */}
      <section
        ref={philosophyRef}
        className="bg-white py-16 md:py-24 px-4 border-t border-gray-100 relative overflow-hidden select-none"
      >
        {/* Sweeping signature ArcRing motif behind the section */}
        <ArcRing className="absolute -right-36 -top-36 text-brand-gold pointer-events-none" opacity={0.06} size="w-[580px] h-[580px]" strokeWidth={1} />
        <ArcRing className="absolute -right-20 -top-20 text-brand-gold pointer-events-none" opacity={0.04} size="w-[440px] h-[440px]" strokeWidth={1} />
        <ArcRing className="absolute -left-20 -bottom-20 text-brand-gold pointer-events-none" opacity={0.03} size="w-[300px] h-[300px]" strokeWidth={1} />

        <div className="w-full max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Philosophy Text block - fade and slide in */}
            <div
              className={`lg:col-span-7 flex flex-col justify-center transition-all duration-1000 transform ${
                philosophyVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="flex flex-row items-stretch gap-6">
                {/* Left Vertical Accent Line */}
                <div className="w-[3px] bg-brand-gold rounded-full flex-shrink-0" />
                
                <div className="flex flex-col">
                  {/* Small index marker */}
                  <span className="text-[10px] font-black text-brand-gold tracking-[0.2em] uppercase mb-2 block">
                    01 &mdash; Our Philosophy
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#231F20] tracking-tight mb-6 leading-none uppercase">
                    Our <span className="text-brand-gold">Philosophy</span>
                  </h2>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-bold max-w-2xl">
                  Choosing the right products for you begins with your risk profile and the time horizon for your goals. We study each product's track record and how it has behaved across market cycles, the views of its fund manager and management team, and weigh the full risk–return picture before arriving at a suitable fit.
                </p>
                
                {/* Pull-quote text anchor */}
                <div className="border-l-2 border-brand-gold/45 pl-4 py-1.5 my-6 max-w-xl">
                  <blockquote className="text-base sm:text-lg lg:text-xl font-extrabold text-brand-gold italic leading-snug">
                    &ldquo;A deliberate, research-led process &mdash; never one-size-fits-all.&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>
            
            {/* Right Thinker Statue image with warm gradient panel, concentric rings, rounded corners and shadow - scale and fade in */}
            <div
              className={`lg:col-span-5 flex justify-center lg:justify-end relative pt-6 lg:pt-0 transition-all duration-1000 delay-300 transform ${
                philosophyVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="relative p-2.5 bg-gradient-to-br from-[#FAF5EF] to-[#ebdccb]/60 rounded-3xl border border-brand-gold/25 shadow-lg max-w-[280px] w-full transform hover:scale-[1.03] transition-all duration-500 overflow-hidden group">
                {/* Faint concentric ring behind the statue inside the panel */}
                <div className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none flex items-center justify-center">
                  <div className="w-[180px] h-[180px] rounded-full border border-brand-gold" />
                  <div className="w-[245px] h-[245px] rounded-full border border-brand-gold absolute" />
                  <div className="w-[310px] h-[310px] rounded-full border border-brand-gold absolute" />
                </div>
                
                <div className="bg-white rounded-2xl overflow-hidden p-6 shadow-inner flex items-center justify-center border border-gray-100/60 relative z-10">
                  <img
                    src="/images/thinker_statue.png"
                    alt="Classical Thinker Statue"
                    className="w-40 sm:w-48 max-h-60 object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHY WC SECURITIES (Gold/Brown band, matches screenshot 2 bottom) */}
      <section className="bg-[#BD924D] text-white py-20 px-4 relative overflow-hidden select-none">
        {/* Subtle Arc motif behind the content */}
        <ArcRing className="-right-20 -bottom-20 text-white" opacity={0.1} size="w-[440px] h-[440px]" strokeWidth={1} />
        <ArcRing className="-left-10 -top-20 text-white" opacity={0.06} size="w-[300px] h-[300px]" strokeWidth={1} />

        <div className="w-full max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            
            {/* Left side Large Heading with divider */}
            <div className="lg:w-[35%] flex flex-col justify-start select-none">
              <h2 className="text-[#231F20] font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none uppercase">
                Why WC <br />
                <span className="text-white">Securities?</span>
              </h2>
              <div className="w-16 h-1 bg-white mt-6 rounded-full opacity-85" />
            </div>

            {/* Right side Grid of styled Translucent Cards with Icons */}
            <div className="lg:w-[65%] grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              {/* Card 1 */}
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20 shadow-sm flex items-start gap-4 hover:bg-white/15 transition-all duration-200">
                <div className="bg-white text-[#BD924D] p-2 rounded-xl flex-shrink-0 shadow-md">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white mb-1.5 opacity-90">Expert Advisory</h4>
                  <p className="text-[12px] sm:text-xs font-semibold text-white/95 leading-relaxed">
                    A team of highly qualified professionals guiding you across a wide range of products — mutual funds, equity, fixed income, insurance, PMS, and AIF.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20 shadow-sm flex items-start gap-4 hover:bg-white/15 transition-all duration-200">
                <div className="bg-white text-[#BD924D] p-2 rounded-xl flex-shrink-0 shadow-md">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white mb-1.5 opacity-90">Portfolio Reviews</h4>
                  <p className="text-[12px] sm:text-xs font-semibold text-white/95 leading-relaxed">
                    Periodic portfolio review reports that keep you updated on your investments.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20 shadow-sm flex items-start gap-4 hover:bg-white/15 transition-all duration-200">
                <div className="bg-white text-[#BD924D] p-2 rounded-xl flex-shrink-0 shadow-md">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white mb-1.5 opacity-90">Investor Education</h4>
                  <p className="text-[12px] sm:text-xs font-semibold text-white/95 leading-relaxed">
                    Regular investor awareness programs.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20 shadow-sm flex items-start gap-4 hover:bg-white/15 transition-all duration-200">
                <div className="bg-white text-[#BD924D] p-2 rounded-xl flex-shrink-0 shadow-md">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white mb-1.5 opacity-90">Dedicated RM</h4>
                  <p className="text-[12px] sm:text-xs font-semibold text-white/95 leading-relaxed">
                    A dedicated relationship manager for every client.
                  </p>
                </div>
              </div>

              {/* Card 5 */}
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20 shadow-sm flex items-start gap-4 hover:bg-white/15 transition-all duration-200 sm:col-span-2">
                <div className="bg-white text-[#BD924D] p-2 rounded-xl flex-shrink-0 shadow-md">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white mb-1.5 opacity-90">Active Monitoring</h4>
                  <p className="text-[12px] sm:text-xs font-semibold text-white/95 leading-relaxed">
                    Constant monitoring of your portfolio, with structured report construction.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4 — ETHICS OATH (6 commitments) */}
      <section className="bg-white py-20 px-4 select-none relative overflow-hidden">
        {/* Faint gold ArcRing behind the ethics grid */}
        <ArcRing className="-left-40 -bottom-40 text-brand-gold" opacity={0.03} size="w-[500px] h-[500px]" strokeWidth={1} />
        
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#231F20] tracking-tight mb-12 text-center uppercase">
            Our <span className="text-[#BD924D]">Ethics Oath</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commitments.map((com, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white to-[#FAF8F5] p-7 rounded-3xl border border-gray-200/50 shadow-sm flex flex-col gap-4 transition-all duration-300 hover:shadow-md hover:border-brand-gold/30 hover:-translate-y-1 hover:scale-[1.01] group cursor-default"
              >
                <div className="flex flex-row justify-between items-center">
                  <span className="text-2xl font-black text-brand-gold/90">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-brand-gold/10 flex items-center justify-center shadow-sm">
                    {getEthicsIcon(idx)}
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-bold text-gray-700 leading-relaxed">
                  {com}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — OUR TEAM (Dark, matches screenshot 3) */}
      <section className="bg-[#1A1819] text-white py-16 px-4 select-none relative overflow-hidden">
        {/* Signature decoration */}
        <ArcRing className="-top-40 -right-40" opacity={0.04} size="w-[480px] h-[480px]" strokeWidth={1} />
        
        <div className="w-full max-w-6xl mx-auto z-10 relative">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-center mb-12 uppercase leading-none">
            OUR <span className="text-[#BD924D]">TEAM</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Mr. Mukesh Gupta (Founder) - Large Card (Col-Span 5) */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-[#2A2625] rounded-3xl overflow-hidden border border-gray-800 shadow-lg relative group h-full flex flex-col min-h-[380px] lg:min-h-full">
                <div className="relative w-full h-full overflow-hidden flex-grow min-h-[340px] lg:min-h-[440px]">
                  <img
                    src="/images/mukesh_founder.jpg"
                    alt="Mr. Mukesh Gupta"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02] filter contrast-[1.06] brightness-[0.97]"
                  />
                  
                  {/* Overlay details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent flex flex-col justify-end p-6">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white leading-none">
                        Mr. Mukesh Gupta
                      </h3>
                      <a 
                        href="https://www.linkedin.com/in/mukeshgupta1/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#BD924D] hover:text-white transition-all duration-300 hover:scale-110"
                        aria-label="Mukesh Gupta LinkedIn Profile"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>
                    <p className="text-[#BD924D] text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2">
                      Founder
                    </p>
                    <p className="text-gray-300 text-[10px] sm:text-xs font-bold leading-relaxed">
                      Chartered Accountant &bull; CERTIFIED FINANCIAL PLANNER &bull; 25+ years experience
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Team Members and Recruitment (Col-Span 7, Grid of 4) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
              
              {/* Card 2 (Placeholder) */}
              <div className="bg-[#2A2625] rounded-3xl overflow-hidden border border-gray-800 shadow-lg relative group flex flex-col h-full min-h-[220px]">
                <div className="relative w-full h-36 overflow-hidden bg-gray-900 flex-shrink-0">
                  <img
                    src="/hero-professionals-placeholder.png"
                    alt="Team Member"
                    className="w-full h-full object-cover object-top opacity-75 transition-transform duration-500 group-hover:scale-103"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col justify-center">
                  <h4 className="text-sm sm:text-base font-black text-white mb-0.5">
                    Team Member
                  </h4>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-wider">
                    Role Placeholder
                  </p>
                </div>
              </div>

              {/* Card 3 (Placeholder) */}
              <div className="bg-[#2A2625] rounded-3xl overflow-hidden border border-gray-800 shadow-lg relative group flex flex-col h-full min-h-[220px]">
                <div className="relative w-full h-36 overflow-hidden bg-gray-900 flex-shrink-0">
                  <img
                    src="/hero-professionals-placeholder.png"
                    alt="Team Member"
                    className="w-full h-full object-cover object-top opacity-75 transition-transform duration-500 group-hover:scale-103"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col justify-center">
                  <h4 className="text-sm sm:text-base font-black text-white mb-0.5">
                    Team Member
                  </h4>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-wider">
                    Role Placeholder
                  </p>
                </div>
              </div>

              {/* Card 4 (Placeholder) */}
              <div className="bg-[#2A2625] rounded-3xl overflow-hidden border border-gray-800 shadow-lg relative group flex flex-col h-full min-h-[220px]">
                <div className="relative w-full h-36 overflow-hidden bg-gray-900 flex-shrink-0">
                  <img
                    src="/hero-professionals-placeholder.png"
                    alt="Team Member"
                    className="w-full h-full object-cover object-top opacity-75 transition-transform duration-500 group-hover:scale-103"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col justify-center">
                  <h4 className="text-sm sm:text-base font-black text-white mb-0.5">
                    Team Member
                  </h4>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-wider">
                    Role Placeholder
                  </p>
                </div>
              </div>

              {/* Card 5 (JOIN US Recruitment Card) */}
              <div className="bg-[#2A2625] rounded-3xl p-6 border border-gray-800 shadow-lg flex flex-col justify-center items-center text-center relative overflow-hidden min-h-[220px]">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-[#BD924D]/10 filter blur-xl" />
                <div className="z-10 flex flex-col items-center">
                  <h4 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug mb-5 uppercase">
                    Imagining <br />
                    yourself to <br />
                    be here?
                  </h4>
                  <Link
                    href="/#get-in-touch"
                    className="bg-white hover:bg-gray-150 text-gray-900 px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all shadow-md transform hover:scale-[1.03] duration-200"
                  >
                    Join Us
                  </Link>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
