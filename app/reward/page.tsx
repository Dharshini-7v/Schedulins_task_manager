"use client";

import Link from "next/link";
import { usePlanStore } from "@/lib/store";
import RewardReveal from "@/components/reward/RewardReveal";

export default function RewardPage() {
  const giftCategory = usePlanStore((s) => s.giftCategory);
  const tasks = usePlanStore((s) => s.tasks).slice().sort((a, b) => a.order - b.order);
  const allDone = tasks.length > 0 && tasks.every((t) => t.status === "done");

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Reward</h1>
        <p className="text-sm opacity-70">Gift reveal based on your chosen theme.</p>
      </div>
      {!giftCategory && (
        <div className="rounded-lg border p-4 bg-white/70 dark:bg-black/40">
          <div className="text-sm">No gift selected yet.</div>
          <div className="text-sm opacity-70">Go to <Link className="underline" href="/plan">Plan</Link> and set your Gift Prompt.</div>
        </div>
      )}
      {giftCategory && !allDone && (
        <div className="rounded-lg border p-4 bg-white/70 dark:bg-black/40">
          <div className="text-sm">Finish all tasks to unlock your reward.</div>
          <div className="text-sm opacity-70">You have {tasks.filter((t) => t.status !== "done").length} task(s) left. Manage them in <Link className="underline" href="/plan">Plan</Link>.</div>
        </div>
      )}
      {giftCategory && allDone && <RewardReveal category={giftCategory} />}
    </section>
  );
}
