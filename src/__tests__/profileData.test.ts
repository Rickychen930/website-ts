import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { PROFILE } from "@/data/profile";
import { PROJECT_CATEGORY_LABEL } from "@/config/site-defaults";
import {
  FLOW_MEDIA,
  HARDWARE_ATLAS,
  PROJECT_SITE_PLATES,
} from "@/config/flowMedia";
import { siteProfile } from "../../backend/src/data/siteProfile";

const MEDIA_DIR = path.resolve(__dirname, "../../public/media/flow");

describe("portfolio content (src/data/profile.ts)", () => {
  test("every project has a unique id and the fields the UI renders", () => {
    const ids = PROFILE.projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const p of PROFILE.projects) {
      expect(p.title.trim()).not.toBe("");
      expect(p.description.trim()).not.toBe("");
      expect(p.technologies.length).toBeGreaterThan(0);
      expect(Object.keys(PROJECT_CATEGORY_LABEL)).toContain(p.category);
      expect(Number.isNaN(new Date(p.startDate).getTime())).toBe(false);
    }
  });

  test("experiences have valid dates and one is current", () => {
    const invalid = PROFILE.experiences
      .filter((e) => {
        const start = new Date(e.startDate).getTime();
        const end = e.endDate ? new Date(e.endDate).getTime() : start;
        return Number.isNaN(start) || Number.isNaN(end) || end < start;
      })
      .map((e) => e.company);
    expect(invalid).toEqual([]);
    expect(PROFILE.experiences.some((e) => e.isCurrent)).toBe(true);
  });

  test("an email contact exists (Contact section and Kobi rely on it)", () => {
    expect(PROFILE.contacts.some((c) => c.type === "email")).toBe(true);
  });
});

describe("media manifest", () => {
  const plates = [
    ...Object.values(FLOW_MEDIA),
    ...HARDWARE_ATLAS,
    ...PROJECT_SITE_PLATES,
  ].filter((item) => item.kind === "video");

  test.each(Array.from(new Set(plates.map((p) => p.id))))(
    "%s has its video and poster in public/media/flow",
    (id) => {
      expect(fs.existsSync(path.join(MEDIA_DIR, `${id}.mp4`))).toBe(true);
      expect(fs.existsSync(path.join(MEDIA_DIR, `${id}.jpg`))).toBe(true);
    },
  );
});

describe("media is committable", () => {
  test("no file in public/media/flow matches .gitignore", () => {
    // e.g. `*key*` (secrets) once swallowed atlas-keyboard.mp4, so it never
    // reached production even though it existed on disk
    const files = fs
      .readdirSync(MEDIA_DIR)
      .map((f) => path.join("public/media/flow", f));
    const res = spawnSync("git", ["check-ignore", ...files], {
      cwd: path.resolve(__dirname, "../.."),
      encoding: "utf8",
    });
    expect(res.stdout.trim().split("\n").filter(Boolean)).toEqual([]);
  });
});

describe("chatbot snapshot", () => {
  test("backend siteProfile is in sync with src/data/profile.ts", () => {
    // Fails when content changed without `npm run sync:chat`.
    // Timestamps are stamped when the module loads, so they always differ.
    const plain = (profile: unknown) => {
      const { createdAt, updatedAt, ...rest } = JSON.parse(
        JSON.stringify(profile),
      );
      void createdAt;
      void updatedAt;
      return rest;
    };
    expect(plain(siteProfile)).toEqual(plain(PROFILE));
  });
});
