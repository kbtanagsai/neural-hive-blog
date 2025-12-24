"use client";
import { useEffect, useState, useCallback, useRef } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef(null);

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const newProgress = (scrollTop / height) * 100;
    setProgress(newProgress);
    setIsVisible(scrollTop > 100); // Show after scrolling 100px
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          updateProgress();
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
  }, [updateProgress]);

  if (!isVisible) return null;

  if (!isVisible) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "4px",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #0070f3, #00d4ff)",
          zIndex: 1000,
          transition: "width 0.1s ease-out",
          boxShadow: "0 0 10px rgba(0, 112, 243, 0.3)",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "10px",
          right: "20px",
          background: "var(--background)",
          color: "var(--foreground)",
          padding: "4px 8px",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: "bold",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
          border: "1px solid var(--foreground)",
          opacity: progress > 0 ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {Math.round(progress)}%
      </div>
    </>
  );
}