"use client";

import { useMemo, useState } from "react";
import { usePlanStore } from "@/lib/store";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function TaskList() {
  const tasks = usePlanStore((s) => s.tasks).slice().sort((a, b) => a.order - b.order);
  const toggleDone = usePlanStore((s) => s.toggleDone);
  const del = usePlanStore((s) => s.deleteTask);
  const update = usePlanStore((s) => s.updateTask);
  const reorder = usePlanStore((s) => s.reorder);

  const completed = tasks.filter((t) => t.status === "done").length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm opacity-70">Progress</div>
          <div className="text-sm font-medium">{completed}/{tasks.length}</div>
        </div>
        <Progress value={progress} />
      </div>
      <ul className="space-y-2">
        {tasks.map((t, idx) => (
          <TaskRow
            key={t.id}
            t={t}
            idx={idx}
            total={tasks.length}
            onToggle={() => toggleDone(t.id)}
            onDelete={() => del(t.id)}
            onMoveUp={() => idx > 0 && reorder(idx, idx - 1)}
            onMoveDown={() => idx < tasks.length - 1 && reorder(idx, idx + 1)}
            onUpdate={(patch) => update(t.id, patch)}
          />
        ))}
      </ul>
      {!tasks.length && (
        <p className="text-sm opacity-70">No tasks yet. Add your first task above.</p>
      )}
    </div>
  );
}

function TaskRow({
  t,
  idx,
  total,
  onToggle,
  onDelete,
  onMoveUp,
  onMoveDown,
  onUpdate,
}: {
  t: {
    id: string;
    title: string;
    description?: string;
    timeLimitMinutes: number;
    deadline?: string;
    status: "pending" | "active" | "done";
    order: number;
  };
  idx: number;
  total: number;
  onToggle: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onUpdate: (patch: Partial<typeof t>) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(t.title);
  const [time, setTime] = useState<number>(t.timeLimitMinutes);
  const [deadline, setDeadline] = useState<string>(t.deadline || "");

  function save() {
    onUpdate({ title: title.trim() || t.title, timeLimitMinutes: Math.max(1, Math.floor(time)), deadline: deadline || undefined });
    setEditing(false);
  }

  return (
    <li className="rounded-lg border p-3 bg-white/70 dark:bg-black/40">
      <div className="flex items-start gap-3">
        <Checkbox checked={t.status === "done"} onCheckedChange={onToggle} />
        <div className="flex-1 min-w-0">
          {!editing ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-medium truncate">{t.title}</div>
                <div className="text-xs opacity-70 flex items-center gap-3">
                  <span>{t.timeLimitMinutes} min</span>
                  {t.deadline && <span>Due {t.deadline}</span>}
                </div>
              </div>
              {t.description && (
                <p className="text-sm opacity-80 mt-1 line-clamp-2">{t.description}</p>
              )}
            </>
          ) : (
            <div className="grid gap-2 md:grid-cols-3">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              <Input type="number" min={1} value={time} onChange={(e) => setTime(Number(e.target.value))} />
              <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          {!editing ? (
            <>
              <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>Edit</Button>
              <Button size="sm" variant="ghost" onClick={onDelete}>Delete</Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="secondary" onClick={save}>Save</Button>
              <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
            </>
          )}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Button size="sm" variant="outline" disabled={idx === 0} onClick={onMoveUp}>Up</Button>
        <Button size="sm" variant="outline" disabled={idx === total - 1} onClick={onMoveDown}>Down</Button>
      </div>
    </li>
  );
}
