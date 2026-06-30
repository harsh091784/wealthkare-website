import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  light?: boolean;
}

export default function Breadcrumb({ items, light = false }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center flex-wrap gap-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider py-4 select-none ${light ? "text-gray-400" : "text-gray-500"}`}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={idx} className="flex items-center gap-1">
            {idx > 0 && <span className={light ? "text-gray-500 font-normal" : "text-gray-400 font-normal"}>/</span>}
            {isLast || !item.href ? (
              <span className="text-[#BD924D] font-bold">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className={light ? "hover:text-[#BD924D] text-gray-300 transition-colors" : "hover:text-[#BD924D] text-gray-600 transition-colors"}
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
