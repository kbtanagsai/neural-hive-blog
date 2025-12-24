"use client";
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // "success", "error", or ""
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call (replace with actual newsletter service)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      margin: "40px 0",
      padding: "30px",
      border: "1px solid var(--foreground)",
      borderRadius: "12px",
      background: "linear-gradient(135deg, var(--background) 0%, rgba(0, 112, 243, 0.05) 100%)",
      textAlign: "center"
    }}>
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{
          margin: "0 0 10px 0",
          color: "var(--foreground)",
          fontSize: "20px"
        }}>
          📧 Stay Updated
        </h3>
        <p style={{
          margin: "0",
          color: "var(--foreground)",
          opacity: 0.8,
          fontSize: "14px",
          lineHeight: "1.5"
        }}>
          Get the latest ML and AI insights delivered to your inbox.
          No spam, unsubscribe anytime.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            style={{
              flex: 1,
              padding: "12px 16px",
              border: "1px solid #e1e5e9",
              borderRadius: "6px",
              fontSize: "14px",
              background: "var(--background)",
              color: "var(--foreground)",
              outline: "none",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => e.target.style.borderColor = "#0070f3"}
            onBlur={(e) => e.target.style.borderColor = "#e1e5e9"}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: "12px 20px",
              background: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              opacity: isSubmitting ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = "#0056b3";
                e.target.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = "#0070f3";
                e.target.style.transform = "translateY(0)";
              }
            }}
          >
            {isSubmitting ? "..." : "Subscribe"}
          </button>
        </div>

        {status === "success" && (
          <p style={{
            margin: "0",
            color: "#28a745",
            fontSize: "14px",
            fontWeight: "bold"
          }}>
            ✅ Thanks for subscribing! Check your email for confirmation.
          </p>
        )}

        {status === "error" && (
          <p style={{
            margin: "0",
            color: "#dc3545",
            fontSize: "14px"
          }}>
            ❌ Please enter a valid email address.
          </p>
        )}
      </form>

      <p style={{
        margin: "15px 0 0 0",
        fontSize: "12px",
        color: "var(--foreground)",
        opacity: 0.6
      }}>
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}