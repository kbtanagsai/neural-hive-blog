"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

export default function SearchPosts({ posts }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (query.length > 2) {
      return posts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase())
      );
    }
    return [];
  }, [query, posts]);

  const isOpen = results.length > 0 && query.length > 2;

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleResultClick = () => {
    setQuery("");
  };

  return (
    <div style={{ position: "relative", margin: "20px 0" }}>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="🔍 Search articles..."
          style={{
            width: "100%",
            padding: "12px 16px",
            paddingRight: "40px",
            border: "1px solid #e1e5e9",
            borderRadius: "8px",
            fontSize: "14px",
            background: "var(--background)",
            color: "var(--foreground)",
            outline: "none",
            transition: "border-color 0.2s"
          }}
          onFocus={(e) => e.target.style.borderColor = "#0070f3"}
          onBlur={(e) => e.target.style.borderColor = "#e1e5e9"}
        />
        <span style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--foreground)",
          opacity: 0.5,
          fontSize: "16px"
        }}>
          {query ? "✕" : "🔍"}
        </span>
      </div>

      {isOpen && results.length > 0 && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "var(--background)",
          border: "1px solid #e1e5e9",
          borderRadius: "8px",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
          zIndex: 1000,
          maxHeight: "300px",
          overflowY: "auto",
          marginTop: "4px"
        }}>
          {results.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              onClick={handleResultClick}
              style={{ textDecoration: "none" }}
            >
              <div style={{
                padding: "12px 16px",
                borderBottom: "1px solid #f0f0f0",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(0, 112, 243, 0.05)"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
              >
                <h4 style={{
                  margin: "0 0 4px 0",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "var(--foreground)"
                }}>
                  {post.title}
                </h4>
                <p style={{
                  margin: "0",
                  fontSize: "12px",
                  color: "var(--foreground)",
                  opacity: 0.7,
                  lineHeight: "1.4"
                }}>
                  {post.excerpt.length > 100
                    ? `${post.excerpt.substring(0, 100)}...`
                    : post.excerpt
                  }
                </p>
                <div style={{
                  marginTop: "4px",
                  fontSize: "11px",
                  color: "var(--foreground)",
                  opacity: 0.6
                }}>
                  {post.date} • {post.readTime}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {isOpen && results.length === 0 && query.length > 2 && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "var(--background)",
          border: "1px solid #e1e5e9",
          borderRadius: "8px",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
          zIndex: 1000,
          padding: "16px",
          textAlign: "center",
          marginTop: "4px"
        }}>
          <p style={{
            margin: "0",
            color: "var(--foreground)",
            opacity: 0.7,
            fontSize: "14px"
          }}>
            No articles found for &quot;{query}&quot;
          </p>
        </div>
      )}
    </div>
  );
}