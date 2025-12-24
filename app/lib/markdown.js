import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkHtml from "remark-html";

export async function parseMarkdown(content) {
  const processed = await unified()
    .use(remarkParse)
    .use(remarkSlug)
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);

  return processed.toString();
}

export function extractHeadings(content) {
  const lines = content.split('\n');
  const headings = [];

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();

      headings.push({
        level,
        text,
        id
      });
    }
  }

  return headings;
}