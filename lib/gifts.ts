export type GiftCategory =
  | "space"
  | "food"
  | "anime"
  | "music"
  | "cute"
  | "gaming"
  | "books"
  | "travel"
  | "fitness"
  | "art"
  | "sports"
  | "fashion"
  | "coding"
  | "study"
  | "gardening"
  | "wellbeing"
  | "movies"
  | "photo"
  | "diy"
  | "language"
  | "craft"
  | "outdoors";

export const CATEGORY_LABEL: Record<GiftCategory, string> = {
  space: "Space",
  food: "Food",
  anime: "Anime",
  music: "Music",
  cute: "Cute Animals",
  gaming: "Gaming",
  books: "Books",
  travel: "Travel",
  fitness: "Fitness",
  art: "Art",
  sports: "Sports",
  fashion: "Fashion",
  coding: "Coding",
  study: "Study",
  gardening: "Gardening",
  wellbeing: "Wellbeing",
  movies: "Movies",
  photo: "Photography",
  diy: "DIY",
  language: "Language",
  craft: "Crafts",
  outdoors: "Outdoors",
};

const KEYWORDS: Record<GiftCategory, string[]> = {
  space: ["space", "galaxy", "star", "planet", "nasa", "astronaut", "cosmic"],
  food: ["food", "pizza", "burger", "snack", "dessert", "sweet", "coffee"],
  anime: ["anime", "manga", "otaku", "waifu", "studio", "ghibli"],
  music: ["music", "song", "lofi", "rock", "pop", "instrument", "guitar"],
  cute: ["cute", "kawaii", "cat", "dog", "animal", "plush", "sticker"],
  gaming: ["game", "gaming", "controller", "badge", "pixel", "retro"],
  books: ["book", "novel", "reading", "bookmark", "literature"],
  travel: ["travel", "trip", "vacation", "plane", "passport", "tour"],
  fitness: ["fitness", "workout", "yoga", "gym", "run", "exercise"],
  art: ["art", "sketch", "painting", "illustration", "canvas"],
  sports: ["sport", "football", "basketball", "soccer", "tennis", "game"],
  fashion: ["fashion", "style", "outfit", "clothes", "accessory"],
  coding: ["code", "program", "developer", "js", "python", "react"],
  study: ["study", "notes", "revision", "exam", "homework"],
  gardening: ["garden", "plant", "flower", "seed", "herb"],
  wellbeing: ["wellbeing", "calm", "meditate", "self-care", "relax"],
  movies: ["movie", "film", "cinema", "popcorn", "director"],
  photo: ["photo", "photography", "camera", "portrait", "snapshot"],
  diy: ["diy", "craft", "project", "maker", "tool"],
  language: ["language", "learn", "vocab", "translate", "speak"],
  craft: ["craft", "handmade", "knit", "sew", "paper"],
  outdoors: ["outdoor", "hike", "camp", "trail", "nature"],
};

export function detectCategory(input: string): GiftCategory | undefined {
  const text = (input || "").toLowerCase();
  for (const [cat, words] of Object.entries(KEYWORDS)) {
    if (words.some((w) => text.includes(w))) return cat as GiftCategory;
  }
  // no match
  return undefined;
}

export const SUGGESTIONS: { label: string; value: GiftCategory; example: string }[] = [
  { label: "Space", value: "space", example: "Space themed" },
  { label: "Food", value: "food", example: "Food stickers" },
  { label: "Anime", value: "anime", example: "Anime theme" },
  { label: "Music", value: "music", example: "Music collectibles" },
  { label: "Cute", value: "cute", example: "Cute animals" },
  { label: "Gaming", value: "gaming", example: "Gaming badge" },
  { label: "Books", value: "books", example: "Bookmarks & reads" },
  { label: "Travel", value: "travel", example: "Travel stickers" },
  { label: "Fitness", value: "fitness", example: "Workout badges" },
  { label: "Art", value: "art", example: "Art prints" },
  { label: "Sports", value: "sports", example: "Sports stickers" },
  { label: "Fashion", value: "fashion", example: "Accessory pins" },
  { label: "Coding", value: "coding", example: "Developer stickers" },
  { label: "Study", value: "study", example: "Study planner" },
  { label: "Gardening", value: "gardening", example: "Plant tags" },
  { label: "Wellbeing", value: "wellbeing", example: "Self-care pack" },
  { label: "Movies", value: "movies", example: "Film postcards" },
  { label: "Photography", value: "photo", example: "Camera stickers" },
  { label: "DIY", value: "diy", example: "DIY kit" },
  { label: "Language", value: "language", example: "Phrasebook" },
  { label: "Crafts", value: "craft", example: "Handmade kit" },
  { label: "Outdoors", value: "outdoors", example: "Trail stickers" },
];
