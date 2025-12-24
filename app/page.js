import Link from "next/link";
import Image from "next/image";
import { posts } from "./lib/posts";

export default function Home() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "Arial", background: "var(--background)", color: "var(--foreground)" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>ML MONDAYS</h1>

      <Image
        src="https://ml-mondays.netlify.app/images/image.png"
        alt="ML Mondays Logo"
        width={540}
        height={270}
        style={{ width: "100%", height: "auto", marginBottom: "20px" }}
      />

      <p style={{ fontSize: "1.2rem", lineHeight: "1.6", marginBottom: "40px" }}>
        Welcome to **ML MONDAYS**, my weekly exploration into the fascinating world of Machine Learning, Deep Learning, and Artificial Intelligence. Here, I break down complex concepts, share insights from my learning journey, and discuss the latest developments in AI.
      </p>

      {posts.map((post) => (
        <article key={post.slug} style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
            <Link href={`/posts/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              {post.title}
            </Link>
          </h2>

          <Image
            src={post.coverImage}
            alt={post.title}
            width={600}
            height={300}
            unoptimized
            style={{ width: "100%", height: "auto", marginBottom: "10px" }}
          />

          <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "10px" }}>
            {post.date} • {post.readTime}
          </p>

          <p style={{ lineHeight: "1.6", marginBottom: "10px" }}>
            {post.excerpt}
          </p>

          <Link href={`/posts/${post.slug}`} style={{ textDecoration: "none", color: "#0070f3" }}>
            Read more ⟶
          </Link>
        </article>
      ))}

      <footer style={{ marginTop: "60px", paddingTop: "20px", borderTop: "1px solid #ccc", textAlign: "center" }}>
        <p>Neuralhive PESU ECC © 2025</p>
      </footer>
    </main>
  );
}
