# Learning Feature – Complete & Detailed Check

This document ensures the Learning feature meets the **requested criteria**, is **fully documented**, and **detailed** (files, routes, data, and how to verify).

---

## A. User criteria → implementation mapping

| Requested criteria                           | Status | Implementation                                                                                                                                        |
| -------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SOLID, OOP, DRY, KISS**                    | ✅     | Code uses the design system; single data source (profile); reusable components (Section, Typography, Card, Button); Admin reuses `Admin.module.css`.  |
| **Design system, component-based, reusable** | ✅     | Design tokens; components from `views/components/layout` and `views/components/ui`; Learning page uses Section, Typography, Card.                     |
| **Seed aligned with model**                  | ✅     | Seed `backend/src/seed/learningSeed.ts` exports `learningSections`; `seedData.ts` imports it; `npm run learning:validate` and `npm run seed` succeed. |
| **Integrated with admin dashboard**          | ✅     | Sidebar Admin: Content → Learning (`/admin/learning`); Dashboard shows section count + link; breadcrumb "Learning".                                   |
| **New section & new page**                   | ✅     | Public page `/learning` (Learning.tsx); admin page `/admin/learning` (AdminLearning.tsx).                                                             |
| **English language**                         | ✅     | All UI text and curriculum (section/topic title & description, docs) in English.                                                                      |
| **Complete & detailed material**             | ✅     | 17 sections, 35 topics in seed; curriculum ready for top-tech interviews; editable in Admin → Learning.                                               |

---

## B. Data layer (detail)

| Aspect                      | Location                                           | Description                                                                                                                                                                    |
| --------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Types (frontend)**        | `src/types/domain.ts`                              | `LearningTopicItem` (id, title, description?, order, content?, codeExample?, codeLanguage?, imageUrl?), `LearningSection`, `Profile.learningSections?`.                        |
| **Types (backend)**         | `backend/src/types/domain.ts`                      | Same interfaces for transform output.                                                                                                                                          |
| **Profile model**           | `backend/src/models/Profile.ts`                    | `IProfile.learningSections?` (array); schema default `[]`.                                                                                                                     |
| **Transform**               | `backend/src/utils/transformProfile.ts`            | Reads `profile.learningSections`, maps each section & item, assigns `id` (extractId), outputs to API response.                                                                 |
| **Update + sanitize**       | `backend/src/controllers/ProfileController.ts`     | `updateProfile`: destructure `learningSections` from body; if array, sanitize (title, slug, order, published, items with fallbacks) then assign to `profile.learningSections`. |
| **Seed**                    | `backend/src/seed/learningSeed.ts` → `seedData.ts` | `learningSections` built by `buildLearningSections(sectionConfigs, IMG)`; 17 sections, 35 topics.                                                                              |
| **ProfileModel (frontend)** | `src/models/ProfileModel.ts`                       | `learningSections` readonly; `getPublishedLearningSections()` returns sections with `published === true`, sorted by `order`; items sorted by `order`.                          |

---

## C. Public site (detail)

| Aspect          | Location / Value                                               | Description                                                                                                                    |
| --------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Route**       | `App.tsx`: `<Route path="/learning" element={<Learning />} />` | Lazy-loaded via `React.lazy`.                                                                                                  |
| **Page**        | `src/views/pages/Learning/Learning.tsx`                        | Get profile from `useProfile()`; `sections = profile.getPublishedLearningSections()`; render Section + quick nav + grid cards. |
| **Section id**  | `id="learning"` on `<Section>`                                 | For skip link and anchor.                                                                                                      |
| **Empty state** | Text: "No learning sections published yet. …"                  | When `sections.length === 0`.                                                                                                  |
| **Loading**     | `<Loading fullScreen message="Loading curriculum..." />`       | When `isLoading`.                                                                                                              |
| **Error**       | `<PageError ... onRetry={refetch} />`                          | When `error` or `!profile`.                                                                                                    |
| **Quick nav**   | "Jump to:" + list of links to `/learning/{slug}`               | Only when `sections.length > 1`.                                                                                               |
| **SEO**         | `useSEO({ title, description, keywords, type: "profile" })`    | Title uses profile name when available.                                                                                        |
| **Sitemap**     | `scripts/generate-sitemap.js`                                  | Route `/learning` and `/learning/{slug}` for each section; priority 0.75.                                                      |
| **Styles**      | `src/views/pages/Learning/Learning.module.css`                 | Design tokens (spacing, colors); print `break-inside: avoid`; reduced-motion for transitions.                                  |

---

## D. Admin (detail)

