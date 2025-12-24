import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { parseMarkdown, extractHeadings } from "../../lib/markdown";
import SocialShare from "../../components/SocialShare";
import RelatedPosts from "../../components/RelatedPosts";
import TableOfContents from "../../components/TableOfContents";
import NewsletterSignup from "../../components/NewsletterSignup";

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "content");
  const files = fs.readdirSync(contentDir);
  const slugs = files
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''));

  return slugs.map(slug => ({
    slug,
  }));
}

export default async function Post({ params }) {
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    notFound();
  }

  const filePath = path.join(process.cwd(), "content", `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const headings = extractHeadings(content);
  const html = await parseMarkdown(content);

  // Get post metadata
  const posts = (await import("../../lib/posts")).posts;
  const currentPost = posts.find(p => p.slug === slug);

  return (
    <div style={{
      display: "flex",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "40px 20px",
      fontFamily: "Arial",
      background: "var(--background)",
      color: "var(--foreground)",
      gap: "40px"
    }}>
      {/* Enhanced Table of Contents Sidebar */}
      {headings.length > 0 && (
        <TableOfContents headings={headings} />
      )}

      {/* Main Content */}
      <main style={{ flex: 1, minWidth: 0 }}>
        {/* Post Header */}
        {currentPost && (
          <header style={{ marginBottom: "30px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginBottom: "15px",
              fontSize: "14px",
              color: "var(--foreground)",
              opacity: 0.7
            }}>
              <span>{currentPost.date}</span>
              <span>•</span>
              <span>{currentPost.readTime}</span>
            </div>
            <h1 style={{
              margin: "0 0 20px 0",
              fontSize: "32px",
              fontWeight: "bold",
              lineHeight: "1.2",
              color: "var(--foreground)"
            }} className="post-title">
              {currentPost.title}
            </h1>
          </header>
        )}

        {/* Article Content */}
        <article
          dangerouslySetInnerHTML={{ __html: html }}
          style={{
            lineHeight: "1.7",
            fontSize: "16px"
          }}
        />

        {/* Social Sharing */}
        {currentPost && (
          <SocialShare
            title={currentPost.title}
            url={`https://your-domain.com/posts/${slug}`}
            description={currentPost.excerpt}
          />
        )}

        {/* Newsletter Signup */}
        <NewsletterSignup />

        {/* Related Posts */}
        <RelatedPosts currentSlug={slug} />
      </main>
    </div>
  );
}