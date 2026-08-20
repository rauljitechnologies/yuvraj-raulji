# Photographs of Yuvraj

The homepage is designed around real photographs. **None are generated, and no
stock person is ever substituted for Yuvraj.** A slot with no file is not
rendered at all: the section falls back to a typographic layout that is finished
in its own right, so the page is complete today and gets better as files arrive.

Drop a file in with the matching slot name and the photographic layout switches
on at the next build. No code change is needed.

## Slots

| Slot filename | Where it appears | Status |
| --- | --- | --- |
| `hero-portrait.*` | Hero, right-hand plate | Falls back to `/assets/yuvraj-raulji.jpg` |
| `research.*` | What I'm working on — Learning | Missing |
| `desk.*` | What I'm working on — Exploring | Missing |
| `whiteboard.*` | What I'm working on — Building | Missing |
| `portrait-close.*` | What I'm working on — Thinking about | Missing |
| `walking.*` | Reserved | Missing |
| `recording.*` | Reserved | Missing |
| `team.*` | Reserved | Missing |
| `reading.*` | Reserved | Missing |
| `dashboards.*` | Reserved | Missing |

The four "reserved" slots are wired into `lib/founder-photos.ts` and have alt
text written for them, but no section requests them yet. They are there so a
section can be given photography without touching the resolver.

## File format

Extensions are tried in this order and the first hit wins: `.webp`, `.jpg`,
`.jpeg`, `.png`. **Ship WebP.** Intrinsic dimensions are read out of the file
header at build time and written onto the `<img>`, so nothing shifts as images
load; a file in a format the reader does not recognise is skipped rather than
rendered without dimensions.

## What the shots need

Shot direction, in the order they matter:

1. **`hero-portrait`** — the one that matters most. Head and shoulders, room
   above the head, shot against a dark or neutral background so it sits in a
   near-black page. **Square, at least 1200×1200.** The file currently standing
   in is 400×400, which is under 1× on a retina display at the size it renders;
   it is a real photograph and it is doing the job, but it is the single biggest
   image quality win available on this page.
2. **`portrait-close`** — tighter than the hero. Eyes sharp.
3. **`desk`, `research`, `whiteboard`** — working shots, 3:2 landscape, at least
   1600px wide. Not posed at the camera: doing the thing.
4. The rest, as and when a section calls for them.

Across all of them: even light on the face, no strong colour cast, and nothing
brightly coloured in frame that will fight the red accent. Case-study covers on
this page are rendered monochrome and resolve to colour on hover; the
photographs of Yuvraj are not desaturated, so they carry their own colour.

## Alt text

Alt text is written per slot in `lib/founder-photos.ts`, not generated. If a
photograph shows something different from what its slot describes, change the
string there rather than leaving a description that does not match the image.
