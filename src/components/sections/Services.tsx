/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
// components/sections/Services.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { supabase } from "@/lib/supabase";

const Services = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("order_index", { ascending: true });
    if (data) setServices(data);
    setLoading(false);
  };

  if (loading) return null;

  // Get icon component dynamically
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? Icon : LucideIcons.Globe;
  };

  return (
    <section
      id="services"
      className="relative w-full pt-16 md:pt-20 lg:pt-24 bg-[var(--background)] flex flex-col items-center px-4 md:px-6 overflow-hidden"
    >
      <div className="text-center mb-12 md:mb-16 lg:mb-20 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-[64px] font-black tracking-tighter text-[var(--foreground)] leading-none"
        >
          What I do
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xs md:text-sm font-bold text-[var(--accent)] tracking-[2px] uppercase mt-2"
        >
          My Services
        </motion.p>
      </div>

      <div className="max-w-[1200px] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {services.map((service, index) => {
          const Icon = getIcon(service.icon_name);
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.2 },
              }}
              className="group relative p-6 md:p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent)]/40 transition-all duration-500 overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 w-12 h-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mb-5 md:mb-6 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(255,140,0,0.1)]">
                <Icon size={24} strokeWidth={1.5} />
              </div>

              <h3 className="relative z-10 text-lg md:text-xl font-bold text-[var(--foreground)] mb-2 md:mb-3 tracking-tight">
                {service.title}
              </h3>

              <p className="relative z-10 text-[var(--gray-light)] leading-relaxed text-sm md:text-[15px]">
                {service.description}
              </p>

              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--accent)] transition-all duration-500 group-hover:w-full" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;