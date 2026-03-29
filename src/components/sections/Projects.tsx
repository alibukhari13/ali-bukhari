/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Projects.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/constants/projects";

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }),
  exit: { opacity: 0, y: 10, transition: { duration: 0.2 } }
};

const Projects = () => {
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selected]);

  return (
    <section id="projects" className="relative w-full pt-32 bg-[var(--background)] flex flex-col items-center px-6">
      <div className="text-center mb-24 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-black tracking-tighter text-[var(--foreground)] leading-none uppercase"
        >
          Projects
        </motion.h2>
        <div className="mt-4 text-[var(--accent)] font-bold tracking-[4px] uppercase text-[10px]">
          Selected Work Gallery
        </div>
      </div>

      <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`card-${project.id}`}
            onClick={() => setSelected(project)}
            whileHover={{ y: -5 }}
            className="group relative cursor-pointer bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] overflow-hidden transition-all duration-500 hover:border-[var(--accent)]/30"
          >
            <motion.div layoutId={`img-${project.id}`} className="h-[280px] overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <motion.span layoutId={`cat-${project.id}`} className="text-[var(--accent)] text-[9px] font-bold tracking-[3px] uppercase block mb-1">
                {project.category}
              </motion.span>
              <motion.h3 layoutId={`title-${project.id}`} className="text-xl font-bold text-white tracking-tight uppercase leading-tight">
                {project.title}
              </motion.h3>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setSelected(null)} 
              className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-zoom-out" 
            />

            <motion.div
              layoutId={`card-${selected.id}`}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="relative w-full max-w-[950px] h-full max-h-[85vh] bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 overflow-hidden flex flex-col"
            >
              <motion.button 
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setSelected(null)} 
                className="absolute top-6 right-6 z-[70] w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-[var(--border-color)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-black transition-all cursor-pointer shadow-lg active:scale-90"
              >
                <X size={20} />
              </motion.button>

              <div className="flex-1 overflow-y-auto no-scrollbar">
                <div className="flex flex-col">
                  <motion.div layoutId={`img-${selected.id}`} className="w-full h-[320px] md:h-[480px] relative shrink-0">
                    <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-transparent to-transparent" />
                  </motion.div>

                  <div className="px-8 pb-16 md:px-16 md:pb-20 -mt-20 relative z-20">
                    <motion.span 
                      custom={0} variants={contentVariants} initial="hidden" animate="visible" exit="exit"
                      layoutId={`cat-${selected.id}`} 
                      className="text-[var(--accent)] text-[11px] font-bold tracking-[4px] uppercase block"
                    >
                      {selected.category}
                    </motion.span>
                    
                    <motion.h2 
                      custom={1} variants={contentVariants} initial="hidden" animate="visible" exit="exit"
                      layoutId={`title-${selected.id}`} 
                      className="text-3xl md:text-5xl font-black text-[var(--foreground)] mt-3 tracking-tighter leading-[1.1] uppercase"
                    >
                      {selected.title}
                    </motion.h2>

                    <motion.div 
                      custom={2} variants={contentVariants} initial="hidden" animate="visible" exit="exit"
                      className="flex flex-wrap gap-2 mt-8 mb-10"
                    >
                      {selected.tags.map(tag => (
                        <span key={tag} className="px-4 py-1.5 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)] text-[10px] font-bold text-[var(--gray-light)] tracking-wider uppercase">
                          {tag}
                        </span>
                      ))}
                    </motion.div>

                    <motion.div 
                      custom={3} variants={contentVariants} initial="hidden" animate="visible" exit="exit"
                      className="max-w-2xl"
                    >
                      <div className="w-10 h-[2px] bg-[var(--accent)] mb-6" />
                      <p className="text-[var(--gray-light)] text-base md:text-lg leading-relaxed font-normal">
                        {selected.fullDetail}
                      </p>
                    </motion.div>

                    <motion.div 
                      custom={4} variants={contentVariants} initial="hidden" animate="visible" exit="exit"
                      className="mt-12"
                    >
                      <a 
                        href={selected.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-3.5 bg-[var(--accent)] text-black font-bold uppercase tracking-[2px] text-[12px] rounded-lg hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[var(--accent)]/10"
                      >
                        Launch Demo <ArrowUpRight size={18} />
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