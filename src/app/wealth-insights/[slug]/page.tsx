import { getBlogPosts } from "@/lib/blog";
import Link from "next/link";
import Header from "@/components/Header";
import ArcRing from "@/components/ArcRing";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";

// Generate static params for Next.js static output builds
export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = getBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col bg-white min-h-screen select-none">

      <Header />

      <main className="flex-grow py-12 md:py-20 px-4 relative">
        {/* Signature ArcRing decoration */}
        <ArcRing
          className="-top-40 -left-40"
          opacity={0.06}
          size="w-[480px] h-[480px]"
          strokeWidth={1}
        />

        <article className="w-full max-w-3xl mx-auto z-10 relative">
          {/* Breadcrumb trail */}
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Wealth Insights", href: "/wealth-insights" },
              { label: post.title },
            ]}
          />

          {/* Category */}
          <span className="block text-[10px] sm:text-xs font-black text-brand-gold tracking-[0.2em] uppercase mb-3">
            {post.category || "Wealth Insight"}
          </span>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#231F20] tracking-tight mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Date */}
          <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-8 pb-4 border-b border-gray-200/50">
            Published: {post.dateLabel}
          </div>

          {/* Image */}
          <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-md mb-10 border border-gray-200/30">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose max-w-none text-[#231F20]/90 text-sm sm:text-base leading-relaxed mb-12">
            <p className="font-semibold text-gray-600 mb-6 text-base sm:text-lg leading-relaxed">
              {post.excerpt}
            </p>
            <div className="border-t border-gray-100 pt-6">
              <p className="mb-4">
                We believe that structured planning and objective frameworks lead to the best financial outcomes. This article represents our commitment to providing simple, educational, and compliance-safe insight.
              </p>
              <p className="mb-4">
                When structuring portfolios or planning taxes, it is always recommended to align options with your personalized income timeline, cash flows, and overall investment duration goals.
              </p>
            </div>
          </div>
        </article>
      </main>


    </div>
  );
}
