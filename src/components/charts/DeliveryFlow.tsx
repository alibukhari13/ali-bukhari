"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";

const STEPS = [
  { id: "01", role: "Design", x: 18, y: 22 },
  { id: "02", role: "Build", x: 205, y: 22 },
  { id: "03", role: "Ship", x: 18, y: 128 },
  { id: "04", role: "Scale", x: 205, y: 128 },
];

const LINKS = [
  "M95 48 L128 82",
  "M205 48 L172 82",
  "M95 154 L128 118",
  "M205 154 L172 118",
];

export default function DeliveryFlow({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const ref = useRef<SVGSVGElement>(null);
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

  return (
    <svg
      ref={ref}
      viewBox="0 0 300 200"
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label="Delivery flow: Design, Build, Ship, Scale"
    >
      <defs>
        <radialGradient id={`${uid}-core`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4a2a0a" />
          <stop offset="75%" stopColor="#1a1008" />
          <stop offset="100%" stopColor="#0a0806" />
        </radialGradient>
        <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <path d="M0 100 H300 M150 0 V200" stroke="currentColor" strokeOpacity="0.05" />

      {LINKS.map((d, i) => (
        <g key={i}>
          <motion.path
            d={d}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.3"
            strokeWidth="1.4"
            initial={{ pathLength: 0 }}
            animate={live ? { pathLength: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.08 }}
          />
          <motion.path
            d={d}
            fill="none"
            stroke="#ffb347"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="5 28"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={live ? { pathLength: 1, opacity: [0.25, 0.9, 0.25] } : {}}
            transition={{
              pathLength: { duration: 1, delay: 0.45 + i * 0.08 },
              opacity: { duration: 1.8, delay: 0.7 + i * 0.1, repeat: Infinity },
            }}
          />
        </g>
      ))}

      <circle
        cx="150"
        cy="100"
        r="46"
        fill="var(--accent)"
        opacity="0.1"
        filter={`url(#${uid}-glow)`}
      />
      <motion.circle
        cx="150"
        cy="100"
        r="42"
        fill={`url(#${uid}-core)`}
        stroke="var(--accent)"
        strokeWidth="1.5"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={live ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.45 }}
        style={{ transformOrigin: "150px 100px" }}
      />
      <motion.circle
        cx="150"
        cy="100"
        r="52"
        fill="none"
        stroke="var(--accent)"
        strokeOpacity="0.28"
        strokeDasharray="3 7"
        animate={live ? { rotate: 360 } : {}}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "150px 100px" }}
      />
      <text
        x="150"
        y="104"
        textAnchor="middle"
        className="fill-[var(--accent)] text-[10px] font-semibold uppercase tracking-wider"
      >
        product
      </text>

      {STEPS.map((step, i) => (
        <motion.g
          key={step.id}
          initial={{ opacity: 0, y: 8 }}
          animate={live ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.12 + i * 0.08 }}
        >
          <rect
            x={step.x}
            y={step.y}
            width="77"
            height="48"
            rx="4"
            fill="var(--input-bg)"
            stroke="var(--border-color)"
            strokeWidth="1"
          />
          <text
            x={step.x + 38.5}
            y={step.y + 20}
            textAnchor="middle"
            className="fill-[var(--accent)] text-[10px] font-bold"
          >
            {step.id}
          </text>
          <text
            x={step.x + 38.5}
            y={step.y + 35}
            textAnchor="middle"
            className="fill-[var(--gray-light)] text-[9px]"
          >
            {step.role}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
