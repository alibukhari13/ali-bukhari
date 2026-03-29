/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Services.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { SERVICES } from "@/constants/services";

const Services = () => {
  return (
    <section id="services" className="relative w-full pt-24 bg-[var(--background)] flex flex-col items-center px-6">
      <div className="text-center mb-20 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-[64px] font-black tracking-tighter text-[var(--foreground)] leading-none"
        >
          What I do
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-sm font-bold text-[var(--accent)] tracking-[2px] uppercase mt-2"
        >
          My Services
        </motion.p>
      </div>

      <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent)]/40 transition-all duration-500 overflow-hidden cursor-default"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 w-12 h-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mb-6 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(255,140,0,0.1)]">
              <service.icon size={24} strokeWidth={1.5} />
            </div>

            <h3 className="relative z-10 text-xl font-bold text-[var(--foreground)] mb-3 tracking-tight">
              {service.title}
            </h3>
            <p className="relative z-10 text-[var(--gray-light)] leading-relaxed text-[15px]">
              {service.description}
            </p>

            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--accent)] transition-all duration-500 group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;