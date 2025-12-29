"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const fromLogout = searchParams?.get("from") === "logout";

  function validate() {
    if (!name.trim()) {
      setError("Please enter your name.");
      return false;
    }
    const n = Number(age);
    if (!age || Number.isNaN(n) || n < 0 || !Number.isFinite(n)) {
      setError("Please enter a valid age.");
      return false;
    }
    return true;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      localStorage.setItem("schedulins:userName", name.trim());
      localStorage.setItem("schedulins:userAge", String(Number(age)));
    } catch (err) {
      // ignore
    }

    // update reactive store session
    try {
      // lazy import so we don't create circular deps
      const { usePlanStore } = await import("@/lib/store");
      // call setter directly from store
      usePlanStore.getState().setUser(name.trim(), String(Number(age)));
    } catch (err) {
      // ignore
    }

    // small delay to show animation/feedback
    await new Promise((r) => setTimeout(r, 300));
    router.push("/dashboard");
  }

  const isValid = name.trim().length > 0 && !Number.isNaN(Number(age)) && Number(age) >= 0;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-white dark:from-black dark:to-zinc-900 py-12 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -left-20 -top-24 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-indigo-300 via-teal-200 to-cyan-300 opacity-30 blur-3xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
      </div>

      <motion.div
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-3xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl bg-white/80 dark:bg-black/50 border p-6 shadow-lg">
          <div className="hidden md:flex flex-col items-center justify-center p-6">
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-lg font-semibold mb-2">Welcome to Schedulins</h2>
            <p className="text-sm opacity-70 text-center">Quickly plan, execute, and reward yourself — start by telling us your name and age.</p>
            <div className="mt-6 w-full">
              <svg width="100%" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="10" width="200" height="110" rx="14" fill="#eef2ff" />
                <circle cx="50" cy="60" r="18" fill="#c7d2fe" />
                <rect x="80" y="40" width="90" height="12" rx="6" fill="#a78bfa" />
                <rect x="80" y="62" width="68" height="10" rx="6" fill="#60a5fa" />
              </svg>
            </div>
          </div>

          <div className="p-4 md:p-6 flex flex-col justify-center">
            <motion.h1
              initial={{ x: -8, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.45 }}
              className="text-2xl font-bold mb-1"
            >
              Get started
            </motion.h1>
            <p className="text-sm opacity-70 mb-4">Create a quick profile to personalize your experience.</p>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="Your name"
                  aria-label="Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder=""
                  inputMode="numeric"
                  aria-label="Age"
                />
              </div>

              {error && <div className="text-sm text-red-600">{error}</div>}

              <div className="flex items-center gap-3">
                <Button type="submit" disabled={!isValid || submitting}>
                  {submitting ? "Saving..." : "Continue"}
                </Button>
                {fromLogout && (
                  <Button variant="ghost" onClick={() => router.push('/settings')}>Back to Settings</Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
