"use client";

import { useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";

interface WealthInsightsClientProps {
  posts: BlogPost[];
}

export default function WealthInsightsClient({ posts }: WealthInsightsClientProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const categories = [
    "Mutual Funds",
    "Tax Planning",
    "Retirement",
    "Insurance",
    "Market Insights",
    "Goal Planning",
    "Fixed Income",
    "Estate Planning",
    "NRI Investing",
    "Personal Finance",
  ];

  // Helper to calculate relative date consistent with 2026-06-21 current time
  const getRelativeDate = (dateStr: string): string => {
    const postDate = new Date(dateStr);
    const currentDate = new Date("2026-06-21");
    const diffTime = currentDate.getTime() - postDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 30) return `${diffDays} days ago`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return "1 month ago";
    if (diffMonths < 12) return `${diffMonths} months ago`;

    const diffYears = Math.floor(diffMonths / 12);
    if (diffYears === 1) return "1 year ago";
    return `${diffYears} years ago`;
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
  };

  // Filter logic
  const filteredPosts = posts.filter((post) => {
    if (selectedCategories.length === 0) return true;
    return post.category && selectedCategories.includes(post.category);
  });

  // Sort logic
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
  });

  return (
    <section className="bg-[#FAF7F2]/40 py-10 md:py-16 border-t border-gray-200/20 relative w-full select-none">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Filter Sidebar (Desktop: col-span-3, Mobile: collapsed to top filter bar) */}
          <div className="lg:col-span-3 w-full">
            
            {/* Desktop Sidebar (visible on lg screens) */}
            <div className="hidden lg:block bg-[#FAF8F5] p-5 rounded-3xl border border-gray-200/40 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-xs font-black text-gray-700 uppercase tracking-wider">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-[#BD924D]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                    />
                  </svg>
                  Filter
                </div>
                {selectedCategories.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-[9px] font-black text-[#BD924D] hover:text-[#a67e3f] uppercase tracking-wider transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="h-px bg-gray-200/50 mb-4" />
              
              <div className="text-[10px] font-black text-gray-400 tracking-wider uppercase mb-3">
                Categories
              </div>
              <div className="flex flex-col gap-2.5">
                {categories.map((cat) => {
                  const isChecked = selectedCategories.includes(cat);
                  return (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCategory(cat)}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                          isChecked
                            ? "bg-[#BD924D] border-[#BD924D]"
                            : "bg-white border-gray-300 group-hover:border-[#BD924D]/45"
                        }`}
                      >
                        {isChecked && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="white"
                            className="w-2.5 h-2.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs font-bold text-gray-700 group-hover:text-[#BD924D] transition-colors select-none">
                        {cat}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Mobile Scrollable Categories Top Bar (visible on md/sm screens) */}
            <div className="lg:hidden w-full mb-6">
              <div className="flex justify-between items-center mb-3">
                <div className="text-[10px] font-black text-gray-500 tracking-wider uppercase">
                  Filter by Category
                </div>
                {selectedCategories.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-[9px] font-black text-[#BD924D] uppercase tracking-wider"
                  >
                    Clear ({selectedCategories.length})
                  </button>
                )}
              </div>
              <div className="flex flex-row overflow-x-auto gap-2 pb-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {categories.map((cat) => {
                  const isChecked = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap border transition-all ${
                        isChecked
                          ? "bg-[#BD924D] border-[#BD924D] text-white"
                          : "bg-white border-gray-200 text-gray-700 hover:border-[#BD924D]/30"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Archive List (Desktop: col-span-9) */}
          <div className="lg:col-span-9 w-full flex flex-col">
            
            {/* Sort Dropdown row */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-xs font-black text-gray-500 tracking-widest uppercase">
                {filteredPosts.length} {filteredPosts.length === 1 ? "Article" : "Articles"} Found
              </div>
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                  className="bg-white text-gray-700 text-[10px] font-black px-4 py-2 rounded-full border border-gray-200/60 focus:outline-none cursor-pointer tracking-wider appearance-none pr-8 shadow-sm hover:border-[#BD924D]/30 transition-all uppercase"
                >
                  <option value="newest">Sort by date: Newest to Oldest</option>
                  <option value="oldest">Sort by date: Oldest to Newest</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Articles List */}
            {sortedPosts.length > 0 ? (
              <div className="flex flex-col gap-5">
                {sortedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/wealth-insights/${post.slug}`}
                    className="flex flex-col sm:flex-row gap-5 bg-white p-4 rounded-3xl border border-gray-200/40 hover:border-[#BD924D]/30 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(42,32,24,0.04)] cursor-pointer group"
                  >
                    {/* Left Thumbnail */}
                    <div className="w-full sm:w-44 h-36 rounded-2xl overflow-hidden flex-shrink-0 relative bg-gray-50 border border-gray-200/10">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                    </div>

                    {/* Right Meta details */}
                    <div className="flex-grow flex flex-col min-w-0 py-1">
                      <span className="text-[9px] font-black tracking-widest text-[#BD924D] uppercase mb-1.5 block">
                        Article {post.category && `• ${post.category}`}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-[#231F20] leading-snug mb-2 group-hover:text-[#BD924D] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-[13px] leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex justify-between items-center text-[10px] font-black text-gray-400 tracking-wider uppercase mt-auto">
                        <span>{getRelativeDate(post.date)}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl border border-gray-200/30">
                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">
                  No Articles Found
                </p>
                <p className="text-gray-500 text-xs">
                  Try clearing some of your selected filters.
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
