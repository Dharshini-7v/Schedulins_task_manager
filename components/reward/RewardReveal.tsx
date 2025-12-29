"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Howl } from "howler";
import { CATEGORY_LABEL, type GiftCategory } from "@/lib/gifts";

const sounds = {
  pop: new Howl({ src: ["/sounds/pop.mp3"], volume: 0.6 }),
  fanfare: new Howl({ src: ["/sounds/fanfare.mp3"], volume: 0.7 }),
};

type RewardItem = {
  title: string;
  description: string;
  emoji?: string;
  mediaType?: "image";
  src?: string; // path under /public
};

const BASE_REWARDS: Partial<Record<GiftCategory, RewardItem[]>> = {
  space: [
    { title: "Space Keychain", emoji: "🪐", description: "A tiny planet keychain" },
    { title: "Galaxy Sticker", emoji: "🌌", description: "Shiny galaxy sticker" },
    { title: "Rocket Pin", emoji: "🚀", description: "Lift-off enamel pin" },
  ],
  food: [
    { title: "Pizza Sticker", emoji: "🍕", description: "Cheesy slice sticker pack" },
    { title: "Dessert Pack", emoji: "🍩", description: "Sweet donut sticker" },
  ],
  anime: [
    { title: "Anime Badge", emoji: "🎎", description: "Cute character badge" },
    { title: "Manga Sticker", emoji: "📚", description: "Black & white panel sticker" },
  ],
  music: [
    { title: "Lofi Collectible", emoji: "🎧", description: "Chill beats token" },
    { title: "Guitar Pick", emoji: "🎸", description: "Virtual pick collectible" },
  ],
  cute: [
    { title: "Cat Card", emoji: "🐱", description: "Adorable pet card" },
    { title: "Bunny Sticker", emoji: "🐰", description: "Soft bunny sticker" },
  ],
  gaming: [
    { title: "Game Badge", emoji: "🎮", description: "Retro gamer badge" },
    { title: "Pixel Sticker", emoji: "🧩", description: "Pixel art sticker" },
  ],
};

const ASSET_COUNT = 10;

const REWARDS: Record<GiftCategory, RewardItem[]> = Object.keys(CATEGORY_LABEL).reduce((acc, key) => {
  const cat = key as GiftCategory;
  const base = BASE_REWARDS[cat] || [{ title: `${CATEGORY_LABEL[cat]} Token`, description: `A ${CATEGORY_LABEL[cat]} reward` }];
  
  // Creative names for each category
  const creativeNames: Record<GiftCategory, string[]> = {
    space: ["Saturn Badge", "Nebula Sticker", "Rocket Pin", "Galaxy Charm", "Asteroid Medal", "Comet Badge", "Jupiter Sticker", "Venus Pin", "Starfield Badge", "Cosmic Charm"],
    food: ["Pizza Slice Badge", "Donut Sticker", "Burger Pin", "Coffee Bean Badge", "Ice Cream Sticker", "Taco Pin", "Sushi Badge", "Cookie Sticker", "Cake Pin", "Ramen Badge"],
    anime: ["Sakura Badge", "Katana Pin", "Chibi Sticker", "Manga Badge", "Kawaii Pin", "Sensei Badge", "Otaku Sticker", "Ninja Pin", "Pocky Badge", "Bento Sticker"],
    music: ["Guitar Pick Badge", "Vinyl Record Sticker", "Headphone Pin", "Music Note Badge", "Drum Stick Sticker", "Piano Key Pin", "Microphone Badge", "Bass Clef Sticker", "Treble Pin", "Beat Badge"],
    cute: ["Kitten Badge", "Puppy Sticker", "Bunny Pin", "Panda Badge", "Hamster Sticker", "Fox Pin", "Bear Badge", "Owl Sticker", "Seal Pin", "Koala Badge"],
    gaming: ["Controller Badge", "Pixel Heart Sticker", "Power-Up Pin", "Boss Key Badge", "Achievement Sticker", "Joystick Pin", "Game Over Badge", "Level Up Sticker", "Coin Pin", "Shield Badge"],
    books: ["Bookmark Badge", "Quill Sticker", "Library Pin", "Chapter Badge", "Novel Sticker", "Poetry Pin", "Story Badge", "Page Sticker", "Author Pin", "Reader Badge"],
    travel: ["Passport Badge", "Compass Sticker", "Suitcase Pin", "Map Badge", "Plane Sticker", "Camera Pin", "Postcard Badge", "Ticket Sticker", "Globe Pin", "Adventure Badge"],
    fitness: ["Dumbbell Badge", "Running Sticker", "Yoga Pin", "Protein Badge", "Cardio Sticker", "Strength Pin", "Flex Badge", "Marathon Sticker", "Gym Pin", "Wellness Badge"],
    art: ["Palette Badge", "Brush Sticker", "Canvas Pin", "Sketch Badge", "Paint Sticker", "Easel Pin", "Color Badge", "Draw Sticker", "Artist Pin", "Creative Badge"],
    sports: ["Soccer Badge", "Basketball Sticker", "Tennis Pin", "Football Badge", "Baseball Sticker", "Hockey Pin", "Golf Badge", "Swimming Sticker", "Track Pin", "Victory Badge"],
    fashion: ["Style Badge", "Runway Sticker", "Designer Pin", "Trend Badge", "Chic Sticker", "Vogue Pin", "Glam Badge", "Fashion Sticker", "Model Pin", "Couture Badge"],
    coding: ["Bug Fix Badge", "Code Sticker", "Terminal Pin", "Debug Badge", "Commit Sticker", "Deploy Pin", "Function Badge", "Variable Sticker", "Loop Pin", "Syntax Badge"],
    study: ["Notebook Badge", "Pencil Sticker", "Exam Pin", "Grade Badge", "Study Sticker", "Learn Pin", "Focus Badge", "Notes Sticker", "Test Pin", "Scholar Badge"],
    gardening: ["Seed Badge", "Flower Sticker", "Watering Pin", "Bloom Badge", "Plant Sticker", "Garden Pin", "Grow Badge", "Leaf Sticker", "Root Pin", "Harvest Badge"],
    wellbeing: ["Zen Badge", "Calm Sticker", "Peace Pin", "Mindful Badge", "Relax Sticker", "Breathe Pin", "Balance Badge", "Serenity Sticker", "Harmony Pin", "Wellness Badge"],
    movies: ["Popcorn Badge", "Film Sticker", "Director Pin", "Cinema Badge", "Reel Sticker", "Oscar Pin", "Scene Badge", "Action Sticker", "Drama Pin", "Comedy Badge"],
    photo: ["Lens Badge", "Shutter Sticker", "Focus Pin", "Frame Badge", "Snap Sticker", "Flash Pin", "Portrait Badge", "Landscape Sticker", "Macro Pin", "Exposure Badge"],
    diy: ["Hammer Badge", "Craft Sticker", "Tool Pin", "Build Badge", "Make Sticker", "Fix Pin", "Create Badge", "Workshop Sticker", "Project Pin", "Handy Badge"],
    language: ["Word Badge", "Speak Sticker", "Fluent Pin", "Vocab Badge", "Grammar Sticker", "Accent Pin", "Translate Badge", "Phrase Sticker", "Native Pin", "Polyglot Badge"],
    craft: ["Yarn Badge", "Needle Sticker", "Knit Pin", "Sew Badge", "Thread Sticker", "Pattern Pin", "Stitch Badge", "Fabric Sticker", "Quilt Pin", "Handmade Badge"],
    outdoors: ["Trail Badge", "Hike Sticker", "Camp Pin", "Nature Badge", "Forest Sticker", "Mountain Pin", "River Badge", "Wildlife Sticker", "Adventure Pin", "Explorer Badge"]
  };

  const names = creativeNames[cat] || [`${CATEGORY_LABEL[cat]} Badge`, `${CATEGORY_LABEL[cat]} Sticker`, `${CATEGORY_LABEL[cat]} Pin`];
  
  const assets: RewardItem[] = Array.from({ length: ASSET_COUNT }).map((_, i) => ({
    title: names[i] || `${CATEGORY_LABEL[cat]} Collectible ${i + 1}`,
    description: `${CATEGORY_LABEL[cat]} reward #${i + 1}`,
    mediaType: "image",
    src: `/rewards/${cat}/asset-${i + 1}.svg`,
  }));
  acc[cat] = [...base, ...assets];
  return acc;
}, {} as Record<GiftCategory, RewardItem[]>);

