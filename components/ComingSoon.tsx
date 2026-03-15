"use client";

import { motion } from "framer-motion";

interface ComingSoonProps {
  title?: string;
  description?: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 md:py-32 px-5 md:px-6 text-center">
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-6"
      >
        <div className="w-16 h-16 rounded-full border-2 border-[var(--border-md)] flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-accent" />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--fg)] tracking-tight"
      >
        {title || "Coming Soon"}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-3 md:mt-4 text-base md:text-lg text-[var(--fg-muted)] max-w-md"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
