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
      {/* Container restricted to max-w-6xl to tighten horizontal gaps and create visual balance */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row justify-between items-center h-full">
        
        {/* Left: Logo Lockup */}
        <div className="flex flex-row items-center gap-2">
          {/* Stylized triangular golden W logo mark */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 text-brand-gold">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M50 15L85 80H70L50 42L30 80H15L50 15Z" fill="currentColor" />
              <path d="M50 55L65 80H35L50 55Z" fill="currentColor" opacity="0.85" />
            </svg>
          </div>
          <div className="flex flex-col select-none">
            <div className="flex flex-row items-baseline leading-none">
              <span className={`text-base sm:text-lg font-extrabold tracking-tight ${pathname === "/events" ? "text-white" : "text-[#231F20]"}`}>Wealth</span>
              <span className="text-base sm:text-lg font-bold tracking-tight text-brand-gold">kare</span>
            </div>
            <span className={`text-[7.5px] font-semibold tracking-wider mt-0.5 leading-none ${pathname === "/events" ? "text-gray-300" : "text-gray-500"}`}>
              Relationships Beyond Investments
            </span>
            <span className={`text-[6.5px] font-bold tracking-widest mt-0.5 leading-none uppercase ${pathname === "/events" ? "text-gray-400" : "text-gray-400"}`}>
              AMFI Registered Mutual Fund & SIF Distributor
            </span>
          </div>
        </div>

        {/* Center: Gold Capsule Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center justify-center">
          <div className="bg-brand-gold rounded-full px-5 py-2.5 flex flex-row items-center gap-5 shadow-sm">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={getHref(item.href)}
                className="text-[10px] font-bold text-white hover:text-gray-100 transition-colors tracking-widest font-sans whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Right: Login Button (Desktop) */}
        <div className="hidden lg:flex">
          <a
            href={loginHref}
            className="bg-brand-gold hover:bg-[#a67e3f] text-white text-[10px] font-extrabold px-6 py-2.5 rounded-full transition-all tracking-widest shadow-sm"
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
            href={loginHref}
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
