import fs from "fs";
import path from "path";
import Header from "@/components/Header";
import CalculatorsClient from "./CalculatorsClient";
import { CATEGORIES_REGISTRY } from "@/lib/calculators";
import { Metadata } from "next";

interface Params {
  slug?: string[];
}

// Generate Static Params for all calculators in the registry to build them statically
export async function generateStaticParams() {
  const params: { slug?: string[] }[] = [
    { slug: undefined }, // Landing state
  ];

  CATEGORIES_REGISTRY.forEach((cat) => {
    cat.calculators.forEach((calc) => {
      params.push({ slug: [calc.id] });
    });
  });

  return params;
}

// Dynamic SEO Metadata Generation
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const activeSlug = slug && slug[0];

  if (!activeSlug) {
    return {
      title: "Financial Calculators | Wealthkare",
      description:
        "Explore our comprehensive suite of 50+ financial calculators for SIPs, Lumpsum, Step-up SIP, Goal planning, SWP, and Retirement planning.",
    };
  }

  // Find calculator details in registry
  let calcName = "";
  let catName = "";
  for (const cat of CATEGORIES_REGISTRY) {
    const calc = cat.calculators.find((c) => c.id === activeSlug);
    if (calc) {
      calcName = calc.name;
      catName = cat.name;
      break;
    }
  }

  if (!calcName) {
    return {
      title: "Calculator Workspace | Wealthkare",
      description: "Perform precise financial planning with our interactive calculator.",
    };
  }

  return {
    title: `${calcName} | Wealthkare`,
    description: `Calculate your returns and plan your wealth using our interactive ${calcName}. Designed for Indian investment models, ${catName.toLowerCase()} goals, and precise future value calculations.`,
  };
}

// Helper to clean mathematical expressions from raw LaTeX commands into readable text
function cleanMath(formula: string): string {
  let cleaned = formula;

  // Replace \frac{A}{B} recursively to handle nested fractions
  let prev;
  do {
    prev = cleaned;
    cleaned = cleaned.replace(/\\frac\{((?:[^{}]+|\{[^{}]*\})*)\}\{((?:[^{}]+|\{[^{}]*\})*)\}/g, '[ $1 ] / [ $2 ]');
  } while (cleaned !== prev);

  // Replace \text{...}
  cleaned = cleaned.replace(/\\text\{([^{}]+)\}/g, '$1');

  // Replace symbols
  cleaned = cleaned.replace(/\\times/g, ' × ');
  cleaned = cleaned.replace(/\\div/g, ' ÷ ');

  // Replace sub/superscripts of type _{word} or ^{word}
  cleaned = cleaned.replace(/\^\{([^{}]+)\}/g, '^$1');
  cleaned = cleaned.replace(/_\{([^{}]+)\}/g, '_$1');

  // Remove any remaining raw backslashes and braces
  cleaned = cleaned.replace(/\\/g, '');
  cleaned = cleaned.replace(/[{}]/g, '');

  return cleaned.trim();
}

