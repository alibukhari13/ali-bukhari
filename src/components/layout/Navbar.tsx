// components/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("Home");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id") || "";
            const sectionName = id.charAt(0).toUpperCase() + id.slice(1);
            setActiveSection(sectionName === "" ? "Home" : sectionName);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-80px 0px 0px 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    const handleScrollTop = () => {
      if (window.scrollY < 100) {
        setActiveSection("Home");
      }
    };
    window.addEventListener("scroll", handleScrollTop);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 h-24 flex items-center bg-[var(--background)]/60 backdrop-blur-xl px-[120px] border-b border-[var(--border-color)]">
      <div className="w-full flex items-center justify-between">
        <Link href="/" className="text-3xl font-cursive text-[var(--foreground)]">
          ALI BUKHARI
        </Link>

        <nav className="hidden md:flex items-center gap-14 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-[15px] font-medium transition-colors",
                activeSection === link.name
                  ? "text-[var(--accent)]"
                  : "text-[var(--gray-light)] hover:text-[var(--foreground)]"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-10">
          <Link
            href="#contact"
            className="px-6 py-2 border border-[var(--border-color)] text-[var(--foreground)] rounded-lg text-sm font-medium hover:border-[var(--accent)] transition-all"
          >
            Contact Me
          </Link>

          <button
            onClick={toggleTheme}
            className="text-[var(--gray-light)] hover:text-[var(--foreground)] cursor-pointer transition-colors"
          >
            {mounted && theme === "light" ? (
              <Moon size={20} strokeWidth={1.5} />
            ) : (
              <Sun size={20} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;