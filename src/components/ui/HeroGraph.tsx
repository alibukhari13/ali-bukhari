"use client";

import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";

const PRIMARY = [22, 34, 30, 48, 44, 58, 52, 70, 66, 82, 78, 94];
const SECONDARY = [12, 18, 24, 22, 32, 30, 40, 38, 48, 46, 56, 62];
const LABELS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

function toSmoothPath(values: number[], width: number, height: number) {
  const step = width / (values.length - 1);
  const pts = values.map((v, i) => ({
    x: i * step,
    y: height - (v / 100) * height * 0.78 - height * 0.1,
  }));

  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i];
    const p1 = pts[i + 1];
    const cx = (p0.x + p1.x) / 2;
    d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return { d, pts };
}

export default function HeroGraph() {
  const width = 1400;
  const height = 380;
  const primary = toSmoothPath(PRIMARY, width, height);
  const secondary = toSmoothPath(SECONDARY, width, height);
  const area = `${primary.d} L ${width} ${height} L 0 ${height} Z`;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38vh] overflow-hidden md:h-[46vh]">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="h-full w-full opacity-80"
        aria-hidden
      >
        <defs>
          <linearGradient id="heroAreaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="70%" stopColor="var(--accent)" stopOpacity="0.04" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset="40%" stopColor="var(--accent)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.4" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[0.15, 0.35, 0.55, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1="0"
            x2={width}
            y1={height * ratio}
            y2={height * ratio}
            stroke="currentColor"
            strokeOpacity="0.05"
          />
        ))}

        {LABELS.map((label, i) => {
          const x = (i * width) / (LABELS.length - 1);
          return (
            <text
              key={label + i}
              x={x}
              y={height - 8}
              textAnchor="middle"
              className="fill-[var(--gray-muted)] text-[11px]"
              opacity="0.45"
            >
              {label}
            </text>
          );
        })}

        <motion.path
          d={area}
          fill="url(#heroAreaFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.35 }}
        />

        <motion.path
          d={secondary.d}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="2"
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.15, ease: easeOut }}
        />

        <motion.path
          d={primary.d}
          fill="none"
          stroke="url(#heroLine)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#softGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.9, delay: 0.25, ease: easeOut }}
        />

        <motion.path
          d={primary.d}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.25"
          strokeOpacity="0.5"
          className="graph-flow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
        />

        {primary.pts.map((p, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r="5"
              fill="var(--background)"
              stroke="var(--accent)"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.95 + i * 0.04, type: "spring", stiffness: 260 }}
            />
          </motion.g>
        ))}

        {/* Live pulse at latest point */}
        <motion.circle
          cx={primary.pts[primary.pts.length - 1].x}
          cy={primary.pts[primary.pts.length - 1].y}
          r="10"
          fill="var(--accent)"
          fillOpacity="0.2"
          animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <div className="absolute bottom-4 right-4 hidden items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--gray-muted)] md:flex">
        <span className="flex items-center gap-1.5">
          <span className="h-[2px] w-4 bg-[var(--accent)]" /> Delivery velocity
        </span>
        <span className="flex items-center gap-1.5 opacity-60">
          <span className="h-[2px] w-4 border-t border-dashed border-current" /> Baseline
        </span>
      </div>
    </div>
  );
}
