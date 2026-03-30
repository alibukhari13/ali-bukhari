/* eslint-disable react-hooks/set-state-in-effect */
// components/Navbar.tsx
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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
  ];

  // Stagger children animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <>
      {/* Header - fixed at top on all screens */}
      <header className="fixed top-0 left-0 w-full z-50 h-24 flex items-center bg-[var(--background)]/60 backdrop-blur-xl px-6 md:px-[120px] border-b border-[var(--border-color)]">
        {/* Mobile: Hamburger (left) */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden absolute left-6 text-[var(--gray-light)] hover:text-[var(--foreground)] cursor-pointer transition-colors"
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>

        {/* Logo - centered on mobile, normal on desktop */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-cursive text-[var(--foreground)] absolute left-1/2 -translate-x-1/2 md:static md:left-auto md:translate-x-0"
        >
          ALI BUKHARI
        </Link>

        {/* Desktop Navigation */}
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

        {/* Right section: Contact (desktop) + Theme Toggle */}
        <div className="flex items-center gap-6 md:gap-10 ml-auto">
          <Link
            href="#contact"
            className="hidden md:inline-block px-6 py-2 border border-[var(--border-color)] text-[var(--foreground)] rounded-lg text-sm font-medium hover:border-[var(--accent)] transition-all"
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
      </header>

      {/* Mobile Sidebar (Left) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Drawer - slides from left */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-[280px] bg-[var(--background)] border-r border-[var(--border-color)] z-50 md:hidden shadow-xl flex flex-col"
            >
              <div className="flex justify-end p-6">
                <button
                  onClick={closeMobileMenu}
                  className="text-[var(--gray-light)] hover:text-[var(--foreground)] cursor-pointer transition-colors"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center gap-8 px-6"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={itemVariants} className="w-full">
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "text-lg font-medium transition-colors w-full text-center block py-2",
                        activeSection === link.name
                          ? "text-[var(--accent)]"
                          : "text-[var(--gray-light)] hover:text-[var(--foreground)]"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div variants={itemVariants} className="w-full">
                  <Link
                    href="#contact"
                    onClick={closeMobileMenu}
                    className="w-full block text-center px-6 py-3 border border-[var(--border-color)] text-[var(--foreground)] rounded-lg text-sm font-medium hover:border-[var(--accent)] transition-all mt-4"
                  >
                    Contact Me
                  </Link>
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  onClick={() => {
                    toggleTheme();
                    closeMobileMenu();
                  }}
                  className="flex items-center gap-3 text-[var(--gray-light)] hover:text-[var(--foreground)] cursor-pointer transition-colors mt-6"
                >
                  {mounted && theme === "light" ? (
                    <>
                      <Moon size={20} strokeWidth={1.5} />
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun size={20} strokeWidth={1.5} />
                      <span>Light Mode</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;