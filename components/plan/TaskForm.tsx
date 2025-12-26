"use client";

import { useState } from "react";
import { usePlanStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function TaskForm() {
  const addTask = usePlanStore((s) => s.addTask);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimitMinutes, setTime] = useState<number>(25);
  const [deadline, setDeadline] = useState<string>("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title: title.trim(), description, timeLimitMinutes, deadline: deadline || undefined });
    setTitle("");
    setDescription("");
    setTime(25);
    setDeadline("");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
      <div className="md:col-span-2">
        <label className="text-sm font-medium">Task title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Study Physics Chapter 3" />
      </div>
      <div className="md:col-span-2">
        <label className="text-sm font-medium">Description (optional)</label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Notes or sub-steps" />
      </div>
      <div>
        <label className="text-sm font-medium">Time limit (minutes)</label>
        <Input
          type="number"
          min={1}
          value={timeLimitMinutes}
          onChange={(e) => setTime(Number(e.target.value))}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Deadline (optional)</label>
        <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      </div>
      <div className="md:col-span-2 flex justify-end">
        <Button type="submit">Add Task</Button>
      </div>
    </form>
  );
}
