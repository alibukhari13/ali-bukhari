"use client";

import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";

const SEGMENTS = [
  { label: "Frontend", value: 40, color: "var(--accent)" },
  { label: "Shopify", value: 28, color: "#80ad75" },
  { label: "Backend", value: 22, color: "#547c60" },
  { label: "APIs", value: 10, color: "#8a8a93" },
];

export default function DonutChart() {
  const size = 200;
  const stroke = 22;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="Work mix chart">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.06"
            strokeWidth={stroke}
          />
          {SEGMENTS.map((seg, i) => {
            const length = (seg.value / 100) * circumference;
            const dashOffset = -offset;
            offset += length;
            return (
              <motion.circle
                key={seg.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={stroke}
                strokeLinecap="butt"
                strokeDasharray={`${length} ${circumference - length}`}
                strokeDashoffset={dashOffset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                initial={{ strokeDasharray: `0 ${circumference}` }}
                whileInView={{ strokeDasharray: `${length} ${circumference - length}` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.1, ease: easeOut }}
              />
            );
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl text-[var(--foreground)]">100%</span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--gray-muted)]">
            Focus
          </span>
        </div>
      </div>

      <ul className="w-full space-y-2.5 sm:w-auto">
        {SEGMENTS.map((seg, i) => (
          <motion.li
            key={seg.label}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.07 }}
            className="flex items-center justify-between gap-6 text-sm"
          >
            <span className="flex items-center gap-2 text-[var(--gray-light)]">
              <span className="h-2 w-2" style={{ background: seg.color }} />
              {seg.label}
            </span>
            <span className="font-display tabular-nums text-[var(--foreground)]">{seg.value}%</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
