// Generates the placeholder app icons. Pure Node stdlib — no ImageMagick, no PIL.
// Replace assets/*.png with your own brand art (1024x1024).
//
//   node tools/make-icons.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateSync } from 'node:zlib';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets');

const CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i += 1) c = CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(tag, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(tag, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}

function encodePng(size, rows) {
  const raw = Buffer.alloc(size * (size * 4 + 1));
  let o = 0;
  for (let y = 0; y < size; y += 1) {
    raw[o] = 0; // filter: none
    o += 1;
    rows[y].copy(raw, o);
    o += size * 4;
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const mix = (a, b, t) => Math.round(a + (b - a) * t);

/** Dark deck + radial glow + anti-aliased neon ring + soft core dot. */
function draw(size, opts) {
  const { bg, ring, core, ringRadius, ringWidth, coreRadius, glow } = opts;
  const c = (size - 1) / 2;
  const rows = [];
  for (let y = 0; y < size; y += 1) {
    const row = Buffer.alloc(size * 4);
    for (let x = 0; x < size; x += 1) {
      const d = Math.hypot(x - c, y - c);
      let [r, g, b, a] = bg;
      const gl = Math.max(0, 1 - d / (size * glow));
      r = mix(r, ring[0], gl * 0.16);
      g = mix(g, ring[1], gl * 0.16);
      b = mix(b, ring[2], gl * 0.16);
      const band = Math.abs(d - size * ringRadius);
      if (band <= size * ringWidth) {
        const t = 1 - band / (size * ringWidth);
        r = mix(r, ring[0], t);
        g = mix(g, ring[1], t);
        b = mix(b, ring[2], t);
        a = Math.max(a, Math.round(255 * t));
      }
      if (d <= size * coreRadius) {
        const t = Math.min(1, (size * coreRadius - d) / (size * coreRadius * 0.3) + 0.55);
        r = mix(r, core[0], t);
        g = mix(g, core[1], t);
        b = mix(b, core[2], t);
        a = 255;
      }
      const i = x * 4;
      row[i] = r;
      row[i + 1] = g;
      row[i + 2] = b;
      row[i + 3] = a;
    }
    rows.push(row);
  }
  return encodePng(size, rows);
}

const BG = [10, 12, 20, 255];
const RING = [124, 92, 255, 255];
const CORE = [56, 225, 255, 255];

mkdirSync(OUT, { recursive: true });
writeFileSync(
  join(OUT, 'icon.png'),
  draw(1024, { bg: BG, ring: RING, core: CORE, ringRadius: 0.3, ringWidth: 0.035, coreRadius: 0.11, glow: 0.52 }),
);
writeFileSync(
  // Transparent background, drawn inside the Android adaptive-icon safe zone.
  join(OUT, 'adaptive-icon.png'),
  draw(1024, { bg: [0, 0, 0, 0], ring: RING, core: CORE, ringRadius: 0.24, ringWidth: 0.028, coreRadius: 0.085, glow: 0.5 }),
);
writeFileSync(
  join(OUT, 'splash-icon.png'),
  draw(1024, { bg: BG, ring: RING, core: CORE, ringRadius: 0.2, ringWidth: 0.024, coreRadius: 0.075, glow: 0.6 }),
);

console.log('Wrote assets/icon.png, assets/adaptive-icon.png, assets/splash-icon.png');
