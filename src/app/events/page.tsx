"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ArcRing from "@/components/ArcRing";
import eventsData from "@/content/events.json";

interface EventItem {
  id: string;
  name: string;
  date: string;
  thumbnail: string;
  detailImage1: string;
  detailImage2: string;
  heading1: string;
  heading2: string;
  description: string;
}

export default function EventsPage() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [gridOpacity, setGridOpacity] = useState(100);
  const [detailOpacity, setDetailOpacity] = useState(0);

  const selectedEvent = eventsData.find((e) => e.id === selectedEventId) as EventItem | undefined;

  const handleTileClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setGridOpacity(0); // Smooth fade out grid
    setTimeout(() => {
      setIsDetailView(true); // display: none on grid, show detail panel
      setTimeout(() => {
        setDetailOpacity(100); // Smooth fade in detail panel
      }, 50);
    }, 300);
  };

  const handleBack = () => {
    setDetailOpacity(0); // Smooth fade out detail panel
    setTimeout(() => {
      setIsDetailView(false); // show grid, hide detail panel
      setSelectedEventId(null);
      setTimeout(() => {
        setGridOpacity(100); // Smooth fade in grid
      }, 50);
    }, 300);
  };

  // Listen for the Escape key to close the detail view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDetailView) {
        handleBack();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDetailView]);

  // Check URL query parameters for deep linking
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const eventParam = params.get("event");
    if (eventParam && eventsData.some((e) => e.id === eventParam)) {
      setSelectedEventId(eventParam);
      setGridOpacity(0);
      setIsDetailView(true);
      setDetailOpacity(100);
    }
  }, []);

  return (
    <div className="flex flex-col bg-[#121212] min-h-screen text-white select-none">
      {/* Site Header */}
      <Header />

      <main className="flex-grow flex flex-col relative w-full overflow-hidden">
        {/* Background ArcRings */}
        <ArcRing
          className="-top-40 -left-40 text-[#BD924D]"
          opacity={0.04}
          size="w-[480px] h-[480px]"
          strokeWidth={1}
        />
        <ArcRing
          className="-bottom-40 -right-40 text-[#BD924D]"
          opacity={0.04}
          size="w-[480px] h-[480px]"
          strokeWidth={1}
        />

        {/* GRID VIEW CONTAINER */}
        <div
          style={{ opacity: gridOpacity / 100 }}
          className={`flex-grow w-full py-10 lg:py-16 transition-opacity duration-300 ease-out ${
            isDetailView ? "hidden" : "block"
          }`}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start relative">
              
              {/* Left Column (Founder Quote & Title) */}
              <div className="w-full lg:w-[28%] flex flex-col lg:sticky lg:top-[92px]">
                {/* Two-color heading: 'EVE' in white, 'NTS' in gold */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none uppercase mb-6 sm:mb-8">
                  EVE<span className="text-[#BD924D]">NTS</span>
                </h1>

                {/* Founder Quote */}
                <blockquote className="text-sm sm:text-base text-gray-300 italic font-medium leading-relaxed mb-5 border-l-[3px] border-[#BD924D] pl-4 py-1.5 text-justify">
                  "Over two decades of working with India's most accomplished families, I've learned that the most valuable conversations about money rarely happen in boardrooms — they happen in the spaces we create through our events. When I began my career, wealth management was largely transactional. Events transformed that dynamic. Today, I measure the success of an event not by the leads it generates, but by the meaningful conversations it inspires. That is where true long-term value compounds."
                </blockquote>

                {/* Attribution */}
                <p className="text-[#BD924D] text-xs font-black uppercase tracking-widest pl-5">
                  &mdash; MR. MUKESH, <span className="text-gray-400 font-bold lowercase italic text-[10px]">Founder</span>
                </p>
              </div>

              {/* Right Section (Main Grid) */}
              <div className="w-full lg:w-[72%]">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border border-white/10 rounded-[32px] overflow-hidden bg-black/40 shadow-2xl relative">
                  {eventsData.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => handleTileClick(event.id)}
                      className="relative aspect-square overflow-hidden cursor-pointer group transition-all duration-300 border border-white/5"
                    >
                      {/* Event Photo */}
                      <img
                        src={event.thumbnail}
                        alt={event.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Dark tinted overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25 group-hover:via-black/35 group-hover:from-black/95 transition-all duration-300" />

                      {/* Subtle gold border/glow on hover */}
                      <div className="absolute inset-0 border-[1.5px] border-transparent group-hover:border-[#BD924D]/50 transition-all duration-300 pointer-events-none" />

                      {/* Event Name Overlay bottom-left */}
                      <div className="absolute bottom-5 left-5 right-5 z-10">
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-white leading-tight">
                          {event.name}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* SINGLE EVENT DETAIL VIEW */}
        {isDetailView && selectedEvent && (
          <div
            style={{ opacity: detailOpacity / 100 }}
            className="flex-grow w-full py-8 lg:py-12 transition-opacity duration-300 ease-in block"
          >
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
              
              {/* Event Name Heading - Gold (#BD924D) with safe padding */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#BD924D] tracking-tight mb-6 sm:mb-8 text-center uppercase pt-2">
                {selectedEvent.name}
              </h2>

              {/* ONE Featured Image, large and prominent */}
              <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-gray-900 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] flex-shrink-0 relative group">
                <img
                  src={selectedEvent.detailImage1}
                  alt={`${selectedEvent.name} featured image`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Event Description */}
              <p className="text-gray-300 text-sm sm:text-base font-semibold leading-relaxed text-justify mt-6 max-w-3xl">
                {selectedEvent.description}
              </p>

              {/* Date below description */}
              <div className="w-full max-w-3xl text-right mt-3">
                <span className="text-[10px] sm:text-xs font-black tracking-widest text-gray-500 uppercase">
                  {selectedEvent.date}
                </span>
              </div>

              {/* "← Back to Events" Button */}
              <button
                onClick={handleBack}
                className="mt-8 bg-transparent hover:bg-[#BD924D] text-[#BD924D] hover:text-white border border-[#BD924D] px-8 py-3 rounded-full text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-2 transform hover:scale-[1.03]"
              >
                &larr; Back to Events
              </button>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}
