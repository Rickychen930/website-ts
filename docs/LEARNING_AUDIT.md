# Learning Section – Audit & Improvements

Summary of the audit and improvements applied so the learning section is more consistent, maintainable, and robust.

---

## 0. Full audit checklist

| Area                     | Status | Notes                                                                                                                                                                                                                                                      |
| ------------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Routing**              | ✅     | `/learning`, `/learning/:sectionSlug`, `/learning/:sectionSlug/:topicId`; topic detail route is defined before section-only so the match is correct.                                                                                                       |
| **Profile & API**        | ✅     | ProfileController getProfile → transformProfile → learningSections; updateProfile accepts learningSections and preserves item.id.                                                                                                                          |
| **Seed**                 | ✅     | seedData imports learningSections from learningSeed; buildLearningSections sorts by order; imageMap covers all imageKeys.                                                                                                                                  |
| **Frontend state**       | ✅     | useProfile() → getPublishedLearningSections() (filter published + sort by order).                                                                                                                                                                          |
| **Fallback profile**     | ✅     | FALLBACK_PROFILE has learningSections: [] so the shape is explicit when the backend is down (dev).                                                                                                                                                         |
| **Topic URL**            | ✅     | Links use encodeURIComponent(item.id); detail page uses decodeURIComponent(topicId) to resolve the topic.                                                                                                                                                  |
| **Section themes**       | ✅     | All slugs in use (+ software-design, english-learning, data-analytics, ai-ml, programming-languages, backend) have an entry in sectionThemes; fallback indigo + book.                                                                                      |
| **Sitemap**              | ✅     | LEARNING_SECTION_SLUGS in generate-sitemap.js is aligned with learningSeed (17 sections); sitemap.xml only includes existing section URLs.                                                                                                                 |
| **SkipLinks**            | ✅     | On /learning and /learning/\* there is a skip link to #learning, #learning-section, or #learning-topic-detail.                                                                                                                                             |
| **Admin**                | ✅     | AdminLearning loads/saves profile.learningSections; backend stores items with id, title, content, etc.                                                                                                                                                     |
| **Empty / not found**    | ✅     | Section with 0 topics → empty state. Unknown section slug → Navigate to /learning. Unknown topic → Navigate to /learning. Catch-all route `path="*"` shows the NotFound page (title, requested path, link to Home & Learning) instead of redirecting to /. |
| **Content completeness** | ✅     | Every topic has 8 contentBlocks (learningFlow, material, explanation, application, howToImplement, logicAndCode, example, additionalInfo) and codeExample + codeLanguage. See §6 for the list of sections and topics.                                      |

---

## 1. Audit findings (previous fixes)

### 1.1 Section and topic order

- **Problem:** `getPublishedLearningSections()` only filtered by `published` and did not sort by `order`. Display order depended on the array order from the API.
- **Fix:** Explicit sort: `filter(...).sort((a, b) => a.order - b.order)` in `ProfileModel.getPublishedLearningSections()`. In the seed, `buildLearningSections()` also sorts sections and items by `order` so output is always ordered.

### 1.2 Duplicate logic

- **Problem:** `isPlaceholderImage()` was defined in both `LearningSectionPage.tsx` and `LearningTopicDetail.tsx`.
- **Fix:** Moved to `sectionThemes.tsx` and exported; both pages import from there.

### 1.3 Content label sync

- **Problem:** The 8 content labels (Learning flow, Material, …) lived in both backend (`CONTENT_SECTION_LABELS`) and frontend (`SECTION_LABELS`). Changing one could get out of sync.
- **Fix:** Comment added in `LearningTopicDetail.tsx`: "Must match backend learningSeedStructure CONTENT_SECTION_LABELS". Backend remains the single source of truth for the seed; frontend only displays.

### 1.4 Back to top

- **Problem:** The "Back to top" button only showed when `sections.length > 6`. With exactly 6 sections it did not appear.
- **Fix:** Condition changed to `sections.length >= 6`.

### 1.5 Section without slug

- **Problem:** If a section had no `slug`, the card link pointed to `"#"` (dead link).
- **Fix:** Fallback `to="/learning"` when `!section.slug` so the card still navigates to Learning.

### 1.6 Seed builder

- **Problem:** Section/topic order in the output depended on input order; there was no guaranteed sort.
- **Fix:** In `buildLearningSections()`: items are sorted by `order`, then sections by `order`. Docs updated: if `imageMap[imageKey]` is missing, `imageUrl` is undefined (UI uses gradient fallback).

---

## 2. Consistency checklist

