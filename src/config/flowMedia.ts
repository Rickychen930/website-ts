/**
 * Google Flow media manifest — the IT edition: silicon, servers, signal.
 *
 * Every visual on the public site comes from this list. Generate each asset
 * in Google Flow with its `prompt`, export it, and save it to
 * `public/media/flow/<id>.jpg` (images) or `<id>.mp4` + `<id>.jpg` poster
 * (videos). Until a file exists the UI renders a themed placeholder plate.
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
  "cinematic tech photography, deep navy and electric cyan lighting with subtle violet accents, crisp detail, high dynamic range, no readable text, no logos, no people, no watermark";

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
    prompt: `Slow cinematic drone-style glide low across a vast motherboard landscape at dawn, chips and capacitors rising like city towers, copper traces glowing like rivers of cyan light, volumetric haze, warm sunrise on the horizon, seamless loop, ${STYLE}.`,
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
    prompt: `Slow dolly forward down a long hyperscale data-centre aisle, rows of black server racks with blinking blue and cyan LEDs, cold mist near the floor, reflective polished floor, symmetrical composition, seamless loop, ${STYLE}.`,
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
    prompt: `Wide night view of the Sydney Harbour skyline from the water, the city lit in blue and cyan, thin streams of glowing data-like light trails arcing between buildings and over the harbour, calm reflections, slow push-in, seamless loop, ${STYLE}.`,
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
    prompt: `Slow aerial orbit over a modern data-centre campus at dusk, long rectangular buildings with glowing cyan roof vents and cooling units, roads with light trails, deep blue twilight sky, seamless loop, ${STYLE}.`,
  },
  fiberOptics: {
    id: "fibre-optics",
    kind: "image",
    theme: "signal",
    title: "Fibre optics",
    subtitle: "Single-mode, 1310 nm",
    caption: "Light-speed links",
    alt: "Bundles of fibre-optic strands glowing with light",
    aspect: "16:9",
    prompt: `Macro photograph of a bundle of fibre-optic cables, the cut ends glowing with pinpoints of cyan, blue and violet light, the strands curving away into soft bokeh, dark background, ${STYLE}.`,
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
    prompt: `Abstract three-dimensional neural network of glowing nodes connected by thin filaments of light, pulses of cyan and violet travelling along the connections, slow camera drift through the network, deep navy space, seamless loop, ${STYLE}.`,
  },
  signalLost: {
    id: "signal-lost",
    kind: "image",
    theme: "infra",
    title: "Signal lost",
    subtitle: "Server corridor, after hours",
    caption: "404",
    alt: "An empty dark server corridor with a single rack light",
    aspect: "16:9",
    prompt: `Empty dark server-room corridor after hours, all racks dimmed except one rack light at the far end glowing cyan, faint haze, long perspective, moody and quiet, ${STYLE}.`,
  },
  devDesk: {
    id: "dev-desk-night",
    kind: "image",
    theme: "city",
    title: "The workstation",
    subtitle: "Late-night build",
    caption: "localhost:3000",
    alt: "A developer desk at night with monitors glowing",
    aspect: "4:5",
    prompt: `Developer workstation at night, ultrawide monitor and laptop glowing with abstract colourful code shapes (no readable text), mechanical keyboard, desk lamp, city lights through the window, cyan and warm amber lighting, ${STYLE}.`,
  },
  circuitMacro: {
    id: "circuit-macro",
    kind: "image",
    theme: "hardware",
    title: "Printed circuit",
    subtitle: "Four-layer PCB",
    caption: "Traces & vias",
    alt: "Macro of a green and gold printed circuit board",
    aspect: "16:9",
    prompt: `Extreme macro of a printed circuit board, a processor chip in focus, gold traces and tiny components receding into shallow depth of field, cyan rim light, ${STYLE}.`,
  },
  serverRack: {
    id: "server-rack",
    kind: "image",
    theme: "infra",
    title: "The rack",
    subtitle: "42U, fully populated",
    caption: "Hot aisle / cold aisle",
    alt: "Close-up of a server rack with blinking lights and tidy cables",
    aspect: "4:5",
    prompt: `Front close-up of a single server rack, rows of servers with blinking blue and green status LEDs, neatly bundled patch cables, slight low angle, dark room, ${STYLE}.`,
  },
  mobileProto: {
    id: "mobile-prototype",
    kind: "image",
    theme: "city",
    title: "Prototype",
    subtitle: "iOS & Android",
    caption: "Build 1.0.0",
    alt: "Smartphones on a desk showing colourful app screens",
    aspect: "4:5",
    prompt: `Two modern smartphones lying on a dark desk showing colourful abstract app interfaces (no readable text), paper wireframe sketches and a stylus beside them, soft top light, ${STYLE}.`,
  },
  aiChip: {
    id: "ai-chip",
    kind: "image",
    theme: "signal",
    title: "AI accelerator",
    subtitle: "Tensor cores",
    caption: "TOPS, not FLOPS",
    alt: "A glowing AI chip on a circuit board",
    aspect: "4:5",
    prompt: `A futuristic AI accelerator chip on a circuit board, light pulses radiating outward along the traces in cyan and violet, top-down three-quarter view, dark background, ${STYLE}.`,
  },
  holoInterface: {
    id: "holo-interface",
    kind: "image",
    theme: "signal",
    title: "Live dashboard",
    subtitle: "Observability",
    caption: "p95 < 120 ms",
    alt: "A holographic dashboard floating in a dark room",
    aspect: "16:9",
    prompt: `Translucent holographic dashboard panels floating in a dark room, abstract charts, graphs and node diagrams (no readable text), cyan and blue glow with violet accents, ${STYLE}.`,
  },
  cpu: {
    id: "atlas-cpu",
    kind: "image",
    theme: "hardware",
    title: "CPU",
    subtitle: "x86-64 · 16 cores",
    caption: "The thinker",
    alt: "A processor chip, macro",
    aspect: "4:5",
    prompt: `Macro of a desktop CPU lying on a dark surface, the metal heat spreader catching cyan light, gold contact pads visible at the edge, ${STYLE}.`,
  },
  gpu: {
    id: "atlas-gpu",
    kind: "image",
    theme: "hardware",
    title: "GPU",
    subtitle: "Thousands of cores",
    caption: "Trains the models",
    alt: "A graphics card with fans",
    aspect: "4:5",
    prompt: `A modern graphics card with twin fans photographed three-quarter view, subtle cyan RGB edge light, dark background, ${STYLE}.`,
  },
  ram: {
    id: "atlas-ram",
    kind: "image",
    theme: "hardware",
    title: "Memory",
    subtitle: "DDR5 · 6400 MT/s",
    caption: "Short-term recall",
    alt: "A stick of RAM",
    aspect: "4:5",
    prompt: `A stick of DDR5 RAM standing upright, memory chips in sharp focus, soft cyan underglow, dark background, ${STYLE}.`,
  },
  ssd: {
    id: "atlas-ssd",
    kind: "image",
    theme: "hardware",
    title: "Storage",
    subtitle: "NVMe · Gen 4",
    caption: "Long-term memory",
    alt: "An NVMe solid-state drive",
    aspect: "4:5",
    prompt: `An M.2 NVMe solid-state drive on a dark surface, chips and connector in sharp macro focus, cool blue light, ${STYLE}.`,
  },
  network: {
    id: "atlas-network-switch",
    kind: "image",
    theme: "infra",
    title: "Network switch",
    subtitle: "10 GbE · 48 ports",
    caption: "Moves every packet",
    alt: "A network switch with patch cables",
    aspect: "4:5",
    prompt: `Network switch front panel with many patch cables plugged in, green and amber port lights blinking, shallow depth of field, ${STYLE}.`,
  },
  sbc: {
    id: "atlas-single-board",
    kind: "image",
    theme: "hardware",
    title: "Single-board computer",
    subtitle: "ARM · GPIO",
    caption: "Where IoT starts",
    alt: "A small single-board computer",
    aspect: "4:5",
    prompt: `A small single-board computer with GPIO pins and a few jumper wires attached, top-down three-quarter view, cyan rim light, dark background, ${STYLE}.`,
  },
  keyboard: {
    id: "atlas-keyboard",
    kind: "image",
    theme: "hardware",
    title: "Mechanical keyboard",
    subtitle: "Tactile switches",
    caption: "Where code begins",
    alt: "A mechanical keyboard, close-up",
    aspect: "4:5",
    prompt: `Close-up of a mechanical keyboard, a few keycaps removed to show the switches, soft cyan backlight, dark moody desk, ${STYLE}.`,
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
    prompt: `Vertical macro of fibre-optic strands with pulses of cyan and violet light travelling along them, dark background, seamless loop, ${STYLE}.`,
  },
  microcontroller: {
    id: "atlas-microcontroller",
    kind: "image",
    theme: "hardware",
    title: "Microcontroller",
    subtitle: "C++ · sensors",
    caption: "M-arkir & L-emot",
    alt: "A microcontroller board wired to sensors",
    aspect: "4:5",
    prompt: `A microcontroller board on a breadboard wired to a small camera module and an LED, colourful jumper wires, maker workbench, cyan accent light, ${STYLE}.`,
  },
  smartphone: {
    id: "atlas-smartphone",
    kind: "image",
    theme: "hardware",
    title: "Smartphone",
    subtitle: "iOS · Android",
    caption: "Apps in pockets",
    alt: "An exploded view of smartphone components",
    aspect: "4:5",
    prompt: `Exploded view of a smartphone's components floating in layers — screen, logic board, battery, camera — on a dark background, clean studio light, ${STYLE}.`,
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
