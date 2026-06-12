/**
 * One-off: download only the 4 missing OG images + 12 duplicate article images.
 * Usage: UNSPLASH_KEY=xxx node scripts/redownload-targets.mjs
 */
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC_IMAGES = path.join(ROOT, "public", "images");

const API_KEY = process.env.UNSPLASH_KEY;
if (!API_KEY) { console.error("Set UNSPLASH_KEY"); process.exit(1); }

const targets = [
  // 4 missing OG images
  { cat: "entrenamiento", slug: "og-entrenamiento", q: "crossfit gym strength training athlete" },
  { cat: "suplementos",   slug: "og-suplementos",   q: "supplement protein powder gym sport" },
  { cat: "perder-peso",   slug: "og-perder-peso",   q: "weight loss fitness healthy running" },
  { cat: "recetas",       slug: "og-recetas",        q: "food meal prep healthy cooking sport" },
  // duplicate fixes
  { cat: "perder-peso",   slug: "cardio-vs-pesas-quemar-grasa",      q: "woman running outdoor jogging cardio park" },
  { cat: "perder-peso",   slug: "metabolismo-basal-como-calcularlo", q: "body composition measurement fitness health" },
  { cat: "entrenamiento", slug: "como-mejorar-vo2-max",              q: "interval training track stadium cardio endurance runner" },
  { cat: "perder-peso",   slug: "grasa-visceral-como-eliminarla",    q: "belly waist tape measure fitness workout" },
  { cat: "entrenamiento", slug: "periodizacion-entrenamiento-crossfit", q: "training plan programming whiteboard sport" },
  { cat: "suplementos",   slug: "zma-testosterona-recuperacion",     q: "sleep rest recovery bed sport athlete" },
  { cat: "perder-peso",   slug: "ayuno-intermitente-perder-peso",    q: "empty plate clock fasting diet intermittent" },
  { cat: "perder-peso",   slug: "deficit-calorico-como-calcularlo",  q: "food scale portion control meal weight loss" },
  { cat: "recetas",       slug: "recetas-keto-ganar-musculo",        q: "steak avocado ketogenic low carb meat dinner" },
  { cat: "suplementos",   slug: "bcaa-para-que-sirven",              q: "amino acid capsule supplement bottle gym" },
  { cat: "suplementos",   slug: "beta-alanina-rendimiento",          q: "endurance runner fatigue sport track race" },
  { cat: "suplementos",   slug: "magnesio-rendimiento-deportivo",    q: "dark chocolate banana magnesium mineral food" },
];

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Authorization: `Client-ID ${API_KEY}`, "Accept-Version": "v1" } }, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        if (res.statusCode !== 200) return reject(new Error(`API HTTP ${res.statusCode}: ${Buffer.concat(chunks).toString()}`));
        resolve(JSON.parse(Buffer.concat(chunks).toString()));
      });
      res.on("error", reject);
    }).on("error", reject);
  });
}

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location)
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function downloadImage(item) {
  const dir = path.join(PUBLIC_IMAGES, item.cat);
  fs.mkdirSync(dir, { recursive: true });
  const dest = path.join(dir, `${item.slug}.webp`);

  const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(item.q)}&orientation=landscape&per_page=10`;
  const data = await fetchJSON(searchUrl);
  if (!data.results?.length) throw new Error(`No results for "${item.q}"`);

  // Try to pick a result that doesn't match any existing file hash
  for (const photo of data.results) {
    const imageUrl = photo.urls.regular + "&w=1200&h=630&fit=crop&crop=entropy";
    const buf = await fetchBuffer(imageUrl);
    if (buf.length < 10000) continue;

    for (const q of [82, 72, 62]) {
      const tmp = dest + ".tmp";
      await sharp(buf).resize(1200, 630, { fit: "cover", position: "attention" }).webp({ quality: q, effort: 4 }).toFile(tmp);
      const kb = Math.round(fs.statSync(tmp).size / 1024);
      if (kb <= 140) {
        fs.renameSync(tmp, dest);
        console.log(`  ✓  ${item.cat}/${item.slug}.webp  (${kb}KB)  — "${photo.alt_description ?? item.q}"`);
        return;
      }
      fs.unlinkSync(tmp);
    }
    await sharp(buf).resize(1200, 630, { fit: "cover" }).webp({ quality: 55 }).toFile(dest);
    const kb = Math.round(fs.statSync(dest).size / 1024);
    console.log(`  ✓  ${item.cat}/${item.slug}.webp  (${kb}KB)`);
    return;
  }
  throw new Error("All results failed size check");
}

console.log(`\nDownloading ${targets.length} images…\n`);
let ok = 0, fail = 0;
for (const item of targets) {
  try {
    await downloadImage(item);
    ok++;
  } catch (e) {
    console.error(`  ✗  ${item.slug} — ${e.message}`);
    fail++;
  }
  await sleep(400);
}
console.log(`\nDone: ${ok} OK, ${fail} failed.\n`);
