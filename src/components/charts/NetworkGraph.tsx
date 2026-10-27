"use client";

import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";

const NODES = [
  { id: "React", x: 80, y: 50 },
  { id: "Next", x: 180, y: 36 },
  { id: "Shopify", x: 260, y: 70 },
  { id: "Node", x: 120, y: 130 },
  { id: "Mongo", x: 220, y: 140 },
  { id: "API", x: 50, y: 110 },
  { id: "UI", x: 300, y: 120 },
];

const LINKS = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [3, 5],
  [1, 3],
  [2, 6],
  [4, 6],
  [2, 4],
];

export default function NetworkGraph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 340 180" className={`h-auto w-full ${className}`} aria-label="Tech network">
      {LINKS.map(([a, b], i) => {
        const n1 = NODES[a];
        const n2 = NODES[b];
        return (
          <motion.line
            key={i}
            x1={n1.x}
            y1={n1.y}
            x2={n2.x}
            y2={n2.y}
            stroke="var(--accent)"
            strokeOpacity="0.35"
            strokeWidth="1.2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.05, ease: easeOut }}
          />
        );
      })}

      {NODES.map((node, i) => (
        <g key={node.id}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="16"
            fill="var(--accent)"
            fillOpacity="0.12"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.06, type: "spring" }}
          />
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="5"
            fill="var(--accent)"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + i * 0.06, type: "spring" }}
          />
          <motion.text
            x={node.x}
            y={node.y + 28}
            textAnchor="middle"
            className="fill-[var(--gray-light)] text-[9px] font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 + i * 0.05 }}
          >
            {node.id}
          </motion.text>
        </g>
      ))}
    </svg>
  );
}
