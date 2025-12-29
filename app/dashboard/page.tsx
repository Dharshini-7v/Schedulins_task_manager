"use client";

import Link from "next/link";
import { usePlanStore } from "@/lib/store";
import { Progress } from "@/components/ui/progress";
import { CATEGORY_LABEL } from "@/lib/gifts";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const tasks = usePlanStore((s) => s.tasks).slice().sort((a, b) => a.order - b.order);
  const giftCategory = usePlanStore((s) => s.giftCategory);
  const giftPrompt = usePlanStore((s) => s.giftPrompt);

  const completed = tasks.filter((t) => t.status === "done").length;
  const total = tasks.length;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  // Redirect guard: use reactive store user session to determine auth.
  const router = useRouter();
  const userName = usePlanStore((s) => s.userName);
  const userAge = usePlanStore((s) => s.userAge);

  // perform redirect in effect to avoid setState during render
  useEffect(() => {
    if (userName && userAge) return; // already logged in

    // try to rehydrate from localStorage first before redirecting
    try {
      const name = localStorage.getItem("schedulins:userName");
      const age = localStorage.getItem("schedulins:userAge");
      if (name && age) {
        // set the store so we don't redirect
        const { usePlanStore } = require("@/lib/store");
        usePlanStore.getState().setUser(name, age);
        return;
      }
    } catch (err) {
      // ignore
    }

    // no user found, redirect to login
    router.replace("/login");
  }, [userName, userAge, router]);

  if (!userName || !userAge) return null;

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm opacity-70">Overview of your plan, progress, and quick actions.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-4 bg-white/70 dark:bg-black/40">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium">Progress</h2>
            <div className="text-sm opacity-70">{completed}/{total}</div>
          </div>
          <Progress value={progress} />
          <div className="mt-3 text-sm opacity-70">{progress}% complete</div>
        </div>

        <div className="rounded-lg border p-4 bg-white/70 dark:bg-black/40">
          <h2 className="text-lg font-medium mb-2">Gift</h2>
          {giftCategory ? (
            <div className="text-sm">
              <div className="opacity-70">Theme</div>
              <div className="font-medium">{CATEGORY_LABEL[giftCategory]}</div>
              {giftPrompt && <div className="mt-1 opacity-70">“{giftPrompt}”</div>}
              <div className="mt-3">
                <Link href="/reward"><Button size="sm">View Reward</Button></Link>
              </div>
            </div>
          ) : (
            <div className="text-sm">
              <div className="opacity-70">No gift selected.</div>
              <div className="mt-3"><Link href="/plan"><Button size="sm" variant="secondary">Set Gift</Button></Link></div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg border p-4 bg-white/70 dark:bg-black/40">
        <h2 className="text-lg font-medium mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/plan"><Button variant="secondary">Plan Tasks</Button></Link>
          <Link href="/execute"><Button>Go to Execute</Button></Link>
          <Link href="/reward"><Button variant="outline">Open Reward</Button></Link>
        </div>
      </div>

      <div className="rounded-lg border p-4 bg-white/70 dark:bg-black/40">
        <h2 className="text-lg font-medium mb-3">Due Today</h2>
        {(() => {
          const today = new Date().toISOString().slice(0,10);
          const dueToday = tasks.filter(t => t.deadline === today);
          if (!dueToday.length) {
            return <div className="text-sm opacity-70">No tasks due today.</div>;
          }
          return (
            <ul className="space-y-2">
              {dueToday.map(t => (
                <li key={t.id} className="flex items-center justify-between rounded-md border p-2">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{t.title}</div>
                    <div className="text-xs opacity-70">Time limit: {t.timeLimitMinutes} min</div>
                  </div>
                  <Link className="text-sm underline opacity-80" href="/plan">Open</Link>
                </li>
              ))}
            </ul>
          );
        })()}
      </div>
    </section>
  );
}
