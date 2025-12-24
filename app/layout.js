import Navbar from "./components/Navbar";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import ReadingProgress from "./components/reading-progress";
import BackToTop from "./components/BackToTop";

export const metadata = {
  title: "Neural Hive - ML & AI Blog",
  description: "Master Machine Learning, Deep Learning, and Generative AI through comprehensive guides and tutorials",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ margin: 0, fontFamily: "Arial", background: "var(--background)", color: "var(--foreground)" }}>
        <ThemeProvider>
          <ReadingProgress />
          <Navbar />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}