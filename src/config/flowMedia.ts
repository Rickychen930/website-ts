/**
 * Google Flow media manifest — the IT edition: silicon, servers, signal.
 *
 * Every visual on the public site is a living 8-second Flow (Veo) loop.
 * Generate each with its `prompt`, save it to `public/media/flow/<id>.mp4`,
 * and add a first-frame poster `<id>.jpg` (used before play and for reduced
 * motion). Until a file exists the UI renders a circuit-trace placeholder.
 */

export type FlowMediaKind = "image" | "video";
export type FlowMediaTheme = "infra" | "hardware" | "signal" | "city";

export interface FlowMediaItem {
  readonly id: string;
  readonly kind: FlowMediaKind;
  readonly theme: FlowMediaTheme;
  /** Display name, e.g. "The server hall" */
  readonly title: string;
  /** Spec or place shown under the title */
  readonly subtitle: string;
  /** Short technical caption, plate style */
  readonly caption: string;
  readonly alt: string;
  /** Aspect used when generating in Flow */
  readonly aspect: "16:9" | "9:16" | "1:1" | "4:5";
  /** Prompt to paste into Google Flow */
  readonly prompt: string;
}

export const FLOW_MEDIA_BASE = "/media/flow";

const STYLE =
  "cinematic 8-second shot, smooth slow camera motion, seamless loop (the last frame matches the first), deep navy and electric cyan lighting with violet accents, volumetric light, shallow depth of field, photoreal detail, no readable text, no logos, no people, no watermark, no audio";

