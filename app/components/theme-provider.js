"use client";

import { ThemeProvider as NextThemes } from "next-themes";

export function ThemeProvider({ children }) {
  return (
    <NextThemes
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
    >
      {children}
    </NextThemes>
  );
}