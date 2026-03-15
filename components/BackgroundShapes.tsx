"use client";

import { motion, useReducedMotion } from "framer-motion";

const blobs = [
  {
    // Large organic — top right, bleeds off edge
    id: 1,
    viewBox: "0 0 680 620",
    path: "M340,75 C470,35 610,125 640,265 C670,405 580,520 445,558 C310,596 155,548 95,418 C35,288 78,162 178,112 C238,82 272,98 340,75Z",
    style: { top: "-80px", right: "-130px", width: "640px", height: "580px" } as React.CSSProperties,
    animate: { x: [0, 35, -18, 0], y: [0, -28, 22, 0], rotate: [0, 7, -3, 0], scale: [1, 1.03, 0.97, 1] },
    transition: { duration: 38, repeat: Infinity, ease: "easeInOut" as const },
    mobileVisible: true,
  },
  {
    // Medium elongated — left side
    id: 2,
    viewBox: "0 0 480 440",
    path: "M240,55 C360,15 475,88 490,195 C505,302 432,398 315,415 C198,432 78,370 52,260 C26,150 88,75 240,55Z",
    style: { top: "12%", left: "-90px", width: "440px", height: "400px" } as React.CSSProperties,
    animate: { x: [0, -42, 22, 0], y: [0, 32, -22, 0], rotate: [0, -5, 4, 0], scale: [1, 0.96, 1.04, 1] },
    transition: { duration: 44, repeat: Infinity, ease: "easeInOut" as const, delay: 6 },
    mobileVisible: true,
  },
  {
    // Large tall blob — bottom left, bleeds off
    id: 3,
    viewBox: "0 0 580 680",
    path: "M290,85 C420,38 555,128 572,268 C589,408 505,545 365,582 C225,619 88,550 58,410 C28,270 95,152 198,105 C242,85 265,108 290,85Z",
    style: { bottom: "-100px", left: "-110px", width: "530px", height: "630px" } as React.CSSProperties,
    animate: { x: [0, 28, -38, 0], y: [0, -22, 32, 0], rotate: [0, 4, -7, 0], scale: [1, 1.04, 0.96, 1] },
    transition: { duration: 50, repeat: Infinity, ease: "easeInOut" as const, delay: 12 },
    mobileVisible: true,
  },
  {
    // Small organic — upper center area
    id: 4,
    viewBox: "0 0 310 270",
    path: "M155,42 C225,12 305,58 315,135 C325,212 262,272 182,278 C102,284 32,232 22,162 C12,92 68,58 155,42Z",
    style: { top: "6%", left: "28%", width: "290px", height: "250px" } as React.CSSProperties,
    animate: { x: [0, 22, -32, 12, 0], y: [0, -18, 28, -10, 0], rotate: [0, 9, -6, 7, 0], scale: [1, 1.05, 0.95, 1.02, 1] },
    transition: { duration: 32, repeat: Infinity, ease: "easeInOut" as const, delay: 4 },
    mobileVisible: false,
  },
  {
    // Extra large asymmetric — right center, bleeds off
    id: 5,
    viewBox: "0 0 760 720",
    path: "M380,95 C542,48 698,165 718,312 C738,459 632,592 472,630 C312,668 148,600 90,460 C32,320 72,182 192,124 C268,78 322,118 380,95Z",
    style: { bottom: "0%", right: "-160px", width: "680px", height: "640px" } as React.CSSProperties,
    animate: { x: [0, -32, 48, 0], y: [0, 22, -38, 0], rotate: [0, -3, 6, 0], scale: [1, 0.97, 1.03, 1] },
    transition: { duration: 55, repeat: Infinity, ease: "easeInOut" as const, delay: 9 },
    mobileVisible: false,
  },
  {
    // Medium irregular — right side mid
    id: 6,
    viewBox: "0 0 390 360",
    path: "M195,55 C292,18 382,88 390,175 C398,262 325,348 228,365 C131,382 42,322 25,232 C8,142 68,62 195,55Z",
    style: { top: "22%", right: "2%", width: "360px", height: "330px" } as React.CSSProperties,
    animate: { x: [0, 38, -22, 0], y: [0, -32, 18, 0], rotate: [0, 5, -9, 0], scale: [1, 1.02, 0.98, 1] },
    transition: { duration: 42, repeat: Infinity, ease: "easeInOut" as const, delay: 18 },
    mobileVisible: false,
  },
];

export default function BackgroundShapes() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {blobs.map((blob) => (
        <motion.svg
          key={blob.id}
          viewBox={blob.viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute ${!blob.mobileVisible ? "hidden md:block" : ""}`}
          style={{
            ...blob.style,
            willChange: "transform",
          }}
          animate={shouldReduceMotion ? {} : blob.animate}
          transition={blob.transition}
        >
          <path
            d={blob.path}
            stroke="rgba(0,0,0,0.07)"
            strokeWidth="1.2"
            fill="none"
          />
        </motion.svg>
      ))}
    </div>
  );
}
