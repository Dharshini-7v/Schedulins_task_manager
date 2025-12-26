"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task } from "./types";

export interface PlanState {
  tasks: Task[];
  addTask: (t: Omit<Task, "id" | "order" | "status">) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleDone: (id: string) => void;
  reorder: (fromIndex: number, toIndex: number) => void;
  clearAll: () => void;
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
    }),
    { name: "schedulins-plan" }
  )
);
