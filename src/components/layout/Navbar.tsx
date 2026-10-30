"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    const saved = window.localStorage.getItem("theme");
    const initial = saved === "light" || saved === "dark" ? saved : root.classList.contains("dark") ? "dark" : "light";
    setTheme(initial);
    root.classList.toggle("dark", initial === "dark");
    root.classList.toggle("light", initial === "light");

    const sections = ["home", ...links.map((link) => link.id), "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); }),
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.classList.toggle("light", next === "light");
    window.localStorage.setItem("theme", next);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-4 pt-4 sm:px-6 sm:pt-5">
      <nav aria-label="Main navigation" className={`relative z-[102] mx-auto flex h-[68px] max-w-[1220px] items-center justify-between rounded-2xl border px-3 transition-all duration-300 sm:px-6 ${scrolled ? "border-[var(--border-color)] bg-[var(--surface)]/95 shadow-[0_12px_36px_rgba(18,30,22,.12)] backdrop-blur-xl" : "border-[var(--border-color)]/80 bg-[var(--surface)]/80 backdrop-blur-lg"}`}>
        <Link href="#home" onClick={closeMenu} aria-label="Ali Eman, home" className="group flex items-center">
          <span className="font-display text-[20px] font-semibold tracking-[-.04em] text-[var(--foreground)] sm:text-2xl">Ali Eman<span className="text-[var(--accent)]">.</span></span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link key={link.id} href={`#${link.id}`} aria-current={active === link.id ? "page" : undefined} className={`relative rounded-xl px-3.5 py-2.5 text-[13px] font-medium transition-colors xl:px-4 ${active === link.id ? "text-[var(--accent)]" : "text-[var(--gray-light)] hover:text-[var(--foreground)]"}`}>
              {link.label}
              {active === link.id && <motion.span layoutId="nav-underline" className="absolute inset-x-3 bottom-1 h-[2px] rounded-full bg-[var(--accent)]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`} className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--gray-light)] transition hover:bg-[var(--input-bg)] hover:text-[var(--accent)]">
            {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <Link href="#contact" className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[var(--accent)] px-2.5 text-[11px] font-semibold text-[var(--accent-ink)] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--accent)]/20 sm:h-11 sm:gap-2 sm:px-4 sm:text-[13px]">Let&apos;s talk <ArrowUpRight size={14}/></Link>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-color)] text-[var(--foreground)] lg:hidden">{menuOpen ? <X size={18}/> : <Menu size={18}/>}</button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && <>
          <motion.button type="button" aria-label="Close navigation menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeMenu} className="fixed inset-0 z-[90] bg-black/35 backdrop-blur-[2px] lg:hidden" />
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .18 }} className="relative z-[101] mx-auto mt-2 max-w-[1220px] rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-2 shadow-2xl lg:hidden">
            {[{ id: "home", label: "Home" }, ...links, { id: "contact", label: "Contact" }].map((link) => <Link key={link.id} href={`#${link.id}`} onClick={closeMenu} aria-current={active === link.id ? "page" : undefined} className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition ${active === link.id ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "text-[var(--gray-light)] hover:bg-[var(--input-bg)]"}`}>{link.label}<ArrowUpRight size={15}/></Link>)}
          </motion.div>
        </>}
      </AnimatePresence>
    </header>
  );
}
