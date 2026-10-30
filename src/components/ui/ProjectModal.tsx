/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Layers3, X } from "lucide-react";
import { easeOut } from "@/lib/motion";

type Props = {
  project: any | null;
  projects: any[];
  onClose: () => void;
  onSelect: (project: any) => void;
};

export default function ProjectModal({ project, projects, onClose, onSelect }: Props) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const index = project ? projects.findIndex((item) => (item.id ?? item.title) === (project.id ?? project.title)) : -1;
  const goPrev = useCallback(() => { if (index > 0) onSelect(projects[index - 1]); }, [index, onSelect, projects]);
  const goNext = useCallback(() => { if (index >= 0 && index < projects.length - 1) onSelect(projects[index + 1]); }, [index, onSelect, projects]);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose, goPrev, goNext]);

  if (!portalRoot) return null;

  return createPortal((
    <AnimatePresence>
      {project && (
        <motion.div className="fixed inset-0 z-[1000] grid place-items-center p-3 sm:p-5 md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}>
          <button type="button" aria-label="Close project details" onClick={onClose} className="absolute inset-0 cursor-default bg-[#101611]/70 backdrop-blur-sm" />
          <motion.section
            key={project.id ?? project.title}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 18, scale: .985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: .99 }}
            transition={{ duration: .24, ease: easeOut }}
            className="relative z-10 flex h-[min(800px,calc(100dvh-1.5rem))] w-full max-w-[1160px] flex-col overflow-hidden rounded-[1.65rem] border border-[var(--border-color)] bg-[var(--surface)] shadow-[0_35px_110px_rgba(0,0,0,.38)] sm:h-[min(780px,calc(100dvh-2.5rem))] sm:rounded-[2rem]"
          >
            <header className="flex h-[62px] shrink-0 items-center justify-between border-b border-[var(--border-color)] px-4 sm:h-[70px] sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <span className="font-mono text-xs font-semibold text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
                <span className="h-4 w-px bg-[var(--border-color)]" />
                <span className="truncate text-xs font-medium text-[var(--gray-muted)]">{project.category}</span>
                {project.link && <span className="hidden items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[10px] font-semibold text-[var(--accent)] sm:inline-flex"><span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"/>Live project</span>}
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <button type="button" onClick={goPrev} disabled={index <= 0} aria-label="Previous project" className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--gray-light)] transition hover:bg-[var(--input-bg)] hover:text-[var(--foreground)] disabled:opacity-30"><ArrowLeft size={17}/></button>
                <button type="button" onClick={goNext} disabled={index >= projects.length - 1} aria-label="Next project" className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--gray-light)] transition hover:bg-[var(--input-bg)] hover:text-[var(--foreground)] disabled:opacity-30"><ArrowRight size={17}/></button>
                <span className="mx-1 h-5 w-px bg-[var(--border-color)]" />
                <button type="button" onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--input-bg)] text-[var(--foreground)] transition hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"><X size={17}/></button>
              </div>
            </header>

            <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(205px,34%)_minmax(0,1fr)] md:grid-cols-[1.08fr_.92fr] md:grid-rows-1">
              <div className="relative min-h-[205px] overflow-hidden bg-[#18231b] sm:min-h-[265px] md:min-h-0">
                <motion.img key={(project.id ?? project.title) + "-image"} src={project.image_url || project.image} alt={`${project.title} project preview`} initial={{ scale: 1.035, opacity: .7 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .4, ease: easeOut }} className="absolute inset-0 h-full w-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111912]/70 via-transparent to-[#111912]/5" />
                <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[10px] font-medium text-white/85 backdrop-blur-md sm:bottom-6 sm:left-6">Project {String(index + 1).padStart(2, "0")} <span className="mx-1.5 text-white/40">/</span> {String(projects.length).padStart(2, "0")}</span>
              </div>

              <motion.div key={(project.id ?? project.title) + "-content"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3, ease: easeOut }} className="min-h-0 overflow-y-auto px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
                <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[var(--accent)]">Case study</p>
                <h2 id="project-modal-title" className="mt-3 max-w-xl font-display text-[clamp(1.7rem,3vw,2.7rem)] font-semibold leading-[1.04] tracking-[-.055em] text-[var(--foreground)]">{project.title}</h2>
                <p className="mt-4 text-sm leading-[1.75] text-[var(--gray-light)] sm:text-[15px]">{project.description}</p>

                <div className="my-6 h-px bg-[var(--border-color)] sm:my-8" />
                <div>
                  <div className="flex items-center gap-2 text-[var(--foreground)]"><Layers3 size={15} className="text-[var(--accent)]"/><h3 className="text-xs font-semibold">Built with</h3></div>
                  <div className="mt-3 flex flex-wrap gap-2">{(project.tags || []).map((tag: string) => <span key={tag} className="rounded-full border border-[var(--border-color)] bg-[var(--input-bg)] px-3 py-1.5 text-[11px] font-medium text-[var(--gray-light)]">{tag}</span>)}</div>
                </div>

                <div className="mt-7 sm:mt-9">
                  <h3 className="text-xs font-semibold text-[var(--foreground)]">The project</h3>
                  <p className="mt-2 text-sm leading-[1.75] text-[var(--gray-light)]">{project.full_detail || project.description}</p>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[var(--border-color)] pt-6">
                  {project.link ? <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-xs font-semibold text-[var(--accent-ink)] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--accent)]/20">Visit live project <ExternalLink size={14}/></a> : <span className="text-xs text-[var(--gray-muted)]">Project preview</span>}
                  <button type="button" onClick={onClose} className="inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--border-color)] px-4 text-xs font-medium text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]">Back to projects <ArrowUpRight size={14}/></button>
                </div>
              </motion.div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  ), portalRoot);
}
