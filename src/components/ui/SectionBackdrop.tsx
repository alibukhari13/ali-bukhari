"use client";

import { motion } from "framer-motion";

type Variant = "orbs" | "grid" | "waves" | "dots";

type Props = {
  variant?: Variant;
  className?: string;
};

export default function SectionBackdrop({ variant = "orbs", className = "" }: Props) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {variant === "orbs" && (
        <>
          <motion.div
            className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[var(--accent)]/10 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, 30, 0], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-[var(--accent)]/8 blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, -40, 0], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="section-grid absolute inset-0 opacity-40" />
        </>
      )}

      {variant === "grid" && (
        <>
          <div className="section-grid absolute inset-0 opacity-45" />
          <motion.div
            className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent"
            animate={{ opacity: [0.2, 0.65, 0.2], scaleX: [0.85, 1, 0.85] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute -left-16 bottom-16 h-40 w-40 rounded-full bg-[var(--accent)]/8 blur-3xl"
            animate={{ opacity: [0.25, 0.5, 0.25], x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-10 bottom-8 h-48 w-48 rounded-full bg-[var(--accent)]/10 blur-3xl"
            animate={{ opacity: [0.2, 0.45, 0.2], y: [0, -16, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {variant === "waves" && (
        <>
          <div className="section-grid absolute inset-0 opacity-25" />
          <svg className="absolute inset-x-0 bottom-0 h-44 w-full opacity-40" viewBox="0 0 1200 160" preserveAspectRatio="none">
            <path
              d="M0 90 Q 150 40 300 90 T 600 90 T 900 90 T 1200 90 V 160 H 0 Z"
              fill="var(--accent)"
              fillOpacity="0.08"
            />
            <motion.path
              d="M0 110 Q 200 70 400 110 T 800 110 T 1200 110"
              fill="none"
              stroke="var(--accent)"
              strokeOpacity="0.45"
              strokeWidth="2"
              className="graph-flow"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            />
          </svg>
        </>
      )}

      {variant === "dots" && (
        <>
          <div className="section-dots absolute inset-0 opacity-50" />
          <motion.div
            className="absolute right-[10%] top-[20%] h-40 w-40 rounded-full border border-[var(--accent)]/20"
            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute left-[8%] bottom-[18%] h-24 w-24 rounded-full border border-[var(--accent)]/15"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 7, repeat: Infinity }}
          />
        </>
      )}
    </div>
  );
}
