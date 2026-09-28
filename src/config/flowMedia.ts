/**
 * Google Flow media manifest — Australian flora, fauna, landmarks & places.
 *
 * Every visual on the public site comes from this list. Generate each asset
 * in Google Flow with its `prompt`, export it, and save it to
 * `public/media/flow/<id>.jpg` (images) or `<id>.mp4` + `<id>.jpg` poster
 * (videos). Until a file exists the UI renders a themed placeholder plate.
 */

export type FlowMediaKind = "image" | "video";
export type FlowMediaTheme = "landmark" | "fauna" | "flora" | "coast";

export interface FlowMediaItem {
  readonly id: string;
  readonly kind: FlowMediaKind;
  readonly theme: FlowMediaTheme;
  /** Display name, e.g. "Uluru" */
  readonly title: string;
  /** Place or scientific name shown under the title */
  readonly subtitle: string;
  /** Coordinates or region caption, architectural-plate style */
  readonly caption: string;
  readonly alt: string;
  /** Aspect used when generating in Flow */
  readonly aspect: "16:9" | "9:16" | "1:1" | "4:5";
  /** Prompt to paste into Google Flow */
  readonly prompt: string;
}

export const FLOW_MEDIA_BASE = "/media/flow";

const STYLE =
  "architectural photography, editorial monograph, natural light, muted warm film palette, high detail, no text, no people, no watermark";

