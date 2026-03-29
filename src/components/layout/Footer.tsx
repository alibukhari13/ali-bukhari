// components/layout/Footer.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Mail, Globe, Cpu } from "lucide-react";

const LinkedInIcon = () => (
  <svg  width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative w-full bg-[var(--background)] pt-24 pb-12 px-8 md:px-[120px] border-t border-[var(--border-color)] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />
      <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 bg-[var(--accent)]/5 blur-[100px] rounded-full" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-6">
            <Link href="/" className="text-4xl font-cursive text-[var(--foreground)] hover:text-[var(--accent)] transition-all inline-block w-fit">
              Ali Bukhari
            </Link>
            <h2 className="text-3xl md:text-5xl font-black text-[var(--foreground)] tracking-tighter uppercase leading-[1.1]">
              Architecting the <span className="text-[var(--accent)]">Future</span> <br /> through Web Developer.
            </h2>
          </motion.div>

          <div className="flex flex-col md:items-end justify-center gap-8">
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/syedalieman/" target="_blank" className="w-14 h-14 rounded-2xl bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--gray-light)] hover:text-[var(--accent)] transition-all duration-500">
                <LinkedInIcon />
              </a>
              <div onClick={scrollToTop} className="w-14 h-14 rounded-2xl bg-[var(--accent)] text-black flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,140,0,0.3)]">
                <ArrowUp size={22} strokeWidth={3} />
              </div>
            </div>

            <div className="flex items-center gap-6 p-4 rounded-2xl bg-[var(--input-bg)] border border-[var(--border-color)] backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <p className="text-[10px] font-bold text-[var(--foreground)] uppercase tracking-[2px]">System: Online</p>
              </div>
              <div className="h-4 w-[1px] bg-[var(--border-color)]" />
              <div className="flex items-center gap-3">
                <Cpu size={14} className="text-[var(--gray-muted)]" />
                <p className="text-[10px] font-bold text-[var(--foreground)] uppercase tracking-[2px]">Core: Active</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16 border-y border-[var(--border-color)]">
          <div className="flex flex-col gap-6">
            <p className="text-[var(--accent)] text-[11px] font-bold uppercase tracking-[4px]">Navigation</p>
            <div className="flex flex-col gap-4 text-[var(--gray-muted)] text-sm font-medium uppercase tracking-widest">
              <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link>
              <Link href="#about" className="hover:text-[var(--foreground)] transition-colors">About</Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-[var(--accent)] text-[11px] font-bold uppercase tracking-[4px]">Portfolio</p>
            <div className="flex flex-col gap-4 text-[var(--gray-muted)] text-sm font-medium uppercase tracking-widest">
              <Link href="#projects" className="hover:text-[var(--foreground)] transition-colors">Selected Work</Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-[var(--accent)] text-[11px] font-bold uppercase tracking-[4px]">Connect</p>
            <div className="flex flex-col gap-4 text-[var(--gray-muted)] text-sm font-medium uppercase tracking-widest">
              <a href="https://www.linkedin.com/in/syedalieman/" className="hover:text-[var(--foreground)] transition-colors">LinkedIn</a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-[var(--accent)] text-[11px] font-bold uppercase tracking-[4px]">Cloud</p>
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-[var(--gray-muted)]" />
              <p className="text-[var(--gray-muted)] text-sm uppercase font-bold tracking-widest">Vercel</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
          <p className="text-[var(--gray-muted)] text-[10px] font-bold uppercase tracking-[4px]">
            &copy; {new Date().getFullYear()} Syed Ali DIGITAL.
          </p>
          <p className="text-[var(--gray-muted)] text-[10px] font-bold uppercase tracking-[4px]">
            Designed by <span className="text-[var(--foreground)]">Syed Ali Eman</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;