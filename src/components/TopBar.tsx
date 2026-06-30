import content from "@/content/homepage.json";

export default function TopBar() {
  const { locationText, linkText, linkHref } = content.topBar;

  return (
    <div className="w-full bg-[#000000] text-[#ffffff] h-8 px-4 sm:px-8 flex flex-row justify-between items-center text-[10px] sm:text-xs tracking-widest font-sans z-50 flex-shrink-0 border-b-0 border-none select-none">
      <div className="font-semibold text-gray-200">
        {locationText}
      </div>
      <div className="flex flex-row items-center gap-6">
        <a 
          href="#download" 
          className="hover:underline font-extrabold transition-all tracking-widest text-white uppercase"
        >
          DOWNLOAD
        </a>
        <span className="text-gray-600">|</span>
        <a 
          href={linkHref} 
          className="hover:underline font-extrabold transition-all tracking-widest text-white uppercase"
        >
          {linkText.toUpperCase()}
        </a>
      </div>
    </div>
  );
}