| Aspect                      | Status                                                                                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Section order (frontend)    | ✅ Sort by `order` in `getPublishedLearningSections()`                                                                                                             |
| Section order (seed output) | ✅ Sort in `buildLearningSections()`                                                                                                                               |
| Topic order within section  | ✅ Sort items by `order` in `buildLearningSections()`; frontend uses `getPublishedLearningSections()` which returns items already sorted (views do not sort again) |
| 8-part labels               | ✅ Same in backend and frontend; sync comment present                                                                                                              |
| Image fallback              | ✅ `isPlaceholderImage` used consistently; single definition in `sectionThemes`                                                                                    |
| Theme per slug              | ✅ All slugs in use (how-to-learn, competitive-programming, react, nodejs, database-sql, interview-preparation, etc.) have an entry in `sectionThemes`             |

---

## 3. Fixes from full audit

- **FALLBACK_PROFILE:** Added `learningSections: []` so the profile shape is complete when the backend is unavailable (dev).
- **Sitemap:** `LEARNING_SECTION_SLUGS` in `scripts/generate-sitemap.js` aligned with sections in `learningSeed.ts` (17 slugs). Sitemap no longer includes non-existent section URLs (avoids soft-404).

## 4. Latest changes (post-audit)

- **CodeBlock:** **Copy** button in header; `handleCopy` uses `navigator.clipboard.writeText(code)`, `copied` state for 2s, labels "Copy" / "Copied!", `aria-label`. `prefers-reduced-motion: reduce` disables `transform: scale(0.98)` on `:active`.
- **Learning empty state:** Message clarified: "No learning sections published yet." + "Run the seed script to load the curriculum, or check back later."
- **Node.js:** New topic **Express & REST** (order 1): minimal API with Express, routes, middleware, `express.json()`, GET/POST, error middleware; imageKey `nodejs`.
- **Section page (0 topics):** Empty state clarified: text "No topics in this section yet. Check back later." + link **Browse other sections** to `/learning`.
- **Seed validation:** Script `npm run learning:validate` runs `backend/src/seed/learningSeed.ts`; can be used in CI. LEARNING_CONTRIBUTING.md §5 references this script.
- **A11y topic detail:** Prev/next links in the footer have `aria-label` ("Previous topic: …", "Next topic: …").
- **Seed validation (kebab-case):** `validateLearningSeed` checks that section `slug` and topic `id` are kebab-case so URLs stay consistent.
- **Skip link focus target:** Learning sections (`#learning`, `#learning-section`, `#learning-topic-detail`) use `tabIndex={-1}` so when "Skip to curriculum" is used, focus moves to the target and keyboard users are not stuck in the header.
- **SkipLinks announcement:** Announcement text (aria-live) is tailored per target: "main content", "navigation", "contact form", "curriculum", "section topics", "topic content".
- **Learning view consistency:** (1) Learning empty state uses `tabIndex={-1}` and `variant="alt"` so the skip target and layout match the page with sections. (2) Section layout: skip target (section with `tabIndex={-1}`) gets focus outline in `.section[tabindex="-1"]:focus-visible` (Section.module.css). (3) "Back to Learning" and "Back to {section}" links have `aria-label` ("Back to Learning overview", "Back to section: …") for a11y.
- **Print Section page:** LearningSectionPage.module.css has `@media print`: wrapper max-width 100%, breadcrumb/link text color primary, topicItem break-inside avoid, footer and backLink tidy so printing the topic list per section matches Topic detail.
- **Topic order in one place:** `ProfileModel.getPublishedLearningSections()` now returns sections with `items` already sorted by `order`, so views (LearningSectionPage, LearningTopicDetail) do not sort again; order logic is centralized in the model.
- **SeedData:** Comment in `seedData.ts` states that `learningSections` is imported from `learningSeed` and must pass `npm run learning:validate`; reminds not to inline or edit sections/topics in `learningSeed.ts` directly elsewhere.

## 5. Recommendations

1. **Seed validation:** In development, consider adding assertions: every topic `imageKey` exists in `IMG`, and every section `slug` exists in `sectionThemes`. _(Done: `validateLearningSeed()` in learningSeedStructure.ts checks imageKey in imageMap and slug kebab-case; sectionThemes.tsx has entries for all 17 section slugs.)_
2. **Shared constants:** If the monorepo allows, consider a single shared file (e.g. `CONTENT_SECTION_LABELS`) imported by both backend and frontend so labels are truly a single source of truth.
3. **A11y:** aria-labels are in place on cards, topic lists, and breadcrumb; keep them and test with a screen reader when possible.
4. **SEO:** Page title/description for Learning and section pages are set via `useSEO`; topic detail uses topic title + section + profile name.
5. **Sitemap:** Whenever you add or remove a section in learningSeed, update `LEARNING_SECTION_SLUGS` in `scripts/generate-sitemap.js` and run `npm run sitemap:generate` (or the build step that runs it).

---

## 6. Completeness verification (final checklist)

