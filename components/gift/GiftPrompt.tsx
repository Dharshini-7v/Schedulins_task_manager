"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePlanStore } from "@/lib/store";
import { CATEGORY_LABEL, SUGGESTIONS, type GiftCategory, detectCategory } from "@/lib/gifts";

export default function GiftPrompt({ triggerVariant = "default" as const }: { triggerVariant?: "default" | "secondary" }) {
  const giftPrompt = usePlanStore((s) => s.giftPrompt);
  const giftCategory = usePlanStore((s) => s.giftCategory);
  const setGiftPrompt = usePlanStore((s) => s.setGiftPrompt);
  const clearGift = usePlanStore((s) => s.clearGift);

  const [open, setOpen] = useState(false);
  const [text, setText] = useState(giftPrompt || "");

  function submit() {
    setGiftPrompt(text.trim());
    setOpen(false);
  }

  function quickSelect(value: GiftCategory) {
    // prefill the input with the label so the user can tweak it before saving
    setText(CATEGORY_LABEL[value]);
    // keep dialog open so the user can edit the prefilled value
    // focus will be moved to the input for convenience
    setTimeout(() => {
      const el = document.querySelector<HTMLInputElement>("#gift-input");
      el?.focus();
      el?.select();
    }, 0);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm opacity-70">Gift for completing your plan</div>
        <div className="flex items-center gap-2">
          {giftCategory && (
            <span className="text-xs rounded-full border px-2 py-1">
              {CATEGORY_LABEL[giftCategory]}
            </span>
          )}
          {giftPrompt && (
            <Button size="sm" variant="ghost" onClick={() => clearGift()}>Clear</Button>
          )}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant={triggerVariant}>{giftPrompt ? "Change" : "Set"} Gift</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>What kind of gift do you want after completing all tasks?</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Input
                  autoFocus
                  placeholder="e.g., Space themed, Food stickers, Anime, Music, Cute animals, Gaming"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="text-xs opacity-70">Suggestions</div>
                <div className="flex flex-wrap gap-2 items-end">
                  {SUGGESTIONS.map((s) => {
                    const selected = detectCategory(text) === s.value || text === s.label;
                    return (
                      <div key={s.value} className="flex flex-col items-start">
                        <Button
                          variant={selected ? "default" : "secondary"}
                          size="sm"
                          onClick={() => quickSelect(s.value)}
                          aria-pressed={selected}
                          title={s.example}
                        >
                          {s.label}
                        </Button>
                        <div className="text-[11px] opacity-60 mt-1">{s.example}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-2 text-xs opacity-70">Detected: <span className="font-medium">{(() => { const d = detectCategory(text); return d ? CATEGORY_LABEL[d] : "None" })()}</span></div>
                <div className="text-xs opacity-70">Tip: Click a suggestion to prefill the field, then edit or Save.</div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={submit}>Save</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {giftPrompt && (
        <div className="text-sm">
          <span className="opacity-70">You chose:</span> {giftPrompt}
        </div>
      )}
    </div>
  );
}
