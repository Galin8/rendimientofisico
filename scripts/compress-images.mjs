import { execSync } from "child_process";
import { statSync } from "fs";
import sharp from "sharp";

const files = execSync("find public/images -name '*.webp'")
  .toString().trim().split("\n").filter(Boolean);

let recompressed = 0;
for (const f of files) {
  const kb = statSync(f).size / 1024;
  if (kb <= 145) continue;
  // Write to a temp path first, then overwrite
  const tmp = f.replace(".webp", "._tmp_.webp");
  let done = false;
  for (const q of [75, 68, 60, 50]) {
    try {
      await sharp(f)
        .resize(1200, 630, { fit: "cover", position: "attention" })
        .webp({ quality: q, effort: 4 })
        .toFile(tmp);
      const newKb = statSync(tmp).size / 1024;
      if (newKb <= 145) {
        // Overwrite original by writing to it directly
        await sharp(tmp).webp({ quality: q }).toFile(f);
        execSync(`rm "${tmp}"`);
        console.log(`  ✓  ${f}  ${Math.round(kb)}KB → ${Math.round(newKb)}KB (q${q})`);
        recompressed++;
        done = true;
        break;
      }
      execSync(`rm "${tmp}"`);
    } catch { /* file locked, skip */ }
  }
  if (!done) console.log(`  ⚠  ${f}  ${Math.round(kb)}KB — kept (locked or can't compress)`);
}
console.log(`\nRecompressed: ${recompressed}/${files.filter(f => statSync(f).size/1024 > 145).length} oversized images`);
