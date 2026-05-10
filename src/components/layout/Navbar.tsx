/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("Home");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Intersection Observer Logic (Aapki original logic)
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
      if (window.scrollY < 100) setActiveSection("Home");
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
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300 font-sans">
      <nav
        role="navigation"
        className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-2.5 rounded-xl transition-all duration-300 bg-[var(--background)]/60 backdrop-blur-xl shadow-lg border border-[var(--border-color)] relative"
      >
        {/* LOGO AREA */}
        <Link 
          href="/" 
          className="text-xl md:text-2xl font-cursive text-[var(--foreground)] shrink-0 relative z-[210]"
        >
          ALI BUKHARI
        </Link>

        {/* Vertical Divider (Desktop Only) */}

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-1.5 text-sm font-medium absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={cn(
                  "px-3.5 py-1.5 text-[14px] transition-all duration-200 font-normal rounded-lg hover:bg-[var(--foreground)]/5",
                  activeSection === link.name
                    ? "text-[var(--accent)]"
                    : "text-[var(--gray-light)] hover:text-[var(--foreground)]"
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4 relative z-[210]">
          {/* Contact Button (Inspired Style) */}
          <Link
            href="#contact"
            className="hidden md:inline-flex items-center px-5 py-2 text-[13px] font-bold text-[var(--foreground)] border border-[var(--border-color)] rounded-xl hover:border-[var(--accent)] transition-all duration-300"
          >
            Contact Me
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-[var(--gray-light)] hover:text-[var(--foreground)] cursor-pointer transition-colors bg-[var(--foreground)]/5 rounded-lg"
          >
            {mounted && theme === "light" ? (
              <Moon size={18} strokeWidth={1.5} />
            ) : (
              <Sun size={18} strokeWidth={1.5} />
            )}
          </button>

          {/* Hamburger Icon (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[var(--gray-light)] p-2 hover:bg-[var(--foreground)]/10 rounded-xl transition-all"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu logic (TECHZOQ style) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] lg:hidden mt-[-1rem] ml-[-1rem] w-[200vw] h-[200vh]"
              />
              
              {/* Sidebar card coming from top/center */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="absolute top-20 left-0 right-0 z-[200] md:hidden px-2"
              >
                <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-[2rem] p-8 shadow-2xl flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-lg font-medium transition-colors px-2",
                        activeSection === link.name
                          ? "text-[var(--accent)]"
                          : "text-[var(--gray-light)]"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="h-px bg-[var(--border-color)] my-2" />
                  <Link
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center py-4 rounded-2xl border border-[var(--border-color)] text-[var(--foreground)] font-bold bg-[var(--foreground)]/5"
                  >
                    Contact Me
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;