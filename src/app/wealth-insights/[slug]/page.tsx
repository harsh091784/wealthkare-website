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

function parseMarkdown(md: string): string {
  let html = md.trim();

  // Handle headers
  html = html.replace(/^### (.*$)/gim, '<h4 class="text-xs font-black tracking-widest text-[#BD924D] uppercase mt-6 mb-3">$1</h4>');
  html = html.replace(/^## (.*$)/gim, '<h3 class="text-sm font-black text-gray-800 tracking-widest mt-8 mb-4 border-b border-gray-100 pb-2 uppercase">$1</h3>');
  html = html.replace(/^# (.*$)/gim, '<h2 class="text-base font-black text-gray-800 tracking-widest mt-10 mb-4 border-b border-gray-250 pb-2 uppercase">$1</h2>');

  // Handle bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-[#231F20]">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>');

  // Line by line parsing for paragraphs and lists
  const lines = html.split('\n');
  const resultLines: string[] = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      resultLines.push('</ul>');
      inList = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) {
      closeList();
      continue;
    }

    if (line.startsWith('<h') || line.startsWith('<div')) {
      closeList();
      resultLines.push(line);
      continue;
    }

    // Check for bullet list item
    const bulletMatch = line.match(/^[\-\*]\s+(.*)$/);
    if (bulletMatch) {
      if (!inList) {
        closeList();
        resultLines.push('<ul class="my-4 space-y-2">');
        inList = true;
      }
      resultLines.push(`<li class="ml-5 list-disc font-semibold text-gray-600">${bulletMatch[1]}</li>`);
      continue;
    }

    // Paragraph
    closeList();
    resultLines.push(`<p class="mb-4 font-semibold text-gray-600">${line}</p>`);
  }
  closeList();

  return resultLines.join('\n');
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
            <p className="font-semibold text-gray-600 mb-6 text-base sm:text-lg leading-relaxed border-b border-gray-100 pb-6">
              {post.excerpt}
            </p>
            <div 
              className="space-y-4 pt-4"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
            />
          </div>
        </article>
      </main>


    </div>
  );
}
