"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePlanStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Howl } from "howler";

export default function Executor() {
  const tasks = usePlanStore((s) => s.tasks).slice().sort((a, b) => a.order - b.order);
  const updateTask = usePlanStore((s) => s.updateTask);
  const execIdx = usePlanStore((s) => s.execIdx);
  const execRemaining = usePlanStore((s) => s.execRemaining);
  const execRunning = usePlanStore((s) => s.execRunning);
  const setExecIdx = usePlanStore((s) => s.setExecIdx);
  const setExecRemaining = usePlanStore((s) => s.setExecRemaining);
  const setExecRunning = usePlanStore((s) => s.setExecRunning);
  const soundEnabled = usePlanStore((s) => s.soundEnabled);
  const soundVolume = usePlanStore((s) => s.soundVolume);

  const [idx, setIdx] = useState(() => (execIdx >= 0 ? execIdx : tasks.findIndex((t) => t.status !== "done")));
  const active = tasks[idx];

  const initial = useMemo(() => (active ? active.timeLimitMinutes * 60 : 0), [active?.id]);
  const [remaining, setRemaining] = useState(execRemaining > 0 ? execRemaining : initial);
  const [running, setRunning] = useState(execRunning);
  const timerRef = useRef<number | null>(null);
  const soundsRef = useRef<{ start: Howl; pause: Howl; done: Howl } | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  function fallbackBeep(freq = 880, duration = 0.08, volume = 0.05) {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.value = volume * soundVolume;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {}
  }

  function playSound(kind: "start" | "pause" | "done" | "tick") {
    if (!soundEnabled) return; // global mute
    try {
      if (kind !== "tick") {
        const map = soundsRef.current;
        if (map && map[kind]) {
          map[kind].play();
          return;
        }
      }
    } catch {}
    // fallbacks
    if (kind === "start") fallbackBeep(880, 0.07, 0.06);
    else if (kind === "pause") fallbackBeep(660, 0.07, 0.05);
    else if (kind === "done") fallbackBeep(1046, 0.2, 0.08);
    else if (kind === "tick") fallbackBeep(1200, 0.03, 0.03);
  }

  // init or re-init sounds when volume changes
  useEffect(() => {
    soundsRef.current = {
      start: new Howl({ src: ["/sounds/pop.mp3"], volume: 0.6 * soundVolume }),
      pause: new Howl({ src: ["/sounds/pop.mp3"], volume: 0.5 * soundVolume }),
      done: new Howl({ src: ["/sounds/fanfare.mp3"], volume: 0.7 * soundVolume }),
    };
    // preload
    try { soundsRef.current.start.load(); } catch {}
    try { soundsRef.current.pause.load(); } catch {}
    try { soundsRef.current.done.load(); } catch {}
  }, [soundVolume]);

  useEffect(() => {
    // if task changed, reset to initial unless we already have persisted remaining for same task
    if (execIdx !== idx) {
      setRemaining(initial);
      setRunning(false);
    } else if (execRemaining > 0) {
      setRemaining(execRemaining);
      setRunning(execRunning);
    }
  }, [initial]);

  useEffect(() => {
    if (!running) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          window.clearInterval(timerRef.current!);
          timerRef.current = null;
          setRunning(false);
          playSound("done");
          return 0;
        }
        if (r <= 11 && r > 1) {
          // last 10 seconds ticking
          playSound("tick");
        }
        return r - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [running]);

  // keep store in sync for persistence
  useEffect(() => {
    setExecIdx(idx);
  }, [idx]);
  useEffect(() => {
    setExecRemaining(remaining);
  }, [remaining]);
  useEffect(() => {
    setExecRunning(running);
  }, [running]);

  function completeTask() {
    if (!active) return;
    updateTask(active.id, { status: "done" });
    const next = tasks.findIndex((t, i) => i > idx && t.status !== "done");
    const nextIdx = next === -1 ? tasks.findIndex((t) => t.status !== "done") : next; // in case list changed
    setIdx(nextIdx);
    setRunning(false);
    setExecRunning(false);
    setExecRemaining(nextIdx >= 0 ? tasks[nextIdx].timeLimitMinutes * 60 : 0);
  }

  function nextTaskLocked() {
    // no skipping when running; only allow skip if timer stopped
    if (running) return;
    const next = tasks.findIndex((t, i) => i > idx && t.status !== "done");
    if (next !== -1) setIdx(next);
  }

  const doneCount = tasks.filter((t) => t.status === "done").length;
  const progress = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  if (!tasks.length) {
    return (
      <div className="rounded-lg border p-4 bg-white/70 dark:bg-black/40">
        <div className="text-sm mb-2">No tasks found.</div>
        <Link href="/plan"><Button>Plan your tasks</Button></Link>
      </div>
    );
  }

  if (!active) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border p-4 bg-white/70 dark:bg-black/40">
          <div className="text-lg font-medium">All tasks completed</div>
          <div className="text-sm opacity-70">Great job! Claim your reward.</div>
          <div className="mt-3"><Link href="/reward"><Button>Open Reward</Button></Link></div>
        </div>
      </div>
    );
  }

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4 bg-white/70 dark:bg-black/40">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm opacity-70">Task {idx + 1} of {tasks.length}</div>
          <div className="text-sm opacity-70">Done {doneCount}/{tasks.length}</div>
        </div>
        <div className="text-xl font-semibold">{active.title}</div>
        {active.description && (
          <div className="text-sm opacity-80 mt-1">{active.description}</div>
        )}
        <div className="mt-4 text-5xl tabular-nums">{mm}:{ss}</div>
        <div className="mt-3 flex items-center gap-2">
          {!running ? (
            <Button onClick={() => { setRunning(true); playSound("start"); }}>Start</Button>
          ) : (
            <Button variant="secondary" onClick={() => { setRunning(false); playSound("pause"); }}>Pause</Button>
          )}
          <Button variant="outline" disabled={running} onClick={() => setRemaining(initial)}>Reset</Button>
          <Button variant="outline" disabled={running} onClick={nextTaskLocked}>Next</Button>
          <Button variant="default" disabled={running || remaining > 0} onClick={completeTask}>Complete</Button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm opacity-70">Overall Progress</div>
          <div className="text-sm opacity-70">{doneCount}/{tasks.length}</div>
        </div>
        <Progress value={progress} />
      </div>
    </div>
  );
}
