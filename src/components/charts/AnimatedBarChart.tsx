"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";

type Bar = { label: string; value: number };

type Props = {
  title?: string;
  data?: Bar[];
  height?: number;
  className?: string;
};

const DEFAULT: Bar[] = [
  { label: "React", value: 92 },
  { label: "Next", value: 90 },
  { label: "Shopify", value: 88 },
  { label: "Node", value: 82 },
  { label: "UI/UX", value: 86 },
];

export default function AnimatedBarChart({
  title = "Skill strength (%)",
  data = DEFAULT,
  className = "",
}: Props) {
  const uid = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

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

  const left = 36;
  const right = 300;
  const top = 28;
  const base = 150;
  const scale = (base - top) / 100;
  const slot = (right - left) / data.length;
  const barW = Math.min(36, slot * 0.55);

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <svg viewBox="0 0 320 180" className="h-auto w-full" role="img" aria-label={title}>
        <defs>
          <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffb347" />
            <stop offset="100%" stopColor="#ff8c00" />
          </linearGradient>
          <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="45%" stopColor="#fff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-50%" y="-40%" width="200%" height="180%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <text x={160} y={14} textAnchor="middle" className="fill-[var(--gray-light)] text-[10px]">
          {title}
        </text>

        {[0, 25, 50, 75, 100].map((tick) => {
          const y = base - tick * scale;
          return (
            <g key={tick}>
              <line
                x1={left}
                y1={y}
                x2={right}
                y2={y}
                stroke="currentColor"
                strokeOpacity="0.08"
              />
              <text
                x={left - 6}
                y={y + 3}
                textAnchor="end"
                className="fill-[var(--gray-muted)] text-[8px]"
              >
                {tick}
              </text>
            </g>
          );
        })}

        <path
          d={`M${left} ${top - 2} V${base} H${right}`}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.2"
        />

        {data.map((bar, i) => {
          const x = left + i * slot + (slot - barW) / 2;
          const h = bar.value * scale;
          const y = base - h;
          return (
            <g key={bar.label}>
              <motion.rect
                x={x - 2}
                width={barW + 4}
                rx={4}
                fill="#ff8c00"
                fillOpacity={0.18}
                filter={`url(#${uid}-glow)`}
                initial={{ y: base, height: 0 }}
                animate={live ? { y, height: h } : { y: base, height: 0 }}
                transition={{ duration: 0.85, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.rect
                x={x}
                width={barW}
                rx={4}
                fill={`url(#${uid}-fill)`}
                initial={{ y: base, height: 0 }}
                animate={live ? { y, height: h } : { y: base, height: 0 }}
                transition={{ duration: 0.85, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.rect
                x={x + 2}
                width={barW * 0.32}
                rx={2}
                fill={`url(#${uid}-sheen)`}
                initial={{ y: base, height: 0 }}
                animate={live ? { y, height: h } : { y: base, height: 0 }}
                transition={{ duration: 0.85, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.text
                x={x + barW / 2}
                textAnchor="middle"
                className="fill-[var(--accent)] text-[9px] font-semibold"
                initial={{ opacity: 0, y: base - 4 }}
                animate={live ? { opacity: 1, y: y - 6 } : {}}
                transition={{ delay: 0.35 + i * 0.1 }}
              >
                {bar.value}%
              </motion.text>
              <text
                x={x + barW / 2}
                y={base + 16}
                textAnchor="middle"
                className="fill-[var(--gray-muted)] text-[8px]"
              >
                {bar.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
