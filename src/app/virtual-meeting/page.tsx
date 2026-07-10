"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ArcRing from "@/components/ArcRing";
import Image from "next/image";

export default function VirtualMeetingPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "morning",
    notes: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone Number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success mailto trigger or feedback
    const subject = encodeURIComponent("Virtual Meeting Request - WealthKare");
    const body = encodeURIComponent(
      `Name: ${form.fullName}\nEmail: ${form.email}\nPhone: ${form.phone}\nPreferred Date: ${form.preferredDate}\nPreferred Time: ${form.preferredTime}\nNotes: ${form.notes}`
    );
    window.location.href = `mailto:mukesh@wealthcareindia.com?subject=${subject}&body=${body}`;
    setSuccess(true);
  };

  return (
    <div className="flex flex-col bg-white min-h-screen relative overflow-hidden">
      <Header />

      {/* Decorative Background Circles */}
      <ArcRing className="absolute -top-40 -left-40 text-brand-gold" opacity={0.02} size="w-[520px] h-[520px]" strokeWidth={1} />
      <ArcRing className="absolute -bottom-45 -right-40 text-brand-gold" opacity={0.02} size="w-[600px] h-[600px]" strokeWidth={1} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Virtual Meeting" }]} />

        {/* Title Section */}
        <div className="mt-8 mb-12 text-center max-w-3xl mx-auto">
          <span className="text-[10px] sm:text-xs font-black tracking-[0.25em] text-[#BD924D] uppercase mb-3 pl-1 block">
            Schedule a session
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#231F20] tracking-tight mb-4 leading-tight">
            Virtual Financial <span className="text-brand-gold">Meeting</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-semibold leading-relaxed">
            Connect with our expert advisors from anywhere. Select your preferred slot or complete our instant digital portfolio review.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6">
          {/* Left Column: Form Section */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-150 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
            <h2 className="text-xl sm:text-2xl font-black text-[#231F20] tracking-tight mb-2">
              Request a <span className="text-brand-gold">Meeting Slot</span>
            </h2>
            <p className="text-xs text-gray-500 font-semibold mb-6">
              Fill in your details below and we will contact you to confirm a secure video consultation.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                  className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-[#231F20] font-semibold focus:outline-none focus:border-brand-gold transition-colors placeholder:text-gray-400"
                />
                {errors.fullName && (
                  <span className="text-[10px] font-bold text-red-500 tracking-wide">{errors.fullName}</span>
                )}
              </div>

              {/* Grid: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    placeholder="e.g. name@domain.com"
                    className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-[#231F20] font-semibold focus:outline-none focus:border-brand-gold transition-colors placeholder:text-gray-400"
                  />
                  {errors.email && (
                    <span className="text-[10px] font-bold text-red-500 tracking-wide">{errors.email}</span>
                  )}
                </div>

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
                    className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-[#231F20] font-semibold focus:outline-none focus:border-brand-gold transition-colors placeholder:text-gray-400"
                  />
                  {errors.phone && (
                    <span className="text-[10px] font-bold text-red-500 tracking-wide">{errors.phone}</span>
                  )}
                </div>
              </div>

              {/* Grid: Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="preferredDate" className="text-[10px] sm:text-xs font-black tracking-widest text-gray-700 uppercase">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={form.preferredDate}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-[#231F20] font-semibold focus:outline-none focus:border-brand-gold transition-colors text-gray-750"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="preferredTime" className="text-[10px] sm:text-xs font-black tracking-widest text-gray-700 uppercase">
                    Preferred Time Slot
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={form.preferredTime}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-[#231F20] font-semibold focus:outline-none focus:border-brand-gold transition-colors text-gray-750"
                  >
                    <option value="morning">Morning (10:00 AM - 12:30 PM)</option>
                    <option value="afternoon">Afternoon (1:30 PM - 4:00 PM)</option>
                    <option value="evening">Evening (4:30 PM - 7:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="notes" className="text-[10px] sm:text-xs font-black tracking-widest text-gray-700 uppercase">
                  Notes / Financial Goals
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={handleInputChange}
                  placeholder="Share a brief overview of what you would like to discuss..."
                  className="w-full bg-[#FAF7F2] border border-gray-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-[#231F20] font-semibold focus:outline-none focus:border-brand-gold transition-colors resize-none placeholder:text-gray-400"
                />
              </div>

              {/* Action Buttons: Submit & Book a Virtual Meeting side by side */}
              <div className="flex flex-row items-center gap-4 mt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#BD924D] hover:bg-[#a67e3f] text-white text-[10px] sm:text-xs font-black tracking-widest py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg uppercase cursor-pointer text-center"
                >
                  SUBMIT REQUEST
                </button>
                <a
                  href="https://calendly.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#BD924D] hover:bg-[#a67e3f] text-white text-[10px] sm:text-xs font-black tracking-widest py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg uppercase text-center block"
                >
                  Book a Virtual Meeting
                </a>
              </div>

              {success && (
                <div className="text-center text-xs font-bold text-emerald-600 mt-2 bg-emerald-50 py-3 px-4 rounded-xl border border-emerald-100">
                  Thank you! Your request details have been prepared for email transmission.
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Complementary Review & Sample Report info */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Complementary Review Card */}
            <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#BD924D]/30 shadow-md relative overflow-hidden">
              <span className="absolute top-0 right-0 bg-[#BD924D] text-white text-[8px] font-black tracking-widest uppercase px-3 py-1 rounded-bl-xl select-none">
                Complementary
              </span>

              <h3 className="text-lg sm:text-xl font-black text-[#231F20] tracking-tight mb-3">
                Portfolio <span className="text-[#BD924D]">Review</span>
              </h3>
              <p className="text-xs text-gray-600 font-semibold leading-relaxed mb-6">
                Understand the asset allocation, cost structures, and risk factors of your existing investments in less than 5 minutes.
              </p>

              <div className="flex flex-col gap-4">
                <a
                  href="https://wealthcare.beyondirr.com/public/instant-review/018fa96a-cc4c-0d2d-2468-81e3b664be7f?step=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black hover:bg-zinc-900 text-[#BD924D] hover:text-white border border-[#BD924D]/60 text-[10px] sm:text-xs font-black tracking-widest py-4 rounded-full text-center uppercase transition-all duration-300 shadow-sm"
                >
                  Click for Complementary Portfolio REVIEW
                </a>

                <a
                  href="https://www.wealthcareindia.com/wp-content/uploads/2026/02/Sample-portfolio-review-report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-black text-gray-500 hover:text-[#BD924D] tracking-widest uppercase text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  View Sample Portfolio Review Report
                </a>
              </div>
            </div>

            {/* Speaker Event Photo - Social Proof */}
            <div className="border-t border-gray-100 pt-6 flex flex-col gap-3">
              <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <Image
                  src="/nfp2024.jpg"
                  alt="Mukesh Gupta, Founder — speaking at NFP2024"
                  width={600}
                  height={400}
                  className="w-full object-cover"
                />
              </div>
              <p className="text-[10px] sm:text-xs font-bold text-gray-500 tracking-wide leading-relaxed text-center">
                Mukesh Gupta, Founder &mdash; speaking at NFP2024, Network FP Pro Member Event.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
