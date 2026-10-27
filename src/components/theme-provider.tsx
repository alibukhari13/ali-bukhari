// components/theme-provider.tsx
"use client";

import * as React from "react";

/** Dark-only site — skip next-themes to avoid React 19 script-tag runtime errors. */
export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}) {
  return <>{children}</>;
}
