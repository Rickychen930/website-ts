# Database Seed Documentation

## Overview

This directory contains the seed data and script for populating the MongoDB database with profile information.

## Improvements Made

### 1. **Data Structure Normalization**

- **Academics**: Converted from `{key, icon, title, institution, period}` to structured `{institution, degree, field, startDate, endDate, description}`
  - Split period into proper `startDate` and `endDate` fields
  - Extracted degree and field from title
  - Ordered by date (most recent first)

- **Certifications**: Converted from `{key, icon, title, provider, date}` to `{name, issuer, issueDate, credentialId, credentialUrl}`
  - Added credential IDs and URLs for verification
  - Proper date formatting

- **Contacts**: Converted from `{key, icon, label, value, link}` to `{type, value, label, isPrimary}`
  - Normalized contact types (email, linkedin, github)
  - Set email as primary contact
  - Used full URLs instead of just handles

- **Experiences**: Enhanced from `{key, icon, title, company, period, description}` to `{company, position, location, startDate, endDate, isCurrent, description, achievements, technologies}`
  - Split period into dates
  - Added location field
  - Extracted achievements and technologies into separate arrays
  - Added `isCurrent` flag

- **Honors**: Converted from `{key, icon, title, event, date, description}` to `{title, issuer, date, description, url}`
  - Renamed `event` to `issuer` for consistency
  - Added URLs for verification
  - Ordered by date (most recent first)

- **Languages**: Simplified from `{key, icon, name, proficiency}` to `{name, proficiency}`
  - Removed decorative icons (should be handled in frontend)
  - Normalized proficiency levels

- **Projects**: Enhanced from `{key, icon, name, date, description}` to comprehensive structure:
  - `{title, description, longDescription, technologies, category, startDate, endDate, isActive, githubUrl, liveUrl, imageUrl, achievements, architecture}`
  - Added proper categorization
  - Split dates
  - Added technology stack
  - Added achievements and architecture details

- **Soft Skills**: Converted from `{key, icon, name, description}` to `{name, category}`
  - Removed verbose descriptions (should be in UI)
  - Added category for grouping

- **Technical Skills**: Transformed from category-based structure to individual skill objects:
  - From: `{category: "Programming Languages", items: [...]}`
  - To: `{name, category, proficiency, yearsOfExperience}`
  - This allows for better querying and filtering
  - Added proficiency levels and years of experience

- **Testimonials**: Converted from `{key, name, role, company, text, rating, date}` to `{author, role, company, content, date, avatarUrl}`
  - Renamed fields for clarity
  - Removed rating (not in schema)
  - Added avatarUrl placeholder

### 2. **Data Quality Improvements**

- ✅ All dates are in ISO 8601 format (YYYY-MM-DD)
- ✅ All required fields are present
- ✅ Type safety with TypeScript const assertions
- ✅ Consistent naming conventions
- ✅ Proper enum values for categories and types
- ✅ Technologies extracted and normalized
- ✅ Achievements separated into arrays
- ✅ URLs properly formatted

### 3. **Seed Script Enhancements**

- ✅ Better error handling with detailed messages
- ✅ Progress logging with emojis for clarity
- ✅ Validation before inserting
- ✅ Credential hiding in logs
- ✅ Summary statistics after seeding
- ✅ Proper cleanup on errors

## Usage

### Run Seed Script

```bash
# From project root
npm run seed

# Or directly with ts-node
ts-node -P backend/tsconfig.backend.json backend/src/seed/seed.ts
```

### Environment Setup

Make sure your **`.env`** file (at project root) contains:

```
MONGODB_URI=mongodb://localhost:27017/website-db
```

Or use MongoDB Atlas connection string:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

**Important:** `.env` is in **`.gitignore`** — never commit it. Use `config/env.example` as a template (without real secrets).

### Admin seed (password only on backend)

The seed creates **one admin user** in the `admins` collection. The password is **hashed** (PBKDF2) and stored only in the backend DB.

- Set **`ADMIN_SECRET`** (or **`ADMIN_SEED_PASSWORD`**) in **`.env`** before running `npm run seed`. That value is hashed and stored; use the **same value** to log in at `/admin/login`.
- If neither is set, the seed uses the default **`admin`** (and logs a warning). **For production, always set `ADMIN_SECRET` in `.env`.**

After seeding, log in with the same secret you set in `ADMIN_SECRET`.

### Security / Ignored files

- **`.env`** is gitignored; it must contain `MONGODB_URI`, `ADMIN_SECRET`, and optionally `OPENAI_API_KEY`. Never commit `.env`.
- Local seed overrides (e.g. `seedData.local.ts`, `backend/src/seed/local/`) are in `.gitignore` so you can keep local or sensitive overrides out of the repo.
- Keep `config/env.example` as a template **without** real secrets; real values go only in `.env`.

## Data Schema Compliance

The seed data strictly follows the `IProfile` interface defined in `/backend/src/models/Profile.ts`:

- All required fields are present
- All enum types match expected values
- Date fields are properly formatted strings
- Arrays are properly structured
- No extra fields that aren't in the schema

## Best Practices Applied

1. **Normalization**: Removed redundant/decoration data (icons) that should be handled in the frontend
2. **Consistency**: Unified date formats, naming conventions, and structure
3. **Type Safety**: Used TypeScript const assertions for enum values
4. **Maintainability**: Well-organized, commented code
5. **Extensibility**: Structure allows easy addition of new items
6. **Validation**: Seed script validates data before insertion

## Migration Notes

If you have existing data in the old format, you'll need to:

1. Export existing data
2. Transform it to match the new structure (use this seed file as reference)
3. Import using the seed script

## Future Improvements

- [ ] Add data validation schema (e.g., Zod, Joi)
- [ ] Add migration scripts for existing data
- [ ] Support multiple profiles
- [ ] Add data verification checks
- [ ] Support incremental updates instead of full replacement
