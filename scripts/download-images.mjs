/**
 * Download themed images from Pexels (direct photo URLs, no API key needed).
 * Photos selected manually by topic relevance.
 */
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC_IMAGES = path.join(ROOT, "public", "images");

// Pexels photo IDs selected by topic — all Creative Commons / free license
// URL: https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?...
const articles = [
  // ── NUTRICION ──────────────────────────────────────────────────────
  { cat: "nutricion", slug: "ayuno-intermitente-deportistas",   id: 3622608  }, // clock + healthy food fasting concept
  { cat: "nutricion", slug: "carbohidratos-antes-entreno",      id: 1640777  }, // pasta/carbs meal bowl
  { cat: "nutricion", slug: "dieta-keto-para-crossfit",         id: 1640766  }, // keto ingredients avocado eggs
  { cat: "nutricion", slug: "dieta-mediterranea-deportistas",   id: 1640780  }, // mediterranean vegetables olive
  { cat: "nutricion", slug: "hidratacion-deportiva",            id: 1000048  }, // athlete drinking water
  { cat: "nutricion", slug: "macros-para-ganar-musculo",        id: 1640778  }, // meal prep nutrition
  { cat: "nutricion", slug: "proteinas-cuanta-necesito",        id: 1640776  }, // chicken eggs protein food
  { cat: "nutricion", slug: "proteinas-vegetales-deportistas",  id: 1640768  }, // legumes plant protein
  { cat: "nutricion", slug: "suplementacion-vegana-crossfit",   id: 1640784  }, // vegan green food
  // ── SUPLEMENTOS ────────────────────────────────────────────────────
  { cat: "suplementos", slug: "bcaa-para-que-sirven",              id: 3756165  }, // gym supplement jar
  { cat: "suplementos", slug: "cafeina-pre-entreno",               id: 312418   }, // espresso coffee cup
  { cat: "suplementos", slug: "creatina-para-que-sirve",           id: 3825579  }, // protein powder supplement
  { cat: "suplementos", slug: "glutamina-para-que-sirve",          id: 4397862  }, // supplement capsules
  { cat: "suplementos", slug: "magnesio-rendimiento-deportivo",    id: 3683098  }, // supplement pills health
  { cat: "suplementos", slug: "omega-3-deportistas",               id: 3532527  }, // salmon fish omega-3
  { cat: "suplementos", slug: "proteina-whey-cual-elegir",         id: 3865792  }, // protein shake gym
  { cat: "suplementos", slug: "vitamina-d-rendimiento",            id: 414012   }, // sunshine outdoor sport
  { cat: "suplementos", slug: "zma-testosterona-recuperacion",     id: 3943768  }, // supplement recovery
  // ── ENTRENAMIENTO ──────────────────────────────────────────────────
  { cat: "entrenamiento", slug: "ejercicios-funcionales-crossfit",     id: 1552242  }, // crossfit barbell athlete
  { cat: "entrenamiento", slug: "entrenamiento-fuerza-principiantes",  id: 28061    }, // barbell squat gym beginner
  { cat: "entrenamiento", slug: "hiit-vs-liss-cual-es-mejor",          id: 235922   }, // running sprint track
  { cat: "entrenamiento", slug: "hyrox-que-es-como-prepararse",        id: 2526904  }, // functional race athlete running
  { cat: "entrenamiento", slug: "movilidad-flexibilidad-crossfit",     id: 4056535  }, // yoga stretch mobility
  { cat: "entrenamiento", slug: "recuperacion-muscular-post-entreno",  id: 3822583  }, // stretching muscle recovery
  { cat: "entrenamiento", slug: "rutina-crossfit-principiantes",       id: 703016   }, // crossfit box kettlebell
  // ── PERDER PESO ────────────────────────────────────────────────────
  { cat: "perder-peso", slug: "ayuno-intermitente-perder-peso",    id: 1640775  }, // diet clean eating weight loss
  { cat: "perder-peso", slug: "cardio-vs-pesas-quemar-grasa",      id: 841130   }, // gym weights cardio workout
  { cat: "perder-peso", slug: "deficit-calorico-como-calcularlo",  id: 1640773  }, // healthy food portion scale
  { cat: "perder-peso", slug: "grasa-visceral-como-eliminarla",    id: 2294353  }, // running exercise belly fat
  { cat: "perder-peso", slug: "metabolismo-basal-como-calcularlo", id: 3768901  }, // fitness gym metabolism
  // ── OG / CATEGORY IMAGES ───────────────────────────────────────────
  { cat: "",              slug: "og-home",              id: 1552261  }, // fitness athlete overall
  { cat: "nutricion",     slug: "og-nutricion",         id: 1640779  }, // nutrition sport food
  { cat: "entrenamiento", slug: "og-entrenamiento",     id: 1552249  }, // training gym sport
  { cat: "suplementos",   slug: "og-suplementos",       id: 3756168  }, // supplement gym
  { cat: "perder-peso",   slug: "og-perder-peso",       id: 1954524  }, // healthy weight loss running
];

// ── helpers ────────────────────────────────────────────────────────

function pexelsUrl(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop`;
}

function fetchBuffer(url, hops = 0) {
  return new Promise((resolve, reject) => {
    if (hops > 8) return reject(new Error("Too many redirects"));
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        return fetchBuffer(res.headers.location, hops + 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ID ${url}`));
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function downloadImage(item) {
  const dir = path.join(PUBLIC_IMAGES, item.cat);
  fs.mkdirSync(dir, { recursive: true });
  const dest = path.join(dir, `${item.slug}.webp`);

  try {
    const buf = await fetchBuffer(pexelsUrl(item.id));
    if (buf.length < 10000) throw new Error("Response too small");
    await sharp(buf)
      .resize(1200, 630, { fit: "cover", position: "attention" })
      .webp({ quality: 80, effort: 4 })
      .toFile(dest);
    const kb = Math.round(fs.statSync(dest).size / 1024);
    console.log(`  ✓  ${(item.cat || "root")}/${item.slug}.webp  (${kb}KB)`);
  } catch (err) {
    console.error(`  ✗  ${item.slug} [id:${item.id}] — ${err.message}`);
  }
}

// ── main ───────────────────────────────────────────────────────────

// Delete all existing images to ensure fresh download
const existing = [];
for (const d of ["nutricion","suplementos","entrenamiento","perder-peso",""]) {
  const dir = path.join(PUBLIC_IMAGES, d);
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).filter(f => f.endsWith(".webp")).forEach(f => {
      fs.unlinkSync(path.join(dir, f));
    });
  }
}
console.log(`\nDownloading ${articles.length} themed Pexels images (1200×630 WebP)…\n`);

for (const item of articles) {
  await downloadImage(item);
  await sleep(300);
}

const ok = articles.filter(a => fs.existsSync(path.join(PUBLIC_IMAGES, a.cat, `${a.slug}.webp`))).length;
console.log(`\n${ok}/${articles.length} images ready.\n`);
