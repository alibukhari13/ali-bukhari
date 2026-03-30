/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/sections/About.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Database, Cpu, Brain, Download } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Map icon names to components
const iconMap: Record<string, any> = {
  Brain,
  Database,
  Cpu,
};

const About = () => {
  const [aboutData, setAboutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    const { data } = await supabase.from("about").select("*").single();
    if (data) setAboutData(data);
    setLoading(false);
  };

  if (loading) return null;

  const paragraphs = aboutData.description_texts || [];
  const stats = aboutData.stats || [];

  return (
    <section
      id="about"
      className="relative w-full pt-20 md:pt-28 lg:pt-32 bg-[var(--background)] flex flex-col items-center px-4 md:px-6 overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[var(--accent)]/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-[1100px] w-full flex flex-col items-center">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[var(--foreground)] uppercase"
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-[var(--accent)] mx-auto mt-3 md:mt-4"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-4 md:space-y-6 text-[var(--gray-light)] text-base md:text-lg lg:text-xl leading-relaxed font-medium"
            >
              {paragraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>

            <motion.a
              href="/resume.pdf"
              download="Syed_Ali_Resume.pdf"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--foreground)] rounded-2xl hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-all duration-500 shadow-xl cursor-pointer inline-flex w-fit no-underline"
            >
              <Download size={18} className="group-hover:animate-bounce" />
              <span className="font-bold uppercase tracking-widest text-xs md:text-sm">Download Resume</span>
            </motion.a>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 gap-4 w-full">
            {stats.map((stat: any, index: number) => {
              const IconComponent = iconMap[stat.icon];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: "easeOut" }}
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="p-5 md:p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center gap-4 md:gap-6 group hover:border-[var(--accent)]/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all duration-500">
                    {IconComponent && <IconComponent size={24} strokeWidth={1.5} />}
                  </div>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-black text-[var(--foreground)] tracking-tighter">
                      {stat.value}
                    </h4>
                    <p className="text-[9px] md:text-[10px] font-bold text-[var(--gray-muted)] uppercase tracking-[2px]">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              className="p-3 md:p-4 rounded-2xl bg-[var(--accent)]/5 border border-[var(--accent)]/10 mt-2 md:mt-4 hover:border-[var(--accent)]/30 transition-all duration-300"
            >
              <div className="flex gap-2 mb-2 md:mb-3">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
              <p className="text-[9px] md:text-[10px] font-mono text-[var(--accent)]/70 leading-relaxed">
                $ system_status: <span className="text-[var(--foreground)]">Active</span> <br />
                $ neural_link: <span className="text-[var(--foreground)]">Stable</span> <br />
                $ analysis_mode: <span className="text-[var(--foreground)]">Enabled</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;