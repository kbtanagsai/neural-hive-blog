"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ImageLightbox({ src, alt, children }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        style={{ cursor: "pointer", display: "inline-block" }}
      >
        {children}
      </div>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            padding: "20px",
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              style={{
                objectFit: "contain",
                borderRadius: "8px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
              }}
            />

            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                top: "-15px",
                right: "-15px",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}