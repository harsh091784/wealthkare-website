"use client";

import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import ArcRing from "@/components/ArcRing";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";

const services = [
  {
    id: "mutual-funds",
    tabLabel: "Mutual Funds & SIF",
    headingPrefix: "Mutual Funds & ",
    headingHighlight: "SIF",
    image: "/offers-mutual-funds.png",
    description: "Professionally managed, diversified portfolios built around your goals — reviewed regularly and distributed through Regular Plans only. Whether you are building wealth over the long term or seeking tax-efficient returns, mutual funds remain the most accessible and transparent investment vehicle available to Indian investors.",
    benefits: [
      "Goal-based portfolio construction across equity, debt, and hybrid categories.",
      "Regular portfolio reviews with detailed performance reports.",
      "Access to Special Investment Funds (SIF) for qualified investors.",
      "Distributed as Regular Plans — full transparency on commission disclosure."
    ],
    whoIsThisFor: "Investors at every stage — from first-time SIP investors to seasoned HNIs looking for disciplined, research-led fund selection.",
    compliance: "We distribute Regular Plans only and earn a trailing commission. We do not deal in Direct Plans."
  },
  {
    id: "pms",
    tabLabel: "PMS",
    headingPrefix: "Portfolio Management ",
    headingHighlight: "Services",
    image: "/offers-pms.png",
    description: "For investors with a minimum of ₹50 lakhs in investable surplus, PMS offers a directly managed equity portfolio — each security held in your own demat account, every transaction transparent and reported. Unlike mutual funds, PMS strategies are individually tailored and actively managed by a dedicated fund manager.",
    benefits: [
      "Direct ownership of securities in your own demat account.",
      "Customised equity strategy aligned with your risk profile and return expectations.",
      "Detailed monthly and quarterly portfolio reports.",
      "Access to a curated selection of SEBI-registered PMS providers."
    ],
    whoIsThisFor: "HNI investors seeking a more personalised, high-conviction equity strategy beyond what mutual funds offer."
  },
  {
    id: "aif",
    tabLabel: "AIF",
    headingPrefix: "Alternative Investment ",
    headingHighlight: "Funds",
    image: "/offers-aif.png",
    description: "AIFs provide access to institutional-grade investment strategies — private equity, real estate debt, venture capital, and hedge fund strategies — that were previously accessible only to institutions and ultra-high-net-worth families. With a minimum investment of ₹1 crore, AIFs are SEBI-regulated and designed for sophisticated investors seeking diversification beyond public markets.",
    benefits: [
      "Access to Category I, II, and III AIFs across private equity, real estate, and long-short strategies.",
      "Portfolio diversification beyond listed equities and conventional fixed income.",
      "SEBI-regulated structure with defined investor protections.",
      "Curated selection from established AIF managers with audited track records."
    ],
    whoIsThisFor: "Investors with significant existing portfolios seeking genuine diversification and access to institutional-quality strategies.",
    compliance: "AIF investments carry higher risk and are suitable only for sophisticated investors as defined by SEBI. Minimum investment: ₹1 crore."
  },
  {
    id: "bonds-ncds",
    tabLabel: "Bonds & NCDs",
    headingPrefix: "Bonds & ",
    headingHighlight: "NCDs",
    image: "/offers-bonds.png",
    description: "Fixed-income securities from rated corporate and government issuers — offering predictable cash flows, capital preservation, and yields that meaningfully outperform conventional bank deposits. Bonds and Non-Convertible Debentures (NCDs) are ideal for investors who want to earn a fixed return without equity market risk.",
    benefits: [
      "Curated selection of investment-grade rated bonds and NCDs.",
      "Regular interest payouts — monthly, quarterly, or annual depending on the instrument.",
      "Yields typically higher than bank FDs for comparable tenures.",
      "Secondary market liquidity on exchange-listed instruments."
    ],
    whoIsThisFor: "Conservative to moderate investors seeking predictable income and capital safety, particularly retirees and those nearing major financial goals."
  },
  {
    id: "corporate-fds",
    tabLabel: "Corporate FDs",
    headingPrefix: "Corporate Fixed ",
    headingHighlight: "Deposits",
    image: "/offers-fds.png",
    description: "Fixed deposits issued by NBFC and corporate entities, offering higher interest rates than conventional bank FDs for investors willing to accept slightly higher credit risk. Corporate FDs are particularly attractive in a high-rate environment for investors with shorter investment horizons.",
    benefits: [
      "Interest rates typically 0.5–2% higher than comparable bank FDs.",
      "Flexible tenures from 1 to 5 years.",
      "Issued by SEBI and RBI regulated entities — CRISIL or ICRA rated.",
      "Systematic interest payouts to match your income needs."
    ],
    whoIsThisFor: "Investors with surplus funds seeking higher fixed returns over 1–5 year horizons without exposure to market volatility.",
    compliance: "Corporate FDs are not covered under DICGC insurance. Invest based on issuer credit rating and your risk tolerance."
  },
  {
    id: "unlisted-equities",
    tabLabel: "Unlisted Equities",
    headingPrefix: "Unlisted ",
    headingHighlight: "Equities",
    image: "/offers-equities.png",
    description: "An opportunity to invest in companies before they list on public exchanges — buying shares at pre-IPO valuations with the potential for significant appreciation upon listing. Unlisted equity investments carry higher risk and lower liquidity, but offer asymmetric return potential for informed investors with a long time horizon.",
    benefits: [
      "Access to pre-IPO shares of companies with established business models and near-term listing plans.",
      "Entry at valuations typically lower than post-listing market price.",
      "Portfolio diversification into high-growth private companies.",
      "Curated deal flow with due diligence support from our research team."
    ],
    whoIsThisFor: "Sophisticated HNI investors with a 2–5 year investment horizon, high risk appetite, and an interest in early-stage wealth creation.",
    compliance: "Unlisted equity investments are illiquid and carry significant risk. Past pre-IPO returns are not indicative of future performance."
  },
  {
    id: "insurance",
    tabLabel: "Insurance",
    headingPrefix: "Life, Health & General ",
    headingHighlight: "Insurance",
    image: "/offers-insurance.png",
    description: "Protection that complements your wealth. We help you structure the right insurance coverage across life, health, and general categories — ensuring that the wealth you have built is protected against the risks that can erode it fastest: untimely death, illness, and asset damage. Insurance is not a product — it is the foundation of a complete financial plan.",
    benefits: [
      "Term life insurance sized to your Human Life Value — not just a round number.",
      "Health insurance structured for your family size, city, and medical history.",
      "General insurance for your home, vehicles, and business assets.",
      "Annual review of all covers to ensure adequacy as your life changes."
    ],
    whoIsThisFor: "Every client, at every stage. No wealth plan is complete without adequate protection. We ensure yours is."
  },
  {
    id: "loans",
    tabLabel: "Loans",
    headingPrefix: "Loans — Home, Car & ",
    headingHighlight: "Personal",
    image: "/offers-loans.png",
    description: "Liquidity solutions facilitated through our trusted banking and NBFC partners. Whether you are purchasing your dream home, a new vehicle, or need personal liquidity for a short-term need, we help you access competitive loan products without the complexity of navigating lenders alone.",
    benefits: [
      "Home loans at competitive rates through leading banks and HFCs.",
      "Car loans with quick processing and minimal documentation.",
      "Personal loans for short-term liquidity needs.",
      "Loan against securities (LAS) for investors needing liquidity without liquidating investments."
    ],
    whoIsThisFor: "Existing clients who prefer a single trusted relationship for both their investments and their financing needs."
  }
];

