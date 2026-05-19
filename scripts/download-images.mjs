import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC_IMAGES = path.join(ROOT, "public", "images");

// loremflickr.com/{w}/{h}/{keywords} — Flickr Creative Commons, keyword-based
const articles = [
  // ── NUTRICION ─────────────────────────────────────────────────────
  { cat: "nutricion", slug: "ayuno-intermitente-deportistas",   kw: "fasting,clock,diet,healthy,food" },
  { cat: "nutricion", slug: "carbohidratos-antes-entreno",      kw: "carbohydrates,rice,pasta,sport,energy" },
  { cat: "nutricion", slug: "dieta-keto-para-crossfit",         kw: "keto,avocado,eggs,lowcarb,food" },
  { cat: "nutricion", slug: "dieta-mediterranea-deportistas",   kw: "mediterranean,olive,vegetables,salad,healthy" },
  { cat: "nutricion", slug: "hidratacion-deportiva",            kw: "water,bottle,athlete,sport,hydration" },
  { cat: "nutricion", slug: "macros-para-ganar-musculo",        kw: "meal,prep,nutrition,food,muscle" },
  { cat: "nutricion", slug: "proteinas-cuanta-necesito",        kw: "chicken,eggs,protein,food,meat" },
  { cat: "nutricion", slug: "proteinas-vegetales-deportistas",  kw: "legumes,lentils,tofu,plant,vegetables" },
  { cat: "nutricion", slug: "suplementacion-vegana-crossfit",   kw: "vegan,green,healthy,plant,supplement" },
  // ── SUPLEMENTOS ───────────────────────────────────────────────────
  { cat: "suplementos", slug: "bcaa-para-que-sirven",              kw: "supplement,powder,gym,protein,sport" },
  { cat: "suplementos", slug: "cafeina-pre-entreno",               kw: "coffee,espresso,cup,caffeine,drink" },
  { cat: "suplementos", slug: "creatina-para-que-sirve",           kw: "supplement,protein,powder,gym,sport" },
  { cat: "suplementos", slug: "glutamina-para-que-sirve",          kw: "supplement,capsules,pills,health,sport" },
  { cat: "suplementos", slug: "magnesio-rendimiento-deportivo",    kw: "mineral,pills,capsules,supplement,health" },
  { cat: "suplementos", slug: "omega-3-deportistas",               kw: "fish,salmon,omega,capsules,oil" },
  { cat: "suplementos", slug: "proteina-whey-cual-elegir",         kw: "protein,shake,gym,fitness,supplement" },
  { cat: "suplementos", slug: "vitamina-d-rendimiento",            kw: "sun,sunshine,sport,outdoor,athlete" },
  { cat: "suplementos", slug: "zma-testosterona-recuperacion",     kw: "supplement,recovery,sport,health,vitamins" },
  // ── ENTRENAMIENTO ─────────────────────────────────────────────────
  { cat: "entrenamiento", slug: "ejercicios-funcionales-crossfit",     kw: "crossfit,barbell,weightlifting,gym,athlete" },
  { cat: "entrenamiento", slug: "entrenamiento-fuerza-principiantes",  kw: "barbell,squat,gym,strength,lifting" },
  { cat: "entrenamiento", slug: "hiit-vs-liss-cual-es-mejor",          kw: "running,sprint,track,athlete,cardio" },
  { cat: "entrenamiento", slug: "hyrox-que-es-como-prepararse",        kw: "race,running,athlete,competition,fitness" },
  { cat: "entrenamiento", slug: "movilidad-flexibilidad-crossfit",     kw: "stretching,yoga,flexibility,mobility,athlete" },
  { cat: "entrenamiento", slug: "recuperacion-muscular-post-entreno",  kw: "recovery,stretching,rest,muscle,sport" },
  { cat: "entrenamiento", slug: "rutina-crossfit-principiantes",       kw: "crossfit,kettlebell,workout,gym,training" },
  // ── PERDER PESO ───────────────────────────────────────────────────
  { cat: "perder-peso", slug: "ayuno-intermitente-perder-peso",    kw: "diet,weight,loss,healthy,food" },
  { cat: "perder-peso", slug: "cardio-vs-pesas-quemar-grasa",      kw: "running,fitness,cardio,sport,workout" },
  { cat: "perder-peso", slug: "deficit-calorico-como-calcularlo",  kw: "food,scale,diet,healthy,nutrition" },
  { cat: "perder-peso", slug: "grasa-visceral-como-eliminarla",    kw: "running,exercise,fitness,sport,health" },
  { cat: "perder-peso", slug: "metabolismo-basal-como-calcularlo", kw: "fitness,health,body,sport,metabolism" },
  // ── OG IMAGES ─────────────────────────────────────────────────────
  { cat: "",            slug: "og-home",              kw: "fitness,sport,nutrition,athlete,gym" },
  { cat: "nutricion",   slug: "og-nutricion",         kw: "nutrition,healthy,food,salad,sport" },
  { cat: "entrenamiento", slug: "og-entrenamiento",   kw: "crossfit,gym,strength,athlete,training" },
  { cat: "suplementos",   slug: "og-suplementos",     kw: "supplement,protein,gym,sport,fitness" },
  { cat: "perder-peso",   slug: "og-perder-peso",     kw: "diet,weight,loss,fitness,exercise" },
];

// ── helpers ───────────────────────────────────────────────────────

function fetchBuffer(url, hops = 0) {
  return new Promise((resolve, reject) => {
    if (hops > 10) return reject(new Error("Too many redirects"));
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        const next = res.headers.location.startsWith("http")
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        return fetchBuffer(next, hops + 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(20000, () => { req.destroy(); reject(new Error("Timeout")); });
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function downloadImage(item) {
  const dir = path.join(PUBLIC_IMAGES, item.cat);
  fs.mkdirSync(dir, { recursive: true });

  const dest = path.join(dir, `${item.slug}.webp`);
  // Add lock-buster seed so loremflickr doesn't serve the same cached image for similar keywords
  const seed = Math.abs(item.slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0));
  const url = `https://loremflickr.com/1200/630/${item.kw}?lock=${seed}`;

  try {
    const buf = await fetchBuffer(url);
    if (buf.length < 5000) throw new Error("Response too small — likely an error page");
    await sharp(buf)
      .resize(1200, 630, { fit: "cover", position: "attention" })
      .webp({ quality: 85, effort: 4 })
      .toFile(dest);
    const kb = Math.round(fs.statSync(dest).size / 1024);
    console.log(`  ✓  ${(item.cat || "root") + "/" + item.slug}.webp  (${kb}KB)`);
  } catch (err) {
    console.error(`  ✗  ${item.slug} — ${err.message}`);
  }
}

// ── main ─────────────────────────────────────────────────────────

console.log(`\nDownloading ${articles.length} thematic images from loremflickr (1200×630 WebP)…\n`);

for (const item of articles) {
  await downloadImage(item);
  await sleep(500); // polite delay
}

const total = articles.length;
const ok = articles.filter(a => {
  const f = path.join(PUBLIC_IMAGES, a.cat, `${a.slug}.webp`);
  return fs.existsSync(f);
}).length;

console.log(`\nDone: ${ok}/${total} images downloaded.\n`);
