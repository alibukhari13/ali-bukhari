"use client";

import { motion } from "framer-motion";
import { MonitorSmartphone, Waypoints } from "lucide-react";
import { SKILLS } from "@/constants/skills";
import BrandMark from "@/components/ui/BrandMark";
import { easeOut } from "@/lib/motion";

const groups = [
  { title: "Web & commerce", note: "Interfaces and storefronts", skills: ["React.js", "Next.js", "Tailwind CSS", "Shopify"] },
  { title: "Apps & integrations", note: "Reliable full-stack delivery", skills: ["Node.js / Express", "MongoDB", "REST APIs", "Responsive UI"] },
];

export default function SkillGraph() {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2" aria-label="Technologies and areas of focus">
      {groups.map((group, index) => (
        <motion.section
          key={group.title}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.45, delay: index * 0.07, ease: easeOut }}
          className="rounded-xl border border-[var(--border-color)] bg-[var(--surface)] p-4"
        >
          <div className="mb-3 flex items-start justify-between gap-2">
            <div>
              <h4 className="text-sm font-semibold text-[var(--foreground)]">{group.title}</h4>
              <p className="mt-1 text-xs text-[var(--gray-muted)]">{group.note}</p>
            </div>
            <span className="font-mono text-[10px] text-[var(--gray-muted)]">0{index + 1}</span>
          </div>
          <ul className="grid grid-cols-2 gap-2">
            {group.skills.map((skillName) => {
              const skill = SKILLS.find((item) => item.name === skillName);
              if (!skill) return null;
              return (
                <li key={skill.name} className="flex min-w-0 items-center gap-2 rounded-lg border border-[var(--border-color)]/70 bg-[var(--input-bg)] px-2.5 py-2">
                  {skill.name === "Responsive UI" ? <MonitorSmartphone size={15} className="shrink-0 text-[var(--accent)]" /> : skill.name === "REST APIs" ? <Waypoints size={15} className="shrink-0 text-[var(--accent)]" /> : <BrandMark name={skill.name} size={15} />}
                  <span className="truncate text-[10px] font-medium text-[var(--foreground)] sm:text-xs">{skill.name}</span>
                </li>
              );
            })}
          </ul>
        </motion.section>
      ))}
    </div>
  );
}
