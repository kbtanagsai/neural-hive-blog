"use client";
import Link from "next/link";
import { posts } from "../lib/posts";

export default function RelatedPosts({ currentSlug }) {
  // Get related posts (excluding current post)
  const relatedPosts = posts
    .filter(post => post.slug !== currentSlug)
    .slice(0, 2); // Show 2 related posts

  if (relatedPosts.length === 0) return null;

  return (
    <div style={{
      margin: "40px 0",
      padding: "30px",
      border: "1px solid var(--foreground)",
      borderRadius: "12px",
      background: "var(--background)"
    }}>
      <h3 style={{
        margin: "0 0 20px 0",
        color: "var(--foreground)",
        fontSize: "20px",
        borderBottom: "2px solid #0070f3",
        paddingBottom: "10px"
      }}>
        📚 Related Articles
      </h3>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px"
      }}>
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            style={{ textDecoration: "none" }}
          >
            <article style={{
              padding: "20px",
              border: "1px solid #e1e5e9",
              borderRadius: "8px",
              background: "var(--background)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              height: "100%"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-4px)";
              e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
              e.target.style.borderColor = "#0070f3";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
              e.target.style.borderColor = "#e1e5e9";
            }}
            >
              <div style={{
                width: "100%",
                height: "150px",
                backgroundImage: `url(${post.coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "6px",
                marginBottom: "15px"
              }} />

              <h4 style={{
                margin: "0 0 10px 0",
                color: "var(--foreground)",
                fontSize: "16px",
                lineHeight: "1.4"
              }}>
                {post.title}
              </h4>

              <p style={{
                margin: "0 0 15px 0",
                color: "var(--foreground)",
                fontSize: "14px",
                lineHeight: "1.5",
                opacity: 0.8
              }}>
                {post.excerpt.length > 120
                  ? `${post.excerpt.substring(0, 120)}...`
                  : post.excerpt
                }
              </p>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "12px",
                color: "var(--foreground)",
                opacity: 0.7
              }}>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}