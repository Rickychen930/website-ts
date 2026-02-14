# Adding a Section or Topic to Learning

Short guide so that adding sections/topics stays consistent with structure and display.

---

## 1. Where to edit

- **Curriculum data:** `backend/src/seed/learningSeed.ts`
- **Structure & validation:** `backend/src/seed/learningSeedStructure.ts`
- **Theme (gradient + icon) per section:** `src/views/pages/Learning/sectionThemes.tsx`
- **Sitemap (section slugs):** `scripts/generate-sitemap.js` → `LEARNING_SECTION_SLUGS`

---

## 2. Adding a new section

1. **Theme**  
   In `sectionThemes.tsx`, add an entry to `slugToTheme`:
   - `"your-section-slug": { gradient: gradients.xxx, iconKey: "yyy" }`  
     Pick existing `gradients` and `iconKey` from the same file.

2. **Image**  
   In `learningSeed.ts`, add a key to the `IMG` object (e.g. `sectionName: "https://images.unsplash.com/..."`).

3. **Section data**  
   In `learningSeed.ts`, add one element to the `sectionConfigs` array:
   - `title`, `slug` (kebab-case, unique), `description`, `order`, `published: true`, `topics: [...]`.

4. **Sitemap**  
   In `scripts/generate-sitemap.js`, add the new slug to the `LEARNING_SECTION_SLUGS` array, then run:

   ```bash
   npm run sitemap:generate
   ```

   (or via `npm run build` if this script is run in prebuild.)

5. **Validation**  
   Every topic in the new section must have an `imageKey` that exists in `IMG`. Section `slug` and topic `id` must be **kebab-case** (lowercase, numbers, hyphens; e.g. `how-to-learn`, `event-loop-and-async`). Otherwise `validateLearningSeed` will throw when the seed is loaded.

---

## 3. Adding a new topic

1. In the right section, add one object to the `topics` array with:
   - `id`: kebab-case, unique (used in URL), e.g. `"topic-name"`
   - `title`, `description`, `order`
   - `imageKey`: key that exists in `IMG` (can reuse the same key as other topics)
   - `contentBlocks`: object with 8 fields (see `TopicContentBlocks` in `learningSeedStructure.ts`):
     - `learningFlow`: array of strings (4–6 steps)
     - `learningFlowIntro`: optional
     - `material`, `explanation`, `application`, `howToImplement`, `logicAndCode`, `example`, `additionalInfo`: strings
   - Optional: `codeExample`, `codeLanguage`

2. Follow the conventions in the comments in `learningSeedStructure.ts` (short paragraphs, bullets, **bold**, `code`, "Problem: ... Solution: ..." format in example).

3. After editing the seed, run validation:
   ```bash
   npm run learning:validate
   ```
   If any `imageKey` or `slug`/`id` is invalid, an error will be shown.

---

## 4. After changing the seed

- **Development:** Restart the backend if needed; run `npm run seed` if you want to refill the DB from the seed.
- **Sitemap:** If you add or remove a section, update `LEARNING_SECTION_SLUGS` and regenerate the sitemap.

## 5. Validation in CI

To keep the seed valid (slug, id, imageKey), run validation before build or in the pipeline:

```bash
npm run learning:validate
```

(The script runs `backend/src/seed/learningSeed.ts`; `validateLearningSeed` will throw if any imageKey or slug/id is invalid.)

If there are errors, fix `learningSeed.ts` or `IMG` until validation passes.
