"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const row1 = "Lens · Screen · Moments · Lens · Screen · Moments · Lens · Screen · Moments ·";
  const row2 = "Ibrahim · Creative · Portfolio · Ibrahim · Creative · Portfolio · Ibrahim ·";

  return (
    <div ref={ref} className="py-10 md:py-14 overflow-hidden bg-[var(--bg)] select-none">
      <motion.div
        style={{
          x: x1,
          fontSize: "clamp(4rem, 10vw, 9rem)",
          whiteSpace: "nowrap",
          lineHeight: 0.9,
          color: "var(--fg)",
        }}
        className="font-black uppercase tracking-tight"
      >
        {row1}
      </motion.div>
      <motion.div
        style={{
          x: x2,
          fontSize: "clamp(4rem, 10vw, 9rem)",
          whiteSpace: "nowrap",
          lineHeight: 0.9,
          color: "var(--fg)",
        }}
        className="font-black uppercase tracking-tight mt-2 md:mt-3"
      >
        {row2}
      </motion.div>
    </div>
  );
}
