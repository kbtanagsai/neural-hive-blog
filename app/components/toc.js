"use client";
import { useEffect, useState } from "react";

export default function Toc() {
  const [headings, setHeadings] = useState([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const h2s = document.querySelectorAll("h2, h3");
    const headingsData = Array.from(h2s).map((h, index) => ({
      id: h.id || `heading-${index}`,
      text: h.textContent,
      level: h.tagName.toLowerCase(),
    }));
    setHeadings(headingsData); // eslint-disable-line react-hooks/set-state-in-effect

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.5 }
    );

    h2s.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  return (
    <aside style={{ flex: 1, position: "sticky", top: "80px" }}>
      <h4>Table of contents</h4>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id} style={{ marginLeft: heading.level === "h3" ? "20px" : "0" }}>
            <a
              href={`#${heading.id}`}
              style={{
                fontWeight: active === heading.id ? "bold" : "normal",
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}