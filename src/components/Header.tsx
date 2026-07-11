"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import content from "@/content/homepage.json";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { navItems, loginText, loginHref } = content.header;

  const getHref = (href: string) => {
    if (href === "#") return "/";
    if (href.startsWith("#") && pathname !== "/") {
      return `/${href}`;
    }
    return href;
  };

  return (
    <header className="w-full bg-transparent z-40 flex-shrink-0 h-[72px] flex items-center">
      {/* Container restricted to max-w-7xl to align with general page grid */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row justify-between items-center h-full">
        
        {/* Left: Logo Lockup */}
        <div className="flex flex-col items-start select-none">
          <img
            src="/images/logo.png"
            alt="Wealthkare"
            className="h-8 sm:h-9 w-auto object-contain"
            width={135}
            height={36}
          />
          <span className={`text-[6.5px] font-bold tracking-widest leading-none uppercase mt-1 ${pathname === "/events" ? "text-gray-400" : "text-gray-400"}`}>
            AMFI Registered Mutual Fund & SIF Distributor
          </span>
        </div>

        {/* Center-Left: Gold Capsule Navigation (Desktop) - shifted left closer to logo with responsive spacing */}
        <nav className="hidden lg:flex items-center justify-center ml-4 xl:ml-16 mr-auto">
          <div className="bg-brand-gold rounded-full px-3.5 xl:px-5 py-2.5 flex flex-row items-center gap-3 xl:gap-5 shadow-sm">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={getHref(item.href)}
                className="text-[9px] xl:text-[10px] font-bold text-white hover:text-gray-100 transition-colors tracking-widest font-sans whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Right: CTA Buttons (Desktop) - responsive padding and font-size */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3">
          <a
            href="https://calendly.com/wc3511/30min?month=2026-07"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[38px] flex items-center justify-center border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white bg-transparent text-[9px] xl:text-[10px] font-extrabold px-4 xl:px-6 rounded-full transition-all tracking-widest shadow-sm whitespace-nowrap"
          >
            Virtual Meeting
          </a>
          <a
            href={loginHref}
            target="_blank"
            rel="noopener noreferrer"
            className="h-[38px] flex items-center justify-center bg-brand-gold hover:bg-[#a67e3f] text-white text-[9px] xl:text-[10px] font-extrabold px-4 xl:px-6 rounded-full transition-all tracking-widest shadow-sm whitespace-nowrap"
          >
            {loginText}
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden hover:text-brand-gold focus:outline-none ${pathname === "/events" ? "text-white" : "text-gray-600"}`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-[104px] left-0 w-full bg-white border-b border-gray-100 py-4 px-6 flex flex-col gap-4 shadow-lg z-50 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={getHref(item.href)}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-gray-700 hover:text-brand-gold transition-colors tracking-widest py-1 border-b border-gray-50"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="https://calendly.com/wc3511/30min?month=2026-07"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white bg-transparent text-xs font-bold py-2.5 rounded-full transition-all tracking-widest"
          >
            Virtual Meeting
          </a>
          <a
            href={loginHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center bg-brand-gold hover:bg-[#a67e3f] text-white text-xs font-bold py-2.5 rounded-full transition-all tracking-widest"
          >
            {loginText}
          </a>
        </div>
      )}
    </header>
  );
}
