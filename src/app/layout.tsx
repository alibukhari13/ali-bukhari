import type { Metadata } from "next";
import { Syne, Outfit, Dancing_Script } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import LayoutWrapper from "@/components/LayoutWrapper";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const cursive = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-cursive",
});

export const metadata: Metadata = {
  title: "Syed Ali Eman | Web Developer",
  description:
    "Web Developer with 3+ years of experience building responsive web applications and Shopify stores with React.js, Next.js, and the MERN stack.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${display.variable} ${body.variable} ${cursive.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="page-atmosphere" aria-hidden />
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
