// src/app/admin/layout.tsx
import { ThemeProvider } from "@/components/theme-provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-[var(--background)]">{children}</div>
    </ThemeProvider>
  );
}