"use client";

import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";

type Series = { name: string; values: number[]; color: string };

const DEFAULT: Series[] = [
  {
    name: "Frontend",
    values: [30, 42, 48, 55, 62, 70, 78, 86],
    color: "#ff8c00",
  },
  {
    name: "Shopify",
    values: [18, 25, 32, 40, 48, 55, 64, 72],
    color: "#ffb347",
  },
  {
    name: "Backend",
    values: [12, 18, 24, 30, 36, 42, 48, 54],
    color: "#c45c00",
  },
];

function toPath(values: number[], w: number, h: number, pad = 20) {
  const step = (w - pad * 2) / (values.length - 1);
  return values
    .map((v, i) => {
      const x = pad + i * step;
      const y = h - pad - (v / 100) * (h - pad * 2);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function AreaMultiChart({
  series = DEFAULT,
  className = "",
}: {
  series?: Series[];
  className?: string;
}) {
  const w = 360;
  const h = 180;

  return (
    <div className={className}>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" aria-label="Growth by focus area">
        <defs>
          {series.map((s, i) => (
            <linearGradient key={s.name} id={`area-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {[0.25, 0.5, 0.75].map((r) => (
          <line
            key={r}
            x1="20"
            x2={w - 20}
            y1={20 + (h - 40) * r}
            y2={20 + (h - 40) * r}
            stroke="currentColor"
            strokeOpacity="0.07"
          />
        ))}

        {[...series].reverse().map((s, revIdx) => {
          const i = series.length - 1 - revIdx;
          const line = toPath(s.values, w, h);
          const area = `${line} L ${w - 20} ${h - 20} L 20 ${h - 20} Z`;
          return (
            <g key={s.name}>
              <motion.path
                d={area}
                fill={`url(#area-${i})`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1 }}
              />
              <motion.path
                d={line}
                fill="none"
                stroke={s.color}
                strokeWidth="2.2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.12, ease: easeOut }}
              />
            </g>
          );
        })}
      </svg>

      <div className="mt-2 flex flex-wrap gap-3">
        {series.map((s) => (
          <span key={s.name} className="flex items-center gap-1.5 text-[10px] text-[var(--gray-light)]">
            <span className="h-1.5 w-3" style={{ background: s.color }} />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}
