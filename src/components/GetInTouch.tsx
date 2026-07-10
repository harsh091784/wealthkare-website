"use client";

import { useState, useRef } from "react";
import indiaMap from "@svg-maps/india";
import ArcRing from "@/components/ArcRing";

// Precise coordinates for the 13 cities on the viewBox="0 0 612 696"
// Coordinates are calibrated based on state centroids and positions
const CITIES = [
  { name: "Delhi", x: 188.4, y: 205.1, labelDx: -18, labelDy: -8 },
  { name: "Noida", x: 202.0, y: 205.0, labelDx: 8, labelDy: 2 },
  { name: "Gurgaon", x: 178.0, y: 211.0, labelDx: -24, labelDy: 10 },
  { name: "Faridabad", x: 191.0, y: 216.0, labelDx: 8, labelDy: 10 },
  { name: "Mumbai", x: 120.0, y: 410.0, labelDx: -28, labelDy: -6 },
  { name: "Pune", x: 135.0, y: 425.0, labelDx: 8, labelDy: 4 },
  { name: "Bangalore", x: 172.0, y: 550.0, labelDx: -24, labelDy: -8 },
  { name: "Chennai", x: 215.0, y: 585.0, labelDx: 8, labelDy: 2 },
  { name: "Hyderabad", x: 210.0, y: 475.0, labelDx: 8, labelDy: 0 },
  { name: "Kolkata", x: 410.0, y: 355.0, labelDx: 8, labelDy: 2 },
  { name: "Ahmedabad", x: 95.0, y: 320.0, labelDx: -35, labelDy: -6 },
  { name: "Bhopal", x: 220.0, y: 335.0, labelDx: 8, labelDy: 2 },
  { name: "Chandigarh", x: 180.7, y: 161.1, labelDx: 8, labelDy: -4 },
];

