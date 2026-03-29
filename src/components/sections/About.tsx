// components/About.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, Cpu, Brain, Download } from "lucide-react";

const STATS = [
  { label: "Models Deployed", value: "25+", icon: Brain },
  { label: "Data Pipelines", value: "10+", icon: Database },
  { label: "Accuracy Rate", value: "98%", icon: Cpu },
];

const About = () => {
  return (
    <section id="about" className="relative w-full pt-32 bg-[var(--background)] flex flex-col items-center px-6 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[var(--accent)]/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-[1100px] w-full flex flex-col items-center">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-[var(--foreground)] uppercase"
          >
            About Me
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-[var(--accent)] mx-auto mt-4"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-6 text-[var(--gray-light)] text-lg md:text-xl leading-relaxed font-medium">
              <p>
                Hi there! I&apos;m <span className="text-[var(--foreground)] font-bold">Syed Ali</span>, a Web Developer specializing in building modern, scalable, and user-focused web applications With a strong passion for 
                <span className="text-[var(--accent)] italic"> clean code </span> and <span className="text-[var(--accent)] italic"> innovative design</span>, 
                I help businesses bring their ideas to life in today’s fast-paced digital world.
              </p>
              <p>
                I don’t just build websites; I create seamless <span className="text-[var(--foreground)]">digital experiences</span>. From responsive front-end interfaces to efficient back-end systems, my work focuses on performance, usability, and real-world impact through modern web technologies.
              </p>
            </div>

            <motion.a
  href="/resume.pdf"             /* Public folder mein file ka path */
  download="Syed_Ali_Resume.pdf"  /* Download hone par file ka naya naam */
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="group flex items-center gap-3 px-8 py-4 bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--foreground)] rounded-2xl hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-all duration-500 shadow-xl cursor-pointer inline-flex w-fit no-underline"
>
  <Download size={20} className="group-hover:animate-bounce" />
  <span className="font-bold uppercase tracking-widest text-sm">Download Resume</span>
</motion.a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 grid grid-cols-1 gap-4 w-full"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ x: 10 }}
                className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center gap-6 group hover:border-[var(--accent)]/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all duration-500">
                  <stat.icon size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-3xl font-black text-[var(--foreground)] tracking-tighter">{stat.value}</h4>
                  <p className="text-[10px] font-bold text-[var(--gray-muted)] uppercase tracking-[2px]">{stat.label}</p>
                </div>
              </motion.div>
            ))}

            <div className="p-4 rounded-2xl bg-[var(--accent)]/5 border border-[var(--accent)]/10 mt-4">
              <div className="flex gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
              <p className="text-[10px] font-mono text-[var(--accent)]/70 leading-relaxed">
                $ system_status: <span className="text-[var(--foreground)]">Active</span> <br />
                $ neural_link: <span className="text-[var(--foreground)]">Stable</span> <br />
                $ analysis_mode: <span className="text-[var(--foreground)]">Enabled</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;