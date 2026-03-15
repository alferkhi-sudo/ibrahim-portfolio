"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const STATEMENT = "Don't let the noise of others' opinions drown out your inner voice\n- steve jobs";
const words = STATEMENT.split(" ");

function Word({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  
  // Handle line breaks
  if (word.includes('\n')) {
    const [beforeBreak, afterBreak] = word.split('\n');
    return (
      <>
        <motion.span style={{ opacity }} className="inline-block mr-[0.3em]">
          {beforeBreak}
        </motion.span>
        <br />
        <motion.span style={{ opacity }} className="inline-block mr-[0.3em]">
          {afterBreak}
        </motion.span>
      </>
    );
  }
  
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.3em]">
      {word}
    </motion.span>
  );
}

export default function ScrollRevealText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end center"],
  });

  return (
    <div ref={containerRef} style={{ height: "200vh" }} className="relative">
      <div className="sticky top-0 h-screen flex items-center justify-center bg-[var(--bg)] overflow-hidden px-8 md:px-16">
        <p
          className="font-black uppercase text-center max-w-6xl text-[var(--fg)]"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 7rem)",
            lineHeight: 1.1,
          }}
        >
          {words.map((word, i) => {
            // Tighter stagger for faster reveal
            const start = Math.min(i / words.length, 0.85);
            const end = Math.min((i + 1.2) / words.length, 1.0);
            return (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                start={start}
                end={end}
              />
            );
          })}
        </p>
      </div>
    </div>
  );
}
