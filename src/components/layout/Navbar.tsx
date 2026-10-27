/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { id: "home", name: "Home", href: "#home" },
  { id: "about", name: "About", href: "#about" },
  { id: "experience", name: "Work", href: "#experience" },
  { id: "services", name: "Services", href: "#services" },
  { id: "projects", name: "Projects", href: "#projects" },
] as const;

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const saved = window.localStorage.getItem("theme");
    const next =
      saved === "dark" || saved === "light"
        ? saved
        : root.classList.contains("light")
          ? "light"
          : "dark";
    setTheme(next);
    root.classList.toggle("dark", next === "dark");
    root.classList.toggle("light", next === "light");
  }, []);

  useEffect(() => {
    const updateActive = () => {
      const marker = 130;
      let current = "home";
      const all = [...NAV_LINKS, { id: "contact", name: "Contact", href: "#contact" }];

      for (const link of all) {
        const el = document.getElementById(link.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - marker <= 0) current = link.id;
      }

      setActiveSection(current);
      setScrolled(window.scrollY > 12);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.classList.toggle("light", next === "light");
    window.localStorage.setItem("theme", next);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] transition-all duration-300",
        scrolled ? "pt-0" : "pt-3 sm:pt-4"
      )}
    >
      <div
        className={cn(
          "mx-auto transition-all duration-300",
          scrolled ? "max-w-none px-0" : "max-w-[1180px] px-3 sm:px-4 md:px-6"
        )}
      >
        <nav
          className={cn(
            "relative flex h-[58px] items-center justify-between gap-3 transition-all duration-300 sm:h-16",
            scrolled
              ? "border-b border-[var(--border-color)] bg-[var(--background)]/90 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:px-6 lg:px-10"
              : "border border-[var(--border-color)] bg-[var(--background)]/70 px-3 backdrop-blur-xl sm:px-4"
          )}
        >
          {/* Brand */}
          <Link
            href="#home"
            onClick={() => setIsMobileMenuOpen(false)}
            className="relative z-[60] flex shrink-0 items-center gap-2.5"
          >
            <span className="flex h-8 w-8 items-center justify-center bg-[var(--accent)] font-display text-xs font-bold text-black">
              AE
            </span>
            <span className="font-cursive text-[1.55rem] leading-none text-[var(--foreground)] transition hover:text-[var(--accent)] sm:text-[1.7rem]">
              Ali Eman
            </span>
          </Link>

          {/* Desktop links */}
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <ul className="flex items-center gap-1 rounded-none border border-[var(--border-color)] bg-[var(--input-bg)]/80 p-1">
              {NAV_LINKS.map((link) => {
                const active = activeSection === link.id;
                return (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className={cn(
                        "relative block px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition xl:px-4",
                        active
                          ? "text-black"
                          : "text-[var(--gray-muted)] hover:text-[var(--foreground)]"
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 bg-[var(--accent)]"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Actions */}
          <div className="relative z-[60] flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center border border-[var(--border-color)] text-[var(--gray-light)] transition hover:border-[var(--accent)]/50 hover:text-[var(--accent)]"
              aria-label="Toggle theme"
            >
              {mounted && theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            <Link
              href="#contact"
              className={cn(
                "hidden items-center gap-1.5 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] transition sm:inline-flex",
                activeSection === "contact"
                  ? "border border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "bg-[var(--accent)] text-black hover:brightness-110"
              )}
            >
              Contact
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center border border-[var(--border-color)] text-[var(--foreground)] transition hover:border-[var(--accent)]/50 hover:text-[var(--accent)] lg:hidden"
              aria-label="Menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[40] bg-black/65 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-x-3 top-[72px] z-[50] border border-[var(--border-color)] bg-[var(--background)]/98 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:inset-x-4 lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {[...NAV_LINKS, { id: "contact", name: "Contact", href: "#contact" }].map(
                  (link, i) => {
                    const active = activeSection === link.id;
                    return (
                      <motion.div
                        key={link.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center justify-between px-3.5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition",
                            active
                              ? "bg-[var(--accent)] text-black"
                              : "text-[var(--gray-light)] hover:bg-[var(--input-bg)] hover:text-[var(--foreground)]"
                          )}
                        >
                          {link.name}
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              active ? "bg-black" : "bg-[var(--border-color)]"
                            )}
                          />
                        </Link>
                      </motion.div>
                    );
                  }
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
