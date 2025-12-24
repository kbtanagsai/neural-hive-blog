import Link from "next/link";
import { memo } from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = memo(function Navbar() {
  return (
    <nav style={{ padding: "20px", textAlign: "center", borderBottom: "1px solid var(--foreground)" }}>
      <Link href="/" style={{ marginRight: "15px", textDecoration: "none", color: "var(--foreground)" }}>Home</Link>
      <Link href="/about" style={{ marginRight: "15px", textDecoration: "none", color: "var(--foreground)" }}>About</Link>
      <Link href="/ethos" style={{ marginRight: "15px", textDecoration: "none", color: "var(--foreground)" }}>Ethos</Link>
      <Link href="/posts" style={{ marginRight: "15px", textDecoration: "none", color: "var(--foreground)" }}>Posts</Link>
      <Link href="/contact" style={{ marginRight: "15px", textDecoration: "none", color: "var(--foreground)" }}>Contact</Link>
      <ThemeToggle />
    </nav>
  );
});

export default Navbar;