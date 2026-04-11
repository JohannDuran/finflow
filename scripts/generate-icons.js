const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const outDir = path.join(__dirname, "../public/icons");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const svg = (size) => Buffer.from(`
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.2)}" fill="#09090b"/>
  <rect x="${Math.round(size*0.15)}" y="${Math.round(size*0.15)}" width="${Math.round(size*0.7)}" height="${Math.round(size*0.7)}" rx="${Math.round(size*0.15)}" fill="#22c55e"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
    font-family="Arial, sans-serif" font-weight="800" font-size="${Math.round(size*0.35)}" fill="#09090b">FF</text>
</svg>`);

async function generate() {
  for (const size of [192, 512]) {
    await sharp(svg(size)).png().toFile(path.join(outDir, `icon-${size}x${size}.png`));
    console.log(`✅ icon-${size}x${size}.png`);
  }
  await sharp({ create: { width: 1280, height: 720, channels: 4, background: { r: 9, g: 9, b: 11, alpha: 1 } } })
    .png().toFile(path.join(outDir, "screenshot-wide.png"));
  await sharp({ create: { width: 390, height: 844, channels: 4, background: { r: 9, g: 9, b: 11, alpha: 1 } } })
    .png().toFile(path.join(outDir, "screenshot-narrow.png"));
  console.log("✅ Screenshots generados");
}

generate().catch(console.error);