export default function GetInTouch() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hoveredCity, setHoveredCity] = useState<typeof CITIES[number] | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^\+?[\d\s-]{8,15}$/.test(form.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Construct mailto link
    const subject = encodeURIComponent(`New Enquiry from ${form.fullName}`);
    const body = encodeURIComponent(
      `Name: ${form.fullName}\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`
    );

    const mailtoUrl = `mailto:mukesh@wealthcareindia.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <section
      id="get-in-touch"
      className="relative bg-[#1C1614] py-16 md:py-24 overflow-hidden w-full select-none border-t border-white/5"
    >
      {/* Background ArcRing motifs */}
      <ArcRing
        className="-top-40 -left-40"
        opacity={0.08}
        size="w-[600px] h-[600px]"
        strokeWidth={1}
      />
      <ArcRing
        className="-bottom-40 -right-40"
        opacity={0.08}
        size="w-[600px] h-[600px]"
        strokeWidth={1}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT COLUMN — CONTACT FORM (elevated white/light cream card) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-white rounded-3xl p-8 border border-[#BD924D] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col justify-between h-full">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-[#231F20] tracking-tight mb-3">
                  Get in <span className="text-brand-gold">Touch</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-semibold leading-relaxed mb-6">
                  Ready to start the conversation? We'd love to hear from you.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="text-[10px] sm:text-xs font-black tracking-widest text-gray-700 uppercase">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Mukesh Gupta"
                      className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#231F20] font-semibold focus:outline-none focus:border-brand-gold transition-colors placeholder:text-gray-400"
                    />
                    {errors.fullName && (
                      <span className="text-[10px] font-bold text-red-500 tracking-wide">{errors.fullName}</span>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[10px] sm:text-xs font-black tracking-widest text-gray-700 uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="e.g. mukesh@wealthcareindia.com"
                      className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#231F20] font-semibold focus:outline-none focus:border-brand-gold transition-colors placeholder:text-gray-400"
                    />
                    {errors.email && (
                      <span className="text-[10px] font-bold text-red-500 tracking-wide">{errors.email}</span>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-[10px] sm:text-xs font-black tracking-widest text-gray-700 uppercase">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98101 84368"
                      className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#231F20] font-semibold focus:outline-none focus:border-brand-gold transition-colors placeholder:text-gray-400"
                    />
                    {errors.phone && (
                      <span className="text-[10px] font-bold text-red-500 tracking-wide">{errors.phone}</span>
                    )}
                  </div>

                  {/* Your Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-[10px] sm:text-xs font-black tracking-widest text-gray-700 uppercase">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your financial goals..."
                      className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#231F20] font-semibold focus:outline-none focus:border-brand-gold transition-colors resize-none placeholder:text-gray-400"
                    />
                    {errors.message && (
                      <span className="text-[10px] font-bold text-red-500 tracking-wide">{errors.message}</span>
                    )}
                  </div>

                  {/* Send Message Button & Book a Virtual Meeting button */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-[#BD924D] hover:bg-[#a67e3f] text-white text-[10px] sm:text-xs font-black tracking-widest py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg uppercase cursor-pointer"
                    >
                      SEND MESSAGE
                    </button>
                    <a
                      href="https://calendly.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border border-[#BD924D] text-[#BD924D] hover:bg-[#BD924D] hover:text-white bg-transparent text-[10px] sm:text-xs font-black tracking-widest py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg uppercase text-center block"
                    >
                      Book a Virtual Meeting
                    </a>
                  </div>
                </form>
              </div>

              {/* Mailto Note */}
              <p className="text-[10px] text-gray-500 font-bold tracking-wider leading-relaxed mt-6 text-center border-t border-gray-200/50 pt-4">
                Clicking &apos;Send Message&apos; will open your email app. You can also reach us directly at{" "}
                <a href="mailto:mukesh@wealthcareindia.com" className="text-brand-gold hover:underline">
                  mukesh@wealthcareindia.com
                </a>
              </p>
            </div>
          </div>

          {/* CENTER COLUMN — CONTACT INFORMATION */}
          <div className="lg:col-span-3 flex flex-col justify-center py-6 lg:py-0">
            <h3 className="text-lg sm:text-xl font-black text-[#BD924D] tracking-wide mb-8 uppercase border-b border-[#BD924D]/25 pb-3">
              Contact Information
            </h3>
            <div className="flex flex-col gap-8">
              {/* Email Us */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#BD924D]/10 border border-[#BD924D]/35 flex items-center justify-center text-[#BD924D]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] sm:text-xs font-black tracking-widest text-[#BD924D] uppercase mb-1">
                    Email Us
                  </h4>
                  <a href="mailto:mukesh@wealthcareindia.com" className="text-xs sm:text-sm text-white font-extrabold hover:underline block break-all">
                    mukesh@wealthcareindia.com
                  </a>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#BD924D]/10 border border-[#BD924D]/35 flex items-center justify-center text-[#BD924D]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] sm:text-xs font-black tracking-widest text-[#BD924D] uppercase mb-1">
                    Call Us
                  </h4>
                  <a href="tel:+919810184368" className="text-xs sm:text-sm text-white font-extrabold hover:underline block">
                    +91 98101 84368
                  </a>
                </div>
              </div>

              {/* Visit Us */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#BD924D]/10 border border-[#BD924D]/35 flex items-center justify-center text-[#BD924D]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] sm:text-xs font-black tracking-widest text-[#BD924D] uppercase mb-1">
                    Visit Us
                  </h4>
                  <p className="text-xs sm:text-sm text-white font-extrabold leading-relaxed">
                    A-54A, Lower Ground Floor, Lajpat Nagar II, New Delhi – 110024
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#BD924D]/10 border border-[#BD924D]/35 flex items-center justify-center text-[#BD924D]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] sm:text-xs font-black tracking-widest text-[#BD924D] uppercase mb-1">
                    Hours
                  </h4>
                  <p className="text-xs sm:text-sm text-white font-extrabold leading-relaxed">
                    Monday to Saturday,<br />
                    10:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — INDIA MAP with city markers */}
          <div className="lg:col-span-4 flex flex-col justify-center relative select-none">
            {/* Map Container (elevated white panel card) */}
            <div
              ref={mapContainerRef}
              className="relative w-full aspect-[612/696] max-w-[420px] mx-auto bg-white rounded-3xl p-3 pt-5 pb-3 border border-[#BD924D] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-visible flex flex-col justify-between"
            >
              <div className="text-center lg:text-left mb-2 w-full z-10 relative px-3">
                <span className="text-[10px] sm:text-xs font-black tracking-[0.25em] text-[#BD924D] uppercase">
                  Pan-India Presence
                </span>
              </div>

              {/* India SVG map */}
              <svg
                viewBox={indiaMap.viewBox}
                className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                style={{ fill: "none", strokeLinejoin: "round" }}
              >
                <defs>
                  {/* Outline filter for solid silhouette */}
                  <filter id="outer-border">
                    <feMorphology operator="dilate" radius="2.2" in="SourceAlpha" result="dilated" />
                    <feFlood flood-color="#BD924D" result="color" />
                    <feComposite in="color" in2="dilated" operator="in" result="outline" />
                    <feMerge>
                      <feMergeNode in="outline" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Group containing the scaled map and pins */}
                <g transform="scale(1.08) translate(-18, -15)">
                  
                  {/* Solid silhouette block of India that gets the dilated outer border */}
                  <g filter="url(#outer-border)">
                    {indiaMap.locations.map((loc: { id: string; name?: string; path: string }) => (
                      <path
                        key={loc.id}
                        d={loc.path}
                        fill="#FAF7F2"
                        stroke="#FAF7F2"
                        strokeWidth={1.5}
                      />
                    ))}
                  </g>

                  {/* State outline paths (state boundaries rendered with thin gold outlines) */}
                  <g>
                    {indiaMap.locations.map((loc: { id: string; name?: string; path: string }) => (
                      <path
                        key={loc.id}
                        id={loc.id}
                        d={loc.path}
                        fill="none"
                        stroke="#BD924D"
                        strokeWidth={1.2}
                        className="transition-all duration-300 hover:fill-[#BD924D]/10 cursor-pointer"
                      />
                    ))}
                  </g>

                  {/* City Pins (larger and more prominent) */}
                  {CITIES.map((city) => {
                    const isHovered = hoveredCity?.name === city.name;
                    return (
                      <g
                        key={city.name}
                        onMouseEnter={() => setHoveredCity(city)}
                        onMouseLeave={() => setHoveredCity(null)}
                        className="cursor-pointer"
                      >
                        {/* Pulsing Outer Ring */}
                        <circle
                          cx={city.x}
                          cy={city.y}
                          r={isHovered ? 16 : 8}
                          fill="#BD924D"
                          opacity={isHovered ? 0.35 : 0.15}
                          className="transition-all duration-300 ease-out"
                        />

                        {/* Small Pulsing Ring */}
                        <circle
                          cx={city.x}
                          cy={city.y}
                          r={isHovered ? 11 : 6}
                          fill="none"
                          stroke="#BD924D"
                          strokeWidth={1.2}
                          opacity={0.85}
                        />

                        {/* Core Dot */}
                        <circle
                          cx={city.x}
                          cy={city.y}
                          r={3.5}
                          fill="#BD924D"
                          className="transition-transform duration-300"
                          style={{ transform: isHovered ? "scale(1.25)" : "scale(1)", transformOrigin: `${city.x}px ${city.y}px` }}
                        />

                        {/* City Static Labels (larger and bolder) */}
                        <text
                          x={city.x + city.labelDx}
                          y={city.y + city.labelDy}
                          className={`text-[9.5px] font-black tracking-wide select-none transition-all duration-200 ${
                            isHovered ? "fill-[#BD924D]" : "fill-[#231F20]"
                          }`}
                          style={{ pointerEvents: "none" }}
                        >
                          {city.name}
                        </text>
                      </g>
                    );
                  })}

                </g>
              </svg>

              {/* Interactive Tooltip Overlay */}
              {hoveredCity && (
                <div
                  className="absolute z-30 bg-[#BD924D] text-white px-3 py-1.5 rounded-lg shadow-xl text-[10px] font-black tracking-widest uppercase border border-white/10 pointer-events-none transition-all duration-200"
                  style={{
                    left: `${(((hoveredCity.x - 18) * 1.08) / 612) * 100}%`,
                    top: `${(((hoveredCity.y - 15) * 1.08) / 696) * 100 - 6}%`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  {hoveredCity.name}
                  {/* Subtle triangle point */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#BD924D]" />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
