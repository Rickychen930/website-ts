# Google Flow asset list

Every visual on the site is loaded from this folder. Generate each asset in
[Google Flow](https://labs.google/flow) with the prompt below, then save it here
with the **exact file name**. Until a file exists, the site shows a themed
contour placeholder in its place — nothing breaks.

- **Images** → `<id>.jpg` (≈2400px on the long edge, compressed to < 500 KB)
- **Videos** → `<id>.mp4` (H.264, 1080p, 6–10 s seamless loop, **no audio**, < 6 MB) **plus** a poster `<id>.jpg` (first frame)

Source of truth: `src/config/flowMedia.ts` (edit prompts/captions there).

| # | File(s) | Aspect | Used for |
|---|---|---|---|
| 1 | `hero-uluru-dawn.mp4` + `hero-uluru-dawn.jpg` | 16:9 | Uluru — Uluṟu-Kata Tjuṯa National Park, NT |
| 2 | `sydney-opera-house.jpg` | 4:5 | Sydney Opera House — Bennelong Point, Sydney NSW |
| 3 | `sydney-harbour-night.mp4` + `sydney-harbour-night.jpg` | 16:9 | Sydney Harbour — Port Jackson, NSW |
| 4 | `twelve-apostles.jpg` | 16:9 | The Twelve Apostles — Great Ocean Road, VIC |
| 5 | `great-barrier-reef.jpg` | 4:5 | Great Barrier Reef — Coral Sea, QLD |
| 6 | `blue-mountains.jpg` | 16:9 | The Three Sisters — Blue Mountains, NSW |
| 7 | `bondi-icebergs.jpg` | 4:5 | Bondi Icebergs — Bondi Beach, NSW |
| 8 | `kings-canyon.jpg` | 4:5 | Kings Canyon — Watarrka National Park, NT |
| 9 | `daintree-rainforest.mp4` + `daintree-rainforest.jpg` | 16:9 | Daintree Rainforest — Far North Queensland |
| 10 | `outback-road.jpg` | 16:9 | The Outback — Stuart Highway, NT |
| 11 | `kakadu-wetlands.mp4` + `kakadu-wetlands.jpg` | 16:9 | Kakadu — Kakadu National Park, NT |
| 12 | `kata-tjuta-dusk.mp4` + `kata-tjuta-dusk.jpg` | 16:9 | Kata Tjuṯa — Uluṟu-Kata Tjuṯa National Park, NT |
| 13 | `fauna-kangaroo.jpg` | 4:5 | Red Kangaroo — Osphranter rufus |
| 14 | `fauna-koala.jpg` | 4:5 | Koala — Phascolarctos cinereus |
| 15 | `fauna-cockatoo.jpg` | 4:5 | Sulphur-crested Cockatoo — Cacatua galerita |
| 16 | `fauna-platypus.mp4` + `fauna-platypus.jpg` | 9:16 | Platypus — Ornithorhynchus anatinus |
| 17 | `fauna-kookaburra.jpg` | 4:5 | Laughing Kookaburra — Dacelo novaeguineae |
| 18 | `fauna-quokka.jpg` | 4:5 | Quokka — Setonix brachyurus |
| 19 | `flora-waratah.jpg` | 4:5 | Waratah — Telopea speciosissima |
| 20 | `flora-banksia.jpg` | 4:5 | Banksia — Banksia serrata |
| 21 | `flora-golden-wattle.jpg` | 4:5 | Golden Wattle — Acacia pycnantha |
| 22 | `flora-kangaroo-paw.jpg` | 4:5 | Kangaroo Paw — Anigozanthos manglesii |
| 23 | `flora-ghost-gum.jpg` | 16:9 | Ghost Gum — Corymbia aparrerinja |

## Landmarks & places

### Uluru — `hero-uluru-dawn` (video, 16:9)

```text
Slow cinematic dolly shot of Uluru at dawn, first sunlight turning the monolith deep ochre, spinifex grass in the foreground swaying gently, pale desert sky, heat haze, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark. 8 seconds, seamless loop, locked horizon.
```

### Sydney Opera House — `sydney-opera-house` (image, 4:5)

```text
Close architectural study of the Sydney Opera House sails at blue hour, chevron tile texture visible, calm harbour water, soft reflections, minimalist composition, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark.
```

### The Three Sisters — `blue-mountains` (image, 16:9)

```text
The Three Sisters sandstone formation in the Blue Mountains, valley filled with blue eucalyptus haze, morning light, layered ridgelines receding, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark.
```

### Kings Canyon — `kings-canyon` (image, 4:5)

```text
Sheer red sandstone walls of Kings Canyon, stratified rock like brutalist concrete, a lone ghost gum clinging to the rim, deep shadow and hard sun, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark.
```

### The Outback — `outback-road` (image, 16:9)

```text
Empty straight red dirt road vanishing to the horizon in the Australian outback, low saltbush, vast sky, a single road sign, minimalist and quiet, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark.
```

### Kakadu — `kakadu-wetlands` (video, 16:9)

```text
Slow aerial drift over Kakadu wetlands at golden hour, braided channels reflecting the sky, sandstone escarpment on the horizon, flocks of magpie geese, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark. 8 seconds, seamless loop.
```

### Kata Tjuṯa — `kata-tjuta-dusk` (video, 16:9)

```text
Timelapse of the domes of Kata Tjuta at dusk, sky shifting from orange to indigo, first stars appearing, static tripod camera, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark. 8 seconds, seamless loop.
```

## Coast & water

### Sydney Harbour — `sydney-harbour-night` (video, 16:9)

```text
Wide slow pan across Sydney Harbour at night, Harbour Bridge and Opera House lit softly, a ferry leaving light trails on dark water, gentle ripples, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark. 8 seconds, seamless loop.
```

### The Twelve Apostles — `twelve-apostles` (image, 16:9)

```text
Limestone sea stacks of the Twelve Apostles on the Great Ocean Road at golden hour, Southern Ocean swell, sea mist, layered cliffs, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark.
```

### Great Barrier Reef — `great-barrier-reef` (image, 4:5)

```text
Top-down aerial view of the Great Barrier Reef, Heart Reef style coral formations, turquoise and deep blue gradients, abstract graphic patterns like an architectural site plan, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark.
```

### Bondi Icebergs — `bondi-icebergs` (image, 4:5)

```text
Bondi Icebergs ocean pool from above at sunrise, waves breaking over the concrete edge, strong geometry of lanes and cliff, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark.
```

## Flora

### Daintree Rainforest — `daintree-rainforest` (video, 16:9)

```text
Mist drifting slowly through the ancient Daintree rainforest canopy, tree ferns and fan palms, shafts of soft light, dew, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark. 8 seconds, seamless loop, static camera.
```

### Waratah — `flora-waratah` (image, 4:5)

```text
Macro botanical study of a crimson waratah flower, symmetrical structure like a vaulted dome, dark neutral background, studio still life lighting, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark.
```

### Banksia — `flora-banksia` (image, 4:5)

```text
Close study of an old man banksia cone and serrated leaves, sculptural textures, warm side light on a plain sandstone wall, botanical monograph, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark.
```

### Golden Wattle — `flora-golden-wattle` (image, 4:5)

```text
Golden wattle blossoms glowing in late sunlight, soft pom-pom flowers, shallow depth of field, gentle breeze, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark.
```

### Kangaroo Paw — `flora-kangaroo-paw` (image, 4:5)

```text
Red and green kangaroo paw flowers against a clear pale sky, graphic silhouette, velvety texture, minimalist composition, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark.
```

### Ghost Gum — `flora-ghost-gum` (image, 16:9)

```text
A lone white-trunked ghost gum against the red West MacDonnell Ranges, strong midday light, deep blue sky, Albert Namatjira-inspired composition, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark.
```

## Fauna

### Red Kangaroo — `fauna-kangaroo` (image, 4:5)

```text
Portrait of a red kangaroo standing upright in golden grassland at dusk, rim light on fur, shallow depth of field, calm and dignified, wildlife photography, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark.
```

### Koala — `fauna-koala` (image, 4:5)

```text
Koala resting in the fork of a eucalyptus tree, soft grey fur, blue-green gum leaves, overcast diffused light, intimate wildlife portrait, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark.
```

### Sulphur-crested Cockatoo — `fauna-cockatoo` (image, 4:5)

```text
Sulphur-crested cockatoo with crest raised, perched on a sandstone ledge, clean negative space, crisp white feathers against warm stone, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark.
```

### Platypus — `fauna-platypus` (video, 9:16)

```text
Platypus swimming slowly through a clear freshwater creek, dappled sunlight on river stones, bubbles, gentle current, underwater wildlife cinematography, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark. 8 seconds, seamless loop.
```

### Laughing Kookaburra — `fauna-kookaburra` (image, 4:5)

```text
Laughing kookaburra perched on a weathered grey branch, early morning light, textured feathers, blurred eucalyptus background, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark.
```

### Quokka — `fauna-quokka` (image, 4:5)

```text
Quokka sitting among coastal scrub on Rottnest Island, soft golden light, turquoise bay blurred in the background, gentle and curious expression, architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark.
```
