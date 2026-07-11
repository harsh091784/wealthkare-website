"use client";

export default function FloatingWidget() {
  return (
    <a
      href="https://calendly.com/wc3511/30min?month=2026-07"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 bg-[#BD924D] hover:bg-[#a67e3f] text-white text-[10px] md:text-xs font-black uppercase tracking-widest px-4.5 py-3 rounded-full shadow-[0_8px_30px_rgba(189,146,77,0.45)] hover:shadow-[0_12px_40px_rgba(189,146,77,0.55)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none"
      aria-label="Book Virtual Meeting"
    >
      {/* Calendar/Video Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="w-4 h-4 flex-shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
        />
      </svg>
      <span>Virtual Meeting</span>
    </a>
  );
}
