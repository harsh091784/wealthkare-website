"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import ArcRing from "@/components/ArcRing";
import {
  CALCULATOR_MODULES,
  CATEGORIES_REGISTRY,
  formatIndianCurrency,
  CategoryData,
} from "@/lib/calculators";

interface Props {
  initialSlug: string | null;
  explainers: Record<string, string>;
}

export default function CalculatorsClient({ initialSlug, explainers }: Props) {
  // activeTab represents the active calculator ID (or null for landing state)
  const [activeTab, setActiveTab] = useState<string | null>(initialSlug);
  
  // Search query
  const [searchQuery, setSearchQuery] = useState("");
  
  // Amortization table collapsed/expanded state
  const [isAmortOpen, setIsAmortOpen] = useState(false);

  // Category filter for the workspace rail (which accordion is expanded)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(() => {
    if (initialSlug) {
      const found = CATEGORIES_REGISTRY.find((cat) =>
        cat.calculators.some((c) => c.id === initialSlug)
      );
      return found ? found.name : CATEGORIES_REGISTRY[0].name;
    }
    return CATEGORIES_REGISTRY[0].name;
  });

  // Reset amortization table state when activeTab changes
  useEffect(() => {
    setIsAmortOpen(false);
  }, [activeTab]);

  // Handle URL sync on tab change (smooth switch-in-place)
  const selectCalculator = (slug: string) => {
    setActiveTab(slug);
    window.history.pushState(null, "", `/calculators/${slug}`);
    
    // Auto expand the parent category in rail
    const parentCat = CATEGORIES_REGISTRY.find((cat) =>
      cat.calculators.some((c) => c.id === slug)
    );
    if (parentCat) {
      setExpandedCategory(parentCat.name);
    }
  };

  const selectLanding = () => {
    setActiveTab(null);
    window.history.pushState(null, "", "/calculators");
  };

  // Sync state on popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const parts = path.split("/").filter(Boolean);
      if (parts[0] === "calculators" && parts[1]) {
        setActiveTab(parts[1]);
        const parentCat = CATEGORIES_REGISTRY.find((cat) =>
          cat.calculators.some((c) => c.id === parts[1])
        );
        if (parentCat) {
          setExpandedCategory(parentCat.name);
        }
      } else {
        setActiveTab(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Track inputs for each module independently (allow numbers, strings, etc.)
  const [inputVals, setInputVals] = useState<Record<string, Record<string, any>>>(() => {
    const initial: Record<string, Record<string, any>> = {};
    CALCULATOR_MODULES.forEach((m) => {
      initial[m.id] = {};
      m.inputs.forEach((inp) => {
        initial[m.id][inp.id] = inp.defaultValue;
      });
    });
    return initial;
  });

  // Handle input changes (ranges, selects, dates)
  const handleInputChange = (inputId: string, value: any) => {
    if (!activeTab) return;
    setInputVals((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [inputId]: value,
      },
    }));
  };

  // Quiz and Net Worth States
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([3, 3, 3, 3, 3]);
  const [networthTab, setNetworthTab] = useState<"assets" | "liabilities">("assets");

  // Reset quiz/networth tab when tab changes
  useEffect(() => {
    setQuizStep(0);
    setQuizAnswers([3, 3, 3, 3, 3]);
    setNetworthTab("assets");
  }, [activeTab]);

  const quizQuestions = [
    {
      question: "What is your primary investment objective?",
      options: [
        { text: "Capital protection / safety", value: 1 },
        { text: "Moderate income with low risk", value: 2 },
        { text: "Balance of growth and safety", value: 3 },
        { text: "Long-term capital growth", value: 4 },
        { text: "Aggressive wealth generation", value: 5 }
      ]
    },
    {
      question: "What is your investment time horizon?",
      options: [
        { text: "Under 1 year", value: 1 },
        { text: "1 to 3 years", value: 2 },
        { text: "3 to 5 years", value: 3 },
        { text: "5 to 10 years", value: 4 },
        { text: "More than 10 years", value: 5 }
      ]
    },
    {
      question: "How would you react to a 20% drop in your portfolio?",
      options: [
        { text: "Sell all investments immediately", value: 1 },
        { text: "Move remaining funds to fixed deposits", value: 2 },
        { text: "Hold and wait for market recovery", value: 3 },
        { text: "Invest more to average buying cost", value: 4 },
        { text: "Leverage/borrow to buy more aggressively", value: 5 }
      ]
    },
    {
      question: "How stable is your current savings / monthly income?",
      options: [
        { text: "Highly unstable or retired", value: 1 },
        { text: "Stable but low surplus savings", value: 2 },
        { text: "Steady income with regular savings", value: 3 },
        { text: "High income with substantial surplus", value: 4 },
        { text: "Independent wealth / extreme surplus", value: 5 }
      ]
    },
    {
      question: "What is your knowledge level of financial markets?",
      options: [
        { text: "Minimal / Fixed income products only", value: 1 },
        { text: "Basic / Mutual funds and debt", value: 2 },
        { text: "Moderate / Trade stocks and funds", value: 3 },
        { text: "Active / Trade stocks and derivatives", value: 4 },
        { text: "Advanced / Professional derivative strategies", value: 5 }
      ]
    }
  ];

  const renderNetWorthSlider = (
    key: string,
    label: string,
    min: number,
    max: number,
    step: number,
    currentVal: any,
    inputId: string
  ) => {
    const val = currentVal[key] ?? 0;
    return (
      <div className="flex flex-col gap-1 text-left w-full">
        <div className="flex justify-between items-baseline">
          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">
            {label}
          </span>
          <span className="text-[11px] font-bold text-gray-700">
            {formatIndianCurrency(val)}
          </span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={val}
          onChange={(e) => {
            const newVal = { ...currentVal, [key]: Number(e.target.value) };
            handleInputChange(inputId, newVal);
          }}
          className="w-full h-1 bg-[#E3D3C3] rounded-lg appearance-none cursor-pointer accent-[#BD924D] outline-none"
        />
      </div>
    );
  };

  // Get active calculator module configuration
  const activeModule = useMemo(() => {
    if (!activeTab) return null;
    return CALCULATOR_MODULES.find((m) => m.id === activeTab) || null;
  }, [activeTab]);

  // Perform live calculations
  const results = useMemo(() => {
    if (!activeTab || !activeModule) return null;
    const vals = inputVals[activeTab] || {};
    return activeModule.calculate(vals);
  }, [activeTab, inputVals, activeModule]);

  // Calculations for SVG Donut sizing
  const donutSvg = useMemo(() => {
    if (!results || results.chartType !== "donut" || !results.donutData) return null;
    const invested = results.donutData[0].value;
    const returns = results.donutData[1].value;
    const total = invested + returns;
    const returnsPercent = total > 0 ? Math.round((returns / total) * 100) : 0;

    const radius = 52;
    const strokeWidth = 11;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (returnsPercent / 100) * circumference;

    return {
      circumference,
      strokeDashoffset,
      returnsPercent,
    };
  }, [results]);

  // Calculations for SVG SWP / Retirement / Inflation Line Chart points
  const lineSvg = useMemo(() => {
    if (!results || (results.chartType !== "line" && results.chartType !== "double-line") || !results.lineData) return null;
    const maxVal = Math.max(
      ...results.lineData.map((d) => d.value),
      ...results.lineData.map((d) => d.value2 || 0),
      1
    );
    const width = 240;
    const height = 110;

    const points = results.lineData.map((d, idx) => {
      const x = (idx / (results.lineData!.length - 1)) * width;
      const y = height - (d.value / maxVal) * height;
      return `${x},${y}`;
    });

    const points2 = results.chartType === "double-line" ? results.lineData.map((d, idx) => {
      const x = (idx / (results.lineData!.length - 1)) * width;
      const y = height - ((d.value2 || 0) / maxVal) * height;
      return `${x},${y}`;
    }) : [];

    return {
      width,
      height,
      pointsPath: `M ${points.join(" L ")}`,
      pointsArea: `M ${points.join(" L ")} L ${width},${height} L 0,${height} Z`,
      pointsPath2: points2.length ? `M ${points2.join(" L ")}` : null,
      pointsArea2: points2.length ? `M ${points2.join(" L ")} L ${width},${height} L 0,${height} Z` : null,
    };
  }, [results]);

  // Search filter lists of all calculators matching query
  const allCalculatorsList = useMemo(() => {
    const list: { id: string; name: string; category: string; isBuilt: boolean }[] = [];
    CATEGORIES_REGISTRY.forEach((cat) => {
      cat.calculators.forEach((calc) => {
        list.push({
          ...calc,
          category: cat.name,
        });
      });
    });
    return list;
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return allCalculatorsList.filter(
      (calc) =>
        calc.name.toLowerCase().includes(query) ||
        calc.category.toLowerCase().includes(query)
    );
  }, [searchQuery, allCalculatorsList]);

  // Category Icons SVG dictionary
  const renderCategoryIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case "investment":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case "goal":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
          </svg>
        );
      case "retirement":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        );
      case "fixed-income":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case "loan":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "insurance":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case "tax":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        );
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Decorative ArcRings */}
      <ArcRing className="-top-40 -left-40 pointer-events-none" opacity={0.05} size="w-[520px] h-[520px]" strokeWidth={1} />
      <ArcRing className="-bottom-40 -right-40 pointer-events-none" opacity={0.05} size="w-[520px] h-[520px]" strokeWidth={1} />

      {/* STATE 1: LANDING STATE */}
      {activeTab === null && (
        <main className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16 z-10 relative flex flex-col items-center">
          {/* Eyebrow */}
          <div className="text-[10px] sm:text-xs font-black tracking-[0.25em] text-[#BD924D] mb-5 uppercase text-center">
            FINANCIAL UTILITIES
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#231F20] tracking-tight mb-6 text-center leading-tight">
            Financial <span className="text-[#BD924D]">Calculators</span>
          </h1>

          {/* Tagline / Subtitle */}
          <p className="text-sm sm:text-base text-gray-500 font-semibold max-w-2xl text-center leading-relaxed mb-12">
            Calculate your returns, plan your retirement, estimate tax savings, and visualize your financial milestones with precision.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-xl relative mb-16">
            <div className="relative flex items-center bg-white border border-[#EBDCCB]/50 rounded-full py-4 px-6 shadow-sm hover:shadow-md transition-shadow">
              <svg className="w-5 h-5 text-gray-400 mr-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search calculators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-[#231F20] outline-none placeholder-gray-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {searchQuery.trim() && (
              <div className="absolute top-16 left-0 w-full bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden z-30 max-h-72 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((calc) => (
                    <button
                      key={calc.id}
                      onClick={() => {
                        setSearchQuery("");
                        if (calc.isBuilt) {
                          selectCalculator(calc.id);
                        } else {
                          setActiveTab(calc.id);
                          setExpandedCategory(calc.category);
                          window.history.pushState(null, "", `/calculators/${calc.id}`);
                        }
                      }}
                      className="w-full text-left px-6 py-3.5 border-b border-gray-50 hover:bg-amber-50/30 transition-colors flex justify-between items-center"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-800">{calc.name}</span>
                        <span className="text-[10px] text-gray-400 font-bold tracking-wide uppercase mt-0.5">{calc.category}</span>
                      </div>
                      {!calc.isBuilt ? (
                        <span className="text-[8px] font-black tracking-widest text-[#BD924D] bg-[#BD924D]/10 px-2 py-0.5 rounded-full uppercase">COMING SOON</span>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-[#BD924D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-6 py-8 text-center text-xs font-semibold text-gray-400">
                    No calculators match "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Grid of 8 Category Tiles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
            {CATEGORIES_REGISTRY.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setExpandedCategory(cat.name);
                  // Find first built calculator or default to first in list
                  const firstBuilt = cat.calculators.find((c) => c.isBuilt);
                  if (firstBuilt) {
                    selectCalculator(firstBuilt.id);
                  } else {
                    const target = cat.calculators[0].id;
                    setActiveTab(target);
                    window.history.pushState(null, "", `/calculators/${target}`);
                  }
                }}
                className="bg-white border border-[#EBDCCB]/30 hover:border-[#BD924D]/45 rounded-3xl p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-amber-50/50 flex items-center justify-center text-[#BD924D] mb-5 group-hover:scale-110 transition-transform">
                  {renderCategoryIcon(cat.iconName, "w-6 h-6")}
                </div>

                {/* Name */}
                <h3 className="text-xs font-black tracking-wider text-gray-800 uppercase mb-1.5">
                  {cat.name}
                </h3>

                {/* Count */}
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  {cat.count} Calculators
                </span>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* STATE 2: CALCULATOR WORKSPACE */}
      {activeTab !== null && (
        <main className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 z-10 relative flex flex-col">
          
          {/* Breadcrumb Trail */}
          <div className="flex items-center gap-1.5 text-[9px] font-black tracking-widest text-gray-400 mb-8 uppercase select-none">
            <button onClick={selectLanding} className="hover:text-[#BD924D] transition-colors">CALCULATORS</button>
            <span>/</span>
            <span className="text-gray-800">
              {allCalculatorsList.find((c) => c.id === activeTab)?.name || "WORKSPACE"}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* STICKY LEFT RAIL ACCORDION */}
            <aside className="lg:col-span-3 bg-[#FCFAF7] border border-[#EBDCCB]/30 rounded-3xl p-5 sticky top-24 max-h-[calc(100vh-140px)] overflow-y-auto w-full">
              <h2 className="text-xs font-black tracking-widest text-[#BD924D] uppercase mb-4 border-b border-gray-100 pb-2">
                Categories
              </h2>
              
              <div className="flex flex-col gap-2">
                {CATEGORIES_REGISTRY.map((cat, idx) => {
                  const isOpen = expandedCategory === cat.name;
                  return (
                    <div key={idx} className="flex flex-col border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                      {/* Accordion Header */}
                      <button
                        onClick={() => setExpandedCategory(isOpen ? null : cat.name)}
                        className="w-full flex items-center justify-between py-2 text-left text-xs font-black text-gray-700 hover:text-[#BD924D] uppercase transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[#BD924D]/75">{renderCategoryIcon(cat.iconName, "w-4 h-4")}</span>
                          <span className="tracking-wider">{cat.name}</span>
                        </div>
                        <svg
                          className={`w-3.5 h-3.5 transform transition-transform duration-250 ${isOpen ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Accordion Items */}
                      {isOpen && (
                        <div className="flex flex-col gap-1.5 pl-6 mt-1 pb-1 animate-fadeIn">
                          {cat.calculators.map((calc) => {
                            const isActive = activeTab === calc.id;
                            return (
                              <button
                                key={calc.id}
                                onClick={() => {
                                  if (calc.isBuilt) {
                                    selectCalculator(calc.id);
                                  } else {
                                    setActiveTab(calc.id);
                                    window.history.pushState(null, "", `/calculators/${calc.id}`);
                                  }
                                }}
                                className={`w-full text-left py-1.5 text-[10px] font-bold tracking-wide uppercase transition-all flex justify-between items-center ${
                                  isActive
                                    ? "text-[#BD924D] border-l-2 border-[#BD924D] pl-2 font-black"
                                    : "text-gray-400 hover:text-gray-600 pl-0"
                                }`}
                              >
                                <span>{calc.name.replace(" Calculator", "")}</span>
                                {!calc.isBuilt && (
                                  <span className="text-[7px] font-black text-amber-600/70 bg-amber-50 px-1 rounded-sm uppercase tracking-widest">SOON</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Back to Directories Button */}
              <button
                onClick={selectLanding}
                className="w-full mt-6 py-3 border border-[#BD924D]/40 hover:bg-[#BD924D]/5 text-center text-[10px] font-black tracking-widest text-[#BD924D] rounded-full transition-all uppercase"
              >
                &larr; All Calculators
              </button>
            </aside>

            {/* CENTER WORKSPACE */}
            <div className="lg:col-span-9 flex flex-col gap-8 w-full">
              
              {/* UNBUILT CALCULATOR STATE (Coming Soon) */}
              {!activeModule && (
                <div className="w-full bg-[#FCFAF7] border border-[#EBDCCB]/30 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-[#BD924D] mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-800 tracking-tight mb-3">
                    {allCalculatorsList.find((c) => c.id === activeTab)?.name || "Calculator"}
                  </h3>
                  <div className="w-16 h-0.5 bg-[#BD924D] mb-5" />
                  <p className="text-xs font-black tracking-widest text-[#BD924D] mb-4 uppercase">
                    Coming Soon
                  </p>
                  <p className="text-sm text-gray-500 font-semibold max-w-md leading-relaxed mb-8">
                    We are currently building this calculator. In the meantime, speak directly to our experienced wealth managers to get customized projections for this portfolio.
                  </p>
                  <a
                    href="/#get-in-touch"
                    className="bg-[#231F20] hover:bg-[#3d3637] text-white text-[10px] font-black tracking-widest px-8 py-3.5 rounded-full transition-all uppercase shadow-md inline-flex items-center justify-center gap-1.5"
                  >
                    Contact Us &rarr;
                  </a>
                </div>
              )}

              {/* BUILT CALCULATOR STATE */}
              {activeModule && results && (
                <div className="flex flex-col gap-8 w-full">
                  {/* Premium Calculator Card */}
                  <div className="w-full bg-gradient-to-br from-[#E6D9C8] via-[#FAF6EE] to-[#FCF9F2] rounded-3xl p-8 sm:p-10 shadow-[0_30px_70px_rgba(42,32,24,0.11)] border border-[#2A2018]/18 relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                      
                      {/* Left Column: Sliders / Dropdowns / Date Pickers */}
                      <div className="lg:col-span-4 flex flex-col gap-8">
                        {activeModule.inputs.map((inp) => {
                          const currentVal = inputVals[activeTab][inp.id] ?? inp.defaultValue;
                          return (
                            <div key={inp.id} className="flex flex-col">
                              <div className="flex justify-between items-baseline mb-3">
                                <span className="text-[10px] font-black tracking-wider text-gray-500 uppercase">
                                  {inp.label}
                                </span>
                                <span className="text-sm font-extrabold text-[#231F20] font-sans">
                                  {inp.type === "date" ? String(currentVal) : inp.format(currentVal)}
                                </span>
                              </div>

                              {/* Input render conditional */}
                              {inp.type === "select" ? (
                                <select
                                  value={currentVal}
                                  onChange={(e) => handleInputChange(inp.id, Number(e.target.value))}
                                  className="w-full bg-[#FCFAF7]/90 border border-[#EBDCCB] rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-700 outline-none focus:border-[#BD924D] transition-colors cursor-pointer"
                                >
                                  {inp.options?.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                      {opt.label}
                                    </option>
                                  ))}
                                </select>
                              ) : inp.type === "date" ? (
                                <input
                                  type="date"
                                  value={currentVal}
                                  onChange={(e) => handleInputChange(inp.id, e.target.value)}
                                  className="w-full bg-[#FCFAF7]/90 border border-[#EBDCCB] rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-700 outline-none focus:border-[#BD924D] transition-colors cursor-pointer"
                                />
                              ) : inp.type === "cashflows" ? (
                                <div className="flex flex-col gap-3 w-full">
                                  <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                                    {((currentVal || []) as { date: string; amount: number }[]).map((cf, idx) => (
                                      <div key={idx} className="flex gap-2 items-center bg-[#FCFAF7]/90 p-2 rounded-xl border border-[#EBDCCB]">
                                        <input
                                          type="date"
                                          value={cf.date}
                                          onChange={(e) => {
                                            const newFlows = [...currentVal];
                                            newFlows[idx] = { ...cf, date: e.target.value };
                                            handleInputChange(inp.id, newFlows);
                                          }}
                                          className="w-[45%] bg-transparent text-[10px] font-bold text-gray-700 outline-none px-1"
                                        />
                                        <input
                                          type="number"
                                          value={cf.amount}
                                          onChange={(e) => {
                                            const newFlows = [...currentVal];
                                            newFlows[idx] = { ...cf, amount: Number(e.target.value) };
                                            handleInputChange(inp.id, newFlows);
                                          }}
                                          className="w-[40%] bg-transparent text-[10px] font-bold text-gray-700 outline-none px-1"
                                          placeholder="Amount"
                                        />
                                        <button
                                          onClick={() => {
                                            const newFlows = currentVal.filter((_: any, i: number) => i !== idx);
                                            handleInputChange(inp.id, newFlows);
                                          }}
                                          className="text-red-500 hover:text-red-700 transition-colors p-1"
                                          title="Delete transaction"
                                        >
                                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                          </svg>
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                  <button
                                    onClick={() => {
                                      const lastDate = currentVal.length > 0 ? currentVal[currentVal.length - 1].date : "2026-06-24";
                                      const dateObj = new Date(lastDate);
                                      dateObj.setFullYear(dateObj.getFullYear() + 1);
                                      const newDateStr = dateObj.toISOString().split('T')[0];
                                      const newFlows = [...currentVal, { date: newDateStr, amount: 10000 }];
                                      handleInputChange(inp.id, newFlows);
                                    }}
                                    className="w-full py-2 bg-[#BD924D]/10 hover:bg-[#BD924D]/15 text-[#BD924D] text-[10px] font-black tracking-widest rounded-xl transition-all uppercase"
                                  >
                                    + Add Cash Flow
                                  </button>
                                </div>
                              ) : inp.type === "quiz" ? (
                                <div className="flex flex-col gap-4 w-full">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-black tracking-wider text-[#BD924D] uppercase">
                                      Question {quizStep + 1} of 5
                                    </span>
                                    <div className="flex gap-1">
                                      {[0, 1, 2, 3, 4].map((step) => (
                                        <div
                                          key={step}
                                          className={`w-3.5 h-1.5 rounded-full transition-all ${
                                            step === quizStep ? "bg-[#BD924D] w-5" : step < quizStep ? "bg-amber-800/30" : "bg-gray-200"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div className="bg-[#FCFAF7]/90 border border-[#EBDCCB] rounded-2xl p-3 min-h-[140px] flex flex-col justify-center text-left">
                                    <p className="text-[11px] font-bold text-gray-800 mb-2 leading-snug">
                                      {quizQuestions[quizStep].question}
                                    </p>
                                    <div className="flex flex-col gap-1.5">
                                      {quizQuestions[quizStep].options.map((opt) => {
                                        const isSelected = quizAnswers[quizStep] === opt.value;
                                        return (
                                          <button
                                            key={opt.value}
                                            onClick={() => {
                                              const newAnswers = [...quizAnswers];
                                              newAnswers[quizStep] = opt.value;
                                              setQuizAnswers(newAnswers);
                                              
                                              const total = newAnswers.reduce((a, b) => a + b, 0);
                                              handleInputChange(inp.id, total);
                                              
                                              if (quizStep < 4) {
                                                setTimeout(() => setQuizStep(prev => prev + 1), 250);
                                              }
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-xl border text-[9px] font-bold transition-all flex items-center justify-between leading-normal ${
                                              isSelected
                                                ? "bg-[#BD924D] border-[#BD924D] text-white shadow-sm"
                                                : "bg-white border-[#EBDCCB] text-gray-600 hover:bg-amber-50/20"
                                            }`}
                                          >
                                            <span>{opt.text}</span>
                                            {isSelected && (
                                              <svg className="w-3 h-3 flex-shrink-0 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                              </svg>
                                            )}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    <button
                                      disabled={quizStep === 0}
                                      onClick={() => setQuizStep(prev => prev - 1)}
                                      className="w-1/2 py-2 bg-white border border-[#EBDCCB] disabled:opacity-40 disabled:pointer-events-none hover:bg-amber-50/20 text-gray-500 text-[9px] font-black tracking-widest rounded-xl transition-all uppercase"
                                    >
                                      Previous
                                    </button>
                                    {quizStep < 4 ? (
                                      <button
                                        onClick={() => setQuizStep(prev => prev + 1)}
                                        className="w-1/2 py-2 bg-[#BD924D]/10 hover:bg-[#BD924D]/15 text-[#BD924D] text-[9px] font-black tracking-widest rounded-xl transition-all uppercase"
                                      >
                                        Next &rarr;
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          setQuizStep(0);
                                          setQuizAnswers([3, 3, 3, 3, 3]);
                                          handleInputChange(inp.id, 15);
                                        }}
                                        className="w-1/2 py-2 bg-amber-800/10 hover:bg-amber-800/15 text-amber-800 text-[9px] font-black tracking-widest rounded-xl transition-all uppercase"
                                      >
                                        Restart
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ) : inp.type === "networth-inputs" ? (
                                <div className="flex flex-col gap-4 w-full">
                                  <div className="flex bg-[#FCFAF7]/90 border border-[#EBDCCB] rounded-xl p-0.5">
                                    <button
                                      onClick={() => setNetworthTab("assets")}
                                      className={`w-1/2 py-1 text-[9px] font-black tracking-widest uppercase rounded-lg transition-all ${
                                        networthTab === "assets" ? "bg-[#BD924D] text-white" : "text-gray-400 hover:text-gray-600"
                                      }`}
                                    >
                                      Assets
                                    </button>
                                    <button
                                      onClick={() => setNetworthTab("liabilities")}
                                      className={`w-1/2 py-1 text-[9px] font-black tracking-widest uppercase rounded-lg transition-all ${
                                        networthTab === "liabilities" ? "bg-[#BD924D] text-white" : "text-gray-400 hover:text-gray-600"
                                      }`}
                                    >
                                      Liabilities
                                    </button>
                                  </div>

                                  <div className="flex flex-col gap-3.5 max-h-[260px] overflow-y-auto pr-1">
                                    {networthTab === "assets" ? (
                                      <>
                                        {renderNetWorthSlider("assetCash", "Cash / Bank balance", 0, 10000000, 10000, currentVal, inp.id)}
                                        {renderNetWorthSlider("assetMF", "Mutual Funds & Stocks", 0, 50000000, 50000, currentVal, inp.id)}
                                        {renderNetWorthSlider("assetRealEstate", "Real Estate / Land", 0, 100000000, 100000, currentVal, inp.id)}
                                        {renderNetWorthSlider("assetGold", "Physical Gold", 0, 10000000, 10000, currentVal, inp.id)}
                                        {renderNetWorthSlider("assetPF", "PF / PPF / Pension", 0, 20000000, 25000, currentVal, inp.id)}
                                        {renderNetWorthSlider("assetOther", "Other Assets", 0, 10000000, 10000, currentVal, inp.id)}
                                      </>
                                    ) : (
                                      <>
                                        {renderNetWorthSlider("liabHome", "Home Loan Outstanding", 0, 50000000, 50000, currentVal, inp.id)}
                                        {renderNetWorthSlider("liabCar", "Car / Vehicle Loan", 0, 5000000, 10000, currentVal, inp.id)}
                                        {renderNetWorthSlider("liabPersonal", "Personal & Student Loans", 0, 5000000, 10000, currentVal, inp.id)}
                                        {renderNetWorthSlider("liabCredit", "Credit Card Debt", 0, 1000000, 5000, currentVal, inp.id)}
                                        {renderNetWorthSlider("liabOther", "Other Liabilities", 0, 5000000, 10000, currentVal, inp.id)}
                                      </>
                                    )}
                                  </div>
                                </div>
                              ) : (
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
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Right & Middle Zone: Deeper Warm Focal Box */}
                      <div className="lg:col-span-8 bg-[#FAF2E8]/60 rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center border border-[#EBDCCB]/40 shadow-sm w-full">
                        
                        {/* Middle: Chart */}
                        <div className="flex flex-col items-center justify-center w-full">
                          
                          {/* Donut Chart */}
                          {results.chartType === "donut" && donutSvg && (
                            <div className="relative flex items-center justify-center w-36 h-36">
                              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="52" fill="none" stroke="#E3D3C3" strokeWidth="11" />
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
                              <div className="absolute flex flex-col items-center justify-center text-center">
                                <span className="text-[8px] font-black text-gray-400 tracking-widest uppercase">RETURNS</span>
                                <span className="text-lg font-black text-[#231F20] mt-0.5">{donutSvg.returnsPercent}%</span>
                              </div>
                            </div>
                          )}

                          {/* Line / Double Line Chart */}
                          {(results.chartType === "line" || results.chartType === "double-line") && lineSvg && (
                            <div className="flex flex-col items-center w-full">
                              <span className="text-[9px] font-black text-gray-400 tracking-widest uppercase mb-3">
                                {activeTab === "retirement" ? "WEALTH TRAJECTORY" : activeTab === "swp" ? "CORPUS DEPLETION" : "VALUE OVER TIME"}
                              </span>
                              <div className="relative w-[240px] h-[110px]">
                                <svg className="w-full h-full" viewBox={`0 0 ${lineSvg.width} ${lineSvg.height}`}>
                                  <defs>
                                    <linearGradient id="workspace-grad" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#BD924D" stopOpacity="0.25" />
                                      <stop offset="100%" stopColor="#BD924D" stopOpacity="0" />
                                    </linearGradient>
                                    <linearGradient id="workspace-grad-red" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#C92A2A" stopOpacity="0.25" />
                                      <stop offset="100%" stopColor="#C92A2A" stopOpacity="0" />
                                    </linearGradient>
                                  </defs>
                                  <line x1="0" y1="0" x2={lineSvg.width} y2="0" stroke="#f0e9df" strokeWidth="0.8" />
                                  <line x1="0" y1={lineSvg.height / 2} x2={lineSvg.width} y2={lineSvg.height / 2} stroke="#f0e9df" strokeWidth="0.8" />
                                  <line x1="0" y1={lineSvg.height} x2={lineSvg.width} y2={lineSvg.height} stroke="#e5dec9" strokeWidth="1.2" />
                                  
                                  {results.chartType === "line" ? (
                                    <>
                                      <path d={lineSvg.pointsArea} fill="url(#workspace-grad)" />
                                      <path d={lineSvg.pointsPath} fill="none" stroke="#BD924D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </>
                                  ) : (
                                    <>
                                      {/* Inflation Erosion Path (decaying) */}
                                      <path d={lineSvg.pointsArea} fill="url(#workspace-grad-red)" />
                                      <path d={lineSvg.pointsPath} fill="none" stroke="#C92A2A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                      
                                      {/* Investment Growth Path (compounding) */}
                                      {lineSvg.pointsArea2 && <path d={lineSvg.pointsArea2} fill="url(#workspace-grad)" />}
                                      {lineSvg.pointsPath2 && <path d={lineSvg.pointsPath2} fill="none" stroke="#BD924D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
                                    </>
                                  )}
                                </svg>
                              </div>
                              <div className="flex justify-between w-full text-[9px] font-black text-gray-400 tracking-wider mt-2.5">
                                <span>{activeTab === "retirement" ? `AGE ${inputVals.retirement?.currentAge ?? 35}` : "START"}</span>
                                <span>
                                  {activeTab === "retirement"
                                    ? `AGE ${Number(inputVals.retirement?.retirementAge ?? 60) + Number(inputVals.retirement?.yearsInRetirement ?? 25)}`
                                    : results.durationText || "END"}
                                </span>
                              </div>

                              {/* Legend for Double Line Chart */}
                              {results.chartType === "double-line" && (
                                <div className="flex gap-4 mt-4">
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-sm bg-[#C92A2A]" />
                                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                                      {activeTab === "stp" ? "Source Fund (Debt)" : "Eroded Value"}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-sm bg-[#BD924D]" />
                                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                                      {activeTab === "stp" ? "Target Fund (Equity)" : "If Invested"}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Stacked Bar Chart for Home Loan / Net Worth */}
                          {results.chartType === "stacked-bar" && (
                            <div className="flex flex-col w-full px-2">
                              {activeTab === "net-worth" ? (
                                <div className="flex flex-col w-full px-2 gap-4">
                                  <span className="text-[9px] font-black text-gray-400 tracking-widest uppercase text-center">
                                    ASSETS VS LIABILITIES
                                  </span>
                                  {(() => {
                                    const assets = results.invested;
                                    const liabilities = results.returns;
                                    const maxVal = Math.max(assets, liabilities, 1);
                                    const assetWidth = (assets / maxVal) * 100;
                                    const liabWidth = (liabilities / maxVal) * 100;

                                    return (
                                      <div className="w-full flex flex-col gap-4">
                                        {/* Assets Bar */}
                                        <div className="flex flex-col gap-1">
                                          <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                                            <span>Total Assets</span>
                                            <span className="text-emerald-600 font-extrabold">{formatIndianCurrency(assets)}</span>
                                          </div>
                                          <div className="w-full h-4 bg-gray-200/50 rounded-md overflow-hidden">
                                            <div
                                              className="h-full bg-emerald-600 rounded-md transition-all duration-500"
                                              style={{ width: `${assetWidth}%` }}
                                            />
                                          </div>
                                        </div>

                                        {/* Liabilities Bar */}
                                        <div className="flex flex-col gap-1">
                                          <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                                            <span>Total Liabilities</span>
                                            <span className="text-red-600 font-extrabold">{formatIndianCurrency(liabilities)}</span>
                                          </div>
                                          <div className="w-full h-4 bg-gray-200/50 rounded-md overflow-hidden">
                                            <div
                                              className="h-full bg-red-600 rounded-md transition-all duration-500"
                                              style={{ width: `${liabWidth}%` }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })()}
                                </div>
                              ) : (
                                <>
                                  <span className="text-[9px] font-black text-gray-400 tracking-widest uppercase mb-3 text-center">
                                    LOAN BREAKDOWN (PRINCIPAL VS INTEREST)
                                  </span>
                                  {(() => {
                                    const principal = results.invested;
                                    const interest = results.returns;
                                    const total = principal + interest;
                                    const principalPercent = total > 0 ? (principal / total) * 100 : 50;
                                    const interestPercent = 100 - principalPercent;

                                    return (
                                      <div className="w-full flex flex-col gap-3">
                                        <div className="w-full h-7 rounded-lg overflow-hidden flex shadow-sm border border-[#EBDCCB]/30">
                                          <div
                                            className="h-full bg-[#E3D3C3] flex items-center justify-center text-[10px] font-black text-gray-700 transition-all"
                                            style={{ width: `${principalPercent}%` }}
                                            title={`Principal: ${formatIndianCurrency(principal)}`}
                                          >
                                            {principalPercent > 15 && `${Math.round(principalPercent)}%`}
                                          </div>
                                          <div
                                            className="h-full bg-[#BD924D] flex items-center justify-center text-[10px] font-black text-white transition-all"
                                            style={{ width: `${interestPercent}%` }}
                                            title={`Interest: ${formatIndianCurrency(interest)}`}
                                          >
                                            {interestPercent > 15 && `${Math.round(interestPercent)}%`}
                                          </div>
                                        </div>
                                        <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase tracking-wider px-1">
                                          <div className="flex items-center gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-sm bg-[#E3D3C3]" />
                                            <span>Principal: {formatIndianCurrency(principal)}</span>
                                          </div>
                                          <div className="flex items-center gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-sm bg-[#BD924D]" />
                                            <span>Interest: {formatIndianCurrency(interest)}</span>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })()}
                                </>
                              )}
                            </div>
                          )}

                          {/* Comparison Bar Chart for Income Tax / ULIP / Cost of Delay */}
                          {results.chartType === "compare-bar" && (
                            <div className="flex flex-col w-full items-center">
                              <span className="text-[9px] font-black text-gray-400 tracking-widest uppercase mb-4 text-center">
                                {activeTab === "cost-of-delay" ? "DELAY COMPARISON" : activeTab === "ulip-calc" ? "ALTERNATIVES VALUE" : "TAX REGIME COMPARISON"}
                              </span>
                              {(() => {
                                const val1 = results.invested; // Old regime / MF / Today
                                const val2 = results.returns; // New regime / ULIP / Delayed
                                const maxVal = Math.max(val1, val2, 10000);

                                const val1Percent = (val1 / maxVal) * 100;
                                const val2Percent = (val2 / maxVal) * 100;

                                // For tax, lower is cheaper (saves). For returns/corpus, higher is cheaper (saves/earns).
                                const isTax = ["income-tax", "capital-gains", "hra-calc", "tax-regime-guide"].includes(activeTab);
                                const val1Cheaper = isTax ? (val1 < val2) : (val1 > val2);
                                const val2Cheaper = isTax ? (val2 < val1) : (val2 > val1);

                                const label1 = isTax ? "OLD" : activeTab === "cost-of-delay" ? "TODAY" : "TERM+MF";
                                const label2 = isTax ? "NEW" : activeTab === "cost-of-delay" ? "DELAYED" : "ULIP";

                                return (
                                  <div className="w-full flex gap-8 justify-center items-end h-32 px-4 relative border-b border-[#EBDCCB]/30 pb-1">
                                    <div className="flex flex-col items-center w-18">
                                      <span className="text-[9px] font-bold text-gray-400 mb-1">{formatIndianCurrency(val1)}</span>
                                      <div
                                        className={`w-10 rounded-t-md transition-all duration-500 shadow-sm ${
                                          val1Cheaper ? "bg-emerald-600 border border-emerald-500/30" : "bg-[#E3D3C3] border border-gray-300/30"
                                        }`}
                                        style={{ height: `${Math.max(10, val1Percent * 0.8)}px` }}
                                      />
                                      <span className="text-[9px] font-black text-gray-700 tracking-wider mt-2 text-center leading-none">
                                        {label1}
                                        {val1Cheaper && <span className="block text-[7px] text-emerald-600 font-extrabold uppercase mt-0.5">{isTax ? "SAVES" : "MORE"}</span>}
                                      </span>
                                    </div>

                                    <div className="flex flex-col items-center w-18">
                                      <span className="text-[9px] font-bold text-gray-400 mb-1">{formatIndianCurrency(val2)}</span>
                                      <div
                                        className={`w-10 rounded-t-md transition-all duration-500 shadow-sm ${
                                          val2Cheaper ? "bg-emerald-600 border border-emerald-500/30" : "bg-[#E3D3C3] border border-gray-300/30"
                                        }`}
                                        style={{ height: `${Math.max(10, val2Percent * 0.8)}px` }}
                                      />
                                      <span className="text-[9px] font-black text-gray-700 tracking-wider mt-2 text-center leading-none">
                                        {label2}
                                        {val2Cheaper && <span className="block text-[7px] text-emerald-600 font-extrabold uppercase mt-0.5">{isTax ? "SAVES" : "MORE"}</span>}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          )}

                          {/* Progress Bar for Emergency Fund */}
                          {results.chartType === "progress-bar" && (
                            <div className="w-full flex flex-col px-2">
                              <span className="text-[9px] font-black text-gray-400 tracking-widest uppercase mb-3 text-center">
                                SAVINGS PROGRESS
                              </span>
                              {(() => {
                                const target = results.projectedValue;
                                const existing = results.invested;
                                const percent = target > 0 ? Math.round((existing / target) * 100) : 0;
                                const displayPercent = Math.min(100, percent);

                                return (
                                  <div className="w-full flex flex-col gap-3">
                                    <div className="w-full h-3 bg-[#E3D3C3]/40 rounded-full overflow-hidden border border-[#EBDCCB]/30 relative">
                                      <div
                                        className="h-full bg-[#BD924D] rounded-full transition-all duration-500"
                                        style={{ width: `${displayPercent}%` }}
                                      />
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-wider px-0.5">
                                      <span>Existing: {formatIndianCurrency(existing)}</span>
                                      <span className="text-[#BD924D]">{percent}% Saved</span>
                                      <span>Target: {formatIndianCurrency(target)}</span>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          )}

                          {/* Plain text / No Chart state */}
                          {results.chartType === "none" && (
                            <div className="flex flex-col items-center justify-center p-6 text-center bg-white/20 border border-[#EBDCCB]/25 rounded-2xl w-full">
                              <svg className="w-10 h-10 text-[#BD924D] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                {results.customResultLabel || "DIRECT RESULT"}
                              </span>
                              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-1.5">
                                Clean metrics dashboard
                              </span>
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

                        {/* Right: Numbers and CTA */}
                        <div className="flex flex-col justify-center text-left w-full">
                          <span className="text-[9px] font-black text-gray-400 tracking-[0.18em] uppercase mb-1.5">
                            {results.customResultLabel || "PROJECTED VALUE"}
                          </span>
                          
                          <div className="text-2xl sm:text-3xl font-extrabold text-[#231F20] tracking-tight font-serif mb-6 leading-none">
                            {formatIndianCurrency(results.projectedValue)}
                          </div>

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
                                  <span className={`${m.label === "Time Lasted" || m.label.includes("SIP") || m.label.includes("Regime") || m.label.includes("Cheaper") || m.label.includes("Recommended") ? "text-[#BD924D] font-bold" : "text-[#231F20]"}`}>
                                    {m.value}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>

                          <a
                            href="/#get-in-touch"
                            className="bg-[#231F20] hover:bg-[#3d3637] text-white text-center text-[10px] font-black tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 shadow-md uppercase inline-flex items-center justify-center gap-1.5"
                          >
                            Contact Us &rarr;
                          </a>

                          <span className="text-[9px] text-gray-400 font-bold tracking-wider mt-3 leading-relaxed">
                            Illustrative only. Not a guarantee of returns.
                          </span>

                          {results.chartType === "none" && (
                            <span className="text-[10px] text-[#BD924D] font-bold tracking-wide mt-3 flex items-center gap-1.5">
                              ℹ️ This calculator shows a direct result — no chart required.
                            </span>
                          )}

                          {/* Dynamically render relevant disclaimers */}
                          {(() => {
                            let disclaimerText = "";
                            if (["post-office", "ssy", "scss", "ppf"].includes(activeTab)) {
                              disclaimerText = "Interest rates are set by GoI and revised periodically. Current rates used for illustration.";
                            } else if (["income-tax", "capital-gains", "hra-calc", "tax-regime-guide"].includes(activeTab)) {
                              disclaimerText = "Based on FY2025-26 tax rates. Tax laws change. Consult a tax consultant.";
                            } else if (["hlv-calc", "term-life", "health-ins", "income-protection"].includes(activeTab)) {
                              disclaimerText = "Cover amounts are illustrative guidelines. Consult a specialist for your specific needs.";
                            } else if (activeTab === "ulip-calc") {
                              disclaimerText = "ULIP charges and returns vary significantly by product and insurer.";
                            } else if (activeTab === "rolling-returns") {
                              disclaimerText = "Uses sample illustrative data. Past performance is not indicative of future results.";
                            }

                            if (!disclaimerText) return null;
                            return (
                              <span className="text-[8px] text-gray-400 font-semibold tracking-wide mt-2.5 leading-relaxed block border-t border-[#EBDCCB]/15 pt-2">
                                {disclaimerText}
                              </span>
                            );
                          })()}
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Amortization Schedule (Home Loan EMI only) */}
                  {activeTab === "home-loan" && results.extraData?.amortTable && (
                    <div className="w-full bg-[#FCFAF7] border border-[#EBDCCB]/30 rounded-3xl p-6 sm:p-8 shadow-sm">
                      <div className="flex flex-col w-full">
                        <button
                          onClick={() => setIsAmortOpen(!isAmortOpen)}
                          className="flex justify-between items-center w-full text-left focus:outline-none"
                        >
                          <h3 className="text-xs font-black text-gray-800 tracking-widest uppercase">
                            Amortization Schedule (Year-by-Year Breakdown)
                          </h3>
                          <span className="text-xs font-black text-[#BD924D] hover:underline uppercase tracking-wider">
                            {isAmortOpen ? "Hide Schedule ↑" : "Show Schedule ↓"}
                          </span>
                        </button>

                        {isAmortOpen && (
                          <div className="mt-6 overflow-x-auto w-full max-h-96 overflow-y-auto border border-gray-100 rounded-2xl">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="bg-[#FAF2E8]/60 border-b border-gray-100">
                                  <th className="p-3.5 font-black text-gray-700 uppercase tracking-wider text-center">Year</th>
                                  <th className="p-3.5 font-black text-gray-700 uppercase tracking-wider">Principal Paid</th>
                                  <th className="p-3.5 font-black text-gray-700 uppercase tracking-wider">Interest Paid</th>
                                  <th className="p-3.5 font-black text-gray-700 uppercase tracking-wider">Outstanding Balance</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(results.extraData.amortTable as { year: number; interest: number; principal: number; balance: number }[]).map((row) => (
                                  <tr key={row.year} className="border-b border-gray-50 hover:bg-amber-50/10 font-medium text-gray-600">
                                    <td className="p-3.5 text-center font-bold text-gray-700">{row.year}</td>
                                    <td className="p-3.5">{formatIndianCurrency(row.principal)}</td>
                                    <td className="p-3.5 text-[#BD924D]">{formatIndianCurrency(row.interest)}</td>
                                    <td className="p-3.5 font-semibold text-gray-800">{formatIndianCurrency(row.balance)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Explainer Section */}
                  {explainers[activeTab] && (
                    <section className="w-full bg-[#FCFAF7] border border-[#EBDCCB]/20 rounded-3xl p-8 sm:p-10 shadow-sm">
                      <div
                        className="prose max-w-none text-gray-700 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: explainers[activeTab] }}
                      />
                    </section>
                  )}
                </div>
              )}

            </div>

          </div>
        </main>
      )}
    </div>
  );
}
