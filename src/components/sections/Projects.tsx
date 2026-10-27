/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import MiniSparkline from "@/components/ui/MiniSparkline";
import NetworkGraph from "@/components/charts/NetworkGraph";
import ProjectModal from "@/components/ui/ProjectModal";
import { PROJECTS } from "@/constants/projects";
import { easeOut } from "@/lib/motion";

const TRENDS = [
  [40, 48, 45, 60, 58, 72, 80, 90],
  [30, 42, 50, 48, 65, 70, 78, 85],
  [35, 38, 55, 62, 60, 75, 82, 88],
  [28, 45, 52, 58, 70, 68, 84, 92],
  [42, 40, 55, 63, 72, 78, 86, 94],
  [33, 48, 44, 60, 66, 74, 81, 89],
];

const FALLBACK_PROJECTS = PROJECTS.map((p, i) => ({
  ...p,
  image_url: p.image,
  full_detail: p.fullDetail,
  order_index: i + 1,
}));

const Projects = () => {
  const [projects, setProjects] = useState<any[]>(FALLBACK_PROJECTS);
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("order_index", { ascending: true });
      if (data?.length) setProjects(data);
    };
    fetchProjects();
  }, []);

  const selectedIndex = selected
    ? projects.findIndex((p) => (p.id ?? p.title) === (selected.id ?? selected.title))
    : 0;

  return (
    <section id="projects" className="section-shell">
      <SectionBackdrop variant="dots" />

      <div className="relative z-10 mx-auto max-w-[1100px]">
        <SectionHeader
          title="Projects"
          subtitle="Selected product work — stack, outcomes, and live demos where available."
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-col items-start justify-between gap-6 border border-[var(--border-color)] bg-[var(--card-bg)] p-5 md:flex-row md:items-center md:p-6"
        >
          <div className="max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Connected stack
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--gray-light)]">
              Most projects combine Next.js or React UI with APIs, Shopify, or Supabase —
              shipped as real products, not demos.
            </p>
          </div>
          <div className="w-full max-w-[280px] shrink-0">
            <NetworkGraph />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.button
              key={project.id ?? project.title}
              type="button"
              onClick={() => setSelected(project)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: index * 0.04, duration: 0.45, ease: easeOut }}
              whileHover={{ y: -4 }}
              className="panel group cursor-pointer overflow-hidden text-left"
            >
              <div className="relative h-[180px] overflow-hidden md:h-[190px]">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-black/15 to-transparent" />
                <span className="absolute left-3 top-3 border border-white/20 bg-black/50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                  {project.category}
                </span>
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-white/20 bg-black/45 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                  <ArrowUpRight size={14} />
                </div>
              </div>

              <div className="p-4 md:p-5">
                <h3 className="font-display text-base uppercase leading-snug text-[var(--foreground)] md:text-lg">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-[var(--gray-light)]">
                  {project.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(project.tags || []).slice(0, 3).map((tag: string) => (
                    <span
                      key={tag}
                      className="border border-[var(--border-color)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--gray-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 border-t border-[var(--border-color)] pt-3">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--gray-muted)]">
                      Activity
                    </span>
                    {project.link ? (
                      <span className="text-[10px] font-semibold text-[var(--accent)]">Live</span>
                    ) : null}
                  </div>
                  <MiniSparkline data={TRENDS[index % TRENDS.length]} delay={index * 0.04} />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selected}
        projects={projects}
        onClose={() => setSelected(null)}
        onSelect={setSelected}
        trend={TRENDS[Math.max(0, selectedIndex) % TRENDS.length]}
      />
    </section>
  );
};

export default Projects;
