"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ArcRing from "@/components/ArcRing";
import {
  CALCULATOR_MODULES,
  formatIndianCurrency,
} from "@/lib/calculators";

export default function Calculator() {
  const [activeTab, setActiveTab] = useState("sip");

  const HOMEPAGE_CALCULATORS = useMemo(() => {
    const list = ["sip", "retirement", "lumpsum", "step-up-sip", "goal-sip"];
    return list.map(id => CALCULATOR_MODULES.find(m => m.id === id)).filter(Boolean) as typeof CALCULATOR_MODULES;
  }, []);

  // Get active module configuration
  const activeModule = useMemo(() => {
    return CALCULATOR_MODULES.find((m) => m.id === activeTab) || CALCULATOR_MODULES[0];
  }, [activeTab]);

  // Track inputs for each module independently
  const [inputVals, setInputVals] = useState<Record<string, Record<string, number>>>(() => {
    const initial: Record<string, Record<string, number>> = {};
    CALCULATOR_MODULES.forEach((m) => {
      initial[m.id] = {};
      m.inputs.forEach((inp) => {
        initial[m.id][inp.id] = inp.defaultValue;
      });
    });
    return initial;
  });

  // Handle slider changes
  const handleInputChange = (inputId: string, value: number) => {
    setInputVals((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [inputId]: value,
      },
    }));
  };

  // Perform live calculations
  const results = useMemo(() => {
    const vals = inputVals[activeTab] || {};
    return activeModule.calculate(vals);
  }, [activeTab, inputVals, activeModule]);

  // Dynamically highlight heading keywords
  const renderHeading = (headlineText: string) => {
    const parts = headlineText.split(" ");
    return (
      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#231F20] tracking-tight mb-12 text-center leading-tight">
        {parts.map((word, idx) => {
          // Highlight specific words based on the active tab
          const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
          const isHighlight =
            (activeTab === "sip" && cleanWord === "SIP") ||
            (activeTab === "lumpsum" && cleanWord === "Lumpsum") ||
            (activeTab === "step-up-sip" && cleanWord === "Step-up") ||
            (activeTab === "swp" && cleanWord === "SWP") ||
            (activeTab === "goal-sip" && cleanWord === "Goal") ||
            (activeTab === "retirement" && (cleanWord === "Retirement" || cleanWord === "golden" || cleanWord === "years"));

          if (isHighlight) {
            return (
              <span key={idx} className="text-brand-gold">
                {word}{" "}
              </span>
            );
          }
          return <span key={idx}>{word} </span>;
        })}
      </h3>
    );
  };

  // Calculations for SVG Donut sizing
  const donutSvg = useMemo(() => {
    if (results.chartType !== "donut" || !results.donutData) return null;
    const invested = results.donutData[0].value;
    const returns = results.donutData[1].value;
    const total = invested + returns;
    const returnsPercent = total > 0 ? Math.round((returns / total) * 100) : 0;

    const radius = 52;
    const strokeWidth = 14;
    const circumference = 2 * Math.PI * radius;
    // Donut stroke offsets
    const strokeDashoffset = circumference - (returnsPercent / 100) * circumference;

    return {
      circumference,
      strokeDashoffset,
      returnsPercent,
    };
  }, [results]);

  // Calculations for SVG SWP Line Chart points
  const swpLineSvg = useMemo(() => {
    if (results.chartType !== "line" || !results.lineData) return null;
    const maxVal = Math.max(...results.lineData.map((d) => d.value), 1);
    const width = 240;
    const height = 110;

    const points = results.lineData.map((d, idx) => {
      const x = (idx / (results.lineData!.length - 1)) * width;
      const y = height - (d.value / maxVal) * height;
      return `${x},${y}`;
    });

    return {
      width,
      height,
      pointsPath: `M ${points.join(" L ")}`,
      pointsArea: `M ${points.join(" L ")} L ${width},${height} L 0,${height} Z`,
    };
  }, [results]);

  return (
    <section
      id="calculators-section"
      className="relative bg-[#F5EFE6] py-10 md:py-12 overflow-hidden w-full select-none border-t border-gray-100/10"
    >
      {/* Background ArcRing elements */}
      <ArcRing
        className="-top-40 -left-40"
        opacity={0.12}
        size="w-[520px] h-[520px]"
        strokeWidth={1}
      />
      <ArcRing
        className="-bottom-40 -right-40"
        opacity={0.12}
        size="w-[520px] h-[520px]"
        strokeWidth={1}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative flex flex-col items-center">
        {/* Eyebrow */}
        <div className="text-[10px] sm:text-xs font-black tracking-[0.25em] text-[#BD924D] mb-5 uppercase">
          PLAN WITH PRECISION
        </div>

        {/* Dynamic Section Heading */}
        {renderHeading(activeModule.headline)}

        {/* Switcher Dropdown & View All link */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl mb-8 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 tracking-wider uppercase">Select Calculator:</span>
            <div className="relative">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-full px-6 py-2.5 pr-10 text-xs font-extrabold tracking-widest text-[#231F20] shadow-sm focus:outline-none focus:border-brand-gold cursor-pointer uppercase"
              >
                {HOMEPAGE_CALCULATORS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <Link
            href="/calculators"
            className="text-xs font-black tracking-widest text-[#BD924D] hover:text-[#a67e3f] transition-colors uppercase"
          >
            View all calculators &rarr;
          </Link>
        </div>

        {/* Cream Calculator card */}
        <div className="w-full max-w-6xl bg-gradient-to-br from-[#E6D9C8] via-[#FAF6EE] to-[#FCF9F2] rounded-3xl p-8 sm:p-10 shadow-[0_30px_70px_rgba(42,32,24,0.11)] border border-[#2A2018]/18 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* LEFT COLUMN: Input Sliders */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {activeModule.inputs.map((inp) => {
                const currentVal = inputVals[activeTab][inp.id] ?? inp.defaultValue;
                return (
                  <div key={inp.id} className="flex flex-col">
                    <div className="flex justify-between items-baseline mb-3">
                      <span className="text-xs font-black tracking-wider text-gray-600 uppercase">
                        {inp.label}
                      </span>
                      <span className="text-sm font-extrabold text-[#231F20] font-sans">
                        {inp.format(currentVal)}
                      </span>
                    </div>

                    {/* Gold Custom Slider */}
                    <div className="relative w-full flex items-center group">
                      <input
                        type="range"
                        min={inp.min}
                        max={inp.max}
                        step={inp.step}
                        value={currentVal}
                        onChange={(e) => handleInputChange(inp.id, Number(e.target.value))}
                        className="w-full h-1 bg-[#E3D3C3] rounded-lg appearance-none cursor-pointer accent-[#BD924D] outline-none"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT & MIDDLE ZONE: Deeper Warm Tone Focal Point */}
            <div className="lg:col-span-8 bg-[#FAF2E8]/60 rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center border border-[#EBDCCB]/40 shadow-sm w-full">
              
              {/* MIDDLE COLUMN: Visualization (SVG Chart) */}
              <div className="flex flex-col items-center justify-center w-full">
                
                {/* Donut Chart */}
                {results.chartType === "donut" && donutSvg && (
                  <div className="relative flex items-center justify-center w-36 h-36">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                      {/* Invested Background ring */}
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="#E3D3C3"
                        strokeWidth="11"
                      />
                      {/* Est. Returns Foreground ring */}
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="#BD924D"
                        strokeWidth="11"
                        strokeDasharray={donutSvg.circumference}
                        strokeDashoffset={donutSvg.strokeDashoffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* Inside Center content */}
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="text-[8px] font-black text-gray-400 tracking-widest uppercase">
                        RETURNS
                      </span>
                      <span className="text-lg font-black text-[#231F20] mt-0.5">
                        {donutSvg.returnsPercent}%
                      </span>
                    </div>
                  </div>
                )}

                {/* Depleting SWP / Retirement Line Chart */}
                {results.chartType === "line" && swpLineSvg && (
                  <div className="flex flex-col items-center w-full">
                    <span className="text-[9px] font-black text-gray-400 tracking-widest uppercase mb-3">
                      {activeTab === "retirement" ? "WEALTH TRAJECTORY" : "CORPUS DEPLETION"}
                    </span>
                    <div className="relative w-[240px] h-[110px]">
                      <svg className="w-full h-full" viewBox={`0 0 ${swpLineSvg.width} ${swpLineSvg.height}`}>
                        <defs>
                          <linearGradient id="line-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#BD924D" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#BD924D" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* Grid lines */}
                        <line x1="0" y1="0" x2={swpLineSvg.width} y2="0" stroke="#f0e9df" strokeWidth="0.8" />
                        <line x1="0" y1={swpLineSvg.height / 2} x2={swpLineSvg.width} y2={swpLineSvg.height / 2} stroke="#f0e9df" strokeWidth="0.8" />
                        <line x1="0" y1={swpLineSvg.height} x2={swpLineSvg.width} y2={swpLineSvg.height} stroke="#e5dec9" strokeWidth="1.2" />

                        {/* Shaded Area */}
                        <path d={swpLineSvg.pointsArea} fill="url(#line-grad)" />
                        {/* Depleting Line */}
                        <path
                          d={swpLineSvg.pointsPath}
                          fill="none"
                          stroke="#BD924D"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    {/* Axis labels */}
                    <div className="flex justify-between w-full text-[9px] font-black text-gray-400 tracking-wider mt-2.5">
                      <span>{activeTab === "retirement" ? `AGE ${inputVals.retirement?.currentAge ?? 35}` : "START"}</span>
                      <span>
                        {activeTab === "retirement"
                          ? `AGE ${Number(inputVals.retirement?.retirementAge ?? 60) + Number(inputVals.retirement?.yearsInRetirement ?? 25)}`
                          : `${results.durationText?.split(" ")[0]} YRS`}
                      </span>
                    </div>
                  </div>
                )}


                {/* Donut Legend */}
                {results.chartType === "donut" && results.donutData && (
                  <div className="flex gap-4 mt-6">
                    {results.donutData.map((d, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{d.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: Calculations & CTA */}
              <div className="flex flex-col justify-center text-left w-full">
                <span className="text-[10px] font-black text-gray-400 tracking-[0.18em] uppercase mb-1.5">
                  {results.customResultLabel || "PROJECTED VALUE"}
                </span>

                {/* Large Serif projected value value */}
                <div className="text-3xl sm:text-4xl font-extrabold text-[#231F20] tracking-tight font-serif mb-6 leading-none">
                  {formatIndianCurrency(results.projectedValue)}
                </div>

                {/* Metric Items details */}
                <div className="flex flex-col gap-2.5 mb-8 border-t border-[#EBDCCB]/25 pt-4">
                  {results.chartType === "donut" ? (
                    <>
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-400 uppercase tracking-wide">Invested</span>
                        <span className="text-[#231F20]">{formatIndianCurrency(results.invested)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-400 uppercase tracking-wide">Est. returns</span>
                        <span className="text-brand-gold font-bold">{formatIndianCurrency(results.returns)}</span>
                      </div>
                    </>
                  ) : (
                    results.extraMetrics?.map((m, idx) => (
                      <div key={idx} className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-400 uppercase tracking-wide">{m.label}</span>
                        <span className={`${m.label === "Time Lasted" || m.label.includes("SIP") ? "text-brand-gold font-bold" : "text-[#231F20]"}`}>
                          {m.value}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                {/* Dark Pill CTA Button */}
                <a
                  href="/#get-in-touch"
                  className="bg-[#231F20] hover:bg-[#3d3637] text-white text-center text-[10px] font-black tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 shadow-md uppercase inline-flex items-center justify-center gap-1.5"
                >
                  Contact Us &rarr;
                </a>

                {/* Compliance note */}
                <span className="text-[9px] text-gray-400 font-bold tracking-wider mt-3 leading-relaxed">
                  Illustrative only. Not a guarantee of returns.
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
