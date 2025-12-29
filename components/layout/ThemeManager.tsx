"use client";

import { useEffect } from "react";
import { usePlanStore } from "@/lib/store";

export default function ThemeManager() {
  const primaryColor = usePlanStore((s) => s.primaryColor);
  const animationsEnabled = usePlanStore((s) => s.animationsEnabled);
  const font = usePlanStore((s) => s.font);
  const fontWeight = usePlanStore((s) => s.fontWeight);
  const italic = usePlanStore((s) => s.italic);

  useEffect(() => {
    const root = document.documentElement;
    if (primaryColor) {
      // apply as --primary and --sidebar-primary for consistency
      root.style.setProperty("--primary", primaryColor);
      root.style.setProperty("--sidebar-primary", primaryColor);
      // set readable foreground color depending on brightness
      try {
        const hex = primaryColor.replace('#','');
        const r = parseInt(hex.substring(0,2),16);
        const g = parseInt(hex.substring(2,4),16);
        const b = parseInt(hex.substring(4,6),16);
        // relative luminance
        const lum = (0.2126*r + 0.7152*g + 0.0722*b) / 255;
        const fg = lum > 0.6 ? '#000000' : '#ffffff';
        root.style.setProperty('--primary-foreground', fg);
      } catch (err) {
        // ignore
      }
    } else {
      root.style.removeProperty("--primary");
      root.style.removeProperty("--sidebar-primary");
    }
  }, [primaryColor]);

  useEffect(() => {
    const root = document.documentElement;
    if (!animationsEnabled) {
      root.classList.add("no-animations");
    } else {
      root.classList.remove("no-animations");
    }
  }, [animationsEnabled]);

  useEffect(() => {
    const root = document.documentElement;
    let fontValue = "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial";
    switch (font) {
      case "geist":
        fontValue = "var(--font-geist-sans)";
        break;
      case "mono":
        fontValue = "var(--font-geist-mono)";
        break;
      case "serif":
        fontValue = "Georgia, 'Times New Roman', Times, serif";
        break;
      case "gothic":
        // Century Gothic or fallbacks
        fontValue = "'Century Gothic', 'Trebuchet MS', Arial, sans-serif";
        break;
      case "times":
        fontValue = "'Times New Roman', Times, serif";
        break;
      case "calibri":
        fontValue = "Calibri, Candara, 'Segoe UI', sans-serif";
        break;
      case "arial":
        fontValue = "Arial, Helvetica, sans-serif";
        break;
      case "verdana":
        fontValue = "Verdana, Geneva, sans-serif";
        break;
      case "georgia":
        fontValue = "Georgia, 'Times New Roman', Times, serif";
        break;
      case "courier":
        fontValue = "'Courier New', Courier, monospace";
        break;
      case "inter":
        fontValue = "Inter, system-ui, -apple-system, 'Segoe UI', Roboto";
        break;
      case "roboto":
        fontValue = "Roboto, system-ui, -apple-system, 'Segoe UI', Arial";
        break;
      case "montserrat":
        fontValue = "Montserrat, system-ui, -apple-system, 'Segoe UI', Arial";
        break;
      case "lato":
        fontValue = "Lato, system-ui, -apple-system, 'Segoe UI', Arial";
        break;
      case "system":
      default:
        fontValue = "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial";
        break;
    }

    // set css var so other places using var(--app-font) update
    root.style.setProperty("--app-font", fontValue);
    // also apply directly on the body for immediate effect and to avoid nested var issues
    try {
      document.body.style.fontFamily = fontValue;
    } catch (err) {
      // ignore in environments where body isn't available yet
    }

    // font weight and italic
    const weightMap: Record<string, number> = {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    };
    root.style.setProperty("--app-font-weight", String(weightMap[fontWeight] ?? 400));
    try {
      document.body.style.fontWeight = String(weightMap[fontWeight] ?? 400);
      document.body.style.fontStyle = italic ? "italic" : "normal";
    } catch (err) {}
  }, [font, fontWeight, italic]);

  return null;
}