export default function WhatWeOfferPage() {
  const [activeId, setActiveId] = useState("mutual-funds");
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Scrollspy effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px", // Highlighting when section takes up the screen center
        threshold: 0,
      }
    );

    services.forEach((service) => {
      const el = document.getElementById(service.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Sync scroll for navigation pill container on active state change
  useEffect(() => {
    const activeTab = document.getElementById(`tab-${activeId}`);
    const container = navContainerRef.current;
    if (activeTab && container) {
      const containerWidth = container.offsetWidth;
      const tabLeft = activeTab.offsetLeft;
      const tabWidth = activeTab.offsetWidth;
      container.scrollTo({
        left: tabLeft - containerWidth / 2 + tabWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeId]);

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col bg-[#FCFAF7] min-h-screen select-none">
      {/* Hide scrollbar styles for navigation capsule row */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      <Header />

      {/* Hero Section */}
      <section className="relative pt-6 pb-12 lg:pt-10 lg:pb-16 px-4 overflow-hidden">
        {/* Subtle ArcRing motifs for background depth */}
        <ArcRing
          className="-top-40 -left-40"
          opacity={0.05}
          size="w-[520px] h-[520px]"
          strokeWidth={1}
        />
        <ArcRing
          className="-bottom-40 -right-40"
          opacity={0.04}
          size="w-[440px] h-[440px]"
          strokeWidth={1}
        />

        <div className="w-full max-w-6xl mx-auto z-10 relative flex flex-col gap-4">
          {/* Breadcrumb */}
          <div className="-mt-2 -mb-2">
            <Breadcrumb
              light={false}
              items={[
                { label: "Home", href: "/" },
                { label: "What We Offer" },
              ]}
            />
          </div>

          <div className="max-w-2xl text-left mt-4">
            <span className="text-[10px] sm:text-xs font-black tracking-[0.25em] text-[#BD924D] mb-3 uppercase block">
              WealthKare Offerings
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#231F20] tracking-tight mb-5 leading-none">
              What We <span className="text-brand-gold">Offer</span>
            </h1>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-bold">
              Eight services. One relationship. Everything your wealth journey needs, under one trusted roof.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Tab Navigation Strip */}
      <div className="sticky top-0 bg-[#FCFAF7]/95 backdrop-blur-md z-30 border-b border-gray-200/50 shadow-sm">
        <div 
          ref={navContainerRef}
          className="no-scrollbar flex overflow-x-auto whitespace-nowrap py-3.5 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto gap-2 md:gap-3 lg:justify-center"
        >
          {services.map((service) => {
            const isActive = activeId === service.id;
            return (
              <a
                key={service.id}
                id={`tab-${service.id}`}
                href={`#${service.id}`}
                onClick={(e) => handleTabClick(e, service.id)}
                className={`px-4 py-2 text-[10px] md:text-xs font-black tracking-widest uppercase rounded-full border transition-all duration-300 ${
                  isActive
                    ? "bg-[#BD924D] border-[#BD924D] text-white shadow-sm"
                    : "bg-white/80 border-gray-200 text-gray-500 hover:text-[#231F20] hover:border-gray-300"
                }`}
              >
                {service.tabLabel}
              </a>
            );
          })}
        </div>
      </div>

      {/* Services Sections */}
      <main className="flex-grow">
        {services.map((service, index) => {
          const isImageLeft = index % 2 === 0;
          return (
            <div key={service.id} className="relative">
              <section
                id={service.id}
                className="w-full max-w-6xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                  
                  {/* Image Container - Stacks on top in mobile */}
                  <div className={`lg:col-span-5 ${isImageLeft ? "lg:order-1" : "lg:order-2"} w-full`}>
                    <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-square w-full rounded-3xl overflow-hidden shadow-md border border-gray-200/60 bg-white">
                      <Image
                        src={service.image}
                        alt={service.tabLabel}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-103"
                        sizes="(max-width: 1024px) 100vw, 480px"
                      />
                    </div>
                  </div>

                  {/* Content block */}
                  <div className={`lg:col-span-7 flex flex-col ${isImageLeft ? "lg:order-2" : "lg:order-1"}`}>
                    
                    <span className="text-[9px] font-black text-brand-gold tracking-[0.2em] uppercase mb-2 block">
                      {String(index + 1).padStart(2, "0")} &mdash; OFFERING
                    </span>

                    <h2 className="text-3xl sm:text-4xl font-black text-[#231F20] tracking-tight mb-5 leading-none">
                      {service.headingPrefix}
                      <span className="text-brand-gold">{service.headingHighlight}</span>
                    </h2>

                    <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed mb-6 font-medium">
                      {service.description}
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-4 mb-6">
                      {service.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3.5">
                          <div className="flex-shrink-0 mt-0.5 w-5 h-5 bg-[#BD924D]/10 rounded-lg flex items-center justify-center">
                            <svg className="w-3.5 h-3.5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-xs sm:text-sm font-semibold leading-relaxed">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Target Audience / Muted Line */}
                    <p className="text-gray-400 text-[11px] sm:text-xs italic font-bold mb-6">
                      Who is this for: &ldquo;{service.whoIsThisFor}&rdquo;
                    </p>

                    {/* CTA Button */}
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <Link
                        href="/#get-in-touch"
                        className="bg-brand-gold hover:bg-[#a67e3f] text-white px-7 py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all shadow-sm hover:shadow-md"
                      >
                        Talk to an Advisor
                      </Link>
                    </div>

                    {/* Compliance Warning Footer */}
                    {service.compliance && (
                      <p className="text-gray-400 text-[10px] sm:text-[11px] font-bold leading-normal mt-5 border-t border-gray-200/50 pt-3.5">
                        * {service.compliance}
                      </p>
                    )}
                  </div>

                </div>
              </section>

              {/* Gold border separating sections, except for the last one */}
              {index < services.length - 1 && (
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <hr className="border-t border-brand-gold/15" />
                </div>
              )}

              {/* Decorative ArcRing */}
              {index % 3 === 0 && (
                <ArcRing
                  className={`absolute pointer-events-none ${
                    index % 2 === 0 ? "-left-40 top-1/4" : "-right-40 top-1/4"
                  }`}
                  opacity={0.03}
                  size="w-[480px] h-[480px]"
                  strokeWidth={1}
                />
              )}
            </div>
          );
        })}
      </main>

      {/* Dark Closing Band */}
      <section className="bg-[#1A1819] text-white py-16 md:py-24 px-4 relative overflow-hidden select-none">
        {/* Abstract subtle background ArcRing decorative lines */}
        <ArcRing className="-top-40 -left-40 text-brand-gold" opacity={0.04} size="w-[520px] h-[520px]" strokeWidth={1} />
        <ArcRing className="-bottom-40 -right-40 text-brand-gold" opacity={0.04} size="w-[520px] h-[520px]" strokeWidth={1} />

        <div className="w-full max-w-4xl mx-auto relative z-10 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] sm:text-xs font-black tracking-[0.25em] text-[#BD924D] uppercase mb-4 pl-1">
            Not sure where to start?
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white max-w-2xl leading-snug mb-8">
            Every client conversation begins with understanding &mdash; not selling. Let's talk about what's right for you.
          </h3>
          <Link
            href="/#get-in-touch"
            className="bg-brand-gold hover:bg-[#a67e3f] text-white px-8 py-3.5 rounded-full text-xs font-black tracking-widest uppercase transition-all shadow-md hover:shadow-lg"
          >
            Talk to an Advisor
          </Link>
        </div>
      </section>
    </div>
  );
}
