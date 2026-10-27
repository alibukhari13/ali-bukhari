"use client";

import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";
import CountUp from "./CountUp";

type Props = {
  value: number;
  label: string;
  delay?: number;
};

export default function MetricRing({ value, label, delay = 0 }: Props) {
  const size = 108;
  const stroke = 7;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const filled = (value / 100) * c;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.08"
            strokeWidth={stroke}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c - filled }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay, ease: easeOut }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <CountUp
            value={value}
            suffix="%"
            className="font-display text-lg text-[var(--foreground)]"
          />
        </div>
      </div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--gray-muted)]">
        {label}
      </p>
    </div>
  );
}
