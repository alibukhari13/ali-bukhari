"use client";

import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";

const AXES = [
  { label: "React", value: 92 },
  { label: "Next.js", value: 90 },
  { label: "Shopify", value: 88 },
  { label: "Node", value: 82 },
  { label: "UI/UX", value: 86 },
  { label: "APIs", value: 86 },
];

function polar(cx: number, cy: number, r: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function SkillRadar() {
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 105;
  const step = 360 / AXES.length;
  const rings = [0.25, 0.5, 0.75, 1];

  const polygon = AXES.map((axis, i) => {
    const p = polar(cx, cy, (axis.value / 100) * maxR, i * step);
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(" ");

  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-auto w-full" aria-label="Skill radar">
        <defs>
          <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.08" />
          </radialGradient>
        </defs>

        {rings.map((ratio) => (
          <polygon
            key={ratio}
            points={AXES.map((_, i) => {
              const p = polar(cx, cy, maxR * ratio, i * step);
              return `${p.x},${p.y}`;
            }).join(" ")}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.07 + ratio * 0.04}
          />
        ))}

        {AXES.map((_, i) => {
          const p = polar(cx, cy, maxR, i * step);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="currentColor"
              strokeOpacity="0.08"
            />
          );
        })}

        <motion.polygon
          points={polygon}
          fill="url(#radarFill)"
          stroke="var(--accent)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.65 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: easeOut }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {AXES.map((axis, i) => {
          const p = polar(cx, cy, (axis.value / 100) * maxR, i * step);
          const label = polar(cx, cy, maxR + 24, i * step);
          return (
            <g key={axis.label}>
              <motion.circle
                cx={p.x}
                cy={p.y}
                r="4"
                fill="var(--background)"
                stroke="var(--accent)"
                strokeWidth="2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + i * 0.05, type: "spring", stiffness: 240 }}
              />
              <text
                x={label.x}
                y={label.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-[var(--gray-light)] text-[11px] font-medium"
              >
                {axis.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
