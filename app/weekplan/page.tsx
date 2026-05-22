import WeekPlannerClient from "@/components/weekplan/WeekPlannerClient";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function WeekplanPage() {
  return <WeekPlannerClient />;
}