// A simple robust markdown parser to convert explainers to styled HTML
function parseMarkdown(md: string): string {
  let html = md.trim();

  // 1. Remove frontmatter blocks
  html = html.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");

  // 2. Handle block formulas $$ ... $$
  html = html.replace(/\$\$([\s\S]*?)\$\$/g, (_, formula) => {
    const cleaned = cleanMath(formula);
    return `<div class="my-6 p-5 bg-[#FAF6EE] border border-[#EBDCCB]/30 rounded-2xl text-center font-serif text-base md:text-lg text-[#231F20] overflow-x-auto shadow-inner">${cleaned}</div>`;
  });

  // 3. Handle inline formulas $ ... $
  html = html.replace(/\$([\s\S]*?)\$/g, (_, formula) => {
    const cleaned = cleanMath(formula);
    return `<code class="px-1.5 py-0.5 bg-[#FAF6EE] border border-[#EBDCCB]/25 rounded text-xs font-mono font-bold text-[#BD924D]">${cleaned}</code>`;
  });

  // 4. Handle headers (###, ##, #)
  html = html.replace(/^###+ (.*$)/gim, '<h4 class="text-xs font-black tracking-widest text-[#BD924D] uppercase mt-6 mb-3">$1</h4>');
  html = html.replace(/^## (.*$)/gim, '<h3 class="text-sm font-black text-gray-800 tracking-widest mt-8 mb-4 border-b border-gray-100 pb-2 uppercase">$1</h3>');
  html = html.replace(/^# (.*$)/gim, '<h2 class="text-base font-black text-gray-800 tracking-widest mt-10 mb-4 border-b border-gray-250 pb-2 uppercase">$1</h2>');

  // 5. Line by line parsing for paragraphs and lists
  const lines = html.split('\n');
  const resultLines: string[] = [];
  let inList = false;
  let listType: "ul" | "ol" | null = null;

  const closeList = () => {
    if (inList) {
      resultLines.push(listType === "ol" ? "</ol>" : "</ul>");
      inList = false;
      listType = null;
    }
  };

  const parseInlineFormatting = (text: string): string => {
    let formatted = text;
    // Bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-[#231F20]">$1</strong>');
    formatted = formatted.replace(/__(.*?)__/g, '<strong class="font-extrabold text-[#231F20]">$1</strong>');
    // Italic
    formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>');
    formatted = formatted.replace(/_(.*?)_/g, '<em class="italic text-gray-700">$1</em>');
    return formatted;
  };

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) {
      closeList();
      continue;
    }

    // Check if line is header or div block
    if (line.startsWith("<h") || line.startsWith("<div")) {
      closeList();
      resultLines.push(line);
      continue;
    }

    // Check for bullet list item
    const bulletMatch = line.match(/^[\-\*]\s+(.*)$/);
    if (bulletMatch) {
      if (!inList || listType !== "ul") {
        closeList();
        resultLines.push('<ul class="my-4 space-y-2">');
        inList = true;
        listType = "ul";
      }
      let content = bulletMatch[1];
      content = parseInlineFormatting(content);
      resultLines.push(`<li class="ml-5 list-disc font-semibold text-gray-600">${content}</li>`);
      continue;
    }

    // Check for numbered list item
    const numMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      if (!inList || listType !== "ol") {
        closeList();
        resultLines.push('<ol class="my-4 space-y-2">');
        inList = true;
        listType = "ol";
      }
      let content = numMatch[2];
      content = parseInlineFormatting(content);
      resultLines.push(`<li class="ml-5 list-decimal font-semibold text-gray-600">${content}</li>`);
      continue;
    }

    // Otherwise, treat as paragraph
    closeList();
    line = parseInlineFormatting(line);
    resultLines.push(`<p class="mb-4 text-sm text-gray-600 font-semibold leading-relaxed">${line}</p>`);
  }

  closeList();
  return resultLines.join('\n');
}

// Loads explainers dynamically from markdown files
function getExplainers(): Record<string, string> {
  const explainers: Record<string, string> = {};
  const folderPath = path.join(process.cwd(), "src/content/calculators");

  if (!fs.existsSync(folderPath)) {
    return {};
  }

  const files = fs.readdirSync(folderPath);
  files.forEach((file) => {
    if (!file.endsWith(".md")) return;
    const slug = file.replace(".md", "");
    const filePath = path.join(folderPath, file);
    try {
      const rawContent = fs.readFileSync(filePath, "utf8");
      explainers[slug] = parseMarkdown(rawContent);
    } catch (e) {
      console.error(`Failed to load explainer for ${slug}`, e);
    }
  });

  return explainers;
}

export default async function CalculatorsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const initialSlug = slug && slug.length > 0 ? slug[0] : null;

  // Load and parse explainer files
  const explainers = getExplainers();

  return (
    <div className="flex flex-col bg-white min-h-screen select-none">

      <Header />

      {/* Main Client Shell */}
      <div className="flex-grow bg-white relative">
        <CalculatorsClient initialSlug={initialSlug} explainers={explainers} />
      </div>


    </div>
  );
}
