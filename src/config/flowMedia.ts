/**
 * Google Flow media manifest — Kobi, the site's chatbot mascot.
 *
 * The site itself is code-drawn (Graphite Signal theme: aurora backdrop,
 * generated project covers). Only the mascot is generated in Google Flow:
 * save each asset to `public/media/flow/<id>.webp` (transparent background). If a file is missing the
 * chat falls back to an inline SVG quokka.
 */

export interface FlowMediaItem {
  readonly id: string;
  readonly kind: "image";
  readonly title: string;
  readonly alt: string;
  /** Aspect used when generating in Flow */
  readonly aspect: "1:1" | "4:5";
  /** Prompt to paste into Google Flow */
  readonly prompt: string;
}

export const FLOW_MEDIA_BASE = "/media/flow";

export const flowSrc = (item: FlowMediaItem): string =>
  `${FLOW_MEDIA_BASE}/${item.id}.webp`;

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
    title: "Kobi",
    alt: "",
    aspect: "1:1",
    prompt: `Head-and-shoulders portrait of ${KOBI}, facing camera and smiling, centred with space around the head so it crops cleanly into a circle, flat near-black graphite (#0a0a0c) background, no text, no watermark.`,
  },
  full: {
    id: "mascot-kobi-full",
    kind: "image",
    title: "Kobi",
    alt: "",
    aspect: "4:5",
    prompt: `Full-body shot of ${KOBI}, sitting on a smooth sandstone rock and waving hello with one paw, flat near-black graphite (#0a0a0c) background, whole character in frame with generous margins, no text, no watermark.`,
  },
} as const satisfies Record<string, FlowMediaItem>;
