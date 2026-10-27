"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";

type Axis = { label: string; value: number };

const DEFAULT: Axis[] = [
  { label: "React", value: 92 },
  { label: "Next", value: 90 },
  { label: "Shopify", value: 88 },
  { label: "Node", value: 82 },
  { label: "UI", value: 86 },
  { label: "APIs", value: 84 },
];

export default function RadarChart({
  data = DEFAULT,
  className = "",
}: {
  data?: Axis[];
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [live, setLive] = useState(false);
  const cx = 140;
  const cy = 120;
  const maxR = 78;
  const n = data.length;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLive(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const angleAt = (i: number) => -Math.PI / 2 + (i / n) * Math.PI * 2;
  const point = (i: number, r: number) => {
    const a = angleAt(i);
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
  };

  const rings = [0.25, 0.5, 0.75, 1];
  const poly = data
    .map((d, i) => {
      const p = point(i, (d.value / 100) * maxR);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      ref={ref}
      viewBox="0 0 280 250"
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label="Skill radar"
    >
      {rings.map((r) => (
        <polygon
          key={r}
          points={Array.from({ length: n }, (_, i) => {
            const p = point(i, maxR * r);
            return `${p.x},${p.y}`;
          }).join(" ")}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.1"
        />
      ))}

      {data.map((_, i) => {
        const p = point(i, maxR);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="currentColor"
            strokeOpacity="0.1"
          />
        );
      })}

      <motion.polygon
        points={poly}
        fill="var(--accent)"
        fillOpacity="0.18"
        stroke="var(--accent)"
        strokeWidth="2"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={live ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: easeOut }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {data.map((d, i) => {
        const p = point(i, (d.value / 100) * maxR);
        const label = point(i, maxR + 18);
        return (
          <g key={d.label}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="var(--accent)"
              initial={{ scale: 0 }}
              animate={live ? { scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.06, type: "spring" }}
            />
            <text
              x={label.x}
              y={label.y + 3}
              textAnchor="middle"
              className="fill-[var(--gray-light)] text-[9px]"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
