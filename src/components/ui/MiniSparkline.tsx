"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";

type Props = {
  data?: number[];
  height?: number;
  className?: string;
  delay?: number;
};

export default function MiniSparkline({
  data = [28, 40, 35, 55, 48, 68, 62, 80],
  height = 48,
  className = "",
  delay = 0,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const width = 160;
  const step = width / (data.length - 1);
  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - (v / 100) * (height - 8) - 4;
    return { x, y };
  });

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cx = (p0.x + p1.x) / 2;
    d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  const area = `${d} L ${width} ${height} L 0 ${height} Z`;
  const gradId = `spark-${uid}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`h-12 w-full ${className}`}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill={`url(#${gradId})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, duration: 0.6 }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay, ease: easeOut }}
      />
    </svg>
  );
}
