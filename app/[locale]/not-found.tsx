"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

export default function NotFound() {
  const locale = useLocale();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center">
      <p className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-4">
        Page not found
      </p>
      <h1
        style={{ fontSize: "clamp(5rem, 20vw, 14rem)" }}
        className="font-black text-[var(--fg)] tracking-tighter leading-none mb-6"
      >
        404
      </h1>
      <p className="text-[var(--fg-muted)] font-light mb-10 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href={`/${locale}`}
        className="text-sm uppercase tracking-widest text-[var(--fg-muted)] border border-[var(--border-md)] px-8 py-3 rounded-full hover:text-[var(--fg)] hover:border-[var(--fg)] transition-colors duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}
