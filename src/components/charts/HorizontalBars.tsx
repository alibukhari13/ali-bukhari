"use client";

import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";

type Item = { label: string; value: number };

export default function HorizontalBars({
  data,
  className = "",
}: {
  data: Item[];
  className?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {data.map((item, i) => (
        <div key={item.label}>
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-[var(--gray-light)]">{item.label}</span>
            <span className="tabular-nums text-[var(--accent)]">{item.value}%</span>
          </div>
          <div className="h-2.5 overflow-hidden bg-[var(--foreground)]/[0.06]">
            <motion.div
              className="relative h-full"
              style={{
                background: "linear-gradient(90deg, #547c60, #9dcba6 55%, #80ad75)",
              }}
              initial={{ width: 0 }}
              whileInView={{ width: `${item.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.07, ease: easeOut }}
            >
              <span className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/30 to-transparent" />
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}
