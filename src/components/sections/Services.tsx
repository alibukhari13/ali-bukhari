/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { supabase } from "@/lib/supabase";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import DeliveryFlow from "@/components/charts/DeliveryFlow";
import ParticleWave from "@/components/charts/ParticleWave";
import { SERVICES, SERVICE_ICON_NAMES } from "@/constants/services";
import { easeOut } from "@/lib/motion";

const HIGHLIGHTS = [
  "Responsive React & Next.js interfaces",
  "Shopify themes, apps & storefronts",
  "REST APIs, Node & MongoDB integrations",
  "Performance, mobile UX & polish",
];

const FALLBACK_SERVICES = SERVICES.map((s, i) => ({
  id: i,
  title: s.title,
  description: s.description,
  icon_name: SERVICE_ICON_NAMES[i],
  order_index: i + 1,
}));

const Services = () => {
  const [services, setServices] = useState<any[]>(FALLBACK_SERVICES);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from("services")
        .select("*")
        .order("order_index", { ascending: true });
      if (data?.length) setServices(data);
    };
    fetchServices();
  }, []);

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || LucideIcons.Globe;
  };

  return (
    <section id="services" className="section-shell">
      <SectionBackdrop variant="grid" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 opacity-50 md:h-44">
        <ParticleWave rows={18} amplitude={18} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px]">
        <SectionHeader
          title="What I Do"
          subtitle="Practical delivery across web apps and Shopify — from first layout to live launch."
        />

        <div className="mb-10 grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              How I work
            </p>
            <h3 className="mt-2 font-display text-2xl text-[var(--foreground)] md:text-3xl">
              Design → Build → Ship → Scale
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--gray-light)]">
              Clear requirements, reusable UI, solid integrations, and a store or app that
              feels ready for real users.
            </p>
            <ul className="mt-5 space-y-2.5">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-[var(--gray-muted)]">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-[var(--accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="panel p-4 lg:col-span-7 md:p-5"
          >
            <div className="mx-auto max-w-[420px]">
              <DeliveryFlow />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon_name);
            return (
              <motion.article
                key={service.id ?? service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: index * 0.04, duration: 0.45, ease: easeOut }}
                whileHover={{ y: -3 }}
                className="panel group p-5 md:p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center border border-[var(--border-color)] text-[var(--accent)] transition group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black">
                  <Icon size={20} strokeWidth={1.5} />
                </div>

                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--gray-muted)]">
                  Service 0{index + 1}
                </p>
                <h3 className="mt-1 font-display text-lg text-[var(--foreground)] md:text-xl">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--gray-light)]">
                  {service.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
