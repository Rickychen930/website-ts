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
  "photorealistic cinematic 8-second shot, slow smooth camera, seamless loop (the last frame matches the first), deep navy shadows with cool cyan light and one warm copper accent, volumetric haze, shallow depth of field, no readable text, no logos, no people, no watermark, no audio";

export const FLOW_MEDIA = {
  heroCircuit: {
    id: "hero-silicon-dawn",
    kind: "video",
    theme: "hardware",
    title: "Silicon at dawn",
    subtitle: "Motherboard, macro",
    caption: "3 nm · 5.2 GHz",
    alt: "A copper-lidded processor and gold pins on a real motherboard, shot in macro with cyan light running along the traces",
    aspect: "16:9",
    prompt: `Slow macro dolly across a real server motherboard and CPU die: brushed copper heat spreader, gold-plated pins, tiny SMD capacitors rising like buildings, thin cyan light pulses travelling along the PCB traces, soft blue rim light, drifting dust, ${STYLE}.`,
  },
  serverHall: {
    id: "server-hall",
    kind: "video",
    theme: "infra",
    title: "The server hall",
    subtitle: "Hyperscale data centre",
    caption: "Row 07 · 22 °C",
    alt: "A long data-centre aisle lined with black server racks and cascading blue LEDs",
    aspect: "16:9",
    prompt: `Slow dolly down an endless hyperscale data hall aisle, black racks on both sides with cascading blue and cyan LEDs, polished floor reflections, cold haze, ${STYLE}.`,
  },
  sydneyOnline: {
    id: "sydney-online-night",
    kind: "video",
    theme: "city",
    title: "Sydney, online",
    subtitle: "Harbour City at night",
    caption: "33.86° S · 151.21° E",
    alt: "Sydney Harbour at night with the Opera House and Harbour Bridge lit and thin cyan light trails over the water",
    aspect: "16:9",
    prompt: `Slow aerial push-in over Sydney Harbour at night with the Opera House and Harbour Bridge lit, thin cyan light trails over the water like data streams, ${STYLE}.`,
  },
  dataCampus: {
    id: "datacentre-campus",
    kind: "video",
    theme: "infra",
    title: "Data centre campus",
    subtitle: "Western Sydney",
    caption: "Tier IV · 99.995% uptime",
    alt: "Aerial view of a windowless data-centre campus at blue hour with rooftop cooling units and car light trails",
    aspect: "16:9",
    prompt: `Slow aerial orbit at blue hour over a large windowless data centre campus, rooftop cooling units, a substation, car light trails on the access road, ${STYLE}.`,
  },
  fiberOptics: {
    id: "fibre-optics",
    kind: "video",
    theme: "signal",
    title: "Fibre optics",
    subtitle: "Single-mode, 1310 nm",
    caption: "Light-speed links",
    alt: "A bundle of optical fibres with glowing cyan tips and light pulses travelling inside the strands",
    aspect: "16:9",
    prompt: `Macro of a bundle of optical fibres with glowing cyan tips, light pulses travelling inside the strands, soft bokeh, ${STYLE}.`,
  },
  neuralNet: {
    id: "neural-network",
    kind: "video",
    theme: "signal",
    title: "Neural network",
    subtitle: "Transformer, 12 layers",
    caption: "Attention is all you need",
    alt: "Glowing fibre-optic filaments arranged in layers like a neural network, with light travelling through them",
    aspect: "16:9",
    prompt: `Glowing fibre-optic filaments arranged in layers like a neural network floating in a dark void, light travelling through the layers, slow camera push through, ${STYLE}.`,
  },
  signalLost: {
    id: "signal-lost",
    kind: "video",
    theme: "infra",
    title: "Signal lost",
    subtitle: "Server corridor, after hours",
    caption: "404",
    alt: "An empty dark server corridor after hours as a cyan rack indicator flickers and fades out",
    aspect: "16:9",
    prompt: `An empty dark server corridor after hours, one rack indicator flickering cyan then fading out, cables hanging, cold haze, slow dolly forward, ${STYLE}.`,
  },
  devDesk: {
    id: "dev-desk-night",
    kind: "video",
    theme: "city",
    title: "The workstation",
    subtitle: "Late-night build",
    caption: "localhost:3000",
    alt: "A developer desk at night with dual monitors, a steaming mug and rain on the window",
    aspect: "9:16",
    prompt: `Developer desk at night: dual monitors with abstract glowing code-like shapes, a steaming mug, rain on the window with city bokeh behind, slow push-in, nobody in frame, ${STYLE}.`,
  },
  circuitMacro: {
    id: "circuit-macro",
    kind: "video",
    theme: "hardware",
    title: "Printed circuit",
    subtitle: "Four-layer PCB",
    caption: "Traces & vias",
    alt: "A four-layer printed circuit board in macro with a cyan light pulse running along a trace",
    aspect: "16:9",
    prompt: `Slow macro dolly across a four-layer green and black PCB, gold vias, tiny resistors, a cyan light pulse running along a trace, ${STYLE}.`,
  },
  serverRack: {
    id: "server-rack",
    kind: "video",
    theme: "infra",
    title: "The rack",
    subtitle: "42U, fully populated",
    caption: "Hot aisle / cold aisle",
    alt: "A fully populated server rack as blue and cyan LEDs cascade upward",
    aspect: "9:16",
    prompt: `A fully populated 42U server rack in a dark room, slow upward tilt along the rack as blue and cyan LEDs cascade, cables neatly bundled, ${STYLE}.`,
  },
  mobileProto: {
    id: "mobile-prototype",
    kind: "video",
    theme: "city",
    title: "Prototype",
    subtitle: "iOS & Android",
    caption: "Build 1.0.0",
    alt: "An iPhone and an Android phone side by side showing the same interface, with dev cables and a test board in the foreground",
    aspect: "9:16",
    prompt: `An iPhone and an Android phone standing side by side on a dark bench, the same abstract interface sliding smoothly across both screens, slow dolly, dev cables and a small test board blurred in the foreground, ${STYLE}.`,
  },
  aiChip: {
    id: "ai-chip",
    kind: "video",
    theme: "signal",
    title: "AI accelerator",
    subtitle: "Tensor cores",
    caption: "TOPS, not FLOPS",
    alt: "A square AI chip package with a dense solder-ball array and a copper plate, cyan light threads pulsing across the die",
    aspect: "9:16",
    prompt: `A square AI chip package with a dense array of tiny solder balls visible on its edge and a copper heat plate, slow orbit, cyan light threads pulsing across the die, ${STYLE}.`,
  },
  holoInterface: {
    id: "holo-interface",
    kind: "video",
    theme: "signal",
    title: "Live dashboard",
    subtitle: "Observability",
    caption: "p95 < 120 ms",
    alt: "A curved monitor in a dark control room showing abstract glowing charts",
    aspect: "16:9",
    prompt: `A large curved monitor in a dark control room showing abstract glowing charts and graphs, no readable text, reflections on the desk, slow push-in, ${STYLE}.`,
  },
  cpu: {
    id: "atlas-cpu",
    kind: "video",
    theme: "hardware",
    title: "CPU",
    subtitle: "x86-64 · 16 cores",
    caption: "The thinker",
    alt: "A bare processor package with a brushed metal heat spreader and gold contact pads, lit by a sweeping cyan light",
    aspect: "9:16",
    prompt: `A bare processor package with a brushed metal heat spreader and gold contact pads, slow orbit, cyan light sweeping across the lid, ${STYLE}.`,
  },
  gpu: {
    id: "atlas-gpu",
    kind: "video",
    theme: "hardware",
    title: "GPU",
    subtitle: "Thousands of cores",
    caption: "Trains the models",
    alt: "A graphics card with two spinning fans and a thin cyan light strip",
    aspect: "9:16",
    prompt: `A graphics card with two fans spinning smoothly, black shroud, a thin cyan light strip glowing, slow lateral dolly, ${STYLE}.`,
  },
  ram: {
    id: "atlas-ram",
    kind: "video",
    theme: "hardware",
    title: "Memory",
    subtitle: "DDR5 · 6400 MT/s",
    caption: "Short-term recall",
    alt: "A DDR5 memory module with aluminium heat spreaders and a gold edge connector, a cyan light pulse running along it",
    aspect: "9:16",
    prompt: `A DDR5 memory module with aluminium heat spreaders and gold edge connector, slow push-in, cyan light pulse running along the spreader, ${STYLE}.`,
  },
  ssd: {
    id: "atlas-ssd",
    kind: "video",
    theme: "hardware",
    title: "Storage",
    subtitle: "NVMe · Gen 4",
    caption: "Long-term memory",
    alt: "An NVMe drive with a green PCB and controller chips, with a faint cyan activity glow",
    aspect: "9:16",
    prompt: `An NVMe drive with a green PCB and controller chips, slow orbit, tiny cyan activity glow on the chips, ${STYLE}.`,
  },
  network: {
    id: "atlas-network-switch",
    kind: "video",
    theme: "infra",
    title: "Network switch",
    subtitle: "10 GbE · 48 ports",
    caption: "Moves every packet",
    alt: "The front of a 48-port network switch with blinking cyan and green link lights and patch cables",
    aspect: "9:16",
    prompt: `The front panel of a 48-port network switch, rows of ethernet ports with blinking cyan and green link LEDs, a few patch cables in sharp focus, slow lateral dolly, ${STYLE}.`,
  },
  sbc: {
    id: "atlas-single-board",
    kind: "video",
    theme: "hardware",
    title: "Single-board computer",
    subtitle: "ARM · GPIO",
    caption: "Where IoT starts",
    alt: "A bare ARM single-board computer with a GPIO header and a blinking cyan status LED",
    aspect: "9:16",
    prompt: `A bare ARM single-board computer with a GPIO header, USB ports and a small chip, slow top-down drift, a status LED blinking cyan, ${STYLE}.`,
  },
  keyboard: {
    id: "atlas-keyboard",
    kind: "video",
    theme: "hardware",
    title: "Mechanical keyboard",
    subtitle: "Tactile switches",
    caption: "Where code begins",
    alt: "A mechanical keyboard with PBT keycaps and cyan backlight as one key presses and springs back",
    aspect: "9:16",
    prompt: `Slow push-in over a premium dark mechanical keyboard with PBT keycaps and soft cyan backlight glowing under the keys; one key presses down and springs back in slow motion, ${STYLE}.`,
  },
  fibre: {
    id: "atlas-fibre",
    kind: "video",
    theme: "signal",
    title: "Fibre link",
    subtitle: "Light-speed",
    caption: "1310 nm",
    alt: "A single fibre-optic cable and connector with a bright cyan pulse of light travelling along the strand",
    aspect: "9:16",
    prompt: `Vertical macro of a single fibre optic cable and its connector, a bright cyan pulse of light travelling along the strand, slow push-in, soft bokeh, ${STYLE}.`,
  },
  microcontroller: {
    id: "atlas-microcontroller",
    kind: "video",
    theme: "hardware",
    title: "Microcontroller",
    subtitle: "C++ · sensors",
    caption: "M-arkir & L-emot",
    alt: "A microcontroller dev board on a breadboard with jumper wires, a sensor and a blinking cyan LED",
    aspect: "9:16",
    prompt: `A small microcontroller dev board on a breadboard with jumper wires and a sensor, slow macro push-in, tiny LED blinking cyan, ${STYLE}.`,
  },
  smartphone: {
    id: "atlas-smartphone",
    kind: "video",
    theme: "hardware",
    title: "Smartphone",
    subtitle: "iOS · Android",
    caption: "Apps in pockets",
    alt: "A smartphone on a dark desk with a glowing cyan app interface and soft window reflections",
    aspect: "9:16",
    prompt: `A modern phone lying on a dark desk, screen glowing with an abstract cyan app interface, slow orbiting camera, soft window reflections on the glass, ${STYLE}.`,
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
