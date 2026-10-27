/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Globe, Mail, Phone, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ParticleWave from "@/components/charts/ParticleWave";
import DotWave from "@/components/charts/DotWave";
import MiniSparkline from "@/components/ui/MiniSparkline";
import { easeOut } from "@/lib/motion";

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FALLBACK_FOOTER = {
  logo_text: "Syed Ali Eman",
  tagline: "Building responsive web apps and Shopify stores that perform.",
  navigation_links: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ],
  portfolio_links: [
    { name: "Selected Work", href: "#projects" },
    { name: "Resume PDF", href: "/resume.pdf" },
  ],
  social_links: [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/syedalieman/" },
    { name: "Email", href: "mailto:syedalibukharishah16@gmail.com" },
  ],
  cloud_text: "Vercel",
  copyright_text: "© 2026 Syed Ali Eman.",
  designed_by: "Syed Ali Eman",
};

const linkHover = { x: 4, color: "var(--accent)" };

const Footer = () => {
  const [footerData, setFooterData] = useState<any>(FALLBACK_FOOTER);

  useEffect(() => {
    const fetchFooter = async () => {
      const { data } = await supabase.from("footer").select("*").single();
      if (data) setFooterData({ ...FALLBACK_FOOTER, ...data });
    };
    fetchFooter();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const navigationLinks = footerData.navigation_links || FALLBACK_FOOTER.navigation_links;
  const portfolioLinks = footerData.portfolio_links || FALLBACK_FOOTER.portfolio_links;
  const socialLinks = footerData.social_links || FALLBACK_FOOTER.social_links;

  const columns = [
    { title: "Navigation", links: navigationLinks },
    { title: "Portfolio", links: portfolioLinks },
    { title: "Connect", links: socialLinks },
  ];

  return (
    <footer className="relative z-10 w-full overflow-hidden border-t border-[var(--border-color)] px-4 pb-10 pt-14 md:px-6 md:pb-12 md:pt-16">
      <div className="pointer-events-none absolute inset-0 section-grid opacity-20" aria-hidden />
      <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-[var(--accent)]/10 blur-[90px]" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[var(--accent)]/8 blur-[100px]" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-50 md:h-40">
        <ParticleWave rows={16} amplitude={18} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px]">
        <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <Link
                href="#home"
                className="font-display text-2xl uppercase tracking-tight text-[var(--foreground)] transition hover:text-[var(--accent)] md:text-3xl"
              >
                {footerData.logo_text}
              </Link>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.5, ease: easeOut }}
              className="mt-4 max-w-lg font-display text-2xl uppercase leading-tight tracking-tight text-[var(--foreground)] md:text-3xl"
            >
              {footerData.tagline}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-4 max-w-sm"
            >
              <DotWave tone="soft" />
            </motion.div>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-[var(--gray-light)]">
              {[
                {
                  icon: Mail,
                  label: "syedalibukharishah16@gmail.com",
                  href: "mailto:syedalibukharishah16@gmail.com",
                },
                {
                  icon: Phone,
                  label: "+92 329 6590026",
                  href: "tel:+923296590026",
                },
                {
                  icon: MapPin,
                  label: "Lahore, Pakistan",
                  href: null,
                },
              ].map((item, i) => {
                const Icon = item.icon;
                const content = (
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.18 + i * 0.06 }}
                    whileHover={{ x: 3 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Icon size={14} className="text-[var(--accent)]" />
                    {item.label}
                  </motion.span>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="transition hover:text-[var(--accent)]"
                  >
                    {content}
                  </a>
                ) : (
                  <span key={item.label}>{content}</span>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5, ease: easeOut }}
            className="flex flex-col justify-end gap-4"
          >
            <div className="panel p-4 backdrop-blur-sm">
              <div className="mb-2 flex items-center justify-between">
                <motion.div
                  className="flex items-center gap-2"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--foreground)]">
                    Available for work
                  </span>
                </motion.div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--gray-muted)]">
                  Open
                </span>
              </div>
              <MiniSparkline data={[32, 44, 40, 58, 52, 70, 66, 84]} height={40} />
            </div>

            <div className="flex items-center gap-3 lg:justify-end">
              {socialLinks.map((link: any, i: number) =>
                link.name === "LinkedIn" ? (
                  <motion.a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -3, borderColor: "var(--accent)", color: "var(--accent)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: 0.15 }}
                    className="flex h-11 w-11 items-center justify-center border border-[var(--border-color)] text-[var(--gray-light)]"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </motion.a>
                ) : null
              )}
              <motion.button
                type="button"
                onClick={scrollToTop}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.92 }}
                animate={{ y: [0, -3, 0] }}
                transition={{
                  y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                  delay: 0.2,
                }}
                className="flex h-11 w-11 items-center justify-center bg-[var(--accent)] text-black"
                aria-label="Back to top"
              >
                <ArrowUp size={16} strokeWidth={2.5} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-8 border-y border-[var(--border-color)] py-9 sm:grid-cols-4">
          {columns.map((col, colIndex) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: colIndex * 0.08, duration: 0.45, ease: easeOut }}
              className="flex flex-col gap-3"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                {col.title}
              </p>
              <div className="flex flex-col gap-2 text-xs font-medium uppercase tracking-widest text-[var(--gray-muted)] md:text-sm">
                {col.links.map((link: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + colIndex * 0.06 + i * 0.04 }}
                  >
                    <motion.div whileHover={linkHover}>
                      <Link href={link.href} className="block">
                        {link.name}
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24, duration: 0.45, ease: easeOut }}
            className="flex flex-col gap-3"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              Stack & Cloud
            </p>
            <div className="space-y-2 text-xs uppercase tracking-widest text-[var(--gray-muted)] md:text-sm">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                React · Next.js · Shopify
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.36 }}
              >
                Node · Express · MongoDB
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.42 }}
                className="flex items-center gap-2 pt-1"
              >
                <motion.span
                  animate={{ rotate: [0, 15, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Globe size={13} className="text-[var(--accent)]" />
                </motion.span>
                <span className="font-bold text-[var(--foreground)]">{footerData.cloud_text}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 flex flex-col items-center justify-between gap-3 md:flex-row"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--gray-muted)]">
            {footerData.copyright_text}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--gray-muted)]">
            Designed by{" "}
            <motion.span
              className="inline-block text-[var(--foreground)]"
              whileHover={{ color: "var(--accent)" }}
            >
              {footerData.designed_by}
            </motion.span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
