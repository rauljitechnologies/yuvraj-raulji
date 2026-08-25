#!/usr/bin/env python3
"""
Turn a white-backdrop studio portrait into a dark photo panel.

    python3 scripts/portrait-panel.py public/assets/home/yr-about.jpg \
        public/assets/home/yr-hero.webp 1200

Why this exists. Both source portraits are shot on pure white, and every slot
that uses them sits on the near-black ground or the accent band. Dropped in
raw, the backdrop renders as a lit rectangle punched into the page. Made
transparent instead, the hero plate's red block (offset down-right behind the
photo) floods the whole panel. So the backdrop is cut off and replaced with a
dark sweep of its own.

The shirt is the difficulty. A luminance threshold deletes it along with the
backdrop. Measured on these files the backdrop is 254-255 with zero channel
spread while the shirt sits at 101-153 with spread up to 61, so the seed test
is strict and the region is found by a flood fill from the image border: the
shirt is enclosed by the dark suit, so the fill never reaches it.
"""
import sys
from collections import deque

import numpy as np
from PIL import Image, ImageFilter

src, dst, max_w = sys.argv[1], sys.argv[2], int(sys.argv[3])

im = Image.open(src).convert('RGB')
if im.width > max_w:
    im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
a = np.asarray(im).astype(np.int16)
h, w = a.shape[:2]
mn = a.min(axis=2)
spread = a.max(axis=2) - mn

core = (mn >= 246) & (spread <= 6)    # unmistakably backdrop
rim = (mn >= 214) & (spread <= 22)    # only reachable by growing outward

bg = np.zeros((h, w), bool)
q = deque()
for x in range(w):
    for y in (0, h - 1):
        if core[y, x] and not bg[y, x]:
            bg[y, x] = True
            q.append((y, x))
for y in range(h):
    for x in (0, w - 1):
        if core[y, x] and not bg[y, x]:
            bg[y, x] = True
            q.append((y, x))
while q:
    y, x = q.popleft()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        ny, nx = y + dy, x + dx
        if 0 <= ny < h and 0 <= nx < w and core[ny, nx] and not bg[ny, nx]:
            bg[ny, nx] = True
            q.append((ny, nx))

# Three pixels into the soft rim, so the feather has something to work on.
for _ in range(3):
    nb = np.zeros_like(bg)
    nb[1:, :] |= bg[:-1, :]
    nb[:-1, :] |= bg[1:, :]
    nb[:, 1:] |= bg[:, :-1]
    nb[:, :-1] |= bg[:, 1:]
    bg |= nb & rim

alpha = np.full((h, w), 255, np.uint8)
alpha[bg] = (np.clip((246.0 - mn[bg].astype(np.float32)) / 32.0, 0, 1) * 255).astype(np.uint8)
am = np.asarray(Image.fromarray(alpha, 'L').filter(ImageFilter.GaussianBlur(0.7))).astype(np.float32) / 255.0

# No bright fringe: darken colour where a pixel is on its way to transparent.
arr = np.asarray(im).astype(np.float32)
edge = (am > 0.02) & (am < 0.98)
arr[edge] *= 0.72

# The replacement backdrop: a vertical sweep plus a soft vignette, so the black
# suit does not merge into the panel edges.
yy = np.linspace(0, 1, h, dtype=np.float32)[:, None, None]
sweep = np.array([30, 32, 36], np.float32) * (1 - yy) + np.array([10, 11, 13], np.float32) * yy
gx = np.linspace(-1, 1, w, dtype=np.float32)[None, :, None]
gy = np.linspace(-1, 1, h, dtype=np.float32)[:, None, None]
backdrop = sweep * np.clip(1.0 - 0.45 * (gx ** 2 + 0.6 * gy ** 2), 0.55, 1.0)

al = am[..., None]
out = arr * al + backdrop * (1 - al)
Image.fromarray(out.clip(0, 255).astype(np.uint8), 'RGB').save(dst, 'WEBP', quality=86, method=6)
print(f'{dst}  {w}x{h}  subject {100 * (am > 0.5).mean():.1f}% of frame')
