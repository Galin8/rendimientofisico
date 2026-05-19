import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC_IMAGES = path.join(ROOT, "public", "images");

// Keywords tuned for each article — Unsplash Source API
const articles = [
  // ── NUTRICION ─────────────────────────────────────────────
  { cat: "nutricion", slug: "ayuno-intermitente-deportistas",   q: "fasting,athlete,food,healthy" },
  { cat: "nutricion", slug: "carbohidratos-antes-entreno",      q: "pasta,rice,carbohydrates,sport" },
  { cat: "nutricion", slug: "dieta-keto-para-crossfit",         q: "keto,avocado,eggs,lowcarb" },
  { cat: "nutricion", slug: "dieta-mediterranea-deportistas",   q: "mediterranean,food,olive,vegetables" },
  { cat: "nutricion", slug: "hidratacion-deportiva",            q: "water,bottle,athlete,hydration" },
  { cat: "nutricion", slug: "macros-para-ganar-musculo",        q: "meal,prep,muscle,nutrition" },
  { cat: "nutricion", slug: "proteinas-cuanta-necesito",        q: "chicken,eggs,protein,food" },
  { cat: "nutricion", slug: "proteinas-vegetales-deportistas",  q: "legumes,lentils,tofu,plant,food" },
  { cat: "nutricion", slug: "suplementacion-vegana-crossfit",   q: "vegan,supplements,green,healthy" },
  // ── SUPLEMENTOS ───────────────────────────────────────────
  { cat: "suplementos", slug: "bcaa-para-que-sirven",              q: "supplement,powder,gym,jar" },
  { cat: "suplementos", slug: "cafeina-pre-entreno",               q: "coffee,espresso,caffeine,cup" },
  { cat: "suplementos", slug: "creatina-para-que-sirve",           q: "supplement,gym,sport,creatine" },
  { cat: "suplementos", slug: "glutamina-para-que-sirve",          q: "supplement,protein,powder,white" },
  { cat: "suplementos", slug: "magnesio-rendimiento-deportivo",    q: "pills,capsules,supplement,mineral" },
  { cat: "suplementos", slug: "omega-3-deportistas",               q: "fish,oil,omega,capsules,salmon" },
  { cat: "suplementos", slug: "proteina-whey-cual-elegir",         q: "whey,protein,shake,gym,jar" },
  { cat: "suplementos", slug: "vitamina-d-rendimiento",            q: "sun,vitamin,outdoor,athlete,light" },
  { cat: "suplementos", slug: "zma-testosterona-recuperacion",     q: "zinc,magnesium,supplement,recovery" },
  // ── ENTRENAMIENTO ─────────────────────────────────────────
  { cat: "entrenamiento", slug: "ejercicios-funcionales-crossfit",     q: "crossfit,barbell,functional,athlete" },
  { cat: "entrenamiento", slug: "entrenamiento-fuerza-principiantes",  q: "barbell,squat,gym,beginner,strength" },
  { cat: "entrenamiento", slug: "hiit-vs-liss-cual-es-mejor",          q: "running,sprint,cardio,track,athlete" },
  { cat: "entrenamiento", slug: "hyrox-que-es-como-prepararse",        q: "race,functional,indoor,athlete,run" },
  { cat: "entrenamiento", slug: "movilidad-flexibilidad-crossfit",     q: "mobility,stretch,yoga,athlete,flexibility" },
  { cat: "entrenamiento", slug: "recuperacion-muscular-post-entreno",  q: "recovery,stretch,rest,muscle,athlete" },
  { cat: "entrenamiento", slug: "rutina-crossfit-principiantes",       q: "crossfit,box,kettlebell,beginner,workout" },
  // ── PERDER PESO ───────────────────────────────────────────
  { cat: "perder-peso", slug: "ayuno-intermitente-perder-peso",    q: "clock,fasting,diet,weight,loss" },
  { cat: "perder-peso", slug: "cardio-vs-pesas-quemar-grasa",      q: "running,weights,cardio,fat,burn" },
  { cat: "perder-peso", slug: "deficit-calorico-como-calcularlo",  q: "scale,food,calories,measure,diet" },
  { cat: "perder-peso", slug: "grasa-visceral-como-eliminarla",    q: "belly,exercise,abdomen,fitness,running" },
  { cat: "perder-peso", slug: "metabolismo-basal-como-calcularlo", q: "metabolism,body,fitness,measure,health" },
];

// OG images for category pages + home
const ogImages = [
  { cat: "",          slug: "og-home",         q: "fitness,sport,nutrition,gym,athlete" },
  { cat: "nutricion", slug: "og-nutricion",    q: "nutrition,healthy,food,meal,sport" },
  { cat: "entrenamiento", slug: "og-entrenamiento", q: "crossfit,gym,strength,athlete,training" },
  { cat: "suplementos",   slug: "og-suplementos",   q: "supplements,jar,gym,sport,protein" },
  { cat: "perder-peso",   slug: "og-perder-peso",   q: "diet,weight,loss,fitness,exercise" },
];

const all = [...articles, ...ogImages];

// ── helpers ──────────────────────────────────────────────────

function fetchBuffer(url, hops = 0) {
  return new Promise((resolve, reject) => {
    if (hops > 8) return reject(new Error("Too many redirects"));
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        return fetchBuffer(res.headers.location, hops + 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error("Timeout")); });
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function downloadArticleImage(item) {
  const dir = path.join(PUBLIC_IMAGES, item.cat);
  fs.mkdirSync(dir, { recursive: true });

  const dest = path.join(dir, `${item.slug}.webp`);
  if (fs.existsSync(dest)) {
    console.log(`  skip  ${item.cat}/${item.slug}.webp (exists)`);
    return;
  }

  // Try Unsplash Source API (still works as redirect)
  const url = `https://source.unsplash.com/1200x630/?${item.q}`;

  try {
    const buf = await fetchBuffer(url);
    await sharp(buf)
      .resize(1200, 630, { fit: "cover", position: "attention" })
      .webp({ quality: 82, effort: 4 })
      .toFile(dest);
    console.log(`  ✓     ${item.cat || "root"}/${item.slug}.webp`);
  } catch (err) {
    // Fallback: picsum random photo
    console.warn(`  warn  Unsplash failed (${err.message}), trying picsum…`);
    try {
      const seed = Math.abs(item.slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0));
      const fallback = `https://picsum.photos/seed/${seed}/1200/630`;
      const buf = await fetchBuffer(fallback);
      await sharp(buf)
        .resize(1200, 630, { fit: "cover" })
        .webp({ quality: 82 })
        .toFile(dest);
      console.log(`  ✓ (picsum) ${item.cat || "root"}/${item.slug}.webp`);
    } catch (e2) {
      console.error(`  ✗     ${item.cat || "root"}/${item.slug}.webp — ${e2.message}`);
    }
  }
}

// ── main ─────────────────────────────────────────────────────

console.log(`Downloading ${all.length} images (1200×630 WebP)…\n`);

for (const item of all) {
  await downloadArticleImage(item);
  await sleep(400); // polite delay to avoid rate limiting
}

console.log("\nDone.");
