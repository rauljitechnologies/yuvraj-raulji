import fs from 'fs';
import path from 'path';

/**
 * Build-time photography resolver.
 *
 * The homepage is designed around real photographs of Yuvraj. None of them are
 * generated, and no stock person is ever substituted: a slot with no file is
 * simply not rendered, and the section falls back to a typographic layout that
 * is finished in its own right. Drop a file into public/assets/founder/ with
 * the matching slot name and the photographic layout switches on at the next
 * build, with no code change.
 *
 * This module touches the filesystem, so it may only be imported from a server
 * component. Every consumer resolves its photos at the top of the section and
 * passes plain data down.
 */

export type PhotoSlot =
  | 'hero-portrait'
  | 'desk'
  | 'walking'
  | 'research'
  | 'whiteboard'
  | 'recording'
  | 'team'
  | 'portrait-close'
  | 'reading'
  | 'dashboards';

export interface FounderPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Alt text is written per slot rather than generated, because "photo of Yuvraj
 * Raulji" ten times over is worse than useless to a screen reader.
 */
const SLOT_ALT: Record<PhotoSlot, string> = {
  'hero-portrait': 'Yuvraj Raulji',
  desk: 'Yuvraj Raulji working at his desk',
  walking: 'Yuvraj Raulji walking outdoors',
  research: 'Yuvraj Raulji reading technical research on screen',
  whiteboard: 'Yuvraj Raulji mapping a system on a whiteboard',
  recording: 'Yuvraj Raulji recording video content',
  team: 'Yuvraj Raulji in discussion with his team',
  'portrait-close': 'Close portrait of Yuvraj Raulji',
  reading: 'Yuvraj Raulji reading',
  dashboards: 'Yuvraj Raulji reviewing analytics dashboards',
};

/** Preference order. WebP first so the smallest available file wins. */
const EXTENSIONS = ['webp', 'jpg', 'jpeg', 'png'] as const;

const DIR = path.join(process.cwd(), 'public', 'assets', 'founder');

/**
 * The one photograph the repository already ships. It is a real 400×400
 * portrait, so the hero has a genuine face from day one; a larger frame-filling
 * shot dropped in as hero-portrait.* takes precedence.
 */
const SHIPPED_PORTRAIT: FounderPhoto = {
  src: '/assets/yuvraj-raulji.jpg',
  alt: SLOT_ALT['hero-portrait'],
  width: 400,
  height: 400,
};

/**
 * Reads the intrinsic pixel size out of the file header so width/height can be
 * put on the <img> and the layout never shifts. Only the four formats above are
 * handled; anything unrecognised returns null and the slot is skipped rather
 * than rendered without dimensions.
 */
function readSize(file: string): { width: number; height: number } | null {
  let fd: number | undefined;
  try {
    fd = fs.openSync(file, 'r');
    const buf = Buffer.alloc(64 * 1024);
    const read = fs.readSync(fd, buf, 0, buf.length, 0);
    const b = buf.subarray(0, read);

    // PNG: IHDR width/height are big-endian at fixed offsets.
    if (b.length > 24 && b.toString('hex', 0, 8) === '89504e470d0a1a0a') {
      return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
    }

    // WebP: RIFF container, three sub-formats each storing the size differently.
    if (b.length > 30 && b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
      const fmt = b.toString('ascii', 12, 16);
      if (fmt === 'VP8 ') {
        return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
      }
      if (fmt === 'VP8L') {
        const bits = b.readUInt32LE(21);
        return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
      }
      if (fmt === 'VP8X') {
        const w = 1 + (b[24] | (b[25] << 8) | (b[26] << 16));
        const h = 1 + (b[27] | (b[28] << 8) | (b[29] << 16));
        return { width: w, height: h };
      }
      return null;
    }

    // JPEG: walk the marker chain to the first SOF segment.
    if (b.length > 4 && b[0] === 0xff && b[1] === 0xd8) {
      let i = 2;
      while (i + 9 < b.length) {
        if (b[i] !== 0xff) {
          i++;
          continue;
        }
        const marker = b[i + 1];
        // Standalone markers carry no length field.
        if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
          i += 2;
          continue;
        }
        const len = b.readUInt16BE(i + 2);
        // SOF0-SOF15, excluding the DHT/JPG/DAC markers interleaved in that range.
        if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
          return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
        }
        i += 2 + len;
      }
    }
    return null;
  } catch {
    return null;
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
  }
}

export function getPhoto(slot: PhotoSlot): FounderPhoto | null {
  for (const ext of EXTENSIONS) {
    const file = path.join(DIR, `${slot}.${ext}`);
    if (!fs.existsSync(file)) continue;
    const size = readSize(file);
    if (!size) continue;
    return { src: `/assets/founder/${slot}.${ext}`, alt: SLOT_ALT[slot], ...size };
  }
  return slot === 'hero-portrait' ? SHIPPED_PORTRAIT : null;
}

/** Resolves several slots at once. Missing ones come back as null. */
export function getPhotos<T extends PhotoSlot>(
  slots: readonly T[],
): Record<T, FounderPhoto | null> {
  return Object.fromEntries(slots.map((s) => [s, getPhoto(s)])) as Record<
    T,
    FounderPhoto | null
  >;
}
