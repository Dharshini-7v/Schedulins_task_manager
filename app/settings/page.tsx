"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { usePlanStore } from "@/lib/store";

export default function SettingsPage() {
  const soundEnabled = usePlanStore((s) => s.soundEnabled);
  const setSoundEnabled = usePlanStore((s) => s.setSoundEnabled);
  const soundVolume = usePlanStore((s) => s.soundVolume);
  const setSoundVolume = usePlanStore((s) => s.setSoundVolume);
  const theme = usePlanStore((s) => s.theme);
  const setTheme = usePlanStore((s) => s.setTheme);
  const font = usePlanStore((s) => s.font);
  const setFont = usePlanStore((s) => s.setFont);
  const fontWeight = usePlanStore((s) => s.fontWeight);
  const setFontWeight = usePlanStore((s) => s.setFontWeight);
  const italic = usePlanStore((s) => s.italic);
  const setItalic = usePlanStore((s) => s.setItalic);
  const primaryColor = usePlanStore((s) => s.primaryColor);
  const setPrimaryColor = usePlanStore((s) => s.setPrimaryColor);

  const router = useRouter();

  async function handleLogout() {
    try {
      localStorage.removeItem("schedulins:userName");
      localStorage.removeItem("schedulins:userAge");
    } catch (err) {
      // ignore
    }
    // clear reactive store session
    try {
      const module = await import("@/lib/store");
      module.usePlanStore.getState().clearUser();
    } catch (err) {
      // ignore
    }
    // include a flag so the login page can show a Back -> Settings control
    router.replace("/login?from=logout");
  }

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const apply = () => {
        if (mq.matches) root.classList.add("dark");
        else root.classList.remove("dark");
      };
      apply();
    }
  }, [theme]);

  return (
    <section className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm opacity-70">Theme, sounds, and animation preferences.</p>
      </div>

      <div className="rounded-lg border p-4 bg-white/70 dark:bg-black/40 space-y-4">
        <div>
          <div className="font-medium">Sound</div>
          <div className="mt-2 flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="size-4"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
              />
              Enable sounds
            </label>
            <div className="flex items-center gap-2 text-sm">
              <span className="opacity-70">Volume</span>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(soundVolume * 100)}
                onChange={(e) => setSoundVolume(Number(e.target.value) / 100)}
              />
              <span className="tabular-nums w-10 text-right">{Math.round(soundVolume * 100)}%</span>
            </div>
          </div>
        </div>

        <div>
          <div className="font-medium">Theme</div>
          <div className="mt-2">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as any)}
              className="border rounded p-2 bg-white/80 dark:bg-black/30"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        <div>
          <div className="font-medium">Font</div>
          <div className="mt-2">
            <select
              value={font}
              onChange={(e) => setFont(e.target.value as any)}
              className="border rounded p-2 bg-white/80 dark:bg-black/30"
            >
              <option value="geist">Geist Sans</option>
              <option value="system">System</option>
              <option value="serif">Serif (Times New Roman)</option>
              <option value="times">Times New Roman</option>
              <option value="calibri">Calibri</option>
              <option value="gothic">Century Gothic</option>
              <option value="arial">Arial</option>
              <option value="verdana">Verdana</option>
              <option value="georgia">Georgia</option>
              <option value="mono">Monospace</option>
              <option value="courier">Courier New (Mono)</option>
            </select>
            <div className="mt-3">
              <div className="text-sm opacity-70">Preview:</div>
              <div className="mt-1 rounded p-3 border bg-white/80 dark:bg-black/30" style={{ fontFamily: 'var(--app-font)', fontWeight: fontWeight === 'light' ? 300 : fontWeight === 'medium' ? 500 : fontWeight === 'bold' ? 700 : 400, fontStyle: italic ? 'italic' : 'normal' }}>
                The quick brown fox jumps over the lazy dog
              </div>

              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">Weight</div>
                  <select value={fontWeight} onChange={(e) => setFontWeight(e.target.value as any)} className="mt-2 border rounded p-2 bg-white/80 dark:bg-black/30 w-full">
                    <option value="light">Light</option>
                    <option value="regular">Regular</option>
                    <option value="medium">Medium</option>
                    <option value="bold">Bold</option>
                  </select>
                </div>

                <div>
                  <div className="text-sm font-medium">Style</div>
                  <label className="mt-2 flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={italic} onChange={(e) => setItalic(e.target.checked)} />
                    Italic
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div>
          <div className="font-medium">Color</div>
          <div className="mt-2">
            <input
              type="color"
              aria-label="Pick primary color"
              value={primaryColor || "#3b82f6"}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-14 h-10 p-0 border rounded"
            />
          </div>
        </div>

        <div>
          <div className="font-medium">Account</div>
          <div className="mt-2">
            <Button variant="destructive" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
