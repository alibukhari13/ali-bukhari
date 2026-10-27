"use client";

import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";

type Props = {
  values?: number[];
  delay?: number;
};

export default function MiniBars({
  values = [45, 62, 38, 78, 55, 88, 70],
  delay = 0,
}: Props) {
  return (
    <div className="flex h-12 items-end gap-1">
      {values.map((v, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-[var(--accent)]/80"
          initial={{ height: 0 }}
          whileInView={{ height: `${v}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: delay + i * 0.05, ease: easeOut }}
        />
      ))}
    </div>
  );
}
