/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */

// components/sections/Projects.tsx
/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const modalVariants: Variants = {
  hidden: { scale: 0.92, opacity: 0, y: 20 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 400, mass: 0.8 },
  },
  exit: {
    scale: 0.96,
    opacity: 0,
    y: 8,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.06,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
  exit: { opacity: 0, y: 5, transition: { duration: 0.1 } },
};

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true });
    if (data) setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selected]);

  if (loading) return null;

  return (
    <section
      id="projects"
      className="relative w-full pt-20 md:pt-28 lg:pt-32 bg-[var(--background)] flex flex-col items-center px-4 md:px-6"
    >
      <div className="text-center mb-12 md:mb-16 lg:mb-24 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-[var(--foreground)] leading-none uppercase"
        >
          Projects
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-3 md:mt-4 text-[var(--accent)] font-bold tracking-[4px] uppercase text-[10px]"
        >
          Selected Work Gallery
        </motion.div>
      </div>

      <div className="max-w-[1200px] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            onClick={() => setSelected(project)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative cursor-pointer bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] overflow-hidden transition-all duration-500 hover:border-[var(--accent)]/30"
          >
            <motion.div
              layoutId={`img-${project.id}`}
              className="h-[220px] sm:h-[240px] md:h-[260px] lg:h-[280px] overflow-hidden"
            >
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 p-5 md:p-6 lg:p-8 w-full">
              <motion.span
                layoutId={`cat-${project.id}`}
                className="text-[var(--accent)] text-[8px] sm:text-[9px] font-bold tracking-[3px] uppercase block mb-1"
              >
                {project.category}
              </motion.span>
              <motion.h3
                layoutId={`title-${project.id}`}
                className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight uppercase leading-tight"
              >
                {project.title}
              </motion.h3>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-zoom-out"
            />

            <motion.div
              layoutId={`img-${selected.id}`}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-[90%] sm:max-w-[85%] md:max-w-[800px] lg:max-w-[950px] max-h-[85vh] bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-[70] w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-black/50 backdrop-blur-md border border-[var(--border-color)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-black transition-all cursor-pointer shadow-lg active:scale-90"
              >
                <X size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
              </motion.button>

              <div className="flex-1 overflow-y-auto no-scrollbar">
                <div className="flex flex-col">
                  <div className="w-full h-[220px] sm:h-[280px] md:h-[380px] lg:h-[480px] relative shrink-0 overflow-hidden">
                    <img
                      src={selected.image_url}
                      alt={selected.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-transparent to-transparent" />
                  </div>

                  <div className="px-5 sm:px-6 md:px-8 lg:px-16 pb-12 sm:pb-16 md:pb-20 -mt-10 sm:-mt-12 md:-mt-20 relative z-20">
                    <motion.span
                      custom={0}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layoutId={`cat-${selected.id}`}
                      className="text-[var(--accent)] text-[10px] sm:text-[11px] font-bold tracking-[4px] uppercase block"
                    >
                      {selected.category}
                    </motion.span>

                    <motion.h2
                      custom={1}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layoutId={`title-${selected.id}`}
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[var(--foreground)] mt-2 md:mt-3 tracking-tighter leading-[1.1] uppercase"
                    >
                      {selected.title}
                    </motion.h2>

                    <motion.div
                      custom={2}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex flex-wrap gap-2 mt-5 sm:mt-6 md:mt-8 mb-6 sm:mb-8 md:mb-10"
                    >
                      {selected.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)] text-[9px] sm:text-[10px] font-bold text-[var(--gray-light)] tracking-wider uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>

                    <motion.div
                      custom={3}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="max-w-2xl"
                    >
                      <div className="w-8 sm:w-10 h-[2px] bg-[var(--accent)] mb-4 sm:mb-6" />
                      <p className="text-[var(--gray-light)] text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                        {selected.full_detail}
                      </p>
                    </motion.div>

                    <motion.div
                      custom={4}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="mt-8 sm:mt-10 md:mt-12"
                    >
                      <a
                        href={selected.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-2.5 sm:py-3.5 bg-[var(--accent)] text-black font-bold uppercase tracking-[2px] text-[11px] sm:text-[12px] rounded-lg hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[var(--accent)]/10"
                      >
                        Launch Demo <ArrowUpRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;