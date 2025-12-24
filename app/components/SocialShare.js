"use client";
import { useState } from "react";

export default function SocialShare({ title, url, description }) {
  const [showShare, setShowShare] = useState(false);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    copy: () => {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div style={{ margin: "30px 0", padding: "20px", border: "1px solid var(--foreground)", borderRadius: "8px", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "15px" }}>
        <h4 style={{ margin: 0, color: "var(--foreground)", fontSize: "16px" }}>Share this article</h4>
        <button
          onClick={() => setShowShare(!showShare)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--foreground)",
            fontSize: "14px",
            padding: "4px 8px",
            borderRadius: "4px",
            transition: "background-color 0.2s"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(0,0,0,0.1)"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
        >
          {showShare ? "Hide" : "Show"} Options
        </button>
      </div>

      {showShare && (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px",
              background: "#1da1f2",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "14px",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
          >
            🐦 Twitter
          </a>

          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px",
              background: "#0077b5",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "14px",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
          >
            💼 LinkedIn
          </a>

          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px",
              background: "#1877f2",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "14px",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
          >
            📘 Facebook
          </a>

          <a
            href={shareLinks.reddit}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px",
              background: "#ff4500",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "14px",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
          >
            🟠 Reddit
          </a>

          <button
            onClick={shareLinks.copy}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px",
              background: "var(--foreground)",
              color: "var(--background)",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              cursor: "pointer",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
          >
            📋 Copy Link
          </button>
        </div>
      )}
    </div>
  );
}