| Aspect            | Location / Value                                                                                                                                                                | Description                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Route**         | `App.tsx`: `<Route path="learning" element={<AdminLearning />} />` under `/admin`                                                                                               | Requires admin login.                                                                                                       |
| **Sidebar**       | `AdminLayout.tsx`: Content group, item `{ to: "/admin/learning", label: "Learning", icon: "book-open" }`                                                                        | Book-open icon.                                                                                                             |
| **Breadcrumb**    | `routeTitles["/admin/learning"] = "Learning"`                                                                                                                                   | In `AdminLayout.tsx`.                                                                                                       |
| **Dashboard**     | `AdminDashboard.tsx`: shortcut `{ label: "Learning", value: counts.learningSections ?? 0, to: "/admin/learning" }`                                                              | Backend sends `counts.learningSections`.                                                                                    |
| **Backend stats** | `AdminController.ts`: `learningSectionsCount = profile?.learningSections?.length ?? 0`                                                                                          | Sent in `getStats` response.                                                                                                |
| **Page**          | `src/views/pages/Admin/AdminLearning.tsx`                                                                                                                                       | Load profile via `adminService.getProfile()`; local state for sections; Save all via `adminService.updateProfile(profile)`. |
| **CRUD**          | Add section, Delete section; per section: Title, Slug, Description, Order, Published; Add topic, Remove topic; per topic: title, description, order, content, codeExample, etc. | Slug can be derived from title; expand/collapse per section.                                                                |
| **Export**        | `src/views/pages/Admin/index.ts`: `export { AdminLearning }`                                                                                                                    | So lazy load in App can resolve.                                                                                            |

---

## E. Navigation & layout (detail)

| Aspect        | Location                    | Value                                                                                                                                                                                             |
| ------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Header**    | `Header.tsx`: `navItems`    | Includes `{ path: "/learning", label: "Learning" }` and `{ path: "/resume", label: "Resume" }`.                                                                                                   |
| **Footer**    | `Footer.tsx`: `footerLinks` | Includes `/learning` and `/resume` (same order as header).                                                                                                                                        |
| **Skip link** | `SkipLinks.tsx`             | When `pathname` is `/learning` or starts with `/learning/`: link "Skip to curriculum" to `#learning`, `#learning-section`, or `#learning-topic-detail`; scroll respects `prefers-reduced-motion`. |
| **404**       | `App.tsx`                   | `<Route path="*" element={<NotFound />} />` (NotFound page with link to Home & Learning).                                                                                                         |

---

## F. Curriculum material (complete & detailed)

Current curriculum: **17 sections, 35 topics**. Data is in **`backend/src/seed/learningSeed.ts`** (sectionConfigs) and built by `buildLearningSections`; `seedData.ts` imports `learningSections`. After `npm run seed`, data is stored in MongoDB and shown at `/learning`. Editable via **Admin → Learning**.

Each topic has:

- **8 content parts** (learningFlow, material, explanation, application, howToImplement, logicAndCode, example, additionalInfo) serialized in `content`
- **learningFlowIntro** (Your first step, Prerequisites, By the end) for structured onboarding
- **codeExample** and **codeLanguage**
- **imageKey** (mapped to imageUrl via IMG in learningSeed)

See **LEARNING_AUDIT.md §6** for the full list of sections and topics.

---

## G. Code quality & resilience

| Aspect               | Description                                                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **DRY**              | Single data source (profile); Admin uses `Admin.module.css`; no duplicate types (domain types shared between frontend and backend).     |
| **TypeScript**       | Strict domain types; no `any` in Learning/AdminLearning.                                                                                |
| **Hooks**            | In Learning views, hooks are called before any early return (rules of hooks).                                                           |
| **Backend sanitize** | Each section: title, slug, order, published, items; each item: title, description, order, content, codeExample, codeLanguage, imageUrl. |
| **A11y**             | Skip to curriculum; `aria-label` on nav and lists; focus-visible on quick nav and links; reduced-motion for scroll and CSS transitions. |
| **Print**            | Learning cards use `break-inside: avoid` so they are not split when printing.                                                           |

---

## H. How to verify (step-by-step)

1. **Seed**
   - Run in project root: `npm run learning:validate` (then in backend if needed: `npm run seed`).
   - Ensure: no errors; seed loads 17 sections, 35 topics.

2. **Public Learning**
   - Open `/learning`.
   - Expect: **17 section** cards; "Jump to:" with links to each section; click a card → section page; open a topic → topic detail with 8-part content and code.

3. **Admin**
   - Log in at `/admin/login`.
   - Dashboard: shortcut "Learning" with count and link to `/admin/learning`.
   - Sidebar: Content → "Learning" (book-open icon).
   - Open `/admin/learning`: list of sections; expand section → edit fields, topics; Save all → refresh `/learning` → changes visible.

4. **Navigation**
   - Header and Footer: link "Learning" and "Resume".
   - On `/learning`, tab until skip link "Skip to curriculum" → Enter → focus moves to learning content.

5. **404**
   - Open invalid URL (e.g. `/invalid`) → NotFound page with link to Home and Learning.

---

## I. Summary

- **Requested criteria**: SOLID, OOP, DRY, KISS; design system & reusable components; seed aligned; integrated admin; new section & page; English; complete and detailed material → **all met**.
- **Documentation**: Data layer, public site, admin, navigation, curriculum (**17 sections, 35 topics**), code quality, and verification steps are documented above.
- **Material**: **Complete** (17 sections, 35 topics) with 8-part content + learningFlowIntro + code example per topic; editable in Admin.

After `npm run seed` in the backend (or using the validated learning seed), all material is available at `/learning` and manageable in Admin → Learning.
