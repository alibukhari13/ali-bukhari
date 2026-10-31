/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ProjectModal from "@/components/ui/ProjectModal";
import { PROJECTS } from "@/constants/projects";
import { easeOut } from "@/lib/motion";
import Reveal from "@/components/ui/Reveal";

const FALLBACK_PROJECTS = PROJECTS.map((project, index) => ({
  ...project,
  image_url: project.image,
  full_detail: project.fullDetail,
  order_index: index + 1,
}));

export default function Projects() {
  const [projects, setProjects] = useState<any[]>(FALLBACK_PROJECTS);
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("projects").select("*").order("order_index", { ascending: true });
      if (data?.length) setProjects(data);
    };
    load();
  }, []);

  return (
    <section id="projects" className="section-shell projects-editorial isolate">
      <div className="relative z-10 mx-auto max-w-[1240px]">
        <Reveal className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 md:flex-row md:items-end">
          <div className="max-w-[650px]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[.18em] text-[var(--accent)]">Selected work · 2022—26</p>
            <h2 className="font-display text-4xl font-bold leading-[.98] tracking-[-.055em] text-[var(--foreground)] sm:text-5xl lg:text-6xl">Projects with purpose<span className="text-[var(--accent)]">.</span></h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--gray-light)]">A selection of products and digital experiences, built to make everyday tasks feel simpler.</p>
          </div>
          <p className="text-sm font-medium text-[var(--gray-muted)] md:pb-1">Web products <span className="mx-2 text-[var(--accent)]">·</span> Commerce <span className="mx-2 text-[var(--accent)]">·</span> Integrations</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {projects.map((project, index) => {
            const featured = index === 0;
            const image = project.image_url || project.image;
            return (
              <motion.article
                key={project.id ?? project.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (index % 2) * .07, duration: .45, ease: easeOut }}
                className={`project-card group overflow-hidden rounded-[1.65rem] border border-[var(--border-color)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/35 hover:shadow-[0_24px_60px_rgba(20,35,25,.1)] ${featured ? "md:col-span-2 md:grid md:grid-cols-[1.25fr_.75fr] lg:col-span-3" : ""}`}
              >
                <button type="button" onClick={() => setSelected(project)} aria-label={`View ${project.title} case study`} className={`project-image relative block w-full overflow-hidden bg-[var(--input-bg)] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[var(--accent)] ${featured ? "aspect-[1.55] md:aspect-auto md:min-h-[360px]" : "aspect-[1.55]"}`}>
                  <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_70%_20%,color-mix(in_srgb,var(--accent)_30%,transparent),transparent_52%),linear-gradient(145deg,var(--surface),var(--input-bg))] p-8 text-center">
                    <span className="max-w-sm font-display text-2xl font-semibold tracking-[-.04em] text-[var(--foreground)]/75 sm:text-3xl">{project.title}</span>
                  </div>
                  <img src={image} alt={`${project.title} website preview`} loading={index < 2 ? "eager" : "lazy"} onError={(event) => { event.currentTarget.style.display = "none"; }} className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.035]" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101a13]/55 via-transparent to-[#101a13]/10 opacity-75 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-[#101a13]/55 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-md sm:left-5 sm:top-5">{project.category}</span>
                  <span className="absolute bottom-4 left-4 text-[10px] font-semibold uppercase tracking-[.14em] text-white/75 sm:bottom-5 sm:left-5">{featured ? "Featured project" : `Project ${String(index + 1).padStart(2, "0")}`}</span>
                  <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#18241b] shadow-lg transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:bottom-5 sm:right-5"><MoveUpRight size={17}/></span>
                </button>

                <div className={`flex flex-col p-5 sm:p-6 ${featured ? "md:justify-center md:p-8 lg:p-10" : ""}`}>
                  <div className="flex items-start justify-between gap-3">
                    <button type="button" onClick={() => setSelected(project)} className="text-left font-display text-xl font-semibold leading-tight tracking-[-.035em] text-[var(--foreground)] transition hover:text-[var(--accent)] sm:text-2xl">{project.title}</button>
                    <span className="shrink-0 font-mono text-[11px] text-[var(--gray-muted)]">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <p className={`mt-3 text-sm leading-relaxed text-[var(--gray-light)] ${featured ? "max-w-md md:mt-4" : "line-clamp-3"}`}>{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{(project.tags || []).slice(0, featured ? 4 : 3).map((tag: string) => <span key={tag} className="rounded-full border border-[var(--border-color)] px-3 py-1.5 text-[10px] font-medium text-[var(--gray-muted)]">{tag}</span>)}</div>
                  <div className="mt-6 flex items-center justify-between border-t border-[var(--border-color)] pt-4">
                    <button type="button" onClick={() => setSelected(project)} className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent)] transition hover:gap-3">View case study <ArrowUpRight size={14}/></button>
                    {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} website`} onClick={(event) => event.stopPropagation()} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-[var(--gray-muted)] transition hover:bg-[var(--input-bg)] hover:text-[var(--foreground)]">Visit site <ArrowUpRight size={14}/></a>}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
      <ProjectModal project={selected} projects={projects} onClose={() => setSelected(null)} onSelect={setSelected}/>
    </section>
  );
}
