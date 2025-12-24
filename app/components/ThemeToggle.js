"use client";
import { useTheme } from "next-themes";
import { memo } from "react";

const ThemeToggle = memo(function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{
        padding: "8px 12px",
        background: "var(--foreground)",
        color: "var(--background)",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.target.style.opacity = "0.8";
      }}
      onMouseLeave={(e) => {
        e.target.style.opacity = "1";
      }}
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
});

export default ThemeToggle;