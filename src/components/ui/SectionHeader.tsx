"use client";

import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";

type Props = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeader({ title, subtitle, align = "center" }: Props) {
  return (
    <div className={`mb-10 md:mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
      <motion.h2
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, ease: easeOut }}
        className="font-display text-4xl uppercase tracking-tighter text-[var(--foreground)] md:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.12, ease: easeOut }}
        className={`mt-4 h-[2px] w-14 origin-left bg-[var(--accent)] ${
          align === "center" ? "mx-auto origin-center" : ""
        }`}
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18, duration: 0.45 }}
          className={`mt-4 max-w-xl text-sm text-[var(--gray-light)] md:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
