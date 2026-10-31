"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { supabase } from "@/lib/supabase";

const FALLBACK_FOOTER = {
  logo_text: "Syed Ali Eman",
  tagline: "Building responsive web apps and Shopify stores that perform.",
  copyright_text: "© 2026 Syed Ali Eman.",
  designed_by: "Syed Ali Eman",
  social_links: [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/syedalieman/" },
    { name: "Email", href: "mailto:syedalibukharishah16@gmail.com" },
  ],
};

export default function Footer() {
  const [footerData, setFooterData] = useState(FALLBACK_FOOTER);
  const [email, setEmail] = useState("syedalibukharishah16@gmail.com");

  useEffect(() => {
    const load = async () => {
      const [{ data: footer }, { data: contact }] = await Promise.all([
        supabase.from("footer").select("*").single(),
        supabase.from("contact").select("email").single(),
      ]);
      if (footer) setFooterData({ ...FALLBACK_FOOTER, ...footer });
      if (contact?.email) setEmail(contact.email);
    };
    load();
  }, []);

  const linkedin = footerData.social_links.find((link) => link.name?.toLowerCase() === "linkedin")?.href || "https://www.linkedin.com/in/syedalieman/";

  return (
    <footer className="relative px-5 pb-7 pt-5 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-7 py-8 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <Link href="#home" className="font-display text-lg font-semibold tracking-[-.04em] text-[var(--foreground)] hover:text-[var(--accent)]">{footerData.logo_text}<span className="text-[var(--accent)]">.</span></Link>
            <p className="mt-2 max-w-sm text-sm text-[var(--gray-muted)]">{footerData.tagline}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-[var(--gray-light)]">
            <Link href="#about" className="hover:text-[var(--accent)]">About</Link>
            <Link href="#experience" className="hover:text-[var(--accent)]">Experience</Link>
            <Link href="#projects" className="hover:text-[var(--accent)]">Work</Link>
            <a href={`mailto:${email}`} className="inline-flex items-center gap-1.5 hover:text-[var(--accent)]"><Mail size={13}/> Email <ArrowUpRight size={12}/></a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[var(--accent)]"><FaLinkedinIn size={13}/> LinkedIn <ArrowUpRight size={12}/></a>
            <a href="tel:+923296590026" className="inline-flex items-center gap-1.5 hover:text-[var(--accent)]"><Phone size={13}/> +92 329 6590026</a>
            <span className="inline-flex items-center gap-1.5 text-[var(--gray-muted)]"><MapPin size={13}/> Lahore, Pakistan</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-[var(--border-color)] py-4 text-[11px] text-[var(--gray-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>{footerData.copyright_text}</p>
          <div className="flex items-center gap-5"><span>Designed & built by {footerData.designed_by}</span><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-1.5 hover:text-[var(--accent)]">Back to top <ArrowUp size={13}/></button></div>
        </div>
      </div>
    </footer>
  );
}
