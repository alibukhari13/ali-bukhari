"use client";

import { useEffect, useState } from "react";
import { ArrowDownToLine } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { FALLBACK_ABOUT } from "@/constants/fallback";
import SkillGraph from "@/components/ui/SkillGraph";
import Reveal from "@/components/ui/Reveal";

type AboutContent = typeof FALLBACK_ABOUT;

export default function About() {
  const [aboutData, setAboutData] = useState<AboutContent>(FALLBACK_ABOUT);

  useEffect(() => {
    let active = true;
    async function loadAbout() {
      const { data } = await supabase.from("about").select("*").limit(1).maybeSingle();
      if (active && data) setAboutData({ ...FALLBACK_ABOUT, ...data });
    }
    loadAbout();
    return () => { active = false; };
  }, []);

  const paragraphs = aboutData.description_texts || FALLBACK_ABOUT.description_texts;
  const intro = (paragraphs[0] || FALLBACK_ABOUT.description_texts[0])
    .replace(/^Hi,\s*I'm Syed Ali Eman\s*[—–-]\s*/i, "")
    .replace(/^a Web Developer/i, "A web developer")
    .replace(/ I specialize in .+?\.$/i, ".");
  const workStory = "I bring product ideas to life through thoughtful interfaces, dependable integrations, and careful attention to performance across devices.";
  const stats = aboutData.stats || FALLBACK_ABOUT.stats;

  return (
    <section id="about" className="section-shell isolate">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.78fr)] lg:gap-12">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">A little about me</p>
            <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
              Good digital work starts with understanding people.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--gray-light)] sm:text-lg sm:leading-8">{intro}</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--gray-muted)] sm:text-base">{workStory}</p>
            <a href="/resume.pdf" download="Syed_Ali_Eman_Resume.pdf" className="mt-6 inline-flex min-h-11 items-center gap-2 border border-[var(--border-color)] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]">
              Download résumé <ArrowDownToLine aria-hidden="true" size={15} />
            </a>
          </Reveal>

          <Reveal delay={0.1} className="rounded-2xl border border-[var(--border-color)] bg-[var(--input-bg)] p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gray-muted)]">At a glance</p>
            <dl className="mt-3 divide-y divide-[var(--border-color)]">
              {stats.map((stat, index) => (
                <div key={`${stat.label}-${index}`} className="flex items-center justify-between gap-4 py-4 first:pt-3 last:pb-1">
                  <dt className="text-sm text-[var(--gray-light)]">{stat.label}</dt>
                  <dd className="text-right font-display text-xl text-[var(--accent)] sm:text-2xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.05} className="mt-12 border-t border-[var(--border-color)] pt-8 sm:mt-14 sm:pt-10">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border-color)] pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Tools I use every day</p>
              <h3 className="mt-1 font-display text-2xl text-[var(--foreground)] sm:text-3xl">My toolkit</h3>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[var(--gray-muted)]">A practical stack for responsive products, storefronts, and integrations.</p>
          </div>
          <SkillGraph />
        </Reveal>
      </div>
    </section>
  );
}
