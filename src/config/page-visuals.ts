/**
 * Hero imagery (Pexels — free for commercial use, no on-image attribution required).
 * @see https://www.pexels.com/license/
 */

export type PageVisualKey =
  | "resume"
  | "projects"
  | "experience"
  | "contact"
  | "learning";

export interface PageVisual {
  readonly src: string;
  readonly alt: string;
}

const pexels = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

export const PAGE_VISUALS: Record<PageVisualKey, PageVisual> = {
  resume: {
    src: pexels(590022, 720, 900),
    alt: "Notebook and pen on a desk for resume and career planning",
  },
  projects: {
    src: pexels(11035471, 720, 900),
    alt: "Developer workspace with code on screen",
  },
  experience: {
    src: pexels(3184418, 720, 900),
    alt: "Colleagues collaborating at a table in a modern office",
  },
  contact: {
    src: pexels(7688338, 720, 900),
    alt: "Person typing on a laptop for remote communication",
  },
  learning: {
    src: pexels(159775, 720, 900),
    alt: "Library shelves with books and warm lighting",
  },
};
