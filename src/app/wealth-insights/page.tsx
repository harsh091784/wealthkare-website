import Header from "@/components/Header";
import WealthInsights from "@/components/WealthInsights";
import { getBlogPosts } from "@/lib/blog";
import WealthInsightsClient from "@/components/WealthInsightsClient";
import Breadcrumb from "@/components/Breadcrumb";

export default function WealthInsightsPage() {
  const posts = getBlogPosts();

  return (
    <div className="flex flex-col bg-white min-h-screen select-none">

      <Header />
      {/* BREADCRUMB (left-aligned, on light background, below header band) */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 z-10 relative">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Wealth Insights" },
          ]}
        />
      </div>

      {/* FEATURED SECTION (reusing existing Homepage date-sorted component) */}
      <WealthInsights showHeading={false} showReadMore={false} />

      {/* ARCHIVE SECTION (category filtering, sorting dropdown, list cards) */}
      <WealthInsightsClient posts={posts} />


    </div>
  );
}
