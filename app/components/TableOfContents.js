"use client";
import { useEffect, useState, useCallback, useRef } from "react";

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState("");
  const rafRef = useRef(null);

  const updateActiveId = useCallback((id) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      setActiveId(id);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisible = null;
        let maxRatio = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisible = entry.target.id;
          }
        });

        if (mostVisible) {
          updateActiveId(mostVisible);
        }
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    // Observe all headings
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [headings, updateActiveId]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <aside style={{
      flex: "0 0 280px",
      position: "sticky",
      top: "40px",
      height: "fit-content",
      padding: "24px",
      border: "1px solid #e1e5e9",
      borderRadius: "12px",
      background: "var(--background)",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
    }}>
      <h3 style={{
        marginBottom: "20px",
        fontSize: "18px",
        fontWeight: "bold",
        color: "var(--foreground)",
        borderBottom: "2px solid #0070f3",
        paddingBottom: "8px"
      }}>
        📋 Table of contents
      </h3>
      <nav>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {headings.map((heading, index) => (
            <li key={index} style={{
              marginBottom: "6px",
              marginLeft: `${(heading.level - 1) * 16}px`,
              borderLeft: heading.level === 1 ? "3px solid #0070f3" : "none",
              paddingLeft: heading.level === 1 ? "12px" : "0"
            }}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                style={{
                  background: "none",
                  border: "none",
                  textDecoration: "none",
                  color: activeId === heading.id ? "#0070f3" : "var(--foreground)",
                  fontSize: heading.level === 1 ? "15px" : "14px",
                  fontWeight: heading.level === 1 ? "600" : "400",
                  display: "block",
                  padding: "6px 8px",
                  borderRadius: "6px",
                  transition: "all 0.2s ease",
                  lineHeight: "1.4",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  backgroundColor: activeId === heading.id ? "rgba(0, 112, 243, 0.1)" : "transparent",
                  borderLeft: activeId === heading.id ? "3px solid #0070f3" : "none"
                }}
                onMouseEnter={(e) => {
                  if (activeId !== heading.id) {
                    e.target.style.backgroundColor = "rgba(0, 112, 243, 0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeId !== heading.id) {
                    e.target.style.backgroundColor = "transparent";
                  }
                }}
              >
                {heading.text}
                {activeId === heading.id && (
                  <span style={{
                    marginLeft: "8px",
                    color: "#0070f3",
                    fontSize: "12px"
                  }}>
                    →
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}