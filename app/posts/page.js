"use client";
import Link from "next/link";
import { posts } from "../lib/posts";
import SearchPosts from "../components/SearchPosts";

export default function Posts() {
  return (
    <main style={{
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "40px 20px",
      fontFamily: "Arial",
      background: "var(--background)",
      color: "var(--foreground)"
    }}>
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{
          fontSize: "2.5rem",
          marginBottom: "10px",
          background: "linear-gradient(135deg, #0070f3, #00d4ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          📚 All Articles
        </h1>
        <p style={{
          fontSize: "1.1rem",
          color: "var(--foreground)",
          opacity: 0.8,
          margin: "0"
        }}>
          Discover insights on Machine Learning, Deep Learning, and Generative AI
        </p>
      </header>

      {/* Search Component */}
      <SearchPosts posts={posts} />

      {/* Posts Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "30px",
        marginBottom: "60px"
      }}>
        {posts.map((post) => (
          <article key={post.slug} style={{
            border: "1px solid #e1e5e9",
            borderRadius: "12px",
            overflow: "hidden",
            background: "var(--background)",
            transition: "all 0.3s ease",
            cursor: "pointer"
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
            <Link href={`/posts/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{
                width: "100%",
                height: "200px",
                backgroundImage: `url(${post.coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "#f5f5f5"
              }} />

              <div style={{ padding: "20px" }}>
                <h2 style={{
                  fontSize: "1.2rem",
                  margin: "0 0 10px 0",
                  lineHeight: "1.4",
                  color: "var(--foreground)"
                }}>
                  {post.title}
                </h2>

                <p style={{
                  fontSize: "0.9rem",
                  color: "var(--foreground)",
                  opacity: 0.8,
                  lineHeight: "1.5",
                  margin: "0 0 15px 0"
                }}>
                  {post.excerpt}
                </p>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.8rem",
                  color: "var(--foreground)",
                  opacity: 0.7
                }}>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      <footer style={{
        marginTop: "60px",
        paddingTop: "20px",
        borderTop: "1px solid #e1e5e9",
        textAlign: "center"
      }}>
        <p style={{
          margin: "0",
          color: "var(--foreground)",
          opacity: 0.7
        }}>
          Neural Hive - Exploring the frontiers of AI and Machine Learning
        </p>
        <p style={{
          margin: "10px 0 0 0",
          fontSize: "0.9rem",
          color: "var(--foreground)",
          opacity: 0.5
        }}>
          © 2025 Neural Hive. All rights reserved.
        </p>
      </footer>
    </main>
  );
}