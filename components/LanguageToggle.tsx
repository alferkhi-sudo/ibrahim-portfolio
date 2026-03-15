"use client";

import { usePathname, useRouter } from "next/navigation";

interface LanguageToggleProps {
  locale: string;
}

export default function LanguageToggle({ locale }: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "fr" : "en";
    const pathWithoutLocale = pathname.replace(/^\/(en|fr)/, "");
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <button
      onClick={toggleLocale}
      className="text-sm font-medium tracking-wide px-3 py-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-[var(--border-md)] text-[var(--fg)] hover:bg-[var(--bg-card)] transition-colors duration-300"
      aria-label={`Switch to ${locale === "en" ? "French" : "English"}`}
    >
      {locale === "en" ? "FR" : "EN"}
    </button>
  );
}
