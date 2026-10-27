/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ParticleWave from "@/components/charts/ParticleWave";
import HeroGraph from "@/components/ui/HeroGraph";
import MiniSparkline from "@/components/ui/MiniSparkline";
import CountUp from "@/components/ui/CountUp";
import { FALLBACK_HERO } from "@/constants/fallback";
import { PROJECTS } from "@/constants/projects";
import { easeOut } from "@/lib/motion";

const STACK = ["React.js", "Next.js", "Shopify", "Node.js", "MongoDB", "Tailwind"];

const OFFERINGS = [
  { title: "Web apps", detail: "React & Next.js products" },
  { title: "Shopify stores", detail: "Themes, apps & checkout" },
  { title: "API work", detail: "Node, Express & MongoDB" },
];

const FALLBACK_FEATURED = {
  title: PROJECTS[0].title,
  category: PROJECTS[0].category,
  description: PROJECTS[0].description,
  image_url: PROJECTS[0].image,
  tags: PROJECTS[0].tags,
  link: PROJECTS[0].link,
};

const normalizeTags = (tags: unknown): string[] => {
  if (Array.isArray(tags)) return tags.map(String);
  if (typeof tags === "string") {
    try {
      const parsed = JSON.parse(tags);
      return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      return tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }
  }
  return [];
};

const Hero = () => {
  const [heroData, setHeroData] = useState<any>(FALLBACK_HERO);
  const [featured, setFeatured] = useState(FALLBACK_FEATURED);

  useEffect(() => {
    const fetchHeroAndFeatured = async () => {
      const [heroRes, projectRes] = await Promise.all([
        supabase.from("hero").select("*").single(),
        supabase
          .from("projects")
          .select("*")
          .order("order_index", { ascending: true })
          .limit(1),
      ]);

      if (heroRes.data) setHeroData(heroRes.data);

      const first = projectRes.data?.[0];
      if (first) {
        const tags = normalizeTags(first.tags);
        setFeatured({
          title: first.title || FALLBACK_FEATURED.title,
          category: first.category || FALLBACK_FEATURED.category,
          description: first.description || FALLBACK_FEATURED.description,
          image_url: first.image_url || FALLBACK_FEATURED.image_url,
          tags: tags.length ? tags : FALLBACK_FEATURED.tags,
          link: first.link || FALLBACK_FEATURED.link,
        });
      }
    };
    fetchHeroAndFeatured();
  }, []);

  const title = heroData.title || FALLBACK_HERO.title;
  const subtitle = heroData.subtitle || FALLBACK_HERO.subtitle;
  const description = heroData.description || FALLBACK_HERO.description;

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-[100svh] w-full flex-col justify-center overflow-hidden px-4 pb-14 pt-28 md:px-6 md:pb-20 lg:pt-32"
    >
      <div className="hero-grid" />
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[var(--accent)]/12 blur-[100px]" />
      <div className="pointer-events-none absolute -right-10 top-40 h-64 w-64 rounded-full bg-[var(--accent)]/10 blur-[90px]" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 h-56 w-56 rounded-full bg-[var(--accent)]/8 blur-[100px]" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38vh] opacity-35 md:h-[44vh]">
        <HeroGraph />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34vh] opacity-55 md:h-[40vh]">
        <ParticleWave rows={22} amplitude={24} />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] items-center gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: easeOut }}
            className="mb-4 flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 border border-[var(--accent)]/35 bg-[var(--accent-soft)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
              Available for work
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--gray-muted)]">
              <MapPin size={12} className="text-[var(--accent)]" />
              Lahore, Pakistan
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.04, ease: easeOut }}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)] md:text-sm"
          >
            {subtitle}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: easeOut }}
            className="mt-2 font-display text-[2.75rem] uppercase leading-[0.9] tracking-tighter text-[var(--foreground)] sm:text-6xl md:text-7xl lg:text-[76px]"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: easeOut }}
            className="mt-4 max-w-xl font-display text-lg leading-snug text-[var(--gray-light)] md:text-xl lg:text-2xl"
          >
            Web apps &amp; Shopify stores built for speed, clarity, and conversion.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: easeOut }}
            className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--gray-muted)] md:text-[15px]"
          >
            {description.length > 160 ? `${description.slice(0, 157)}…` : description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: easeOut }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 bg-[var(--accent)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition hover:brightness-110"
            >
              View Work <ArrowUpRight size={16} />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 border border-[var(--border-color)] bg-[var(--background)]/55 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[var(--foreground)] backdrop-blur-sm transition hover:border-[var(--accent)]"
            >
              Contact <ArrowDownRight size={16} />
            </Link>
            <a
              href="/resume.pdf"
              download="Syed_Ali_Resume.pdf"
              className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold uppercase tracking-wider text-[var(--gray-light)] transition hover:text-[var(--accent)]"
            >
              Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38, duration: 0.45 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {STACK.map((item) => (
              <span
                key={item}
                className="border border-[var(--border-color)] bg-[var(--input-bg)]/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--gray-light)] backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.48, duration: 0.45 }}
            className="mt-7 grid grid-cols-3 gap-3 border-t border-[var(--border-color)] pt-5 sm:gap-6"
          >
            {[
              { value: 3, suffix: "+", label: "Years exp." },
              { value: 4, suffix: "+", label: "Companies" },
              { value: 6, suffix: "+", label: "Products" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.06 }}
              >
                <p className="font-display text-2xl text-[var(--foreground)] sm:text-3xl md:text-4xl">
                  <CountUp value={item.value} suffix={item.suffix} immediate />
                </p>
                <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--gray-muted)] sm:text-[10px]">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Visual column */}
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
          className="space-y-3 lg:col-span-5"
        >
          <div className="panel overflow-hidden backdrop-blur-md">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--input-bg)]">
              <img
                src={featured.image_url}
                alt={featured.title}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-black/35 to-black/10" />
              <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 border border-white/20 bg-black/55 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                <Sparkles size={10} />
                Featured
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                  {featured.category}
                </p>
                <p className="mt-1 font-display text-sm uppercase leading-snug text-white sm:text-base">
                  {featured.title}
                </p>
              </div>
            </div>

            <div className="space-y-3 p-4">
              <p className="line-clamp-2 text-sm text-[var(--gray-light)]">
                {featured.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {featured.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="border border-[var(--border-color)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--gray-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="border-t border-[var(--border-color)] pt-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--gray-muted)]">
                    Project pulse
                  </span>
                  <span className="text-[10px] font-semibold text-[var(--accent)]">Live</span>
                </div>
                <MiniSparkline data={[42, 50, 48, 62, 58, 74, 80, 92]} height={40} />
              </div>
              <Link
                href="#projects"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)] transition hover:brightness-110"
              >
                See all projects <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {OFFERINGS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                className="panel p-3 backdrop-blur-md"
              >
                <p className="font-display text-xs text-[var(--accent)]">0{i + 1}</p>
                <p className="mt-1 text-[11px] font-semibold leading-tight text-[var(--foreground)] sm:text-sm">
                  {item.title}
                </p>
                <p className="mt-1 hidden text-[10px] leading-snug text-[var(--gray-muted)] sm:block">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.aside>
      </div>
    </section>
  );
};

export default Hero;
