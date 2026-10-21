/**
 * Renders the site's motion-graphic loops (public/media/flow/*.mp4 + poster).
 *
 *   FFMPEG=/path/to/ffmpeg node scripts/motion/render-videos.js [id ...]
 *
 * Each scene in render.html is drawn frame by frame in headless Chromium
 * (Playwright) and piped to ffmpeg. All motion is periodic over 8 s, so the
 * clips loop seamlessly. Jobs (scene, size, file id, CRF) live in jobs.txt.
 */
const path = require("path");
const fs = require("fs");
const { spawn, spawnSync } = require("child_process");
// `playwright` if installed, else `playwright-core` driving a local Chrome
// (CHROME=/path/to/chrome, PW=/path/to/playwright-core)
const { chromium } = require(process.env.PW || "playwright");

const FF = process.env.FFMPEG || "ffmpeg";
const OUT = path.resolve(__dirname, "../../public/media/flow");
const PAGE = "file://" + path.resolve(__dirname, "render.html");
// 30 fps divides evenly into 60 Hz screens; 24 fps judders (3:2 pulldown)
const FPS = 30;
const FRAMES = FPS * 8;

const jobs = fs
  .readFileSync(path.join(__dirname, "jobs.txt"), "utf8")
  .trim()
  .split("\n")
  .map((l) => l.trim().split(/\s+/))
  .filter(([, , , id]) => process.argv.length < 3 || process.argv.includes(id));

(async () => {
  const browser = await chromium.launch(
    process.env.CHROME ? { executablePath: process.env.CHROME } : {},
  );
  for (const [scene, w, h, id, crf] of jobs) {
    const mp4 = path.join(OUT, `${id}.mp4`);
    const ff = spawn(FF, [
      "-y",
      "-loglevel",
      "error",
      "-f",
      "image2pipe",
      "-framerate",
      String(FPS),
      "-i",
      "-",
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-crf",
      crf,
      "-profile:v",
      "high",
      "-g",
      String(FPS * 2),
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      "-an",
      mp4,
    ]);
    const page = await browser.newPage({ viewport: { width: +w, height: +h } });
    await page.goto(`${PAGE}?scene=${scene}&w=${w}&h=${h}`);
    for (let i = 0; i < FRAMES; i++) {
      await page.evaluate(([n, f]) => window.renderFrame(n, f), [i, FPS]);
      const buf = await page.screenshot({ type: "jpeg", quality: 96 });
      if (!ff.stdin.write(buf))
        await new Promise((r) => ff.stdin.once("drain", r));
    }
    ff.stdin.end();
    await new Promise((r) => ff.on("close", r));
    await page.close();
    spawnSync(FF, [
      "-y",
      "-loglevel",
      "error",
      "-i",
      mp4,
      "-frames:v",
      "1",
      "-q:v",
      "3",
      path.join(OUT, `${id}.jpg`),
    ]);
    console.log(`✓ ${id}`);
  }
  await browser.close();
})();
