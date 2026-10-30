// components/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { isAdminRoute } from "@/constants/routes";
import { MotionConfig } from "framer-motion";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = isAdminRoute(pathname);

  if (isAdmin) {
    // Admin pages – no header/footer
    return <>{children}</>;
  }

  // Normal pages – full layout
  return (
    <MotionConfig reducedMotion="user">
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
    </MotionConfig>
  );
}