export const FLOW_MEDIA = {
  heroUluru: {
    id: "hero-uluru-dawn",
    kind: "video",
    theme: "landmark",
    title: "Uluru",
    subtitle: "Uluṟu-Kata Tjuṯa National Park, NT",
    caption: "25.3444° S, 131.0369° E",
    alt: "Uluru glowing ochre at dawn under a pale desert sky",
    aspect: "16:9",
    prompt: `Slow cinematic dolly shot of Uluru at dawn, first sunlight turning the monolith deep ochre, spinifex grass in the foreground swaying gently, pale desert sky, heat haze, ${STYLE}. 8 seconds, seamless loop, locked horizon.`,
  },
  operaHouse: {
    id: "sydney-opera-house",
    kind: "image",
    theme: "landmark",
    title: "Sydney Opera House",
    subtitle: "Bennelong Point, Sydney NSW",
    caption: "33.8568° S, 151.2153° E",
    alt: "Sydney Opera House sails photographed at blue hour",
    aspect: "4:5",
    prompt: `Close architectural study of the Sydney Opera House sails at blue hour, chevron tile texture visible, calm harbour water, soft reflections, minimalist composition, ${STYLE}.`,
  },
  harbourNight: {
    id: "sydney-harbour-night",
    kind: "video",
    theme: "coast",
    title: "Sydney Harbour",
    subtitle: "Port Jackson, NSW",
    caption: "33.8523° S, 151.2108° E",
    alt: "Sydney Harbour Bridge and Opera House at night with ferry lights",
    aspect: "16:9",
    prompt: `Wide slow pan across Sydney Harbour at night, Harbour Bridge and Opera House lit softly, a ferry leaving light trails on dark water, gentle ripples, ${STYLE}. 8 seconds, seamless loop.`,
  },
  twelveApostles: {
    id: "twelve-apostles",
    kind: "image",
    theme: "coast",
    title: "The Twelve Apostles",
    subtitle: "Great Ocean Road, VIC",
    caption: "38.6662° S, 143.1049° E",
    alt: "Limestone sea stacks of the Twelve Apostles at golden hour",
    aspect: "16:9",
    prompt: `Limestone sea stacks of the Twelve Apostles on the Great Ocean Road at golden hour, Southern Ocean swell, sea mist, layered cliffs, ${STYLE}.`,
  },
  barrierReef: {
    id: "great-barrier-reef",
    kind: "image",
    theme: "coast",
    title: "Great Barrier Reef",
    subtitle: "Coral Sea, QLD",
    caption: "18.2871° S, 147.6992° E",
    alt: "Aerial view of turquoise reef patterns in the Coral Sea",
    aspect: "4:5",
    prompt: `Top-down aerial view of the Great Barrier Reef, Heart Reef style coral formations, turquoise and deep blue gradients, abstract graphic patterns like an architectural site plan, ${STYLE}.`,
  },
  blueMountains: {
    id: "blue-mountains",
    kind: "image",
    theme: "landmark",
    title: "The Three Sisters",
    subtitle: "Blue Mountains, NSW",
    caption: "33.7320° S, 150.3120° E",
    alt: "Three Sisters rock formation above a blue eucalyptus haze",
    aspect: "16:9",
    prompt: `The Three Sisters sandstone formation in the Blue Mountains, valley filled with blue eucalyptus haze, morning light, layered ridgelines receding, ${STYLE}.`,
  },
  bondiIcebergs: {
    id: "bondi-icebergs",
    kind: "image",
    theme: "coast",
    title: "Bondi Icebergs",
    subtitle: "Bondi Beach, NSW",
    caption: "33.8950° S, 151.2743° E",
    alt: "Ocean pool at Bondi with waves breaking over its edge",
    aspect: "4:5",
    prompt: `Bondi Icebergs ocean pool from above at sunrise, waves breaking over the concrete edge, strong geometry of lanes and cliff, ${STYLE}.`,
  },
  kingsCanyon: {
    id: "kings-canyon",
    kind: "image",
    theme: "landmark",
    title: "Kings Canyon",
    subtitle: "Watarrka National Park, NT",
    caption: "24.2530° S, 131.5740° E",
    alt: "Sheer red sandstone walls of Kings Canyon",
    aspect: "4:5",
    prompt: `Sheer red sandstone walls of Kings Canyon, stratified rock like brutalist concrete, a lone ghost gum clinging to the rim, deep shadow and hard sun, ${STYLE}.`,
  },
  daintree: {
    id: "daintree-rainforest",
    kind: "video",
    theme: "flora",
    title: "Daintree Rainforest",
    subtitle: "Far North Queensland",
    caption: "16.1700° S, 145.4185° E",
    alt: "Morning mist drifting through ancient Daintree rainforest canopy",
    aspect: "16:9",
    prompt: `Mist drifting slowly through the ancient Daintree rainforest canopy, tree ferns and fan palms, shafts of soft light, dew, ${STYLE}. 8 seconds, seamless loop, static camera.`,
  },
  outbackRoad: {
    id: "outback-road",
    kind: "image",
    theme: "landmark",
    title: "The Outback",
    subtitle: "Stuart Highway, NT",
    caption: "Somewhere past Coober Pedy",
    alt: "Empty red dirt road stretching to the horizon in the outback",
    aspect: "16:9",
    prompt: `Empty straight red dirt road vanishing to the horizon in the Australian outback, low saltbush, vast sky, a single road sign, minimalist and quiet, ${STYLE}.`,
  },
  kakadu: {
    id: "kakadu-wetlands",
    kind: "video",
    theme: "landmark",
    title: "Kakadu",
    subtitle: "Kakadu National Park, NT",
    caption: "12.6765° S, 132.8358° E",
    alt: "Aerial drift over Kakadu wetlands and escarpment at golden hour",
    aspect: "16:9",
    prompt: `Slow aerial drift over Kakadu wetlands at golden hour, braided channels reflecting the sky, sandstone escarpment on the horizon, flocks of magpie geese, ${STYLE}. 8 seconds, seamless loop.`,
  },
  kataTjuta: {
    id: "kata-tjuta-dusk",
    kind: "video",
    theme: "landmark",
    title: "Kata Tjuṯa",
    subtitle: "Uluṟu-Kata Tjuṯa National Park, NT",
    caption: "25.3000° S, 130.7333° E",
    alt: "Domes of Kata Tjuta under a slowly darkening dusk sky",
    aspect: "16:9",
    prompt: `Timelapse of the domes of Kata Tjuta at dusk, sky shifting from orange to indigo, first stars appearing, static tripod camera, ${STYLE}. 8 seconds, seamless loop.`,
  },

  /* Fauna */
  kangaroo: {
    id: "fauna-kangaroo",
    kind: "image",
    theme: "fauna",
    title: "Red Kangaroo",
    subtitle: "Osphranter rufus",
    caption: "Arid interior",
    alt: "Red kangaroo standing in golden grassland at dusk",
    aspect: "4:5",
    prompt: `Portrait of a red kangaroo standing upright in golden grassland at dusk, rim light on fur, shallow depth of field, calm and dignified, wildlife photography, ${STYLE}.`,
  },
  koala: {
    id: "fauna-koala",
    kind: "image",
    theme: "fauna",
    title: "Koala",
    subtitle: "Phascolarctos cinereus",
    caption: "Eastern eucalypt woodland",
    alt: "Koala resting in the fork of a eucalyptus tree",
    aspect: "4:5",
    prompt: `Koala resting in the fork of a eucalyptus tree, soft grey fur, blue-green gum leaves, overcast diffused light, intimate wildlife portrait, ${STYLE}.`,
  },
  cockatoo: {
    id: "fauna-cockatoo",
    kind: "image",
    theme: "fauna",
    title: "Sulphur-crested Cockatoo",
    subtitle: "Cacatua galerita",
    caption: "Sydney Royal Botanic Garden",
    alt: "Sulphur-crested cockatoo with raised yellow crest",
    aspect: "4:5",
    prompt: `Sulphur-crested cockatoo with crest raised, perched on a sandstone ledge, clean negative space, crisp white feathers against warm stone, ${STYLE}.`,
  },
  platypus: {
    id: "fauna-platypus",
    kind: "video",
    theme: "fauna",
    title: "Platypus",
    subtitle: "Ornithorhynchus anatinus",
    caption: "Eungella, QLD",
    alt: "Platypus swimming through a clear freshwater creek",
    aspect: "9:16",
    prompt: `Platypus swimming slowly through a clear freshwater creek, dappled sunlight on river stones, bubbles, gentle current, underwater wildlife cinematography, ${STYLE}. 8 seconds, seamless loop.`,
  },
  kookaburra: {
    id: "fauna-kookaburra",
    kind: "image",
    theme: "fauna",
    title: "Laughing Kookaburra",
    subtitle: "Dacelo novaeguineae",
    caption: "Blue Mountains, NSW",
    alt: "Laughing kookaburra perched on a weathered branch",
    aspect: "4:5",
    prompt: `Laughing kookaburra perched on a weathered grey branch, early morning light, textured feathers, blurred eucalyptus background, ${STYLE}.`,
  },
  quokka: {
    id: "fauna-quokka",
    kind: "image",
    theme: "fauna",
    title: "Quokka",
    subtitle: "Setonix brachyurus",
    caption: "Rottnest Island, WA",
    alt: "Quokka sitting among coastal scrub on Rottnest Island",
    aspect: "4:5",
    prompt: `Quokka sitting among coastal scrub on Rottnest Island, soft golden light, turquoise bay blurred in the background, gentle and curious expression, ${STYLE}.`,
  },

  /* Flora */
  waratah: {
    id: "flora-waratah",
    kind: "image",
    theme: "flora",
    title: "Waratah",
    subtitle: "Telopea speciosissima",
    caption: "Floral emblem of NSW",
    alt: "Crimson waratah flower in close-up",
    aspect: "4:5",
    prompt: `Macro botanical study of a crimson waratah flower, symmetrical structure like a vaulted dome, dark neutral background, studio still life lighting, ${STYLE}.`,
  },
  banksia: {
    id: "flora-banksia",
    kind: "image",
    theme: "flora",
    title: "Banksia",
    subtitle: "Banksia serrata",
    caption: "Sandstone heath",
    alt: "Banksia cone and serrated leaves in soft light",
    aspect: "4:5",
    prompt: `Close study of an old man banksia cone and serrated leaves, sculptural textures, warm side light on a plain sandstone wall, botanical monograph, ${STYLE}.`,
  },
  wattle: {
    id: "flora-golden-wattle",
    kind: "image",
    theme: "flora",
    title: "Golden Wattle",
    subtitle: "Acacia pycnantha",
    caption: "National floral emblem",
    alt: "Golden wattle blossoms glowing in sunlight",
    aspect: "4:5",
    prompt: `Golden wattle blossoms glowing in late sunlight, soft pom-pom flowers, shallow depth of field, gentle breeze, ${STYLE}.`,
  },
  kangarooPaw: {
    id: "flora-kangaroo-paw",
    kind: "image",
    theme: "flora",
    title: "Kangaroo Paw",
    subtitle: "Anigozanthos manglesii",
    caption: "Floral emblem of WA",
    alt: "Red and green kangaroo paw flowers against the sky",
    aspect: "4:5",
    prompt: `Red and green kangaroo paw flowers against a clear pale sky, graphic silhouette, velvety texture, minimalist composition, ${STYLE}.`,
  },
  ghostGum: {
    id: "flora-ghost-gum",
    kind: "image",
    theme: "flora",
    title: "Ghost Gum",
    subtitle: "Corymbia aparrerinja",
    caption: "West MacDonnell Ranges, NT",
    alt: "White-trunked ghost gum against red ranges",
    aspect: "16:9",
    prompt: `A lone white-trunked ghost gum against the red West MacDonnell Ranges, strong midday light, deep blue sky, Albert Namatjira-inspired composition, ${STYLE}.`,
  },
} as const satisfies Record<string, FlowMediaItem>;

