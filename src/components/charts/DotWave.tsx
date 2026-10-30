"use client";

import { motion } from "framer-motion";

type Props = {
  tone?: "accent" | "soft";
  className?: string;
};

export default function DotWave({ tone = "accent", className = "" }: Props) {
  const rows = 6;
  const cols = 28;
  const color = tone === "accent" ? "var(--accent)" : "#80ad75";

  return (
    <svg
      viewBox="0 0 280 56"
      className={`h-auto w-full ${className}`}
      aria-hidden
    >
      {Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => {
          const x = 6 + col * 10;
          const baseY = 10 + row * 8;
          const wave = Math.sin(col * 0.35 + row * 0.4) * 4;
          return (
            <motion.circle
              key={`${row}-${col}`}
              cx={x}
              cy={baseY + wave}
              r={1.2 + (row % 3 === 0 ? 0.4 : 0)}
              fill={color}
              initial={{ opacity: 0.15 }}
              animate={{
                opacity: [0.15, 0.55, 0.15],
                cy: [baseY + wave, baseY + wave - 3, baseY + wave],
              }}
              transition={{
                duration: 2.4 + (row % 3) * 0.3,
                delay: (col + row) * 0.03,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })
      )}
    </svg>
  );
}
