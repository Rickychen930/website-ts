# Google Flow asset list — IT edition (all video)

> **Current files are code-rendered motion graphics** (generative canvas
> scenes, 8 s seamless loops, rendered to H.264). They're ready to ship. To
> upgrade any slot to photoreal footage, generate it in Google Flow with the
> prompt below and overwrite the MP4 with the same name — then regenerate its
> first-frame poster `<id>.jpg`.

Every visual on the site is a living 8-second loop. Generate each clip in
[Google Flow](https://labs.google/flow) (Veo, **8 s**, **1080p**) with the prompt
below and save the MP4 here with the **exact file name**. Until a file exists,
the site shows a circuit-trace placeholder — nothing breaks.

- Upload just `<id>.mp4` — the poster `<id>.jpg` (first frame) and compression
  (H.264, no audio, ≤ 4 MB hero / ≤ 2 MB cards) are done for you afterwards
- Aspect: **16:9** for wide plates, **9:16** for portrait cards (cropped to fit)
- Tip: if a loop "jumps", generate with Flow's *Extend* or pick the take whose
  last frame is closest to the first

Source of truth: `src/config/flowMedia.ts` (edit prompts/captions there).

| # | File(s) | Type | Aspect | Used for |
|---|---|---|---|---|
| 1 | `hero-silicon-dawn.mp4` + `hero-silicon-dawn.jpg` | Video 8 s | 16:9 | Silicon at dawn — Hero background (Home, first screen) |
| 2 | `server-hall.mp4` + `server-hall.jpg` | Video 8 s | 16:9 | The server hall — Hero deep layer — rises on scroll (“What I do”) |
| 3 | `sydney-online-night.mp4` + `sydney-online-night.jpg` | Video 8 s | 16:9 | Sydney, online — Contact section background |
| 4 | `datacentre-campus.mp4` + `datacentre-campus.jpg` | Video 8 s | 16:9 | Data centre campus — Projects page header |
| 5 | `fibre-optics.mp4` + `fibre-optics.jpg` | Video 8 s | 16:9 | Fibre optics — About — wide plate; project plate |
| 6 | `neural-network.mp4` + `neural-network.jpg` | Video 8 s | 16:9 | Neural network — Skills section media |
| 7 | `signal-lost.mp4` + `signal-lost.jpg` | Video 8 s | 16:9 | Signal lost — 404 page; project plate |
| 8 | `dev-desk-night.mp4` + `dev-desk-night.jpg` | Video 8 s | 9:16 | The workstation — Project plate |
| 9 | `circuit-macro.mp4` + `circuit-macro.jpg` | Video 8 s | 16:9 | Printed circuit — Project plate |
| 10 | `server-rack.mp4` + `server-rack.jpg` | Video 8 s | 9:16 | The rack — Project plate |
| 11 | `mobile-prototype.mp4` + `mobile-prototype.jpg` | Video 8 s | 9:16 | Prototype — Project plate |
| 12 | `ai-chip.mp4` + `ai-chip.jpg` | Video 8 s | 9:16 | AI accelerator — Project plate |
| 13 | `holo-interface.mp4` + `holo-interface.jpg` | Video 8 s | 16:9 | Live dashboard — Project plate |
| 14 | `atlas-cpu.mp4` + `atlas-cpu.jpg` | Video 8 s | 9:16 | CPU — Hardware atlas card |
| 15 | `atlas-gpu.mp4` + `atlas-gpu.jpg` | Video 8 s | 9:16 | GPU — Hardware atlas card |
| 16 | `atlas-ram.mp4` + `atlas-ram.jpg` | Video 8 s | 9:16 | Memory — Hardware atlas card |
| 17 | `atlas-ssd.mp4` + `atlas-ssd.jpg` | Video 8 s | 9:16 | Storage — Hardware atlas card |
| 18 | `atlas-network-switch.mp4` + `atlas-network-switch.jpg` | Video 8 s | 9:16 | Network switch — Hardware atlas card |
| 19 | `atlas-single-board.mp4` + `atlas-single-board.jpg` | Video 8 s | 9:16 | Single-board computer — Hardware atlas card |
| 20 | `atlas-keyboard.mp4` + `atlas-keyboard.jpg` | Video 8 s | 9:16 | Mechanical keyboard — Hardware atlas card |
| 21 | `atlas-fibre.mp4` + `atlas-fibre.jpg` | Video 8 s | 9:16 | Fibre link — Hardware atlas card |
| 22 | `atlas-microcontroller.mp4` + `atlas-microcontroller.jpg` | Video 8 s | 9:16 | Microcontroller — Hardware atlas card |
| 23 | `atlas-smartphone.mp4` + `atlas-smartphone.jpg` | Video 8 s | 9:16 | Smartphone — Hardware atlas card |

## Infrastructure

### The server hall — `server-hall` (video 8 s, 16:9)

```text
Steady dolly forward down an endless hyperscale data-centre aisle; the server racks on both sides blink with cascading blue and cyan LEDs that ripple in waves toward the camera, cold mist rolls along the floor, mirror-polished floor reflections, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

### Data centre campus — `datacentre-campus` (video 8 s, 16:9)

```text
Slow aerial orbit over a futuristic data-centre campus at blue hour; cooling vents on the roofs glow cyan and pulse, car light trails flow along the access roads, clouds drift quickly across the sky in gentle timelapse, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

### Signal lost — `signal-lost` (video 8 s, 16:9)

```text
Locked-off shot of a dark server corridor after hours; all racks are dim except one at the far end whose cyan light flickers like a weak signal, dust drifts through the beam, faint glitch shimmer on the floor reflections, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

### The rack — `server-rack` (video 8 s, 9:16)

```text
Slow vertical tilt up a single server rack; rows of status LEDs blink in rhythmic patterns, a cooling fan spins behind a mesh panel, patch cables glow faintly cyan, dark room, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

### Network switch — `atlas-network-switch` (video 8 s, 9:16)

```text
Slow pan along a network switch full of patch cables; green and amber port lights blink in busy rhythms, one cable glows as a burst of light travels through it, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

## Hardware

### Silicon at dawn — `hero-silicon-dawn` (video 8 s, 16:9)

```text
Low drone-style flight skimming across a vast motherboard landscape at sunrise; chips and capacitors rise like skyscrapers, copper traces pulse with flowing cyan light like rivers of data, morning haze drifts between the components, the sun crests the horizon behind a CPU tower with a soft lens flare, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

### Printed circuit — `circuit-macro` (video 8 s, 16:9)

```text
Macro slider move across a printed circuit board; electricity visualised as tiny cyan sparks racing along gold traces into a processor chip that glows brighter as the data arrives, shallow depth of field, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

### CPU — `atlas-cpu` (video 8 s, 9:16)

```text
Slow orbit around a desktop CPU standing on its edge on a dark reflective surface; a sweep of cyan light glides across the metal heat spreader and sparkles on the gold contacts, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

### GPU — `atlas-gpu` (video 8 s, 9:16)

```text
Three-quarter orbit around a modern graphics card; its fans spin up, cyan edge lighting pulses, heat shimmer rises from the heatsink fins, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

### Memory — `atlas-ram` (video 8 s, 9:16)

```text
Slow push-in on a stick of DDR5 memory standing upright; light pulses race across the memory chips like data being written, soft cyan underglow, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

### Storage — `atlas-ssd` (video 8 s, 9:16)

```text
Macro slider across an M.2 NVMe solid-state drive; tiny streams of light flow from the connector into the flash chips, cool blue light, shallow depth of field, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

### Single-board computer — `atlas-single-board` (video 8 s, 9:16)

```text
Slow orbit around a small single-board computer; its status LED blinks, jumper wires lead off frame carrying faint pulses of light, cyan rim light, dark background, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

### Mechanical keyboard — `atlas-keyboard` (video 8 s, 9:16)

```text
Low macro dolly across a mechanical keyboard as keys press themselves in a typing rhythm; the backlight ripples outward from each keypress in cyan waves, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

### Microcontroller — `atlas-microcontroller` (video 8 s, 9:16)

```text
Slow push-in on a microcontroller board on a breadboard wired to a tiny camera module and an LED; the LED blinks and a data pulse travels along the jumper wires, maker workbench, cyan accent light, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

### Smartphone — `atlas-smartphone` (video 8 s, 9:16)

```text
A smartphone slowly separates into an exploded view of floating layers — screen, logic board, battery, camera — rotates gently, then drifts back together, clean studio light on a dark background, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

## Signal & AI

### Fibre optics — `fibre-optics` (video 8 s, 16:9)

```text
Macro dolly along a dense bundle of fibre-optic strands; pulses of cyan, blue and violet light race through the fibres and burst at the tips like stars, bokeh drifting in the background, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

### Neural network — `neural-network` (video 8 s, 16:9)

```text
Camera glides through a vast three-dimensional neural network of glowing nodes; signals fire as bright pulses travelling along filaments of light, clusters light up in waves, deep navy void with fine floating particles, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

### AI accelerator — `ai-chip` (video 8 s, 9:16)

```text
Slow orbit around a futuristic AI accelerator chip on a circuit board; waves of cyan and violet light pulse outward from the core along the traces like a heartbeat, tiny particles of light float upward, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

### Live dashboard — `holo-interface` (video 8 s, 16:9)

```text
Camera drifts through translucent holographic dashboard panels floating in a dark room; charts draw themselves, node graphs connect and metrics tick upward (no readable text), cyan and blue glow with violet highlights, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

### Fibre link — `atlas-fibre` (video 8 s, 9:16)

```text
Vertical macro of fibre-optic strands falling like a waterfall of light; pulses of cyan and violet travel downward and sparkle at the tips, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

## City & workspace

### Sydney, online — `sydney-online-night` (video 8 s, 16:9)

```text
Slow aerial push-in toward the Sydney Harbour skyline at night; glowing threads of cyan and violet data arc between the towers and stream across the water like light trails, ferries leave luminous wakes, city lights twinkle, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

### The workstation — `dev-desk-night` (video 8 s, 9:16)

```text
Slow push-in on a developer's desk at night; the monitor scrolls abstract colourful code shapes (no readable text), mechanical keyboard keys glow softly, steam rises from a coffee mug, rain streaks the window with city-light bokeh, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
```

### Prototype — `mobile-prototype` (video 8 s, 9:16)

```text
Slow top-down rotation over two smartphones on a dark desk; their screens animate between colourful abstract app layouts (no readable text), paper wireframe sketches beside them, a stylus rolls gently, cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio.
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
