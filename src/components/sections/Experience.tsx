"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import { EXPERIENCE } from "@/constants/skills";
import { easeOut } from "@/lib/motion";
import Reveal from "@/components/ui/Reveal";

export default function Experience() {
  return (
    <section id="experience" className="section-shell experience-editorial isolate">
      <div className="relative z-10 mx-auto max-w-[1240px]">
        <Reveal className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[.8fr_1.2fr] md:items-end"><div><p className="mb-3 text-xs font-semibold uppercase tracking-[.18em] text-[var(--accent)]">The path so far</p><h2 className="font-display text-4xl font-bold tracking-[-.055em] text-[var(--foreground)] sm:text-5xl">Experience<span className="text-[var(--accent)]">.</span></h2></div><p className="max-w-xl text-base leading-relaxed text-[var(--gray-light)]">Over three years working across product teams, digital agencies and commerce brands—shipping interfaces people use every day.</p></Reveal>
        <div className="experience-timeline relative grid gap-4 md:grid-cols-2 md:gap-5">
          {EXPERIENCE.map((job, index) => (
            <motion.article key={job.company} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: (index % 2) * .08, duration: .5, ease: easeOut }} whileHover={{ y: -3 }} className="experience-card group relative rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--surface)] p-5 transition-shadow hover:shadow-xl sm:p-7">
              <div className="flex items-center justify-between"><span className="flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.08em] text-[var(--accent)]"><BriefcaseBusiness size={12}/>{job.type}</span><span className="font-mono text-xs text-[var(--gray-muted)]">0{index + 1}</span></div>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-.03em] text-[var(--foreground)] sm:text-[28px]">{job.company}</h3><p className="mt-1 text-sm font-medium text-[var(--gray-light)]">{job.role}</p>
              <ul className="mt-6 space-y-3 border-t border-[var(--border-color)] pt-5">{job.points.map((point) => <li key={point} className="flex gap-3 text-sm leading-relaxed text-[var(--gray-light)]"><span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"/>{point}</li>)}</ul>
              <span aria-hidden className="absolute bottom-6 right-6 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"><ArrowUpRight size={16} className="text-[var(--accent)]"/></span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
