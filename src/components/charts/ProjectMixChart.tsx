"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "@/lib/motion";

type Project = { category?: string | null };

export default function ProjectMixChart({ projects }: { projects: Project[] }) {
  const reduceMotion = useReducedMotion();
  const counts = projects.reduce<Record<string, number>>((result, project) => {
    const category = project.category?.trim() || "Other";
    result[category] = (result[category] || 0) + 1;
    return result;
  }, {});
  const rows = Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 3);
  const max = Math.max(1, ...rows.map(([, count]) => count));

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="w-full max-w-[340px] rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-4 sm:p-5"
      role="img"
      aria-label={`Project mix: ${rows.map(([category, count]) => `${category}, ${count}`).join("; ")}`}
    >
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-[.14em] text-[var(--foreground)]">Project mix</h3>
        <span className="text-[10px] text-[var(--gray-muted)]">by category</span>
      </div>
      <div className="space-y-3">
        {rows.map(([category, count], index) => (
          <div key={category}>
            <div className="mb-1.5 flex items-center justify-between gap-3 text-[11px]">
              <span className="truncate text-[var(--gray-light)]">{category}</span>
              <span className="font-mono tabular-nums text-[var(--foreground)]">{String(count).padStart(2, "0")}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[var(--input-bg)]">
              <motion.div
                initial={{ scaleX: reduceMotion ? count / max : 0 }}
                whileInView={{ scaleX: count / max }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: easeOut }}
                className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[var(--accent)]/55 to-[var(--accent)]"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
