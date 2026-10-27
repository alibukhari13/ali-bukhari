"use client";

import { motion } from "framer-motion";

const WIDTH = 1200;
const HEIGHT = 320;

function tone(x: number) {
  const t = x / WIDTH;
  const r = Math.round(255);
  const g = Math.round(120 + (180 - 120) * (1 - t));
  const b = Math.round(0 + 40 * t);
  return `rgb(${r},${g},${b})`;
}

type Props = {
  className?: string;
  rows?: number;
  amplitude?: number;
};

export default function ParticleWave({
  className = "",
  rows = 28,
  amplitude = 30,
}: Props) {
  const dots: { x: number; y: number; r: number; o: number }[] = [];
  for (let row = 0; row < rows; row += 1) {
    const t = row / (rows - 1);
    const step = row % 3 === 0 ? 9 : 12;
    for (let x = 0; x <= WIDTH; x += step) {
      const swell = Math.sin(x * 0.0075 + t * 2.1) * amplitude * (0.3 + t * 0.7);
      const y = 230 + (t - 0.62) * 200 + swell - (x / WIDTH) * 140;
      const crest = Math.exp(-((t - 0.72) ** 2) / 0.02);
      dots.push({
        x,
        y: Number(y.toFixed(1)),
        r: Number((0.5 + t * 1.2 + crest * 1).toFixed(2)),
        o: Number(Math.min(0.85, 0.06 + t * 0.5 + crest * 0.35 + (x / WIDTH) * 0.25).toFixed(2)),
      });
    }
  }

  return (
    <svg
      className={`pointer-events-none h-full w-full ${className}`}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <motion.g
        animate={{ x: [0, -18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        {dots.map((dot, i) => (
          <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} fill={tone(dot.x)} opacity={dot.o} />
        ))}
      </motion.g>
    </svg>
  );
}
