import Link from "next/link";
import ArcRing from "@/components/ArcRing";
import { getBlogPosts } from "@/lib/blog";

interface WealthInsightsProps {
  showHeading?: boolean;
  showReadMore?: boolean;
}

export default function WealthInsights({ showHeading = true, showReadMore = true }: WealthInsightsProps) {
  const posts = getBlogPosts();

  if (posts.length === 0) return null;

  // The newest post is featured on the left
  const featuredPost = posts[0];
  // The next two posts go into the right side column
  const rightPosts = posts.slice(1, 3);

  return (
    <section
      id="wealth-insights-section"
      className={`relative bg-white overflow-hidden w-full select-none ${
        showHeading ? "py-6 md:py-8" : "pt-2 pb-6 md:pt-3 md:pb-8"
      }`}
    >
      {/* Signature ArcRing decoration */}
      <ArcRing
        className="-bottom-40 -right-40"
        opacity={0.06}
        size="w-[480px] h-[480px]"
        strokeWidth={1}
      />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative flex flex-col items-center">
        {/* Eyebrow and Heading conditional display */}
        {showHeading ? (
          <>
            <div className="text-[10px] sm:text-xs font-black tracking-[0.25em] text-[#BD924D] mb-3 uppercase text-center">
              EDUCATION & ANALYSIS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#231F20] tracking-tight mb-6 text-center leading-tight">
              Wealth <span className="text-brand-gold">Insights</span>
            </h2>
          </>
        ) : (
          <div className="text-[10px] sm:text-xs font-black tracking-[0.25em] text-[#BD924D] mb-5 uppercase text-center">
            CURATED FOR INVESTORS
          </div>
        )}

        {/* Layout Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Featured Post (Large Card, Col-Span 7) */}
          <Link
            href={`/wealth-insights/${featuredPost.slug}`}
            className="lg:col-span-7 flex flex-col bg-white rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(42,32,24,0.06)] border border-gray-200/40 relative group cursor-pointer transition-all duration-300 hover:shadow-[0_25px_50px_rgba(0,0,0,0.12)] hover:-translate-y-1"
          >
            <div className="relative w-full h-[260px] sm:h-[300px] lg:h-full overflow-hidden flex-grow">
              <img
                src={featuredPost.thumbnail}
                alt={featuredPost.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              
              {/* Dark Gradient Overlay with content */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#221A10] via-[#221A10]/45 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <span className="block text-[8px] font-black text-brand-gold tracking-[0.2em] uppercase mb-2">
                  Featured Insight
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-snug">
                  {featuredPost.title}
                </h3>
                <p className="text-white/80 text-[11px] sm:text-xs mb-4 line-clamp-2 max-w-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex justify-between items-center text-[10px] font-black text-white/50 tracking-widest uppercase">
                  <span>{featuredPost.dateLabel}</span>
                  <span className="text-[#BD924D] group-hover:translate-x-1 transition-transform duration-200">
                    Read Post &rarr;
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* RIGHT: Next Two Posts (Col-Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Subheading */}
            <div className="text-xs font-black text-gray-500 tracking-widest uppercase pb-2 border-b border-gray-200/50">
              Featured Blogs
            </div>

            {/* Small post list */}
            <div className="flex flex-col gap-4">
              {rightPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/wealth-insights/${post.slug}`}
                  className="flex flex-row items-center gap-4 bg-white p-3 rounded-2xl border border-gray-200/40 hover:border-[#BD924D]/30 transition-all duration-300 hover:shadow-[0_10px_25px_rgba(42,32,24,0.04)] cursor-pointer group"
                >
                  {/* Thumbnail */}
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative bg-gray-50">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Meta info */}
                  <div className="flex-grow flex flex-col min-w-0 h-full py-1">
                    <h4 className="text-xs sm:text-sm font-black text-[#231F20] leading-snug mb-1.5 line-clamp-2 group-hover:text-[#BD924D] transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-gray-500 text-[10px] sm:text-xs leading-relaxed line-clamp-2 mb-2">
                      {post.excerpt}
                    </p>
                    <div className="text-[9px] font-bold text-gray-400 tracking-wider uppercase text-right mt-auto">
                      {post.dateLabel}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Read More button - centered below the grid */}
        {showReadMore && (
          <div className="w-full flex justify-center mt-4">
            <Link
              href="/wealth-insights"
              className="bg-[#BD924D] hover:bg-[#a67e3f] text-white px-10 py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all shadow-md hover:shadow-lg transform hover:scale-[1.03] duration-200 inline-block text-center"
            >
              Read More
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
