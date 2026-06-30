import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBand from "@/components/StatsBand";
import WhatWeOffer from "@/components/WhatWeOffer";
import PortalShowcase from "@/components/PortalShowcase";
import HowItWorks from "@/components/HowItWorks";
import Calculator from "@/components/Calculator";
import Testimonials from "@/components/Testimonials";
import Events from "@/components/Events";
import WealthInsights from "@/components/WealthInsights";
import GetInTouch from "@/components/GetInTouch";

export default function Home() {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* First fold wrapper: takes exactly 100vh on desktop and does not scroll internally */}
      <div className="flex flex-col lg:h-screen lg:overflow-hidden relative flex-shrink-0">


        {/* Wrapper with continuous background gradient */}
        <div className="flex-grow flex flex-col justify-between bg-gradient-to-r from-white via-[#fdfbf9] to-[#ebdccb] relative">
          {/* SECTION 2 — HEADER / NAVIGATION */}
          <Header />

          {/* SECTION 3 — HERO & SECTION 4 — TRACK RECORD STATS BAND */}
          <main className="flex-grow flex flex-col justify-between relative">
            <Hero />
            <StatsBand />
          </main>
        </div>
      </div>

      {/* SECTION 5 — WHAT WE OFFER */}
      <WhatWeOffer />

      {/* SECTION 6 — PORTAL SHOWCASE */}
      <PortalShowcase />

      {/* SECTION 7 — HOW IT WORKS */}
      <HowItWorks />

      {/* SECTION 8 — CALCULATORS */}
      <Calculator />

      {/* SECTION 9 — TESTIMONIALS */}
      <Testimonials />

      {/* SECTION 10 — OUR EVENTS */}
      <Events />

      {/* SECTION 11 — WEALTH INSIGHTS */}
      <WealthInsights />

      {/* SECTION 12 — GET IN TOUCH */}
      <GetInTouch />


    </div>
  );
}


