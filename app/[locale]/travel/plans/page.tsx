"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import ComingSoon from "@/components/ComingSoon";

export default function TravelPlansPage() {
  const t = useTranslations("travel");
  const { locale } = useParams();

  return (
    <>
      <section className="pt-24 md:pt-32 pb-6 md:pb-8 px-5 md:px-10 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href={`/${locale}/travel`}
            className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors py-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t("backToTravel")}
          </Link>
        </div>
      </section>

      <ComingSoon
        title={t("travelPlans")}
        description={t("travelPlansDesc")}
      />
    </>
  );
}
