"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { EXPERIENCE } from "@/constants/skills";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import AreaMultiChart from "@/components/charts/AreaMultiChart";
import { easeOut } from "@/lib/motion";

export default function Experience() {
  return (
    <section id="experience" className="section-shell">
      <SectionBackdrop variant="waves" />
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <SectionHeader
          title="Experience"
          subtitle="3+ years shipping production web apps and Shopify stores with product teams."
        />

        <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {[
            { label: "Years", value: "3+" },
            { label: "Companies", value: "4" },
            { label: "Stack", value: "MERN" },
            { label: "Commerce", value: "Shopify" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="panel px-3 py-4 text-center md:py-5"
            >
              <p className="font-display text-xl text-[var(--accent)] md:text-2xl">{item.value}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--gray-muted)]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="panel mb-10 p-5 md:p-6"
        >
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Focus over time
              </p>
              <p className="mt-1 text-sm text-[var(--gray-muted)]">
                Frontend, Shopify, and full-stack work across roles.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-[560px]">
            <AreaMultiChart
              series={[
                { name: "Frontend", values: [40, 48, 55, 62, 70, 78, 84, 90], color: "#ff8c00" },
                { name: "Shopify", values: [20, 30, 42, 50, 58, 66, 74, 82], color: "#ffb347" },
                { name: "MERN", values: [15, 22, 28, 35, 42, 50, 58, 65], color: "#c45c00" },
              ]}
            />
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute bottom-6 left-[19px] top-4 hidden w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border-color)] to-transparent md:block" />

          <div className="grid grid-cols-1 gap-4 md:gap-5">
            {EXPERIENCE.map((job, index) => (
              <motion.article
                key={job.company}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: easeOut }}
                className="relative md:pl-14"
              >
                <div
                  className={`absolute left-[13px] top-7 hidden h-3.5 w-3.5 border-2 border-[var(--accent)] bg-[var(--background)] md:block ${
                    index === 0 ? "shadow-[0_0_0_4px_var(--accent-soft)]" : ""
                  }`}
                />

                <motion.div
                  whileHover={{ y: -2 }}
                  className="panel w-full overflow-hidden transition hover:border-[var(--accent)]/35"
                >
                  <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-start lg:gap-8 lg:p-7">
                    <div className="flex shrink-0 items-start justify-between gap-4 lg:w-[280px] lg:flex-col lg:justify-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                            <Briefcase size={11} />
                            {job.type}
                          </span>
                          <span className="font-display text-sm text-[var(--accent)]">
                            0{index + 1}
                          </span>
                        </div>
                        <h3 className="mt-3 font-display text-xl leading-tight text-[var(--foreground)] sm:text-2xl">
                          {job.company}
                        </h3>
                        <p className="mt-1.5 text-sm font-medium text-[var(--gray-light)]">
                          {job.role}
                        </p>
                        <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-[var(--gray-muted)]">
                          <MapPin size={12} className="text-[var(--accent)]" />
                          On-site / hybrid · Pakistan
                        </p>
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 border-t border-[var(--border-color)] pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--gray-muted)]">
                        Highlights
                      </p>
                      <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-1">
                        {job.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 border border-[var(--border-color)] bg-[var(--input-bg)] px-3.5 py-3 text-sm leading-relaxed text-[var(--gray-light)]"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--accent)]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
