"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task } from "./types";
import type { GiftCategory } from "./gifts";
import { detectCategory } from "./gifts";

export interface PlanState {
  tasks: Task[];
  addTask: (t: Omit<Task, "id" | "order" | "status">) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleDone: (id: string) => void;
  reorder: (fromIndex: number, toIndex: number) => void;
  clearAll: () => void;
  giftPrompt?: string;
  giftCategory?: GiftCategory;
  setGiftPrompt: (text: string) => void;
  clearGift: () => void;
  // execution state (persisted)
  execIdx: number; // current task index in sorted order
  execRemaining: number; // seconds left for current task
  execRunning: boolean;
  setExecIdx: (i: number) => void;
  setExecRemaining: (s: number) => void;
  setExecRunning: (b: boolean) => void;
  // settings
  soundEnabled: boolean;
  soundVolume: number; // 0..1
  theme: "system" | "light" | "dark";
  primaryColor?: string; // css color (hex or any)
  animationsEnabled: boolean;
  // user session
  userName?: string;
  userAge?: string;
  setUser: (name: string, age: string) => void;
  clearUser: () => void;
  // font preference: available options
  // 'geist' (Geist Sans), 'system', 'serif', 'mono', 'gothic' (Century Gothic),
  // 'times' (Times New Roman), 'calibri', 'arial', 'verdana', 'georgia', 'courier', plus web-ish options
  font: "geist" | "system" | "serif" | "mono" | "gothic" | "times" | "calibri" | "arial" | "verdana" | "georgia" | "courier" | "inter" | "roboto" | "montserrat" | "lato";
  setFont: (f: "geist" | "system" | "serif" | "mono" | "gothic" | "times" | "calibri" | "arial" | "verdana" | "georgia" | "courier" | "inter" | "roboto" | "montserrat" | "lato") => void;

  // weight and style
  fontWeight: "light" | "regular" | "medium" | "bold";
  setFontWeight: (w: "light" | "regular" | "medium" | "bold") => void;
  italic: boolean;
  setItalic: (b: boolean) => void;

  setSoundEnabled: (v: boolean) => void;
  setSoundVolume: (v: number) => void;
  setTheme: (t: "system" | "light" | "dark") => void;
  setAnimationsEnabled: (v: boolean) => void;
  setPrimaryColor: (c?: string) => void;
}

function withOrders(tasks: Task[]): Task[] {
  return tasks
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((t, i) => ({ ...t, order: i }));
}

export const usePlanStore = create<PlanState>()(
  persist(
    (set, get) => ({
      tasks: [],
      giftPrompt: undefined,
      giftCategory: undefined,
      execIdx: -1,
      execRemaining: 0,
      execRunning: false,
  soundEnabled: true,
      soundVolume: 0.7,
      theme: "system",
  primaryColor: undefined,
      animationsEnabled: true,
      addTask: (t) =>
        set((state) => {
          const id = crypto.randomUUID();
          const order = state.tasks.length;
          const task: Task = {
            id,
            title: t.title,
            description: t.description || "",
            timeLimitMinutes: Math.max(1, Math.floor(t.timeLimitMinutes || 25)),
            deadline: t.deadline,
            status: "pending",
            order,
          };
          return { tasks: [...state.tasks, task] };
        }),
      updateTask: (id, patch) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        })),
      deleteTask: (id) =>
        set((state) => ({ tasks: withOrders(state.tasks.filter((t) => t.id !== id)) })),
      toggleDone: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, status: t.status === "done" ? "pending" : "done" } : t
          ),
        })),
      reorder: (from, to) =>
        set((state) => {
          const arr = state.tasks.slice().sort((a, b) => a.order - b.order);
          const [moved] = arr.splice(from, 1);
          arr.splice(to, 0, moved);
          return { tasks: withOrders(arr) };
        }),
      clearAll: () => set({ tasks: [] }),
      setGiftPrompt: (text: string) =>
        set(() => ({ giftPrompt: text, giftCategory: detectCategory(text) })),
      clearGift: () => set({ giftPrompt: undefined, giftCategory: undefined }),
      setExecIdx: (i) => set({ execIdx: i }),
      setExecRemaining: (s) => set({ execRemaining: Math.max(0, Math.floor(s)) }),
      setExecRunning: (b) => set({ execRunning: b }),
      setSoundEnabled: (v) => set({ soundEnabled: v }),
      setSoundVolume: (v) => set({ soundVolume: Math.max(0, Math.min(1, v)) }),
  setTheme: (t) => set({ theme: t }),
  setAnimationsEnabled: (v) => set({ animationsEnabled: v }),
  setPrimaryColor: (c) => set({ primaryColor: c }),
  // persisted user session (kept in store so auth is reactive)
  userName: undefined,
  userAge: undefined,
  setUser: (name, age) => set(() => ({ userName: name, userAge: age })),
  clearUser: () => set(() => ({ userName: undefined, userAge: undefined })),
  font: "geist",
  setFont: (f) => set({ font: f }),
  fontWeight: "regular",
  setFontWeight: (w) => set({ fontWeight: w }),
  italic: false,
  setItalic: (b) => set({ italic: b }),
    }),
    { name: "schedulins-plan" }
  )
);
