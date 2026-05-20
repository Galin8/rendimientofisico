/**
 * Download themed images from Unsplash API v1.
 * Usage: UNSPLASH_KEY=your_access_key node scripts/download-images-unsplash.mjs
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
if (!API_KEY) {
  console.error("\n  Error: set your Unsplash Access Key before running:\n");
  console.error("  UNSPLASH_KEY=your_access_key node scripts/download-images-unsplash.mjs\n");
  process.exit(1);
}

// Search queries tuned per article — Unsplash returns best-match editorial photos
const articles = [
  // ── NUTRICION ──────────────────────────────────────────────────────
  { cat: "nutricion", slug: "ayuno-intermitente-deportistas",   q: "intermittent fasting healthy food clock" },
  { cat: "nutricion", slug: "carbohidratos-antes-entreno",      q: "pasta rice carbohydrates sport food" },
  { cat: "nutricion", slug: "dieta-keto-para-crossfit",         q: "keto avocado eggs low carb food" },
  { cat: "nutricion", slug: "dieta-mediterranea-deportistas",   q: "mediterranean diet vegetables olive oil" },
  { cat: "nutricion", slug: "hidratacion-deportiva",            q: "athlete drinking water sport hydration" },
  { cat: "nutricion", slug: "macros-para-ganar-musculo",        q: "meal prep nutrition muscle food" },
  { cat: "nutricion", slug: "proteinas-cuanta-necesito",        q: "chicken breast eggs protein food" },
  { cat: "nutricion", slug: "proteinas-vegetales-deportistas",  q: "legumes lentils plant protein food" },
  { cat: "nutricion", slug: "suplementacion-vegana-crossfit",   q: "vegan plant food green healthy" },
  { cat: "nutricion", slug: "alimentacion-pre-competicion",    q: "athlete meal prep competition food race" },
  // ── SUPLEMENTOS ────────────────────────────────────────────────────
  { cat: "suplementos", slug: "bcaa-para-que-sirven",              q: "supplement powder gym protein jar" },
  { cat: "suplementos", slug: "cafeina-pre-entreno",               q: "espresso coffee cup close up" },
  { cat: "suplementos", slug: "creatina-para-que-sirve",           q: "protein powder supplement scoop" },
  { cat: "suplementos", slug: "glutamina-para-que-sirve",          q: "supplement capsules pills health" },
  { cat: "suplementos", slug: "magnesio-rendimiento-deportivo",    q: "minerals vitamins pills supplement" },
  { cat: "suplementos", slug: "omega-3-deportistas",               q: "salmon fish oil omega 3 capsules" },
  { cat: "suplementos", slug: "proteina-whey-cual-elegir",         q: "whey protein shake gym fitness" },
  { cat: "suplementos", slug: "vitamina-d-rendimiento",            q: "sunshine outdoor sport vitamin d" },
  { cat: "suplementos", slug: "zma-testosterona-recuperacion",     q: "supplement recovery sport health" },
  { cat: "suplementos", slug: "beta-alanina-rendimiento",          q: "supplement powder pre workout gym" },
  // ── ENTRENAMIENTO ──────────────────────────────────────────────────
  { cat: "entrenamiento", slug: "ejercicios-funcionales-crossfit",     q: "crossfit barbell functional athlete" },
  { cat: "entrenamiento", slug: "entrenamiento-fuerza-principiantes",  q: "barbell squat gym strength training" },
  { cat: "entrenamiento", slug: "hiit-vs-liss-cual-es-mejor",          q: "sprint running track athlete cardio" },
  { cat: "entrenamiento", slug: "hyrox-que-es-como-prepararse",        q: "functional fitness race indoor athlete" },
  { cat: "entrenamiento", slug: "movilidad-flexibilidad-crossfit",     q: "mobility flexibility yoga stretch athlete" },
  { cat: "entrenamiento", slug: "recuperacion-muscular-post-entreno",  q: "muscle recovery stretching sport rest" },
  { cat: "entrenamiento", slug: "rutina-crossfit-principiantes",           q: "crossfit workout kettlebell box gym" },
  { cat: "entrenamiento", slug: "periodizacion-entrenamiento-crossfit",  q: "crossfit training planning periodization athlete" },
  // ── PERDER PESO ────────────────────────────────────────────────────
  { cat: "perder-peso", slug: "ayuno-intermitente-perder-peso",    q: "fasting weight loss diet healthy" },
  { cat: "perder-peso", slug: "cardio-vs-pesas-quemar-grasa",      q: "gym weights running cardio fat burn" },
  { cat: "perder-peso", slug: "deficit-calorico-como-calcularlo",  q: "healthy food scale portion diet" },
  { cat: "perder-peso", slug: "grasa-visceral-como-eliminarla",    q: "running exercise fitness belly health" },
  { cat: "perder-peso", slug: "metabolismo-basal-como-calcularlo", q: "fitness gym body metabolism sport" },
  // ── OG IMAGES ──────────────────────────────────────────────────────
  { cat: "",              slug: "og-home",              q: "fitness sport athlete gym training" },
  { cat: "nutricion",     slug: "og-nutricion",         q: "healthy nutrition food sport meal" },
  { cat: "entrenamiento", slug: "og-entrenamiento",     q: "crossfit gym strength training athlete" },
  { cat: "suplementos",   slug: "og-suplementos",       q: "supplement protein powder gym sport" },
  { cat: "perder-peso",   slug: "og-perder-peso",       q: "weight loss fitness healthy running" },
];

// ── helpers ──────────────────────────────────────────────────────

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

async function downloadArticleImage(item) {
  const dir = path.join(PUBLIC_IMAGES, item.cat);
  fs.mkdirSync(dir, { recursive: true });
  const dest = path.join(dir, `${item.slug}.webp`);

  // Search Unsplash API
  const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(item.q)}&orientation=landscape&per_page=5`;
  const data = await fetchJSON(searchUrl);

  if (!data.results?.length) throw new Error(`No results for "${item.q}"`);
  const photo = data.results[0];
  const imageUrl = photo.urls.regular + "&w=1200&h=630&fit=crop&crop=entropy";

  const buf = await fetchBuffer(imageUrl);
  if (buf.length < 10000) throw new Error("Image too small");

  // Resize + WebP, target ≤140KB
  for (const q of [82, 72, 62]) {
    const tmp = dest + ".tmp";
    await sharp(buf).resize(1200, 630, { fit: "cover", position: "attention" }).webp({ quality: q, effort: 4 }).toFile(tmp);
    const kb = Math.round(fs.statSync(tmp).size / 1024);
    if (kb <= 140) {
      fs.renameSync(tmp, dest);
      console.log(`  ✓  ${item.cat || "root"}/${item.slug}.webp  (${kb}KB)  — "${photo.alt_description ?? item.q}"`);
      return;
    }
    fs.unlinkSync(tmp);
  }
  // Last resort
  await sharp(buf).resize(1200, 630, { fit: "cover" }).webp({ quality: 55 }).toFile(dest);
  const kb = Math.round(fs.statSync(dest).size / 1024);
  console.log(`  ✓  ${item.cat || "root"}/${item.slug}.webp  (${kb}KB)`);
}

// ── main ─────────────────────────────────────────────────────────

console.log(`\nDownloading ${articles.length} images from Unsplash API…\n`);
let ok = 0, fail = 0;

for (const item of articles) {
  try {
    await downloadArticleImage(item);
    ok++;
  } catch (e) {
    console.error(`  ✗  ${item.slug} — ${e.message}`);
    fail++;
  }
  await sleep(400); // stay under 50 req/hour rate limit
}

console.log(`\nDone: ${ok} OK, ${fail} failed.\n`);
