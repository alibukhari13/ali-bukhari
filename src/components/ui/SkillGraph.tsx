"use client";

import { MotionConfig, motion } from "framer-motion";
import { MonitorSmartphone, Waypoints } from "lucide-react";
import { SKILLS } from "@/constants/skills";
import BrandMark from "@/components/ui/BrandMark";
import { easeOut } from "@/lib/motion";

const groups = [
  { title: "Web & Ecommerce", note: "Interfaces and storefronts", skills: ["React.js", "Next.js", "Tailwind CSS", "Shopify"], direction: "left" },
  { title: "Apps & integrations", note: "Reliable full-stack delivery", skills: ["Node.js / Express", "MongoDB", "REST APIs", "Responsive UI"], direction: "right" },
];

function SkillIcon({ name }: { name: string }) {
  if (name === "Responsive UI") return <MonitorSmartphone size={30} strokeWidth={1.8} className="text-[var(--accent)]" aria-hidden="true" />;
  if (name === "REST APIs") return <Waypoints size={30} strokeWidth={1.8} className="text-[var(--accent)]" aria-hidden="true" />;
  return <BrandMark name={name} size={32} />;
}

export default function SkillGraph() {
  return (
    <div className="divide-y divide-[var(--border-color)]" aria-label="Technologies and areas of focus">
      {groups.map((group, index) => {
        const skills = group.skills.filter((skillName) => SKILLS.some((skill) => skill.name === skillName));
        const copies = Array.from({ length: 12 }, (_, copy) => copy);
        const oneSet = "-8.333333%";
        const start = group.direction === "left" ? "0%" : oneSet;
        const end = group.direction === "left" ? oneSet : "0%";

        return (
          <motion.section
            key={group.title}
            aria-labelledby={`toolkit-group-${index}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-24px" }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: easeOut }}
            className="grid gap-2 py-5 first:pt-3 sm:py-6 md:grid-cols-[190px_minmax(0,1fr)] md:items-center md:gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10"
          >
            <div className="flex items-baseline gap-3 px-1 sm:px-2 md:flex-col md:items-start md:gap-1">
              <span className="font-mono text-[10px] tracking-[.15em] text-[var(--accent)]">0{index + 1}</span>
              <div>
                <h4 id={`toolkit-group-${index}`} className="font-display text-base font-semibold tracking-[-.025em] text-[var(--foreground)] sm:text-lg">{group.title}</h4>
                <p className="mt-1 text-xs text-[var(--gray-muted)]">{group.note}</p>
              </div>
            </div>

            <MotionConfig reducedMotion="never">
              <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_4%,black_96%,transparent)]" aria-hidden="true">
                <motion.div
                  className="flex w-max"
                  animate={{ x: [start, end] }}
                  transition={{ duration: 24, repeat: Infinity, repeatType: "loop", repeatDelay: 0, ease: "linear" }}
                >
                  {copies.map((copy) => (
                    <div key={copy} className="flex shrink-0 gap-5 pr-5 sm:gap-8 sm:pr-8">
                      {skills.map((skillName) => (
                        <motion.div
                          key={`${copy}-${skillName}`}
                          whileHover={{ y: -3, scale: 1.03 }}
                          className="flex w-[150px] shrink-0 items-center gap-3 py-3 sm:w-[174px] sm:gap-4"
                        >
                          <span className="grid h-10 w-10 shrink-0 place-items-center sm:h-11 sm:w-11"><SkillIcon name={skillName} /></span>
                          <span className="text-xs font-medium leading-snug text-[var(--gray-light)] transition-colors hover:text-[var(--foreground)] sm:text-sm">{skillName}</span>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
            </MotionConfig>
            <ul className="sr-only">
              {skills.map((skillName) => <li key={skillName}>{skillName}</li>)}
            </ul>
          </motion.section>
        );
      })}
    </div>
  );
}