| Item                              | Location / how to check                                                                                                                     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 8-part labels in sync             | Backend `CONTENT_SECTION_LABELS` (learningSeedStructure.ts) = frontend `SECTION_LABELS` (LearningTopicDetail.tsx)                           |
| FALLBACK_PROFILE.learningSections | ProfileService.ts → `learningSections: []`                                                                                                  |
| Skip target + outline             | Learning Section uses `tabIndex={-1}`; Section.module.css `.section[tabindex="-1"]:focus-visible`                                           |
| Seed validation                   | `npm run learning:validate` (package.json); kebab-case + imageKey in validateLearningSeed                                                   |
| Sitemap 17 sections               | scripts/generate-sitemap.js LEARNING_SECTION_SLUGS = 17 slugs; learningSeed sectionConfigs = 17                                             |
| Section themes 17 slugs           | sectionThemes.tsx slugToTheme includes software-design, english-learning, data-analytics, ai-ml, programming-languages, backend             |
| Section & item order              | ProfileModel.getPublishedLearningSections() filters published + sorts sections + maps items sorted; views use section.items without sorting |
| NotFound catch-all                | App.tsx Route path="\*" element={<NotFound />}; src/views/pages/NotFound/                                                                   |
| LEARNING_CONTRIBUTING validation  | §3 and §5 reference `npm run learning:validate`                                                                                             |

**List of sections and topics (all have 8 parts + code example):**

| Section                    | Topic                                | 8 blocks | codeExample   |
| -------------------------- | ------------------------------------ | -------- | ------------- |
| How to Learn               | Learning Path & Study Tips           | ✅       | ✅ text       |
| Competitive Programming    | Complexity & Strategy                | ✅       | ✅ cpp        |
|                            | Sorting & Searching                  | ✅       | ✅ cpp        |
|                            | Prefix Sum & Sliding Window          | ✅       | ✅ cpp        |
|                            | Dynamic Programming                  | ✅       | ✅ cpp        |
|                            | Greedy Algorithms                    | ✅       | ✅ cpp        |
|                            | Graphs: BFS & DFS                    | ✅       | ✅ cpp        |
| Node.js                    | Event Loop & Async                   | ✅       | ✅ javascript |
|                            | Express & REST                       | ✅       | ✅ javascript |
| Database & SQL             | SQL Queries                          | ✅       | ✅ sql        |
|                            | Indexes & Query Performance          | ✅       | ✅ sql        |
| React                      | Fundamentals & JSX                   | ✅       | ✅ javascript |
|                            | Hooks                                | ✅       | ✅ javascript |
|                            | Context & State Management           | ✅       | ✅ javascript |
|                            | Routing & Data Fetching              | ✅       | ✅ javascript |
| Interview Preparation      | Coding Interviews                    | ✅       | ✅ javascript |
|                            | System Design & Behavioral           | ✅       | ✅ text       |
| System Design              | System Design Basics                 | ✅       | ✅ text       |
|                            | Scaling, Caching & Message Queues    | ✅       | ✅ text       |
| CS Theory                  | Graphs & Trees                       | ✅       | ✅ javascript |
|                            | Heaps, Tries & Advanced Structures   | ✅       | ✅ python     |
| Computer Networks          | HTTP & TCP Basics                    | ✅       | ✅ text       |
| OS & Concurrency           | Processes, Threads & Concurrency     | ✅       | ✅ text       |
| Security                   | Security Basics                      | ✅       | ✅ text       |
| Software Design Principles | OOP, SOLID, DRY & KISS               | ✅       | ✅ typescript |
| English for IELTS 8        | IELTS 8 Complete Guide               | ✅       | ✅ text       |
| Data Analytics             | Data Analytics Foundations           | ✅       | ✅ sql        |
|                            | Data Analytics Advanced              | ✅       | ✅ python     |
| AI & Machine Learning      | ML Foundations                       | ✅       | ✅ python     |
|                            | Deep Learning & NLP Overview         | ✅       | ✅ python     |
| Programming Languages      | C++ for CP & Systems                 | ✅       | ✅ cpp        |
|                            | Python for Data & Backend            | ✅       | ✅ python     |
|                            | TypeScript for Frontend & Full-Stack | ✅       | ✅ typescript |
| Backend Development        | REST API Design                      | ✅       | ✅ text       |
|                            | Auth & Databases in Backend          | ✅       | ✅ javascript |

**Total: 17 sections, 66 topics.** Every topic has 8 content blocks + a code example. (Competitive Programming alone has 20 topics; see `learningSeed.ts` for the full list.) Every topic has **learningFlowIntro** (Your first step, Prerequisites, By the end) so content is structured and ready to study. Every `imageKey` exists in `IMG`; every section `slug` exists in sectionThemes and LEARNING_SECTION_SLUGS.