export const FLOW_MEDIA = {
  heroCircuit: {
    id: "hero-silicon-dawn",
    kind: "video",
    theme: "hardware",
    title: "Silicon at dawn",
    subtitle: "Motherboard, macro",
    caption: "3 nm · 5.2 GHz",
    alt: "A motherboard seen like a city at sunrise, chips rising like towers",
    aspect: "16:9",
    prompt: `Low drone-style flight skimming across a vast motherboard landscape at sunrise; chips and capacitors rise like skyscrapers, copper traces pulse with flowing cyan light like rivers of data, morning haze drifts between the components, the sun crests the horizon behind a CPU tower with a soft lens flare, ${STYLE}.`,
  },
  serverHall: {
    id: "server-hall",
    kind: "video",
    theme: "infra",
    title: "The server hall",
    subtitle: "Hyperscale data centre",
    caption: "Row 07 · 22 °C",
    alt: "A long data-centre aisle lined with glowing server racks",
    aspect: "16:9",
    prompt: `Steady dolly forward down an endless hyperscale data-centre aisle; the server racks on both sides blink with cascading blue and cyan LEDs that ripple in waves toward the camera, cold mist rolls along the floor, mirror-polished floor reflections, ${STYLE}.`,
  },
  sydneyOnline: {
    id: "sydney-online-night",
    kind: "video",
    theme: "city",
    title: "Sydney, online",
    subtitle: "Harbour City at night",
    caption: "33.86° S · 151.21° E",
    alt: "Sydney Harbour skyline at night with streams of light like data",
    aspect: "16:9",
    prompt: `Slow aerial push-in toward the Sydney Harbour skyline at night; glowing threads of cyan and violet data arc between the towers and stream across the water like light trails, ferries leave luminous wakes, city lights twinkle, ${STYLE}.`,
  },
  dataCampus: {
    id: "datacentre-campus",
    kind: "video",
    theme: "infra",
    title: "Data centre campus",
    subtitle: "Western Sydney",
    caption: "Tier IV · 99.995% uptime",
    alt: "Aerial view of a data-centre campus glowing at dusk",
    aspect: "16:9",
    prompt: `Slow aerial orbit over a futuristic data-centre campus at blue hour; cooling vents on the roofs glow cyan and pulse, car light trails flow along the access roads, clouds drift quickly across the sky in gentle timelapse, ${STYLE}.`,
  },
  fiberOptics: {
    id: "fibre-optics",
    kind: "video",
    theme: "signal",
    title: "Fibre optics",
    subtitle: "Single-mode, 1310 nm",
    caption: "Light-speed links",
    alt: "Bundles of fibre-optic strands glowing with light",
    aspect: "16:9",
    prompt: `Macro dolly along a dense bundle of fibre-optic strands; pulses of cyan, blue and violet light race through the fibres and burst at the tips like stars, bokeh drifting in the background, ${STYLE}.`,
  },
  neuralNet: {
    id: "neural-network",
    kind: "video",
    theme: "signal",
    title: "Neural network",
    subtitle: "Transformer, 12 layers",
    caption: "Attention is all you need",
    alt: "An abstract network of luminous nodes connected by light",
    aspect: "16:9",
    prompt: `Camera glides through a vast three-dimensional neural network of glowing nodes; signals fire as bright pulses travelling along filaments of light, clusters light up in waves, deep navy void with fine floating particles, ${STYLE}.`,
  },
  signalLost: {
    id: "signal-lost",
    kind: "video",
    theme: "infra",
    title: "Signal lost",
    subtitle: "Server corridor, after hours",
    caption: "404",
    alt: "An empty dark server corridor with a single rack light",
    aspect: "16:9",
    prompt: `Locked-off shot of a dark server corridor after hours; all racks are dim except one at the far end whose cyan light flickers like a weak signal, dust drifts through the beam, faint glitch shimmer on the floor reflections, ${STYLE}.`,
  },
  devDesk: {
    id: "dev-desk-night",
    kind: "video",
    theme: "city",
    title: "The workstation",
    subtitle: "Late-night build",
    caption: "localhost:3000",
    alt: "A developer desk at night with monitors glowing",
    aspect: "9:16",
    prompt: `Slow push-in on a developer's desk at night; the monitor scrolls abstract colourful code shapes (no readable text), mechanical keyboard keys glow softly, steam rises from a coffee mug, rain streaks the window with city-light bokeh, ${STYLE}.`,
  },
  circuitMacro: {
    id: "circuit-macro",
    kind: "video",
    theme: "hardware",
    title: "Printed circuit",
    subtitle: "Four-layer PCB",
    caption: "Traces & vias",
    alt: "Macro of a green and gold printed circuit board",
    aspect: "16:9",
    prompt: `Macro slider move across a printed circuit board; electricity visualised as tiny cyan sparks racing along gold traces into a processor chip that glows brighter as the data arrives, shallow depth of field, ${STYLE}.`,
  },
  serverRack: {
    id: "server-rack",
    kind: "video",
    theme: "infra",
    title: "The rack",
    subtitle: "42U, fully populated",
    caption: "Hot aisle / cold aisle",
    alt: "Close-up of a server rack with blinking lights and tidy cables",
    aspect: "9:16",
    prompt: `Slow vertical tilt up a single server rack; rows of status LEDs blink in rhythmic patterns, a cooling fan spins behind a mesh panel, patch cables glow faintly cyan, dark room, ${STYLE}.`,
  },
  mobileProto: {
    id: "mobile-prototype",
    kind: "video",
    theme: "city",
    title: "Prototype",
    subtitle: "iOS & Android",
    caption: "Build 1.0.0",
    alt: "Smartphones on a desk showing colourful app screens",
    aspect: "9:16",
    prompt: `Slow top-down rotation over two smartphones on a dark desk; their screens animate between colourful abstract app layouts (no readable text), paper wireframe sketches beside them, a stylus rolls gently, ${STYLE}.`,
  },
  aiChip: {
    id: "ai-chip",
    kind: "video",
    theme: "signal",
    title: "AI accelerator",
    subtitle: "Tensor cores",
    caption: "TOPS, not FLOPS",
    alt: "A glowing AI chip on a circuit board",
    aspect: "9:16",
    prompt: `Slow orbit around a futuristic AI accelerator chip on a circuit board; waves of cyan and violet light pulse outward from the core along the traces like a heartbeat, tiny particles of light float upward, ${STYLE}.`,
  },
  holoInterface: {
    id: "holo-interface",
    kind: "video",
    theme: "signal",
    title: "Live dashboard",
    subtitle: "Observability",
    caption: "p95 < 120 ms",
    alt: "A holographic dashboard floating in a dark room",
    aspect: "16:9",
    prompt: `Camera drifts through translucent holographic dashboard panels floating in a dark room; charts draw themselves, node graphs connect and metrics tick upward (no readable text), cyan and blue glow with violet highlights, ${STYLE}.`,
  },
  cpu: {
    id: "atlas-cpu",
    kind: "video",
    theme: "hardware",
    title: "CPU",
    subtitle: "x86-64 · 16 cores",
    caption: "The thinker",
    alt: "A processor chip, macro",
    aspect: "9:16",
    prompt: `Slow orbit around a desktop CPU standing on its edge on a dark reflective surface; a sweep of cyan light glides across the metal heat spreader and sparkles on the gold contacts, ${STYLE}.`,
  },
  gpu: {
    id: "atlas-gpu",
    kind: "video",
    theme: "hardware",
    title: "GPU",
    subtitle: "Thousands of cores",
    caption: "Trains the models",
    alt: "A graphics card with fans",
    aspect: "9:16",
    prompt: `Three-quarter orbit around a modern graphics card; its fans spin up, cyan edge lighting pulses, heat shimmer rises from the heatsink fins, ${STYLE}.`,
  },
  ram: {
    id: "atlas-ram",
    kind: "video",
    theme: "hardware",
    title: "Memory",
    subtitle: "DDR5 · 6400 MT/s",
    caption: "Short-term recall",
    alt: "A stick of RAM",
    aspect: "9:16",
    prompt: `Slow push-in on a stick of DDR5 memory standing upright; light pulses race across the memory chips like data being written, soft cyan underglow, ${STYLE}.`,
  },
  ssd: {
    id: "atlas-ssd",
    kind: "video",
    theme: "hardware",
    title: "Storage",
    subtitle: "NVMe · Gen 4",
    caption: "Long-term memory",
    alt: "An NVMe solid-state drive",
    aspect: "9:16",
    prompt: `Macro slider across an M.2 NVMe solid-state drive; tiny streams of light flow from the connector into the flash chips, cool blue light, shallow depth of field, ${STYLE}.`,
  },
  network: {
    id: "atlas-network-switch",
    kind: "video",
    theme: "infra",
    title: "Network switch",
    subtitle: "10 GbE · 48 ports",
    caption: "Moves every packet",
    alt: "A network switch with patch cables",
    aspect: "9:16",
    prompt: `Slow pan along a network switch full of patch cables; green and amber port lights blink in busy rhythms, one cable glows as a burst of light travels through it, ${STYLE}.`,
  },
  sbc: {
    id: "atlas-single-board",
    kind: "video",
    theme: "hardware",
    title: "Single-board computer",
    subtitle: "ARM · GPIO",
    caption: "Where IoT starts",
    alt: "A small single-board computer",
    aspect: "9:16",
    prompt: `Slow orbit around a small single-board computer; its status LED blinks, jumper wires lead off frame carrying faint pulses of light, cyan rim light, dark background, ${STYLE}.`,
  },
  keyboard: {
    id: "atlas-keyboard",
    kind: "video",
    theme: "hardware",
    title: "Mechanical keyboard",
    subtitle: "Tactile switches",
    caption: "Where code begins",
    alt: "A mechanical keyboard, close-up",
    aspect: "9:16",
    prompt: `Low macro dolly across a mechanical keyboard as keys press themselves in a typing rhythm; the backlight ripples outward from each keypress in cyan waves, ${STYLE}.`,
  },
  fibre: {
    id: "atlas-fibre",
    kind: "video",
    theme: "signal",
    title: "Fibre link",
    subtitle: "Light-speed",
    caption: "1310 nm",
    alt: "Fibre-optic strands with travelling light",
    aspect: "9:16",
    prompt: `Vertical macro of fibre-optic strands falling like a waterfall of light; pulses of cyan and violet travel downward and sparkle at the tips, ${STYLE}.`,
  },
  microcontroller: {
    id: "atlas-microcontroller",
    kind: "video",
    theme: "hardware",
    title: "Microcontroller",
    subtitle: "C++ · sensors",
    caption: "M-arkir & L-emot",
    alt: "A microcontroller board wired to sensors",
    aspect: "9:16",
    prompt: `Slow push-in on a microcontroller board on a breadboard wired to a tiny camera module and an LED; the LED blinks and a data pulse travels along the jumper wires, maker workbench, cyan accent light, ${STYLE}.`,
  },
  smartphone: {
    id: "atlas-smartphone",
    kind: "video",
    theme: "hardware",
    title: "Smartphone",
    subtitle: "iOS · Android",
    caption: "Apps in pockets",
    alt: "An exploded view of smartphone components",
    aspect: "9:16",
    prompt: `A smartphone slowly separates into an exploded view of floating layers — screen, logic board, battery, camera — rotates gently, then drifts back together, clean studio light on a dark background, ${STYLE}.`,
  },
} as const satisfies Record<string, FlowMediaItem>;

