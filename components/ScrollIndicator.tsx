"use client";

import { motion } from "framer-motion";

interface ScrollIndicatorProps {
  label?: string;
}

export default function ScrollIndicator({ label }: ScrollIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 md:gap-2"
    >
      {label && (
        <span className="text-white/60 text-[10px] md:text-xs tracking-widest uppercase">
          {label}
        </span>
      )}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1 md:p-1.5"
      >
        <motion.div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white/60 rounded-full" />
      </motion.div>
    </motion.div>
  );
}
