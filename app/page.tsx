import { Suspense } from "react";
import ExpenseTrackerApp from "@/components/ExpenseTrackerApp";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExpenseTrackerApp />
    </Suspense>
  );
}

