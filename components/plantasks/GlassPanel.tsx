"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  as?: "div";
}

/**
 * Base "Liquid Glass" surface: translucent blur, soft top edge highlight,
 * large continuous corner radius, wide low-opacity shadow. Every floating
 * PlanTasks surface (login card, day sheet, app bar) wraps this.
 */
const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={`relative rounded-[28px] border border-white/20 bg-white/10 backdrop-blur-2xl dark:border-white/10 dark:bg-black/20 ${className}`}
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.4), 0 20px 60px -15px rgba(0,0,0,0.35)",
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";

export default GlassPanel;