export type FlowMediaKey = keyof typeof FLOW_MEDIA;

/** Landmarks/places cycled as "site plates" for projects without an image */
export const PROJECT_SITE_PLATES: readonly FlowMediaItem[] = [
  FLOW_MEDIA.operaHouse,
  FLOW_MEDIA.twelveApostles,
  FLOW_MEDIA.kingsCanyon,
  FLOW_MEDIA.barrierReef,
  FLOW_MEDIA.blueMountains,
  FLOW_MEDIA.bondiIcebergs,
  FLOW_MEDIA.ghostGum,
  FLOW_MEDIA.outbackRoad,
];

/** Field atlas — fauna & flora strip on the home page */
export const FIELD_ATLAS: readonly FlowMediaItem[] = [
  FLOW_MEDIA.kangaroo,
  FLOW_MEDIA.waratah,
  FLOW_MEDIA.koala,
  FLOW_MEDIA.banksia,
  FLOW_MEDIA.cockatoo,
  FLOW_MEDIA.wattle,
  FLOW_MEDIA.platypus,
  FLOW_MEDIA.kangarooPaw,
  FLOW_MEDIA.kookaburra,
  FLOW_MEDIA.quokka,
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
): FlowMediaItem => sitePlateFor(Math.max(0, projectIds.indexOf(projectId)));

