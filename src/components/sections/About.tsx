/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import RadarChart from "@/components/charts/RadarChart";
import DotWave from "@/components/charts/DotWave";
import { SKILLS } from "@/constants/skills";
import { FALLBACK_ABOUT } from "@/constants/fallback";
import { easeOut } from "@/lib/motion";

const FOCUS = [
  {
    title: "Product UI",
    text: "Reusable components, clear layouts, and interfaces that feel fast on every device.",
  },
  {
    title: "Shopify commerce",
    text: "Theme customization, storefronts, apps, and payment flows built for conversion.",
  },
  {
    title: "Full-stack delivery",
    text: "React/Next frontends wired to Node, Express, MongoDB, and REST APIs.",
  },
];

const About = () => {
  const [aboutData, setAboutData] = useState<any>(FALLBACK_ABOUT);

  useEffect(() => {
    const fetchAbout = async () => {
      const { data } = await supabase.from("about").select("*").single();
      if (data) setAboutData(data);
    };
    fetchAbout();
  }, []);

  const paragraphs = aboutData.description_texts || FALLBACK_ABOUT.description_texts;
  const stats = aboutData.stats || FALLBACK_ABOUT.stats;

  return (
    <section id="about" className="section-shell">
      <SectionBackdrop variant="orbs" />
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <SectionHeader
          title="About Me"
          subtitle="Web developer focused on clean interfaces, Shopify commerce, and reliable full-stack delivery."
        />

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="space-y-4 text-base leading-relaxed text-[var(--gray-light)] md:text-lg"
            >
              {paragraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>

            <div className="mt-6 max-w-md">
              <DotWave />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 grid grid-cols-3 gap-3"
            >
              {stats.map((stat: any) => (
                <div key={stat.label} className="panel px-3 py-4 text-center">
                  <p className="font-display text-lg text-[var(--accent)] md:text-xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--gray-muted)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.a
              href="/resume.pdf"
              download="Syed_Ali_Resume.pdf"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -2 }}
              className="mt-8 inline-flex items-center gap-3 border border-[var(--border-color)] bg-[var(--input-bg)] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--foreground)] transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
            >
              <Download size={16} />
              Download Resume
            </motion.a>
          </div>

          <div className="space-y-5 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="panel p-5"
            >
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Skill shape
              </p>
              <p className="mb-3 text-sm text-[var(--gray-muted)]">
                Where I spend most of my time day to day.
              </p>
              <div className="mx-auto max-w-[260px]">
                <RadarChart
                  data={[
                    { label: "React", value: 92 },
                    { label: "Next", value: 90 },
                    { label: "Shopify", value: 88 },
                    { label: "Node", value: 82 },
                    { label: "UI", value: 90 },
                    { label: "APIs", value: 86 },
                  ]}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
              className="panel p-5"
            >
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Tech stack
              </p>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <span
                    key={skill.name}
                    className="border border-[var(--border-color)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--gray-light)]"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {FOCUS.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="panel p-5"
            >
              <p className="font-display text-sm text-[var(--accent)]">0{i + 1}</p>
              <h3 className="mt-2 font-display text-lg text-[var(--foreground)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--gray-muted)]">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
