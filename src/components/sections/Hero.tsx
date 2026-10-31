"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { FALLBACK_HERO } from "@/constants/fallback";
import { supabase } from "@/lib/supabase";
import CountUp from "@/components/ui/CountUp";
import BrandMark from "@/components/ui/BrandMark";
import { easeOut } from "@/lib/motion";

export default function Hero() {
  const [heroData, setHeroData] = useState(FALLBACK_HERO);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("hero").select("*").single();
      if (data) setHeroData({ ...FALLBACK_HERO, ...data });
    };
    load();
  }, []);

  const title = heroData.title || FALLBACK_HERO.title;
  const subtitle = heroData.subtitle || FALLBACK_HERO.subtitle;

  return (
    <section id="home" className="hero-editorial relative isolate flex min-h-[min(900px,100svh)] w-full items-center overflow-hidden px-5 pb-14 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pb-16 lg:pt-28">
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -8, 0], y: [0, 9, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-32 top-[18%] z-0 h-[min(62vw,38rem)] w-[min(62vw,38rem)] rounded-full border border-[var(--accent)]/[.06]"
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 7, 0], y: [0, -7, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="pointer-events-none absolute right-[-2rem] top-[29%] z-0 h-[min(44vw,27rem)] w-[min(44vw,27rem)] rounded-full border border-[var(--accent)]/[.05]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1240px] items-center gap-8 sm:gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-12 xl:gap-20">
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, ease: easeOut }} className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[.14em] text-[var(--foreground)] sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              Available for work
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--gray-muted)]"><MapPin size={13} className="text-[var(--accent)]" /> Lahore, Pakistan</span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .05, duration: .45 }} className="text-[11px] font-bold uppercase tracking-[.22em] text-[var(--accent)] sm:text-xs">{subtitle}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: .6, ease: easeOut }} className="mt-4 max-w-[800px] font-display text-[clamp(3.1rem,7vw,6.15rem)] font-bold leading-[.92] tracking-[-.065em] text-[var(--foreground)]">
            {(() => {
              const words = title.trim().split(/\s+/).map((word) => word.charAt(0) + word.slice(1).toLowerCase());
              const firstLine = words.length > 1 ? words.slice(0, -1).join(" ") : words[0];
              const lastLine = words.length > 1 ? words[words.length - 1] : "";
              return <><span className="block">{firstLine}</span>{lastLine && <span className="hero-title-accent block">{lastLine}<span className="text-[var(--accent)]">.</span></span>}</>;
            })()}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18, duration: .48 }} className="mt-6 max-w-[590px] font-display text-[clamp(1.3rem,2.35vw,2rem)] font-medium leading-[1.22] tracking-[-.035em] text-[var(--gray-light)]">
            Websites and Shopify stores that are <span className="text-[var(--foreground)]">fast, clear, and built to convert.</span>
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24, duration: .45 }} className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="#projects" className="group inline-flex h-[52px] items-center gap-3 rounded-full bg-[var(--accent)] px-6 text-sm font-bold text-[var(--background)] shadow-[0_10px_30px_color-mix(in_srgb,var(--accent)_20%,transparent)] transition hover:-translate-y-0.5 hover:brightness-105">Explore selected work <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
            <Link href="#contact" className="inline-flex h-[52px] items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--surface)]/60 px-6 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]">Start a conversation <ArrowRight size={15} /></Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .33, duration: .45 }} className="mt-7 grid max-w-[480px] grid-cols-3 gap-3 border-t border-[var(--border-color)] pt-5 sm:gap-6">
            {[
              { value: 3, label: "Years experience" },
              { value: 4, label: "Teams supported" },
              { value: 9, label: "Selected projects" },
            ].map((stat) => <div key={stat.label} className="border-l border-[var(--accent)]/45 pl-3 sm:pl-4"><p className="font-display text-3xl font-semibold tracking-[-.06em] text-[var(--foreground)] sm:text-4xl"><CountUp value={stat.value} suffix="+" immediate /></p><p className="mt-1 text-[9px] font-semibold uppercase leading-snug tracking-[.11em] text-[var(--gray-muted)] sm:text-[10px]">{stat.label}</p></div>)}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .12, duration: .7, ease: easeOut }} className="relative mx-auto w-full max-w-[540px] lg:max-w-none">
          <div className="overflow-hidden rounded-[1.35rem] border border-[var(--border-color)] bg-[var(--surface)] p-3 shadow-[0_30px_80px_rgba(18,32,20,.12)] sm:rounded-[1.6rem] sm:p-4">
            <div className="flex items-center justify-between px-1 pb-3 sm:px-2 sm:pb-4"><span className="text-[9px] font-bold uppercase tracking-[.18em] text-[var(--gray-muted)]">Featured case study</span><span className="font-mono text-[10px] text-[var(--gray-muted)]">01 / 09</span></div>
            <div className="relative aspect-[1.24/1] overflow-hidden rounded-[.95rem] bg-[#173b2b] sm:aspect-[1.28/1]">
              <img src="https://i.ibb.co/1GSxz37y/Responsive-ebsite-Mockup.png" alt="RUTE home services website displayed across desktop and mobile screens" className="absolute inset-0 h-full w-full object-cover object-center" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#101811]/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-6"><div><p className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/70">Web application · South Africa</p><p className="mt-1.5 font-display text-xl font-semibold leading-tight tracking-[-.03em] text-white sm:text-2xl">RUTE Home Services</p></div><span className="mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-sm"><ArrowUpRight size={16}/></span></div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 px-1 pt-4 sm:px-2 sm:pt-5"><div className="flex items-center gap-4 text-[11px] font-medium text-[var(--gray-light)]"><span className="inline-flex items-center gap-1.5"><BrandMark name="Next.js" size={14}/>Next.js</span><span className="inline-flex items-center gap-1.5"><BrandMark name="React.js" size={14}/>React</span><span className="inline-flex items-center gap-1.5"><BrandMark name="Supabase" size={14}/>Supabase</span></div><span className="text-[9px] font-semibold uppercase tracking-[.14em] text-[var(--accent)]">Product design & build</span></div>
          </div>
          <p className="mt-3 flex items-center justify-between px-1 text-[9px] font-semibold uppercase tracking-[.15em] text-[var(--gray-muted)]"><span>Selected client work</span><span>Lahore · Working worldwide</span></p>
        </motion.div>
      </div>
    </section>
  );
}