export type FlowMediaKey = keyof typeof FLOW_MEDIA;

/** Tech plates cycled for projects without their own image */
export const PROJECT_SITE_PLATES: readonly FlowMediaItem[] = [
  FLOW_MEDIA.devDesk,
  FLOW_MEDIA.circuitMacro,
  FLOW_MEDIA.serverRack,
  FLOW_MEDIA.mobileProto,
  FLOW_MEDIA.fiberOptics,
  FLOW_MEDIA.aiChip,
  FLOW_MEDIA.holoInterface,
  FLOW_MEDIA.signalLost,
];

/** Hardware atlas — the machine, part by part, on the home page */
export const HARDWARE_ATLAS: readonly FlowMediaItem[] = [
  FLOW_MEDIA.cpu,
  FLOW_MEDIA.gpu,
  FLOW_MEDIA.ram,
  FLOW_MEDIA.ssd,
  FLOW_MEDIA.network,
  FLOW_MEDIA.fibre,
  FLOW_MEDIA.sbc,
  FLOW_MEDIA.microcontroller,
  FLOW_MEDIA.keyboard,
  FLOW_MEDIA.smartphone,
];

export const flowSrc = (item: FlowMediaItem): string =>
  `${FLOW_MEDIA_BASE}/${item.id}.${item.kind === "video" ? "mp4" : "jpg"}`;

