import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public", "images");

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
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

async function save(buf, dest, maxKB = 140) {
  // Try decreasing quality until under maxKB
  for (const q of [80, 72, 64, 56]) {
    const tmp = dest + ".tmp";
    await sharp(buf).resize(1200, 630, { fit: "cover", position: "attention" }).webp({ quality: q, effort: 4 }).toFile(tmp);
    const kb = fs.statSync(tmp).size / 1024;
    if (kb <= maxKB) {
      fs.renameSync(tmp, dest);
      return Math.round(kb);
    }
    fs.unlinkSync(tmp);
  }
  // Last resort: save at q56
  await sharp(buf).resize(1200, 630, { fit: "cover", position: "attention" }).webp({ quality: 56, effort: 4 }).toFile(dest);
  return Math.round(fs.statSync(dest).size / 1024);
}

async function dl(cat, slug, id) {
  const dir = path.join(PUBLIC, cat);
  fs.mkdirSync(dir, { recursive: true });
  const dest = path.join(dir, `${slug}.webp`);
  const buf = await fetchBuffer(pexelsUrl(id));
  if (buf.length < 10000) throw new Error("Too small");
  const kb = await save(buf, dest);
  console.log(`  ✓  ${cat || "root"}/${slug}.webp  (${kb}KB)`);
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── 1. Download missing images ──────────────────────────────────
const missing = [
  { cat: "nutricion",     slug: "dieta-keto-para-crossfit",        id: 2802027  }, // keto food
  { cat: "nutricion",     slug: "hidratacion-deportiva",           id: 416160   }, // athlete water bottle
  { cat: "nutricion",     slug: "macros-para-ganar-musculo",       id: 1640772  }, // meal prep nutrition
  { cat: "suplementos",   slug: "creatina-para-que-sirve",         id: 3943769  }, // supplement powder
  { cat: "suplementos",   slug: "glutamina-para-que-sirve",        id: 1547248  }, // supplement gym jar
  { cat: "entrenamiento", slug: "entrenamiento-fuerza-principiantes", id: 4162438 }, // barbell squat
  { cat: "entrenamiento", slug: "hyrox-que-es-como-prepararse",    id: 1461974  }, // runner race
  { cat: "",              slug: "og-home",                         id: 2261477  }, // fitness athlete
];

console.log("\nFixing 8 missing images…\n");
for (const item of missing) {
  try {
    await dl(item.cat, item.slug, item.id);
  } catch (e) {
    console.error(`  ✗  ${item.slug} — ${e.message}`);
  }
  await sleep(300);
}

// ── 2. Recompress oversized images ─────────────────────────────
console.log("\nRecompressing oversized images…\n");
const { execSync } = await import("child_process");
const all = execSync("find public/images -name '*.webp'").toString().trim().split("\n").filter(Boolean);

for (const f of all) {
  const kb = fs.statSync(f).size / 1024;
  if (kb <= 140) continue;
  const buf = fs.readFileSync(f);
  const newKb = await save(buf, f);
  console.log(`  recompressed  ${path.basename(f)}  ${Math.round(kb)}KB → ${newKb}KB`);
}

console.log("\nDone.\n");
