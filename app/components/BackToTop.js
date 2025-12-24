"use client";
import { useEffect, useState, useCallback, useRef } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef(null);

  const toggleVisibility = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      setIsVisible(window.pageYOffset > 300);
    });
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [toggleVisibility]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #0070f3, #00d4ff)",
        border: "none",
        color: "white",
        fontSize: "20px",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0, 112, 243, 0.3)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "translateY(-2px) scale(1.05)";
        e.target.style.boxShadow = "0 6px 20px rgba(0, 112, 243, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0) scale(1)";
        e.target.style.boxShadow = "0 4px 12px rgba(0, 112, 243, 0.3)";
      }}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}