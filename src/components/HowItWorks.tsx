"use client";

import { useEffect, useRef, useState } from "react";
import ArcRing from "@/components/ArcRing";
import content from "@/content/homepage.json";

export default function HowItWorks() {
  const { eyebrow, headline, ctaText, ctaHref, steps } = content.howItWorks;
  const [activeStep, setActiveStep] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Animate line from left to right over 2s
          setLineProgress(100);

          // Activate nodes sequentially matching line progress
          timeouts.push(setTimeout(() => setActiveStep(1), 200));
          timeouts.push(setTimeout(() => setActiveStep(2), 650));
          timeouts.push(setTimeout(() => setActiveStep(3), 1100));
          timeouts.push(setTimeout(() => setActiveStep(4), 1550));
          timeouts.push(setTimeout(() => setActiveStep(5), 2000));

          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // Icon switcher to output customized inline SVGs based on step id
  const renderIcon = (id: number, isActive: boolean) => {
    const colorClass = isActive ? "text-white" : "text-brand-gold";
    switch (id) {
      case 1: // Handshake (We meet)
        return (
          <svg className={`w-8 h-8 ${colorClass} transition-colors duration-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.5-1.5 3-1.5 4.5 0s1.5 3 0 4.5l-4.5 4.5L7.5 15.5c-1.5-1.5-1.5-3 0-4.5s3-1.5 4.5 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 11l4.5 4.5M10.5 8.5L15 13M13.5 5.5l3 3" />
          </svg>
        );
      case 2: // Bar chart/growth (Risk Profiling)
        return (
          <svg className={`w-8 h-8 ${colorClass} transition-colors duration-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 21v-4m4 4v-7m4 4v-5m4 4v-9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4" />
          </svg>
        );
      case 3: // Target (Goal Planning)
        return (
          <svg className={`w-8 h-8 ${colorClass} transition-colors duration-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="2" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M2 12h2m16 0h2" />
          </svg>
        );
      case 4: // Devices (Invest Online)
        return (
          <svg className={`w-8 h-8 ${colorClass} transition-colors duration-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <rect x="2" y="4" width="14" height="10" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 14h16m-14 0v2h12v-2" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="16" y="7" width="5" height="9" rx="1" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="18.5" cy="13.5" r="0.5" fill="currentColor" />
          </svg>
        );
      case 5: // Pie chart (Goal Monitoring)
        return (
          <svg className={`w-8 h-8 ${colorClass} transition-colors duration-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative bg-[#FAF7F2] py-10 md:py-12 overflow-hidden w-full select-none border-t border-gray-100 shadow-[inset_0_10px_20px_rgba(35,31,32,0.015),inset_0_-10px_20px_rgba(35,31,32,0.015)]"
    >
      {/* Faint ArcRing decoration behind */}
      <ArcRing
        className="-top-40 -right-40"
        opacity={0.15}
        size="w-[520px] h-[520px]"
        strokeWidth={1}
      />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative flex flex-col items-center">
        {/* Dynamic centered headline with "Works" gold highlight */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#231F20] tracking-tight mb-16 sm:mb-20 text-center">
          How it <span className="text-brand-gold">Works</span>?
        </h2>

        {/* Timeline container */}
        <div className="relative w-full mb-16 sm:mb-20">
          
          {/* DESKTOP TIMELINE SYSTEM */}
          <div className="hidden lg:block">
            {/* Background inactive dotted line */}
            <div className="absolute left-[10%] right-[6%] top-[40px] h-[2px] border-t-2 border-dashed border-gray-300 z-0" />
            
            {/* Active drawing line */}
            <div
              className="absolute left-[10%] top-[39px] h-[3px] bg-brand-gold z-0 transition-all duration-300 ease-out origin-left"
              style={{ width: `${lineProgress * 0.84}%` }}
            />

            {/* Inactive arrowhead */}
            <div className="absolute left-[94%] top-[34px] text-gray-300 z-10">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </div>

            {/* Active arrowhead */}
            <div
              className="absolute left-[94%] top-[34px] text-brand-gold z-10 transition-opacity duration-300"
              style={{ opacity: lineProgress > 98 ? 1 : 0 }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </div>

            {/* Steps Horizontal Row */}
            <div className="flex justify-between items-start w-full relative z-10">
              {steps.map((step, idx) => {
                const isStepActive = activeStep >= step.id;
                return (
                  <div key={idx} className="flex flex-col items-center w-[18%] text-center group">
                    {/* Circle node wrapper */}
                    <div className="relative">
                      {/* Badge 1-5 */}
                      <div
                        className={`absolute -top-1.5 -right-1.5 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm transition-all duration-500 z-20 ${
                          isStepActive ? "bg-brand-gold text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {step.id}
                      </div>

                      {/* Circular icon element */}
                      <div
                        className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-sm ${
                          isStepActive
                            ? "bg-brand-gold border-brand-gold scale-105 shadow-brand-gold/20"
                            : "bg-white border-gray-200 hover:border-brand-gold/50"
                        }`}
                      >
                        {renderIcon(step.id, isStepActive)}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div
                      className="mt-6 transition-all duration-500 transform"
                      style={{
                        opacity: isStepActive ? 1 : 0.35,
                        transform: isStepActive ? "translateY(0)" : "translateY(8px)",
                      }}
                    >
                      <h4 className="text-[15px] font-extrabold text-[#231F20] tracking-tight mb-2">
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-[150px] mx-auto">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MOBILE TIMELINE SYSTEM (VERTICAL) */}
          <div className="block lg:hidden relative pl-16 pr-4">
            {/* Vertical inactive dotted line */}
            <div className="absolute left-[31px] top-[32px] bottom-[32px] w-[2px] border-l-2 border-dashed border-gray-300 z-0" />
            
            {/* Vertical active drawing line */}
            <div
              className="absolute left-[31px] top-[32px] w-[3px] bg-brand-gold z-0 transition-all duration-300 ease-out origin-top"
              style={{ height: `calc((100% - 64px) * ${lineProgress / 100})` }}
            />

            {/* Inactive arrowhead */}
            <div className="absolute left-[24px] bottom-0 text-gray-300 z-10 rotate-90">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </div>

            {/* Active arrowhead */}
            <div
              className="absolute left-[24px] bottom-0 text-brand-gold z-10 transition-opacity duration-300 rotate-90"
              style={{ opacity: lineProgress > 98 ? 1 : 0 }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </div>

            {/* Steps Vertical Stack */}
            <div className="flex flex-col gap-10">
              {steps.map((step, idx) => {
                const isStepActive = activeStep >= step.id;
                return (
                  <div key={idx} className="flex flex-row items-center gap-6 relative z-10">
                    
                    {/* Circle Node Container */}
                    <div className="relative flex-shrink-0">
                      {/* Badge 1-5 */}
                      <div
                        className={`absolute -top-1 -right-1 text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white shadow-sm transition-all duration-500 z-20 ${
                          isStepActive ? "bg-brand-gold text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {step.id}
                      </div>

                      {/* Circle element */}
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-500 shadow-sm ${
                          isStepActive
                            ? "bg-brand-gold border-brand-gold scale-105 shadow-brand-gold/20"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        {renderIcon(step.id, isStepActive)}
                      </div>
                    </div>

                    {/* Step text content on the right */}
                    <div
                      className="flex flex-col text-left transition-all duration-500 transform"
                      style={{
                        opacity: isStepActive ? 1 : 0.35,
                        transform: isStepActive ? "translateX(0)" : "translateX(8px)",
                      }}
                    >
                      <h4 className="text-sm font-extrabold text-[#231F20] tracking-tight mb-1">
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 font-semibold leading-tight">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* CONNECT US Centered CTA pill button */}
        <div className="z-10 relative mt-4">
          <a
            href={ctaHref}
            className="bg-brand-gold hover:bg-[#a67e3f] text-white text-center text-xs font-black tracking-widest px-10 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg uppercase inline-block"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
