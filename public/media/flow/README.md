# Google Flow assets — Kobi mascot

The site is code-drawn (Graphite Signal theme: aurora backdrop, generated
project covers), so the only Google Flow assets are Kobi, the chatbot mascot.

| File | Aspect | Used for |
|---|---|---|
| `mascot-kobi.webp` | 1:1 | Chat launcher, chat header, message avatar |
| `mascot-kobi-full.webp` | 4:5 | Chat welcome card, Kobi project cover |

Both files are **WebP with a transparent background** (≤ 720px, < 100 KB), so
they sit on any surface. If you regenerate them in
[Google Flow](https://labs.google/flow), use the prompts in
`src/config/flowMedia.ts`, then remove the flat background before exporting.
Missing files fall back to an inline SVG quokka.
