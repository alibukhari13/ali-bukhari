/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/layout/Footer.tsx

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Mail, Globe, Cpu } from "lucide-react";
import { supabase } from "@/lib/supabase";

const LinkedInIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Footer = () => {
  const [footerData, setFooterData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter = async () => {
    const { data } = await supabase.from("footer").select("*").single();
    if (data) setFooterData(data);
    setLoading(false);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (loading) return null;

  const navigationLinks = footerData.navigation_links || [];
  const portfolioLinks = footerData.portfolio_links || [];
  const socialLinks = footerData.social_links || [];

  return (
    <footer className="relative w-full bg-[var(--background)] pt-16 md:pt-24 pb-8 md:pb-12 px-6 md:px-[120px] border-t border-[var(--border-color)] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />
      <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 bg-[var(--accent)]/5 blur-[100px] rounded-full" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 text-center lg:text-left"
          >
            <Link
              href="/"
              className="text-3xl md:text-4xl font-cursive text-[var(--foreground)] hover:text-[var(--accent)] transition-all inline-block w-fit mx-auto lg:mx-0"
            >
              {footerData.logo_text}
            </Link>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[var(--foreground)] tracking-tighter uppercase leading-[1.2]">
              {footerData.tagline}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-end justify-center gap-8"
          >
            <div className="flex gap-4">
              {socialLinks.map((link: any, i: number) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--gray-light)] hover:text-[var(--accent)] transition-all duration-500 hover:scale-110 hover:border-[var(--accent)]/50"
                >
                  {link.name === "LinkedIn" && <LinkedInIcon />}
                </a>
              ))}
              <div
                onClick={scrollToTop}
                className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[var(--accent)] text-black flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,140,0,0.3)]"
              >
                <ArrowUp size={20} strokeWidth={3} />
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6 p-3 md:p-4 rounded-2xl bg-[var(--input-bg)] border border-[var(--border-color)] backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <p className="text-[8px] md:text-[10px] font-bold text-[var(--foreground)] uppercase tracking-[2px]">
                  System: Online
                </p>
              </div>
              <div className="h-3 md:h-4 w-[1px] bg-[var(--border-color)]" />
              <div className="flex items-center gap-2">
                <Cpu size={12} className="text-[var(--gray-muted)]" />
                <p className="text-[8px] md:text-[10px] font-bold text-[var(--foreground)] uppercase tracking-[2px]">
                  Core: Active
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 py-12 md:py-16 border-y border-[var(--border-color)]"
        >
          <div className="flex flex-col gap-4 md:gap-6">
            <p className="text-[var(--accent)] text-[10px] md:text-[11px] font-bold uppercase tracking-[4px]">
              Navigation
            </p>
            <div className="flex flex-col gap-3 text-[var(--gray-muted)] text-xs md:text-sm font-medium uppercase tracking-widest">
              {navigationLinks.map((link: any, i: number) => (
                <Link key={i} href={link.href} className="hover:text-[var(--foreground)] transition-colors hover:translate-x-1 inline-block">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            <p className="text-[var(--accent)] text-[10px] md:text-[11px] font-bold uppercase tracking-[4px]">
              Portfolio
            </p>
            <div className="flex flex-col gap-3 text-[var(--gray-muted)] text-xs md:text-sm font-medium uppercase tracking-widest">
              {portfolioLinks.map((link: any, i: number) => (
                <Link key={i} href={link.href} className="hover:text-[var(--foreground)] transition-colors hover:translate-x-1 inline-block">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            <p className="text-[var(--accent)] text-[10px] md:text-[11px] font-bold uppercase tracking-[4px]">
              Connect
            </p>
            <div className="flex flex-col gap-3 text-[var(--gray-muted)] text-xs md:text-sm font-medium uppercase tracking-widest">
              {socialLinks.map((link: any, i: number) => (
                <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors hover:translate-x-1 inline-block">
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            <p className="text-[var(--accent)] text-[10px] md:text-[11px] font-bold uppercase tracking-[4px]">
              Cloud
            </p>
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-[var(--gray-muted)]" />
              <p className="text-[var(--gray-muted)] text-xs md:text-sm uppercase font-bold tracking-widest">
                {footerData.cloud_text}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 md:mt-12"
        >
          <p className="text-[var(--gray-muted)] text-[8px] md:text-[10px] font-bold uppercase tracking-[4px] text-center md:text-left">
            {footerData.copyright_text}
          </p>
          <p className="text-[var(--gray-muted)] text-[8px] md:text-[10px] font-bold uppercase tracking-[4px] text-center md:text-right">
            Designed by <span className="text-[var(--foreground)]">{footerData.designed_by}</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;