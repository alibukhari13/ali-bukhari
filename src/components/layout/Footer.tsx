/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Globe, Mail, MapPin, Phone } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { supabase } from "@/lib/supabase";
import { easeOut } from "@/lib/motion";

const FALLBACK_FOOTER = {
  logo_text: "Syed Ali Eman",
  tagline: "Building responsive web apps and Shopify stores that perform.",
  navigation_links: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
  ],
  portfolio_links: [
    { name: "Selected work", href: "#projects" },
    { name: "Resume", href: "/resume.pdf" },
  ],
  social_links: [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/syedalieman/" },
    { name: "Email", href: "mailto:syedalibukharishah16@gmail.com" },
  ],
  cloud_text: "Vercel",
  copyright_text: "© 2026 Syed Ali Eman.",
  designed_by: "Syed Ali Eman",
};

export default function Footer() {
  const [footerData, setFooterData] = useState<any>(FALLBACK_FOOTER);

  useEffect(() => {
    const fetchFooter = async () => {
      const { data } = await supabase.from("footer").select("*").single();
      if (data) setFooterData({ ...FALLBACK_FOOTER, ...data });
    };
    fetchFooter();
  }, []);

  const email = (footerData.social_links || FALLBACK_FOOTER.social_links).find((link: any) => link.name?.toLowerCase() === "email")?.href || "mailto:syedalibukharishah16@gmail.com";
  const navigation = (footerData.navigation_links || FALLBACK_FOOTER.navigation_links).slice(0, 5);
  const portfolio = footerData.portfolio_links || FALLBACK_FOOTER.portfolio_links;
  const socials = footerData.social_links || FALLBACK_FOOTER.social_links;
  const backToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden px-4 pb-7 pt-10 sm:px-6 sm:pt-14 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent" />
      <div className="relative z-10 mx-auto max-w-[1240px]">
        <motion.section initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: .5, ease: easeOut }} className="footer-cta relative isolate overflow-hidden rounded-[2rem] bg-[#18281d] px-6 py-8 text-white sm:px-10 sm:py-10 lg:px-14 lg:py-12">
          <div className="relative z-10 grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
            <div className="max-w-[700px]">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.05] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-white/70"><span className="h-1.5 w-1.5 rounded-full bg-[#a8dba0]"/> Open to good projects</p>
              <h2 className="font-display text-[clamp(2.35rem,5vw,4.8rem)] font-semibold leading-[.95] tracking-[-.065em]">Have a good idea?<br/><span className="text-[#a8dba0]">Let&apos;s make it real.</span></h2>
              <p className="mt-4 max-w-[490px] text-sm leading-relaxed text-white/60 sm:text-base">Tell me what you&apos;re building. I&apos;ll help turn the moving parts into a clear, polished digital experience.</p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <a href={email} className="group inline-flex h-12 items-center gap-3 rounded-xl bg-[#b1d5a4] px-5 text-sm font-semibold text-[#17251b] transition duration-200 hover:-translate-y-0.5 hover:bg-[#c4dfb9] hover:shadow-[0_12px_28px_rgba(157,203,166,.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b1d5a4]">Start a conversation <ArrowUpRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/></a>
              <span className="text-xs text-white/45">Usually replies within one business day</span>
            </div>
          </div>
        </motion.section>

        <div className="grid gap-10 border-b border-[var(--border-color)] py-10 sm:py-12 md:grid-cols-[1.3fr_.7fr_.7fr] lg:gap-16">
          <div>
            <Link href="#home" className="inline-flex items-center font-display text-xl font-semibold tracking-[-.04em] text-[var(--foreground)] transition hover:text-[var(--accent)]">{footerData.logo_text}</Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--gray-muted)]">{footerData.tagline}</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--gray-muted)]"><a href={email} className="inline-flex items-center gap-2 transition hover:text-[var(--accent)]"><Mail size={13}/>{email.replace(/^mailto:/, "")}</a><span className="inline-flex items-center gap-2"><MapPin size={13}/> Lahore, Pakistan</span></div>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[.16em] text-[var(--gray-muted)]">Explore</p>
            <div className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-1">
              {navigation.map((link: any) => <Link key={link.name} href={link.href} className="w-fit text-sm text-[var(--gray-light)] transition hover:translate-x-1 hover:text-[var(--accent)]">{link.name}</Link>)}
              {portfolio.map((link: any) => <Link key={link.name} href={link.href} className="w-fit text-sm text-[var(--gray-light)] transition hover:translate-x-1 hover:text-[var(--accent)]">{link.name}</Link>)}
            </div>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[.16em] text-[var(--gray-muted)]">Connect</p>
            <div className="flex flex-col items-start gap-3">
              {socials.map((link: any) => <a key={link.name} href={link.href} target={link.href?.startsWith("http") ? "_blank" : undefined} rel={link.href?.startsWith("http") ? "noopener noreferrer" : undefined} className="inline-flex items-center gap-2 text-sm text-[var(--gray-light)] transition hover:text-[var(--accent)]">{link.name.toLowerCase() === "linkedin" && <FaLinkedinIn size={14} aria-hidden="true"/>}{link.name}<ArrowUpRight size={13}/></a>)}
              <a href="tel:+923296590026" className="inline-flex items-center gap-2 text-sm text-[var(--gray-light)] transition hover:text-[var(--accent)]"><Phone size={13}/> +92 329 6590026</a>
              <span className="mt-1 inline-flex items-center gap-2 text-xs text-[var(--gray-muted)]"><Globe size={13} className="text-[var(--accent)]"/> Built for the web · {footerData.cloud_text}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 pt-5 text-[11px] text-[var(--gray-muted)] sm:flex-row sm:items-center">
          <p>{footerData.copyright_text}</p>
          <div className="flex items-center gap-5"><span>Designed & built by {footerData.designed_by}</span><button type="button" onClick={backToTop} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-color)] px-3 py-2 text-[var(--gray-light)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]">Back to top <ArrowUp size={13}/></button></div>
        </div>

      </div>
    </footer>
  );
}
