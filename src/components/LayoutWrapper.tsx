// components/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { isAdminRoute } from "@/constants/routes";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = isAdminRoute(pathname);

  if (isAdmin) {
    // Admin pages – no header/footer
    return <>{children}</>;
  }

  // Normal pages – full layout
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}