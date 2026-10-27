/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  X,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Layers,
} from "lucide-react";
import MiniSparkline from "@/components/ui/MiniSparkline";
import { easeOut } from "@/lib/motion";

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", damping: 28, stiffness: 340 },
  },
  exit: { opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.2 } },
};

type Props = {
  project: any | null;
  projects: any[];
  onClose: () => void;
  onSelect: (project: any) => void;
  trend?: number[];
};

export default function ProjectModal({
  project,
  projects,
  onClose,
  onSelect,
  trend = [42, 50, 48, 62, 58, 74, 80, 92],
}: Props) {
  const index = project
    ? projects.findIndex((p) => (p.id ?? p.title) === (project.id ?? project.title))
    : -1;

  const goPrev = useCallback(() => {
    if (index <= 0) return;
    onSelect(projects[index - 1]);
  }, [index, onSelect, projects]);

  const goNext = useCallback(() => {
    if (index < 0 || index >= projects.length - 1) return;
    onSelect(projects[index + 1]);
  }, [index, onSelect, projects]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "auto";
    };
  }, [project, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-5 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-black/78 backdrop-blur-md"
          />

          <motion.div
            key={project.id ?? project.title}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden border border-[var(--border-color)] bg-[var(--background)] shadow-[0_-20px_80px_rgba(0,0,0,0.45)] sm:max-h-[88vh] sm:shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-[var(--border-color)] px-4 py-3 sm:px-5">
              <div className="flex items-center gap-3">
                <span className="font-display text-sm text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--gray-muted)]">
                  / {String(projects.length).padStart(2, "0")}
                </span>
                {project.link && (
                  <span className="ml-1 inline-flex items-center gap-1.5 border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--accent)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    Live
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={index <= 0}
                  className="flex h-9 w-9 items-center justify-center border border-[var(--border-color)] text-[var(--gray-light)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-30"
                  aria-label="Previous project"
                >
                  <ArrowLeft size={15} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={index >= projects.length - 1}
                  className="flex h-9 w-9 items-center justify-center border border-[var(--border-color)] text-[var(--gray-light)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-30"
                  aria-label="Next project"
                >
                  <ArrowRight size={15} />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center border border-[var(--border-color)] text-[var(--foreground)] transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto no-scrollbar">
              {/* Full-width cover image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--input-bg)] sm:aspect-[2/1]">
                <motion.img
                  key={(project.id ?? project.title) + "-img"}
                  src={project.image_url}
                  alt={project.title}
                  initial={{ scale: 1.08, opacity: 0.65 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.55, ease: easeOut }}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-black/25 to-transparent" />
                <span className="absolute left-4 top-4 border border-white/20 bg-black/55 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:left-5 sm:top-5">
                  {project.category}
                </span>
              </div>

              {/* Content below cover */}
              <div className="relative z-10 -mt-10 px-5 pb-8 sm:px-7 sm:pb-9 md:px-8">
                <motion.div
                  key={(project.id ?? project.title) + "-body"}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    {project.category}
                  </p>
                  <h2
                    id="project-modal-title"
                    className="mt-2 font-display text-2xl uppercase leading-tight tracking-tight text-[var(--foreground)] sm:text-3xl md:text-[2.1rem]"
                  >
                    {project.title}
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--gray-light)] md:text-[15px]">
                    {project.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2">
                    <Layers size={13} className="text-[var(--accent)]" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--gray-muted)]">
                      Stack
                    </p>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {(project.tags || []).map((tag: string) => (
                      <span
                        key={tag}
                        className="border border-[var(--border-color)] bg-[var(--input-bg)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--gray-light)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 h-px w-full bg-[var(--border-color)]" />

                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--gray-muted)]">
                    Overview
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--gray-light)] md:text-[15px]">
                    {project.full_detail}
                  </p>

                  <div className="mt-6 border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--gray-muted)]">
                        Project pulse
                      </span>
                      <span className="text-[10px] font-semibold text-[var(--accent)]">
                        {project.link ? "Live product" : "Case study"}
                      </span>
                    </div>
                    <MiniSparkline data={trend} height={42} />
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[var(--accent)] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:brightness-110"
                      >
                        Launch Demo <ExternalLink size={14} />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex items-center gap-2 border border-[var(--border-color)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground)] transition hover:border-[var(--accent)]"
                    >
                      Close
                    </button>
                    {index < projects.length - 1 && (
                      <button
                        type="button"
                        onClick={goNext}
                        className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)] transition hover:brightness-110"
                      >
                        Next project <ArrowUpRight size={14} />
                      </button>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
