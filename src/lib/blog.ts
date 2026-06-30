import fs from "fs";
import path from "path";

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD for sorting
  dateLabel: string; // e.g., "June 2026"
  thumbnail: string;
  slug: string;
  category?: string;
  readTime: string;
  content: string;
}

export function getBlogPosts(): BlogPost[] {
  const blogDirectory = path.join(process.cwd(), "src/content/blog");
  
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(blogDirectory);
  const posts: BlogPost[] = [];

  filenames.forEach((filename) => {
    if (!filename.endsWith(".md")) return;

    const filePath = path.join(blogDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Robust custom frontmatter parser using regex
    const match = fileContent.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return;

    const [, frontmatterYaml, content] = match;
    const metadata: Record<string, string> = {};

    frontmatterYaml.split("\n").forEach((line) => {
      const splitIndex = line.indexOf(":");
      if (splitIndex !== -1) {
        const key = line.substring(0, splitIndex).trim();
        // Remove surrounding quotes and handle edge cases
        const value = line.substring(splitIndex + 1).trim().replace(/^['"]|['"]$/g, "");
        metadata[key] = value;
      }
    });

    posts.push({
      title: metadata.title || "",
      excerpt: metadata.excerpt || "",
      date: metadata.date || "",
      dateLabel: metadata.dateLabel || "",
      thumbnail: metadata.thumbnail || "",
      slug: metadata.slug || filename.replace(".md", ""),
      category: metadata.category,
      readTime: metadata.readTime || "5 mins read",
      content: content.trim(),
    });
  });

  // Sort by date newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
