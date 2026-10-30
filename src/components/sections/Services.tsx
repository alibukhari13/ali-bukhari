/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ArrowRight, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { SERVICES, SERVICE_ICON_NAMES } from "@/constants/services";
import { easeOut } from "@/lib/motion";
import Reveal from "@/components/ui/Reveal";
import MotionOrnament from "@/components/ui/MotionOrnament";

const fallback = SERVICES.map((service, index) => ({ id: index, title: service.title, description: service.description, icon_name: SERVICE_ICON_NAMES[index] }));
const steps = ["Understand the problem", "Design for real people", "Build, test & refine"];

export default function Services() {
  const [services, setServices] = useState<any[]>(fallback);
  useEffect(() => { const load = async () => { const { data } = await supabase.from("services").select("*").order("order_index", { ascending: true }); if (data?.length) setServices(data); }; load(); }, []);

  return (
    <section id="services" className="section-shell services-editorial isolate">
      <MotionOrnament variant="wave" className="-right-20 top-16 h-40 w-[28rem] sm:h-52" />
      <div className="relative z-10 mx-auto max-w-[1240px]">
        <Reveal className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end"><div className="max-w-[650px]"><p className="mb-3 text-xs font-semibold uppercase tracking-[.18em] text-[var(--accent)]">How I can help</p><h2 className="font-display text-4xl font-bold leading-[1] tracking-[-.055em] text-[var(--foreground)] sm:text-5xl">From first sketch<br className="hidden sm:block"/> to <span className="text-[var(--accent)]">the real thing.</span></h2></div><p className="max-w-md text-base leading-relaxed text-[var(--gray-light)]">A practical mix of design-minded frontend work, commerce expertise and dependable full-stack delivery.</p></Reveal>
        <div className="mb-7 grid overflow-hidden rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--surface)] sm:grid-cols-3">{steps.map((step, index) => <motion.div key={step} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="flex items-center gap-3 border-b border-[var(--border-color)] p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:p-5"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-semibold text-[var(--accent)]">0{index + 1}</span><span className="text-sm font-medium text-[var(--foreground)]">{step}</span><Check size={14} className="ml-auto text-[var(--accent)]"/></motion.div>)}</div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map((service, index) => { const Icon = (LucideIcons as any)[service.icon_name] || LucideIcons.Globe2; return <motion.article key={service.id ?? service.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ delay: (index % 3) * .06, duration: .45, ease: easeOut }} whileHover={{ y: -4 }} className="service-card group rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--surface)] p-5 transition-shadow hover:shadow-xl sm:p-6"><div className="flex items-start justify-between"><span className="rounded-2xl bg-[var(--accent-soft)] p-3 text-[var(--accent)] transition group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)]"><Icon size={20} strokeWidth={1.7}/></span><span className="font-mono text-[11px] text-[var(--gray-muted)]">0{index + 1}</span></div><h3 className="mt-6 font-display text-xl font-semibold tracking-[-.025em] text-[var(--foreground)]">{service.title}</h3><p className="mt-2 text-sm leading-relaxed text-[var(--gray-light)]">{service.description}</p><div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[var(--accent)]">Explore this service <ArrowRight size={14} className="transition group-hover:translate-x-1"/></div></motion.article>; })}</div>
      </div>
    </section>
  );
}
