const fs = require("fs");
const path = require("path");

const categories = [
  "space",
  "food",
  "anime",
  "music",
  "cute",
  "gaming",
  "books",
  "travel",
  "fitness",
  "art",
  "sports",
  "fashion",
  "coding",
  "study",
  "gardening",
  "wellbeing",
  "movies",
  "photo",
  "diy",
  "language",
  "craft",
  "outdoors",
];

const publicDir = path.join(__dirname, "..", "public", "rewards");
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

const ASSET_COUNT = 10;
const force = process.argv.includes("--force");

const EMOJI = {
  space: "🪐",
  food: "🍕",
  anime: "🎎",
  music: "🎧",
  cute: "🐱",
  gaming: "🎮",
  books: "📚",
  travel: "✈️",
  fitness: "🏋️‍♀️",
  art: "🎨",
  sports: "⚽",
  fashion: "👗",
  coding: "💻",
  study: "📖",
  gardening: "🌿",
  wellbeing: "🕯️",
  movies: "🎬",
  photo: "📷",
  diy: "🔧",
  language: "🗣️",
  craft: "✂️",
  outdoors: "🏕️",
};

function placeholderSvg(cat, i) {
  const emoji = EMOJI[cat] || "🎁";
  const label = `${cat} sticker ${i}`;
  const bg = i % 2 === 0 ? "#fff7ed" : "#eef2ff";
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' width='400' height='400'>\n  <defs>\n    <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>\n      <stop offset='0%' stop-color='${bg}' stop-opacity='1'/>\n      <stop offset='100%' stop-color='#ffffff' stop-opacity='0.95'/>\n    </linearGradient>\n    <filter id='s' x='-20%' y='-20%' width='140%' height='140%'>\n      <feDropShadow dx='0' dy='6' stdDeviation='8' flood-color='#000' flood-opacity='0.08'/>\n    </filter>\n  </defs>\n  <rect width='100%' height='100%' rx='36' fill='url(#g)'/>\n  <g filter='url(#s)'>\n    <circle cx='200' cy='140' r='90' fill='#fff' stroke='#e2e8f0' stroke-width='3'/>\n    <text x='50%' y='140' text-anchor='middle' font-family='Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif' font-size='64' dominant-baseline='middle'>${emoji}</text>\n  </g>\n  <text x='50%' y='320' text-anchor='middle' font-family='Arial, Helvetica, sans-serif' font-size='20' fill='#334155'>${label}</text>\n</svg>`;
}

categories.forEach((cat) => {
  const dir = path.join(publicDir, cat);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (let i = 1; i <= ASSET_COUNT; i++) {
    const file = path.join(dir, `asset-${i}.svg`);
    if (fs.existsSync(file) && !force) continue; // don't overwrite unless --force
    fs.writeFileSync(file, placeholderSvg(cat, i));
  }
});

console.log(`Generated ${ASSET_COUNT} placeholder SVG assets for ${categories.length} categories at ${publicDir}`);