/** Place & species names for marquee ribbons */
export const PLACE_NAMES = [
  "Uluṟu",
  "Kata Tjuṯa",
  "Kakadu",
  "Daintree",
  "Great Barrier Reef",
  "Twelve Apostles",
  "Blue Mountains",
  "Bondi",
  "Kings Canyon",
  "Sydney Harbour",
] as const;

export const SPECIES_NAMES = [
  "Red Kangaroo",
  "Waratah",
  "Koala",
  "Banksia",
  "Cockatoo",
  "Golden Wattle",
  "Platypus",
  "Kangaroo Paw",
  "Kookaburra",
  "Quokka",
] as const;

/**
 * Chatbot mascot — "Kobi" the quokka. Generate in Google Flow with the same
 * character description in both prompts so the two images match.
 */
const KOBI =
  "a friendly cartoon quokka mascot named Kobi, round fluffy sandy-brown fur, big warm smile, small round ears, dark curious eyes, wearing a tiny seafoam-green bandana, soft 3D Pixar-style character render, gentle rim light";

export const MASCOT = {
  avatar: {
    id: "mascot-kobi",
    kind: "image",
    theme: "fauna",
    title: "Kobi",
    subtitle: "Setonix brachyurus · site assistant",
    caption: "Rottnest Island, WA",
    alt: "",
    aspect: "1:1",
    prompt: `Head-and-shoulders portrait of ${KOBI}, facing camera and smiling, centred with space around the head so it crops cleanly into a circle, flat deep navy (#0d2b45) background, no text, no watermark.`,
  },
  full: {
    id: "mascot-kobi-full",
    kind: "image",
    theme: "fauna",
    title: "Kobi",
    subtitle: "Setonix brachyurus · site assistant",
    caption: "Rottnest Island, WA",
    alt: "",
    aspect: "4:5",
    prompt: `Full-body shot of ${KOBI}, sitting on a smooth sandstone rock and waving hello with one paw, flat deep navy (#0d2b45) background, whole character in frame with generous margins, no text, no watermark.`,
  },
} as const satisfies Record<string, FlowMediaItem>;