function burstConfetti() {
  const end = Date.now() + 800;
  const colors = ["#A78BFA", "#60A5FA", "#34D399", "#F472B6", "#F59E0B"];
  (function frame() {
    confetti({ particleCount: 12, spread: 70, startVelocity: 35, scalar: 0.9, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

function todayKey() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function hashToIndex(key: string, len: number) {
  let h = 2166136261 >>> 0; // FNV-like
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % Math.max(1, len);
}

export default function RewardReveal({ category }: { category: GiftCategory }) {
  const [opened, setOpened] = useState(false);
  const [idx, setIdx] = useState(() => {
    const key = `schedulins-reward:${category}:${todayKey()}`;
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    const seeded = hashToIndex(`${category}:${todayKey()}`, REWARDS[category].length);
    return saved ? Number(saved) : seeded;
  });
  const reward = REWARDS[category][idx];
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    // preload sounds
    sounds.pop.load();
    sounds.fanfare.load();
  }, []);

  function openBox() {
    setOpened(true);
    console.debug("RewardReveal: openBox", { category, idx, reward });
    try { sounds.pop.play(); } catch {}
    setTimeout(() => {
      burstConfetti();
      try { sounds.fanfare.play(); } catch {}
    }, 200);
    // persist chosen reward index for today & category
    const key = `schedulins-reward:${category}:${todayKey()}`;
    try {
      window.localStorage.setItem(key, String(idx));
    } catch {}
  }

  useEffect(() => {
    // Debug logging
    console.debug("RewardReveal: state", { category, idx, opened, reward, loadError });
  }, [category, idx, opened, reward, loadError]);

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="box"
            onClick={openBox}
            className="rounded-2xl border px-10 py-10 bg-white/70 dark:bg-black/40 text-2xl shadow hover:shadow-lg"
            initial={{ rotate: 0, scale: 0.95 }}
            animate={{ rotate: [0, -3, 3, 0], scale: 1 }}
            transition={{ repeat: Infinity, repeatDelay: 1.8, duration: 1.2 }}
          >
            🎁
            <div className="mt-2 text-sm opacity-70">Tap to open your reward</div>
          </motion.button>
        ) : (
          <motion.div
            key="reward"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            className="text-center"
          >
            {reward.mediaType === "image" && reward.src ? (
              <img
                src={reward.src}
                alt={reward.title}
                className="mx-auto mb-3 w-40 h-40 object-contain"
                onError={(e) => {
                  console.error("Image failed to load", reward.src, e);
                  setLoadError("Image failed to load");
                }}
              />
            ) : (
              <div className="text-7xl mb-3">{reward.emoji ?? "🎁"}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
