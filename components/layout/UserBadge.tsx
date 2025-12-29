"use client";

import { usePlanStore } from "@/lib/store";

export default function UserBadge() {
  const userName = usePlanStore((s) => s.userName);
  if (!userName) return null;

  const initials = userName
    .split(" ")
    .map((p) => p[0]?.toUpperCase() || "")
    .slice(0, 2)
    .join("");

  return (
    <div className="absolute top-4 right-4 z-50">
      <div className="flex items-center gap-3 bg-white/90 dark:bg-black/50 border rounded-full px-3 py-1 shadow-sm">
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
          {initials}
        </div>
        <div className="text-sm font-medium">{userName}</div>
      </div>
    </div>
  );
}
