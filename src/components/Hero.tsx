import Image from "next/image";
import content from "@/content/homepage.json";

export default function Hero() {
  const { description, ctaText, ctaHref } = content.hero;

  return (
    <section className="relative w-full bg-transparent overflow-hidden lg:flex-1 min-h-[450px] flex items-stretch py-6 lg:py-0">
      
      {/* Left Faint Double Arc motif sweeping behind the text block */}
      {/* Outer Thick Gold Arc */}
      <div 
        className="absolute rounded-full border-[14px] border-brand-gold/[0.07] pointer-events-none z-0 w-[420px] h-[420px] -left-[160px] -top-[60px] lg:w-[600px] lg:h-[600px] lg:-left-[200px] lg:-top-[100px]"
      />
      {/* Inner Thin White Arc */}
      <div 
        className="absolute rounded-full border border-white/40 pointer-events-none z-0 w-[340px] h-[340px] -left-[120px] -top-[20px] lg:w-[500px] lg:h-[500px] lg:-left-[160px] lg:-top-[60px]"
      />
      
      {/* Grid container aligned to max-w-7xl to prevent empty margins on left/right */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full h-full">
          
          {/* Left Column: Text Content (Col-Span 7, wide max-w-xl) */}
          <div className="lg:col-span-7 flex flex-col justify-center items-start text-left relative z-10 lg:pr-4 py-8 lg:py-0">
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-black text-[#231F20] tracking-tight leading-[1.1] mb-4">
              Your Financial Future,
              <br />
              Handled with <span className="text-brand-gold font-black">Care.</span>
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 max-w-xl">
              {description}
            </p>
            <div className="flex flex-row flex-wrap items-center gap-4">
              <a
                href={ctaHref}
                className="flex items-center justify-center h-11 bg-brand-gold hover:bg-[#a67e3f] text-white text-[10px] font-extrabold px-8 rounded-full transition-all tracking-widest shadow-md hover:shadow-lg uppercase"
              >
                {ctaText}
              </a>
              <a
                href="https://wa.me/919868080561"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 h-11 bg-[#1EBE57] hover:bg-[#1aa84c] text-white text-[10px] font-extrabold px-8 rounded-full transition-all tracking-widest shadow-md hover:shadow-lg uppercase"
              >
                <svg className="w-4 h-4 fill-currentColor flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm12.007-21.733c-5.367 0-9.734 4.367-9.736 9.737-.001 2.203.738 4.321 2.1 6.01l.142.228-1.247 4.557 4.673-1.226.222.132c1.625.966 3.486 1.476 5.393 1.479h.005c5.366 0 9.732-4.368 9.734-9.739.002-2.602-1.01-5.05-2.86-6.903-1.85-1.854-4.298-2.875-6.902-2.877zm5.334 12.837c-.292-.146-1.727-.853-1.994-.95-.266-.097-.461-.146-.655.146-.194.292-.749.95-.918 1.144-.169.194-.338.219-.63.073-.292-.146-1.233-.454-2.35-1.453-.869-.775-1.456-1.733-1.626-2.025-.169-.292-.018-.45.129-.595.132-.131.292-.341.438-.512.146-.17.195-.292.292-.487.097-.195.049-.365-.024-.512-.073-.146-.655-1.579-.898-2.164-.236-.569-.475-.491-.655-.5h-.561c-.194 0-.51.073-.777.365-.266.292-1.02 1.022-1.02 2.493 0 1.47 1.07 2.894 1.216 3.089.146.195 2.106 3.2 5.097 4.495.712.308 1.267.492 1.701.63.715.227 1.365.195 1.88.118.573-.085 1.727-.706 1.97-.1.389.243.655.243 1.045-.097.39-.338.583-.583.583.583.583-.097.292-.39.584-.682.292-.292.365-.898.365-1.796z"/>
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Block (Col-Span 5, aligned to bottom) */}
          <div className="lg:col-span-5 relative w-full h-[360px] lg:h-full flex justify-center lg:justify-start items-end overflow-visible select-none z-10">
            
            {/* The soft brown/tan gradient panel that bleeds to the right edge */}
            <div className="absolute right-[-10vw] lg:right-[-5vw] top-1/2 -translate-y-1/2 w-[110vw] lg:w-[45vw] h-[105%] bg-gradient-to-r from-white via-[#fbf7f1] to-[#e8d6bd] rounded-l-[100px] lg:rounded-l-[180px] z-0 pointer-events-none" />
            
            {/* Right Faint Thin Circular Arc/Ring behind the image */}
            <div className="absolute right-12 lg:right-16 top-1/2 -translate-y-1/2 w-[340px] h-[340px] lg:w-[380px] lg:h-[380px] rounded-full border border-brand-gold/20 pointer-events-none z-0" />

            {/* Professionals Image standing at the bottom, now natively transparent */}
            <div className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] lg:max-w-none lg:w-[110%] lg:left-[-5%] h-[90%] lg:h-[95%] max-h-[480px] lg:max-h-none flex items-end justify-center">
              <Image
                src="/hero-professionals-placeholder.png"
                alt="WealthKare Professionals"
                width={500}
                height={500}
                priority
                className="w-full h-full object-contain object-bottom"
              />
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
