"use client";

import { motion, useReducedMotion } from "framer-motion";

type Variant = "dots" | "diamond" | "wave" | "arcs" | "orbit";

const movements: Record<Variant, { x: number[]; y: number[]; rotate?: number[]; duration: number }> = {
  dots: { x: [0, 12, 0], y: [0, -10, 0], duration: 24 },
  diamond: { x: [0, -12, 0], y: [0, 15, 0], rotate: [0, 9, 0], duration: 19 },
  wave: { x: [0, 10, 0], y: [0, -14, 0], rotate: [0, -2, 0], duration: 17 },
  arcs: { x: [0, 9, 0], y: [0, -9, 0], rotate: [0, 24, 0], duration: 22 },
  orbit: { x: [0, -11, 0], y: [0, 12, 0], rotate: [0, -8, 0], duration: 20 },
};

export default function MotionOrnament({ variant, className = "" }: { variant: Variant; className?: string }) {
  const reduceMotion = useReducedMotion();
  const movement = movements[variant];

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 text-[var(--accent)] opacity-25 ${className}`}
      animate={reduceMotion ? undefined : {
        x: movement.x,
        y: movement.y,
        rotate: movement.rotate,
        opacity: [0.2, 0.38, 0.2],
      }}
      transition={reduceMotion ? undefined : {
        duration: movement.duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {variant === "dots" && (
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "radial-gradient(color-mix(in srgb, var(--accent) 65%, transparent) 1.25px, transparent 1.25px)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(ellipse at center, black 12%, transparent 72%)",
          }}
        />
      )}
      {variant === "diamond" && (
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative h-[58%] w-[58%] rotate-45 rounded-[2rem] border border-current/30">
            <div className="absolute inset-[16%] rounded-[1.4rem] border border-current/20" />
            <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-current/45" />
          </div>
        </div>
      )}
      {variant === "wave" && (
        <svg viewBox="0 0 420 180" className="h-full w-full" fill="none">
          <path d="M-10 54C68 8 108 102 190 54S312 8 430 54M-10 92C68 46 108 140 190 92S312 46 430 92M-10 130C68 84 108 178 190 130S312 84 430 130" stroke="currentColor" strokeOpacity=".32" strokeWidth="1.2" />
          <circle cx="190" cy="92" r="4" fill="currentColor" fillOpacity=".5" />
        </svg>
      )}
      {variant === "arcs" && (
        <div className="relative h-full w-full">
          <div className="absolute inset-[8%] rounded-full border border-current/25" />
          <div className="absolute inset-[22%] rounded-full border border-current/20" />
          <div className="absolute inset-[36%] rounded-full border border-current/15" />
          <span className="absolute right-[17%] top-[22%] h-2.5 w-2.5 rounded-full bg-current/55" />
          <span className="absolute bottom-[18%] left-[23%] h-1.5 w-1.5 rounded-full bg-current/40" />
        </div>
      )}
      {variant === "orbit" && (
        <div className="relative h-full w-full">
          <div className="absolute inset-[8%] rounded-full border border-current/25" />
          <div className="absolute inset-[24%] rounded-full border border-current/18" />
          <span className="absolute right-[10%] top-[28%] h-3 w-3 rounded-full border border-current/60 bg-[var(--background)]" />
          <span className="absolute bottom-[14%] left-[29%] h-2 w-2 rounded-full bg-current/45" />
        </div>
      )}
    </motion.div>
  );
}
