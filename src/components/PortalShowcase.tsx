"use client";

import Image from "next/image";
import ArcRing from "@/components/ArcRing";
import content from "@/content/homepage.json";

export default function PortalShowcase() {
  const { eyebrow, headline, description, bullets, loginText, loginHref } = content.portal;

  // Inline SVG icons for the feature bullets with gold stroke (#BD924D)
  const renderBulletIcon = (index: number) => {
    switch (index) {
      case 0: // Live portfolio value & 1-day change
        return (
          <svg className="w-5 h-5 text-brand-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 1: // Goal tracking & planning
        return (
          <svg className="w-5 h-5 text-brand-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 2: // All assets, one login
        return (
          <svg className="w-5 h-5 text-brand-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      case 3: // iOS & Android app
        return (
          <svg className="w-5 h-5 text-brand-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-brand-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <section
      id="investor-portal"
      className="relative bg-white py-10 md:py-12 overflow-hidden w-full select-none border-t border-gray-100"
    >
      {/* Faint ArcRing motif behind content */}
      <ArcRing
        className="-bottom-40 -left-40"
        opacity={0.15}
        size="w-[520px] h-[520px]"
        strokeWidth={1}
      />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#231F20] tracking-tight mb-12 sm:mb-16 text-center">
          Proprietary <span className="text-brand-gold">Portal</span>
        </h2>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          {/* LEFT COLUMN: Dashboard Mockup Image */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="relative w-full max-w-[620px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:translate-y-[-4px] hover:shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-all duration-500 bg-white p-2 border border-gray-200/40">
              <Image
                src="/dashboard-mockup.png"
                alt="Wealthkare Investor Portal"
                width={1000}
                height={500}
                className="object-contain w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Info and CTA Actions */}
          <div className="lg:col-span-5 flex flex-col text-left">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#231F20] tracking-tight leading-tight mb-4">
              {headline}
            </h3>
            
            <p className="text-sm sm:text-[15px] text-gray-600 font-medium leading-relaxed mb-6 sm:mb-8">
              {description}
            </p>

            {/* Feature Bullets */}
            <div className="flex flex-col gap-4 mb-8 sm:mb-10">
              {bullets.map((bullet, idx) => (
                <div key={idx} className="flex flex-row items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-gold/10 flex-shrink-0">
                    {renderBulletIcon(idx)}
                  </div>
                  <span className="text-[13px] sm:text-sm font-semibold text-gray-700 tracking-wide">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
              {/* Login Pill Button */}
              <a
                href={loginHref}
                className="bg-brand-gold hover:bg-[#a67e3f] text-white text-center text-xs font-black tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg uppercase"
              >
                {loginText}
              </a>

              {/* Standard Badges Side by Side */}
              <div className="flex flex-row items-center gap-3 justify-center sm:justify-start">
                {/* App Store badge */}
                <a
                  href="#app-store"
                  className="flex items-center gap-2 bg-black hover:bg-zinc-900 text-white rounded-lg px-3.5 py-1.5 transition-all duration-300 shadow-sm border border-zinc-800"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.84-.98 2.94 1.07.08 2.16-.52 2.81-1.33z" />
                  </svg>
                  <div className="flex flex-col text-left">
                    <span className="text-[7px] font-medium text-gray-300 uppercase tracking-wider leading-none">Download on the</span>
                    <span className="text-[10px] font-bold text-white tracking-tight leading-none mt-0.5 whitespace-nowrap">App Store</span>
                  </div>
                </a>

                {/* Google Play badge */}
                <a
                  href="#google-play"
                  className="flex items-center gap-2 bg-black hover:bg-zinc-900 text-white rounded-lg px-3.5 py-1.5 transition-all duration-300 shadow-sm border border-zinc-800"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
                    <path d="M3.25 1.55c-.15.17-.25.43-.25.75v19.4c0 .32.1.58.25.75L3.32 22.5 14.15 11.67V11.5L3.32 1.5 3.25 1.55z" fill="#4285F4" />
                    <path d="M17.75 15.27l-3.6-3.6v-.17l3.6-3.6.08.05 4.26 2.42c1.21.69 1.21 1.83 0 2.52l-4.26 2.42-.08.06z" fill="#FBBC05" />
                    <path d="M14.15 11.67L3.32 22.5c.39.41 1.03.46 1.59.14l12.84-7.31-3.6-3.6v-.06z" fill="#EA4335" />
                    <path d="M14.15 11.5L3.32 1.5l10.83 10 12.84-7.31c-.56-.32-1.2-.27-1.59.14L14.15 11.5z" fill="#34A853" />
                  </svg>
                  <div className="flex flex-col text-left">
                    <span className="text-[7px] font-medium text-gray-300 uppercase tracking-wider leading-none">GET IT ON</span>
                    <span className="text-[10px] font-bold text-white tracking-tight leading-none mt-0.5 whitespace-nowrap">Google Play</span>
                  </div>
                </a>
              </div>
            </div>

            {/* QR Codes App Download Sub-section */}
            <div className="flex flex-row items-center gap-6 mt-6 border-t border-gray-100 pt-6">
              {/* App Store QR */}
              <div className="flex flex-row items-center gap-2">
                <div className="w-12 h-12 bg-white p-1 rounded-lg border border-gray-250/60 shadow-sm flex items-center justify-center flex-shrink-0" title="QR code — replace with real app store link QR">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Finder patterns */}
                    <rect x="10" y="10" width="22" height="22" fill="#231F20" stroke="white" strokeWidth="1.5"/>
                    <rect x="14" y="14" width="14" height="14" fill="white"/>
                    <rect x="17" y="17" width="8" height="8" fill="#BD924D"/>
                    
                    <rect x="68" y="10" width="22" height="22" fill="#231F20" stroke="white" strokeWidth="1.5"/>
                    <rect x="72" y="14" width="14" height="14" fill="white"/>
                    <rect x="75" y="17" width="8" height="8" fill="#BD924D"/>

                    <rect x="10" y="68" width="22" height="22" fill="#231F20" stroke="white" strokeWidth="1.5"/>
                    <rect x="14" y="72" width="14" height="14" fill="white"/>
                    <rect x="17" y="75" width="8" height="8" fill="#BD924D"/>
                    
                    {/* Fake QR blocks */}
                    <rect x="42" y="15" width="8" height="8" fill="#231F20"/>
                    <rect x="38" y="30" width="12" height="6" fill="#BD924D"/>
                    <rect x="44" y="44" width="18" height="8" fill="#231F20"/>
                    <rect x="15" y="44" width="8" height="12" fill="#BD924D"/>
                    <rect x="68" y="44" width="8" height="16" fill="#231F20"/>
                    <rect x="44" y="68" width="12" height="12" fill="#BD924D"/>
                    <rect x="72" y="72" width="8" height="8" fill="#231F20"/>
                  </svg>
                </div>
                <span className="text-[9px] font-black text-gray-500 tracking-wider uppercase leading-none">
                  Scan to download<br /><span className="text-[#BD924D] font-black mt-0.5 block">iOS</span>
                </span>
              </div>

              {/* Google Play QR */}
              <div className="flex flex-row items-center gap-2">
                <div className="w-12 h-12 bg-white p-1 rounded-lg border border-gray-250/60 shadow-sm flex items-center justify-center flex-shrink-0" title="QR code — replace with real app store link QR">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Finder patterns */}
                    <rect x="10" y="10" width="22" height="22" fill="#231F20" stroke="white" strokeWidth="1.5"/>
                    <rect x="14" y="14" width="14" height="14" fill="white"/>
                    <rect x="17" y="17" width="8" height="8" fill="#BD924D"/>
                    
                    <rect x="68" y="10" width="22" height="22" fill="#231F20" stroke="white" strokeWidth="1.5"/>
                    <rect x="72" y="14" width="14" height="14" fill="white"/>
                    <rect x="75" y="17" width="8" height="8" fill="#BD924D"/>

                    <rect x="10" y="68" width="22" height="22" fill="#231F20" stroke="white" strokeWidth="1.5"/>
                    <rect x="14" y="72" width="14" height="14" fill="white"/>
                    <rect x="17" y="75" width="8" height="8" fill="#BD924D"/>
                    
                    {/* Different pattern for variety */}
                    <rect x="48" y="18" width="8" height="8" fill="#BD924D"/>
                    <rect x="42" y="32" width="10" height="10" fill="#231F20"/>
                    <rect x="38" y="48" width="16" height="6" fill="#BD924D"/>
                    <rect x="18" y="42" width="6" height="10" fill="#231F20"/>
                    <rect x="70" y="38" width="10" height="16" fill="#231F20"/>
                    <rect x="48" y="62" width="10" height="10" fill="#BD924D"/>
                    <rect x="68" y="68" width="6" height="6" fill="#231F20"/>
                  </svg>
                </div>
                <span className="text-[9px] font-black text-gray-500 tracking-wider uppercase leading-none">
                  Scan to download<br /><span className="text-[#BD924D] font-black mt-0.5 block">Android</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
