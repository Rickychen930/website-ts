# Google Flow asset list — IT edition

Every visual on the site is loaded from this folder. Generate each asset in
[Google Flow](https://labs.google/flow) with the prompt below, then save it here
with the **exact file name**. Until a file exists, the site shows a circuit-trace
placeholder in its place — nothing breaks.

- **Images** → `<id>.jpg` (≈2400px on the long edge, compressed to < 500 KB)
- **Videos** → `<id>.mp4` (H.264, 1080p, **8 s** seamless loop, **no audio**, < 6 MB) **plus** a poster `<id>.jpg` (first frame)
- Aspect: **16:9** landscape, **4:5** portrait, **9:16** vertical

Source of truth: `src/config/flowMedia.ts` (edit prompts/captions there).

| # | File(s) | Type | Aspect | Used for |
|---|---|---|---|---|
| 1 | `hero-silicon-dawn.mp4` + `hero-silicon-dawn.jpg` | Video 8 s | 16:9 | Silicon at dawn — Hero background (Home, first screen) |
| 2 | `server-hall.mp4` + `server-hall.jpg` | Video 8 s | 16:9 | The server hall — Hero deep layer — rises on scroll (“What I do”) |
| 3 | `sydney-online-night.mp4` + `sydney-online-night.jpg` | Video 8 s | 16:9 | Sydney, online — Contact section background |
| 4 | `datacentre-campus.mp4` + `datacentre-campus.jpg` | Video 8 s | 16:9 | Data centre campus — Projects page header |
| 5 | `fibre-optics.jpg` | Image | 16:9 | Fibre optics — About — wide plate; project plate |
| 6 | `neural-network.mp4` + `neural-network.jpg` | Video 8 s | 16:9 | Neural network — Skills section media |
| 7 | `signal-lost.jpg` | Image | 16:9 | Signal lost — 404 page; project plate |
| 8 | `dev-desk-night.jpg` | Image | 4:5 | The workstation — Project plate |
| 9 | `circuit-macro.jpg` | Image | 16:9 | Printed circuit — Project plate |
| 10 | `server-rack.jpg` | Image | 4:5 | The rack — Project plate |
| 11 | `mobile-prototype.jpg` | Image | 4:5 | Prototype — Project plate |
| 12 | `ai-chip.jpg` | Image | 4:5 | AI accelerator — Project plate |
| 13 | `holo-interface.jpg` | Image | 16:9 | Live dashboard — Project plate |
| 14 | `atlas-cpu.jpg` | Image | 4:5 | CPU — Hardware atlas card |
| 15 | `atlas-gpu.jpg` | Image | 4:5 | GPU — Hardware atlas card |
| 16 | `atlas-ram.jpg` | Image | 4:5 | Memory — Hardware atlas card |
| 17 | `atlas-ssd.jpg` | Image | 4:5 | Storage — Hardware atlas card |
| 18 | `atlas-network-switch.jpg` | Image | 4:5 | Network switch — Hardware atlas card |
| 19 | `atlas-single-board.jpg` | Image | 4:5 | Single-board computer — Hardware atlas card |
| 20 | `atlas-keyboard.jpg` | Image | 4:5 | Mechanical keyboard — Hardware atlas card |
| 21 | `atlas-fibre.mp4` + `atlas-fibre.jpg` | Video 8 s | 9:16 | Fibre link — Hardware atlas card |
| 22 | `atlas-microcontroller.jpg` | Image | 4:5 | Microcontroller — Hardware atlas card |
| 23 | `atlas-smartphone.jpg` | Image | 4:5 | Smartphone — Hardware atlas card |

## Infrastructure

### The server hall — `server-hall` (video 8 s, 16:9)

```text
Slow dolly forward down a long hyperscale data-centre aisle, rows of black server racks with blinking blue and cyan LEDs, cold mist near the floor, reflective polished floor, symmetrical composition, seamless loop, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

### Data centre campus — `datacentre-campus` (video 8 s, 16:9)

```text
Slow aerial orbit over a modern data-centre campus at dusk, long rectangular buildings with glowing cyan roof vents and cooling units, roads with light trails, deep blue twilight sky, seamless loop, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

### Signal lost — `signal-lost` (image, 16:9)

```text
Empty dark server-room corridor after hours, all racks dimmed except one rack light at the far end glowing cyan, faint haze, long perspective, moody and quiet, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

### The rack — `server-rack` (image, 4:5)

```text
Front close-up of a single server rack, rows of servers with blinking blue and green status LEDs, neatly bundled patch cables, slight low angle, dark room, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

### Network switch — `atlas-network-switch` (image, 4:5)

```text
Network switch front panel with many patch cables plugged in, green and amber port lights blinking, shallow depth of field, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

## Hardware

### Silicon at dawn — `hero-silicon-dawn` (video 8 s, 16:9)

```text
Slow cinematic drone-style glide low across a vast motherboard landscape at dawn, chips and capacitors rising like city towers, copper traces glowing like rivers of cyan light, volumetric haze, warm sunrise on the horizon, seamless loop, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

### Printed circuit — `circuit-macro` (image, 16:9)

```text
Extreme macro of a printed circuit board, a processor chip in focus, gold traces and tiny components receding into shallow depth of field, cyan rim light, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

### CPU — `atlas-cpu` (image, 4:5)

```text
Macro of a desktop CPU lying on a dark surface, the metal heat spreader catching cyan light, gold contact pads visible at the edge, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

### GPU — `atlas-gpu` (image, 4:5)

```text
A modern graphics card with twin fans photographed three-quarter view, subtle cyan RGB edge light, dark background, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

### Memory — `atlas-ram` (image, 4:5)

```text
A stick of DDR5 RAM standing upright, memory chips in sharp focus, soft cyan underglow, dark background, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

### Storage — `atlas-ssd` (image, 4:5)

```text
An M.2 NVMe solid-state drive on a dark surface, chips and connector in sharp macro focus, cool blue light, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

### Single-board computer — `atlas-single-board` (image, 4:5)

```text
A small single-board computer with GPIO pins and a few jumper wires attached, top-down three-quarter view, cyan rim light, dark background, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

### Mechanical keyboard — `atlas-keyboard` (image, 4:5)

```text
Close-up of a mechanical keyboard, a few keycaps removed to show the switches, soft cyan backlight, dark moody desk, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

### Microcontroller — `atlas-microcontroller` (image, 4:5)

```text
A microcontroller board on a breadboard wired to a small camera module and an LED, colourful jumper wires, maker workbench, cyan accent light, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

### Smartphone — `atlas-smartphone` (image, 4:5)

```text
Exploded view of a smartphone's components floating in layers — screen, logic board, battery, camera — on a dark background, clean studio light, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

## Signal & AI

### Fibre optics — `fibre-optics` (image, 16:9)

```text
Macro photograph of a bundle of fibre-optic cables, the cut ends glowing with pinpoints of cyan, blue and violet light, the strands curving away into soft bokeh, dark background, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

### Neural network — `neural-network` (video 8 s, 16:9)

```text
Abstract three-dimensional neural network of glowing nodes connected by thin filaments of light, pulses of cyan and violet travelling along the connections, slow camera drift through the network, deep navy space, seamless loop, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

### AI accelerator — `ai-chip` (image, 4:5)

```text
A futuristic AI accelerator chip on a circuit board, light pulses radiating outward along the traces in cyan and violet, top-down three-quarter view, dark background, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

### Live dashboard — `holo-interface` (image, 16:9)

```text
Translucent holographic dashboard panels floating in a dark room, abstract charts, graphs and node diagrams (no readable text), cyan and blue glow with violet accents, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

### Fibre link — `atlas-fibre` (video 8 s, 9:16)

```text
Vertical macro of fibre-optic strands with pulses of cyan and violet light travelling along them, dark background, seamless loop, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

## City & workspace

### Sydney, online — `sydney-online-night` (video 8 s, 16:9)

```text
Wide night view of the Sydney Harbour skyline from the water, the city lit in blue and cyan, thin streams of glowing data-like light trails arcing between buildings and over the harbour, calm reflections, slow push-in, seamless loop, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

### The workstation — `dev-desk-night` (image, 4:5)

```text
Developer workstation at night, ultrawide monitor and laptop glowing with abstract colourful code shapes (no readable text), mechanical keyboard, desk lamp, city lights through the window, cyan and warm amber lighting, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

### Prototype — `mobile-prototype` (image, 4:5)

```text
Two modern smartphones lying on a dark desk showing colourful abstract app interfaces (no readable text), paper wireframe sketches and a stylus beside them, soft top light, cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark.
```

## Chatbot mascot — Kobi the quokka (already uploaded)

Keep the existing files; regenerate only if you want a new look.

### mascot-kobi (image, 1:1)

```text
Head-and-shoulders portrait of a friendly cartoon quokka mascot named Kobi, round fluffy sandy-brown fur, big warm smile, small round ears, dark curious eyes, wearing a tiny turquoise bandana with a golden wattle flower pin, soft 3D Pixar-style character render, gentle rim light, facing camera and smiling, centred with space around the head so it crops cleanly into a circle, flat deep navy (#0b2545) background, no text, no watermark.
```

### mascot-kobi-full (image, 4:5)

```text
Full-body shot of a friendly cartoon quokka mascot named Kobi, round fluffy sandy-brown fur, big warm smile, small round ears, dark curious eyes, wearing a tiny turquoise bandana with a golden wattle flower pin, soft 3D Pixar-style character render, gentle rim light, sitting on a smooth sandstone rock and waving hello with one paw, flat deep navy (#0b2545) background, whole character in frame with generous margins, no text, no watermark.
```
