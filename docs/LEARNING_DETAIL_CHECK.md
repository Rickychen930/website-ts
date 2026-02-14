# Learning Detail – Detail Check

**Date:** 14 February 2025  
**Scope:** Learning main, Section page, Topic Detail, model, seed, routing, accessibility

---

## Summary

| Area              | Status   | Notes                                                                                  |
| ----------------- | -------- | -------------------------------------------------------------------------------------- |
| Routing           | ✅ OK    | `/learning`, `/learning/:sectionSlug`, `/learning/:sectionSlug/:topicId` order correct |
| Model & Domain    | ✅ OK    | `LearningTopicItem` has `imageUrl`, `codeLanguage`; `LearningSection` complete         |
| Transform Profile | ✅ OK    | Backend sets `id` via `extractId` (ObjectId or fallback `learning-item-sIdx-iIdx`)     |
| Hero Image        | ✅ Fixed | Overlay gradient moved to `::after` so it appears above the image                      |
| Section Themes    | ✅ OK    | All 17 section slugs have gradient & icon                                              |
| Accessibility     | ✅ OK    | Breadcrumb, aria-label, focus-visible, TOC anchors                                     |
| Responsiveness    | ✅ OK    | clamp(), max-width, grid layout                                                        |

---

## 1. Routing & Navigation

- **Route order:** Topic detail (`:topicId`) is defined before section-only (`:sectionSlug`) – correct.
- **Breadcrumb:** Learning → Section → Topic (current).
- **Footer nav:** Prev topic | Back to Section | Next topic; `encodeURIComponent(topicId)` is used for safe URLs.
- **Jump to (Learning main):** `#section-{slug}` links to `id="section-{slug}"` on the Card.

---

## 2. Data Flow

### Backend → Frontend

- `transformProfile.ts` maps `learningSections` and `items` with `extractId`.
- Item `id`: `_id` from MongoDB (if present) or `learning-item-{sectionIdx}-{itemIdx}`.
- `imageUrl`, `codeExample`, `codeLanguage` are transformed correctly.

### Image Fallback

- **LearningSectionPage** & **LearningTopicDetail:** Use `item.imageUrl` or section theme gradient (no placehold.co); `isPlaceholderImage` in sectionThemes.
- Every card and detail always shows an image (gradient + icon if no imageUrl).

---

## 3. Fixes Applied

### Hero Overlay (LearningTopicDetail)

- **Before:** `::before` on `.heroFigure` – overlay behind the image.
- **After:** `::after` – gradient overlay appears above the image (better visuals).

---

## 4. Components & UX

### LearningTopicDetail

- Hero image: full-width, 21:9 ratio, `object-fit: cover`.
- Section cards: background, left border accent, hover shadow.
- Callouts: icons for Tip, Note, Important.
- TOC: shown when `blockOrder.length > 2`; anchors `#detail-heading-{key}`.
- Headings: `scroll-margin-top: 5rem` for scroll-to-heading when clicking TOC.

### LearningSectionPage

- Topic cards: thumbnail, index number, description clamped to 2 lines.
- Empty state: icon + text when section has no topics.

### Learning (main)

- Section cards: gradient banner, "Start here" badge for how-to-learn.
- Quick nav "Jump to" when sections > 1.

---

## 5. Edge Cases Handled

| Case                           | Handling                                    |
| ------------------------------ | ------------------------------------------- |
| Section not found              | `Navigate to="/learning"`                   |
| Topic not found                | `Navigate to="/learning"`                   |
| topicId encoded (spaces, etc.) | `decodeURIComponent(topicId)` before lookup |
| Topic with no content          | Hero + "No content for this topic yet."     |
| Section without slug           | Card not a link; quick nav shows text only  |
| Profile loading/error          | Loading spinner / PageError with Retry      |

---

## 6. Further Checks

### Backend API

- **ProfileController.getProfile:** Returns transformed profile (including learningSections).
- **ProfileController.updateProfile:** Accepts learningSections; maps `sec.items` with `title`, `description`, `order`, `content`, `codeExample`, `codeLanguage`, `imageUrl`; preserves `...item` (id is stored when present).
- **Transform:** `extractId(item, \`learning-item-${sIdx}-${iIdx}\`)`– id from MongoDB`\_id` or index-based fallback.

### ProfileService & ProfileContext

- Fetch from `/api/profile` → `ProfileModel.create(data)`.
- Cache 5 minutes; `refetch()` clears cache and reloads.
- Fallback (dev only): `FALLBACK_PROFILE` with `learningSections: []` – Learning page shows empty state.

### Admin Learning

- `adminService.getProfile()` → `adminService.updateProfile(profile)`.
- `toEditable` maps LearningSection → EditableSection (including items).
- Add section/item: new items do not send `id`; backend fills it via `extractId` (fallback index).
- **Note:** New items get id from fallback `learning-item-${sIdx}-${iIdx}`. If admin reorders, index changes → id changes → topic URL may become invalid. For stable links, consider explicit ids or a subdocument schema with \_id.

### Seed vs Section Themes

- 17 sections in seed; 17 slugs in `sectionThemes` – all match.
- All sections have `published: true` in the seed.

---

## 7. Long-term Recommendations

1. **Images:** Replace placeholder images with educational diagrams/illustrations if desired.
2. **Sticky TOC:** Consider sticky TOC on scroll for long topics.
3. **Metadata:** Add `readingTime` or `lastUpdated` to the model if needed.
4. **Stable IDs:** For Admin Learning, consider stable ids (e.g. nanoid) for new items so URLs do not change on reorder.

---

_Report generated after detailed Learning section audit. Updated with backend, Admin, and ProfileService checks._
