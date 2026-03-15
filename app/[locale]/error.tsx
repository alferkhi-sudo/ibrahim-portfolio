"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { locale } = useParams();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center">
      <p className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-6">
        Something went wrong
      </p>
      <h1
        style={{ fontSize: "clamp(3rem, 12vw, 8rem)" }}
        className="font-black text-[var(--fg)] tracking-tighter leading-none mb-8"
      >
        Error
      </h1>
      <p className="text-[var(--fg-muted)] font-light mb-10 max-w-sm">
        An unexpected error occurred. Please try again or return home.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={reset}
          className="text-sm uppercase tracking-widest text-[var(--fg)] border border-[var(--border-md)] px-8 py-3 rounded-full hover:bg-[var(--bg-card)] transition-colors duration-300"
        >
          Try again
        </button>
        <Link
          href={`/${locale ?? "en"}`}
          className="text-sm uppercase tracking-widest text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-300 py-3"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