export const flowPoster = (item: FlowMediaItem): string =>
  `${FLOW_MEDIA_BASE}/${item.id}.jpg`;

export const sitePlateFor = (index: number): FlowMediaItem =>
  PROJECT_SITE_PLATES[
    ((index % PROJECT_SITE_PLATES.length) + PROJECT_SITE_PLATES.length) %
      PROJECT_SITE_PLATES.length
  ];

/** Stable site plate for a project, based on its position in the full list */
export const sitePlateForProject = (
  projectIds: readonly string[],
  projectId: string,
  title = "",
): FlowMediaItem =>
  // The chatbot project wears its own mascot instead of a plate
  /^kobi\b/i.test(title)
    ? MASCOT.avatar
    : sitePlateFor(Math.max(0, projectIds.indexOf(projectId)));

/** Marquee ribbons: the stack I ship with, and the parts it runs on */
export const STACK_NAMES = [
  "Python",
  "TypeScript",
  "React",
  "Node.js",
  "LLMs",
  "Prompt engineering",
  "MongoDB",
  "SQL",
  "Docker",
  "REST APIs",
] as const;

export const HARDWARE_NAMES = HARDWARE_ATLAS.map((h) => h.title);

/**
 * Chatbot mascot — "Kobi" the quokka. Generate in Google Flow with the same
 * character description in both prompts so the two images match.
 */
const KOBI =
  "a friendly cartoon quokka mascot named Kobi, round fluffy sandy-brown fur, big warm smile, small round ears, dark curious eyes, wearing a tiny turquoise bandana with a golden wattle flower pin, soft 3D Pixar-style character render, gentle rim light";

export const MASCOT = {
  avatar: {
    id: "mascot-kobi",
    kind: "image",
    theme: "city",
    title: "Kobi",
    subtitle: "Setonix brachyurus · site assistant",
    caption: "Rottnest Island, WA",
    alt: "",
    aspect: "1:1",
    prompt: `Head-and-shoulders portrait of ${KOBI}, facing camera and smiling, centred with space around the head so it crops cleanly into a circle, flat deep navy (#0b2545) background, no text, no watermark.`,
  },
  full: {
    id: "mascot-kobi-full",
    kind: "image",
    theme: "city",
    title: "Kobi",
    subtitle: "Setonix brachyurus · site assistant",
    caption: "Rottnest Island, WA",
    alt: "",
    aspect: "4:5",
    prompt: `Full-body shot of ${KOBI}, sitting on a smooth sandstone rock and waving hello with one paw, flat deep navy (#0b2545) background, whole character in frame with generous margins, no text, no watermark.`,
  },
} as const satisfies Record<string, FlowMediaItem>;
