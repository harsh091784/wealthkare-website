"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

export default function Footer() {
  return (
    <footer className="w-full select-none z-10 relative flex flex-col">
      
      {/* SECTION A — TOP BAND (light warm cream background) */}
      <div className="w-full bg-[#FAF7F2] border-t border-gray-200/50 py-12 md:py-16 text-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Column 1 (lg:col-span-4) - Logo, CNBC Award & Registered Office */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Logo Lockup */}
              <div className="flex flex-row items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 text-[#BD924D]">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M50 15L85 80H70L50 42L30 80H15L50 15Z" fill="currentColor" />
                    <path d="M50 55L65 80H35L50 55Z" fill="currentColor" opacity="0.85" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row items-baseline leading-none">
                    <span className="text-base sm:text-lg font-extrabold tracking-tight text-[#231F20]">Wealth</span>
                    <span className="text-base sm:text-lg font-bold tracking-tight text-[#BD924D]">kare</span>
                  </div>
                  <span className="text-[7.5px] font-semibold text-gray-500 tracking-wider mt-0.5 leading-none">
                    Relationships Beyond Investments
                  </span>
                </div>
              </div>

              {/* CNBC Nomination Badge */}
              <div className="flex items-center gap-3 border border-[#BD924D]/35 bg-[#BD924D]/5 rounded-2xl p-3 max-w-[290px]">
                <div className="text-[#BD924D] flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0L4 12m8-4l8 4m-8 9a9 9 0 110-18 9 9 0 010 18z" />
                  </svg>
                </div>
                <div className="text-[9px] font-extrabold tracking-widest text-[#231F20] leading-tight uppercase">
                  Nominated for<br />
                  <span className="text-[#BD924D]">CNBC Financial Advisor Awards</span>
                </div>
              </div>

              {/* Registered Office Info */}
              <div className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                <span className="font-black text-[#231F20] block uppercase tracking-widest text-[9px] mb-1.5">Registered Office</span>
                A 54 A, Lower Ground Floor, Lajpat Nagar-II, New Delhi-110024, India.<br />
                Phone: <a href="tel:+911146575550" className="text-[#231F20] hover:text-[#BD924D] font-extrabold transition-colors">+91-11-4657 5550 (5 Lines)</a><br />
                Email: <a href="mailto:sales@wealthcareindia.com" className="text-[#231F20] hover:text-[#BD924D] font-extrabold transition-colors block sm:inline">sales@wealthcareindia.com</a>
              </div>
            </div>

            {/* Column 2 (lg:col-span-3) - Corporate Office */}
            <div className="lg:col-span-3 flex flex-col gap-3 md:mt-1.5">
              <span className="font-black text-[#231F20] block uppercase tracking-widest text-[9px] mb-1">Corporate Office</span>
              <div className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                Office Tower-1, Unit 1820–1821, Bhutani Center 32, Near Noida City Centre Metro Station, Sector-32, Noida – 201301.<br />
                Phone: <a href="tel:012026108430" className="text-[#231F20] hover:text-[#BD924D] font-extrabold transition-colors">0120-2610 8430</a><br />
                Email: <a href="mailto:sales@wealthcareindia.com" className="text-[#231F20] hover:text-[#BD924D] font-extrabold transition-colors block">sales@wealthcareindia.com</a>
              </div>
            </div>

            {/* Column 3 (lg:col-span-2) - Quick Links A */}
            <div className="lg:col-span-2 flex flex-col gap-3 md:mt-1.5">
              <span className="font-black text-[#231F20] block uppercase tracking-widest text-[9px] mb-1">Quick Links</span>
              <div className="flex flex-col gap-2 text-left text-[11px] text-gray-500 font-bold">
                <Link href="/our-story" className="hover:text-[#BD924D] transition-colors">About Us</Link>
                <a href="/#get-in-touch" className="hover:text-[#BD924D] transition-colors">Contact Details</a>
                <Link href="/wealth-insights" className="hover:text-[#BD924D] transition-colors">Blog</Link>
                <a href="#mf-forms" className="hover:text-[#BD924D] transition-colors">MF Forms</a>
              </div>
            </div>

            {/* Column 4 (lg:col-span-2) - Quick Links B */}
            <div className="lg:col-span-2 flex flex-col gap-3 md:mt-1.5">
              <span className="font-black text-[#231F20] block uppercase tracking-widest text-[9px] mb-1">Resources</span>
              <div className="flex flex-col gap-2 text-[11px] text-gray-500 font-bold">
                <Link href="/calculators" className="hover:text-[#BD924D] transition-colors">Calculator</Link>
                <Link href="/calculators/sip" className="hover:text-[#BD924D] transition-colors">Best Mutual Funds</Link>
                <Link href="/calculators/income-tax" className="hover:text-[#BD924D] transition-colors">Tax Saving</Link>
              </div>
            </div>

          </div>

          {/* Social Icons + Download App Badge row */}
          <div className="w-full border-t border-gray-200/60 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links (WhatsApp, Facebook, Instagram, LinkedIn, YouTube only) */}
            <div className="flex items-center gap-3">
              {/* WhatsApp */}
              <a href="https://wa.me/919868080561" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300" aria-label="WhatsApp">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm12.007-21.733c-5.367 0-9.734 4.367-9.736 9.737-.001 2.203.738 4.321 2.1 6.01l.142.228-1.247 4.557 4.673-1.226.222.132c1.625.966 3.486 1.476 5.393 1.479h.005c5.366 0 9.732-4.368 9.734-9.739.002-2.602-1.01-5.05-2.86-6.903-1.85-1.854-4.298-2.875-6.902-2.877zm5.334 12.837c-.292-.146-1.727-.853-1.994-.95-.266-.097-.461-.146-.655.146-.194.292-.749.95-.918 1.144-.169.194-.338.219-.63.073-.292-.146-1.233-.454-2.35-1.453-.869-.775-1.456-1.733-1.626-2.025-.169-.292-.018-.45.129-.595.132-.131.292-.341.438-.512.146-.17.195-.292.292-.487.097-.195.049-.365-.024-.512-.073-.146-.655-1.579-.898-2.164-.236-.569-.475-.491-.655-.5h-.561c-.194 0-.51.073-.777.365-.266.292-1.02 1.022-1.02 2.493 0 1.47 1.07 2.894 1.216 3.089.146.195 2.106 3.2 5.097 4.495.712.308 1.267.492 1.701.63.715.227 1.365.195 1.88.118.573-.085 1.727-.706 1.97-.1.389.243.655.243 1.045-.097.39-.338.583-.583.583.583.583-.097.292-.39.584-.682.292-.292.365-.898.365-1.796z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/wealthcareindia" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/30 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-300" aria-label="Facebook">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/wealthkare.securities?igsh=aW1waXNrZW5rb2N1" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#E1306C]/10 border border-[#E1306C]/30 flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-all duration-300" aria-label="Instagram">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/wc-securities-pvt-ltd/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#0A66C2]/10 border border-[#0A66C2]/30 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all duration-300" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com/@mukeshgupta-zs1ym?si=xdLA7wxgejkHWXJ8" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#FF0000]/10 border border-[#FF0000]/30 flex items-center justify-center text-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all duration-300" aria-label="YouTube">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.107C19.528 3.545 12 3.545 12 3.545s-7.528 0-9.388.511a3.003 3.003 0 00-2.11 2.107C0 8.021 0 12 0 12s0 3.979.502 5.837a3.003 3.003 0 002.11 2.107C4.472 20.455 12 20.455 12 20.455s7.528 0 9.388-.511a3.003 3.003 0 002.11-2.107C24 15.979 24 12 24 12s0-3.979-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            {/* App Store Badges + QR Codes */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <span className="text-[10px] font-black text-gray-500 tracking-widest uppercase">Download Mobile App</span>
              <div className="flex flex-wrap items-center gap-6 justify-center sm:justify-start">
                <div className="flex gap-3">
                  {/* App Store */}
                  <a
                    href="http://apps.apple.com/us/app/wealthcareindia/id1635329624?uo=4&at=11l6hc&ct=fnd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1C1614] hover:bg-[#2E2623] text-white px-3.5 py-1.5 rounded-xl flex items-center gap-2 border border-white/10 shadow-sm transition-all duration-300 w-[130px]"
                  >
                    <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z"/>
                    </svg>
                    <div className="text-left select-none">
                      <p className="text-[7px] font-medium text-gray-400 uppercase leading-none">Download on the</p>
                      <p className="text-[10px] font-black font-sans leading-tight">App Store</p>
                    </div>
                  </a>

                  {/* Google Play */}
                  <a
                    href="https://play.google.com/store/apps/details?id=tvs.android.excelnet.wealthcare&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1C1614] hover:bg-[#2E2623] text-white px-3.5 py-1.5 rounded-xl flex items-center gap-2 border border-white/10 shadow-sm transition-all duration-300 w-[130px]"
                  >
                    <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M5.25 2.25c-.15 0-.3.03-.43.1L12.56 12l-7.74 9.65c.13.07.28.1.43.1.2 0 .4-.06.57-.18l12.86-7.85c.67-.41.67-1.43 0-1.84L5.82 2.43c-.17-.12-.37-.18-.57-.18z"/>
                    </svg>
                    <div className="text-left select-none">
                      <p className="text-[7px] font-medium text-gray-400 uppercase leading-none">Get it on</p>
                      <p className="text-[10px] font-black font-sans leading-tight">Google Play</p>
                    </div>
                  </a>
                </div>

                {/* QR Codes App Download Sub-section (Sized 80x80px each, side by side) */}
                <div className="flex flex-row items-center gap-4 border-t sm:border-t-0 sm:border-l border-gray-300/40 pt-4 sm:pt-0 sm:pl-6">
                  {/* App Store QR */}
                  <div className="flex flex-row items-center gap-1.5">
                    <div className="w-[80px] h-[80px] bg-white p-1 rounded-lg border border-gray-250/60 shadow-sm flex items-center justify-center flex-shrink-0">
                      <QRCodeSVG value="http://apps.apple.com/us/app/wealthcareindia/id1635329624?uo=4&at=11l6hc&ct=fnd" size={72} level="M" />
                    </div>
                    <span className="text-[8px] font-black text-gray-500 tracking-wider uppercase leading-none">
                      iOS
                    </span>
                  </div>

                  {/* Google Play QR */}
                  <div className="flex flex-row items-center gap-1.5">
                    <div className="w-[80px] h-[80px] bg-white p-1 rounded-lg border border-gray-250/60 shadow-sm flex items-center justify-center flex-shrink-0">
                      <QRCodeSVG value="https://play.google.com/store/apps/details?id=tvs.android.excelnet.wealthcare&hl=en" size={72} level="M" />
                    </div>
                    <span className="text-[8px] font-black text-gray-500 tracking-wider uppercase leading-none">
                      Android
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION B — RISK DISCLAIMER BAND (#BD924D / warm gold background, dark text) */}
      <div className="w-full bg-[#BD924D] text-[#1C1614] py-8 md:py-10 border-t border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          <p className="text-[10px] sm:text-xs font-semibold leading-relaxed text-justify tracking-wide">
            Risk Factors – Investments in Mutual Funds are subject to Market Risks. Read all scheme related documents carefully before investing. Mutual Fund Schemes do not assure or guarantee any returns. Past performances of any Mutual Fund Scheme may or may not be sustained in future. There is no guarantee that the investment objective of any suggested scheme shall be achieved. All existing and prospective investors are advised to check and evaluate the Exit loads and other cost structure (TER) applicable at the time of making the investment before finalizing on any investment decision for Mutual Funds schemes. We deal in Regular Plans only for Mutual Fund Schemes and earn a Trailing Commission on client investments. Disclosure For Commission earnings is made to clients at the time of investments. Option of Direct Plan for every Mutual Fund Scheme is available to investors offering advantage of lower expense ratio. We are not entitled to earn any commission on Direct plans. Hence we do not deal in Direct Plans.
          </p>
          
          <div className="flex flex-col items-center gap-2 border-t border-[#1C1614]/15 pt-5 text-center text-[10px] sm:text-xs font-black tracking-widest uppercase">
            <span>
              WC Securities Pvt. Ltd. | AMFI Registered Mutual Fund Distributor (ARN 3511) Initial Registration Date– 31.03.2003 Valid Upto– 26.03.2028 | SIF Distributor (ARN 3511) (Formerly known as Wealthcare Securities Pvt. Ltd.)
            </span>
            <span>
              ACE NET Services Pvt. Ltd. | APMI Registered PMS Distributor (APRN 01857)
            </span>
          </div>
        </div>
      </div>

      {/* SECTION C — BOTTOM STRIP (dark background) */}
      <div className="w-full bg-[#1C1614] text-white/40 py-6 text-[9px] sm:text-[10px] font-bold tracking-wider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="uppercase tracking-widest">
            Copyright &copy; 2025 WC Securities Pvt. Ltd. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 uppercase">
            <Link href="#disclaimer" className="hover:text-[#BD924D] transition-colors">Disclaimer</Link>
            <span>|</span>
            <Link href="#disclosure" className="hover:text-[#BD924D] transition-colors">Disclosure</Link>
            <span>|</span>
            <Link href="#privacy-policy" className="hover:text-[#BD924D] transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="#terms-conditions" className="hover:text-[#BD924D] transition-colors">Terms Conditions</Link>
            <span>|</span>
            <Link href="#sid-sai-kim" className="hover:text-[#BD924D] transition-colors">SID/SAI/KIM</Link>
            <span>|</span>
            <Link href="#code-of-conduct" className="hover:text-[#BD924D] transition-colors">Code of Conduct</Link>
            <span>|</span>
            <Link href="#sebi-circulars" className="hover:text-[#BD924D] transition-colors">SEBI Circulars</Link>
            <span>|</span>
            <Link href="#amfi-risk-factors" className="hover:text-[#BD924D] transition-colors">AMFI Risk Factors</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
