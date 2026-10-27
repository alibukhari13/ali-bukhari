"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/constants/skills";
import { easeOut } from "@/lib/motion";

export default function SkillBars() {
  return (
    <div className="space-y-5">
      {SKILLS.map((skill, index) => (
        <div key={skill.name}>
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <span className="text-sm font-medium text-[var(--foreground)]">{skill.name}</span>
            <span className="font-display text-xs tabular-nums text-[var(--accent)]">
              {skill.level}%
            </span>
          </div>
          <div className="relative h-2 w-full overflow-hidden bg-[var(--foreground)]/[0.06]">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[var(--accent)]"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 1.05, delay: index * 0.06, ease: easeOut }}
            />
            <motion.div
              className="absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              initial={{ left: "-10%" }}
              whileInView={{ left: `${Math.max(skill.level - 8, 0)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.05, delay: index * 0.06, ease: easeOut }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
