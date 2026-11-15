# Sol Digital rebrand — short design

**Date:** 2026-11-15
**Status:** Approved by the client in conversation.

## Intent

Rename the site to **Sol Digital** everywhere the brand appears, update all seven page titles and descriptions, and produce the logo files the client asked for under the new name.

The tagline, positioning, information architecture, visual system, copy voice, and photography stay unchanged. The interlocking-S mark already reads as an S, so the symbol is not redesigned.

## Decisions

- Wordmark keeps the established pattern: **"Sol"** in Manrope 600, **" Digital"** in Manrope 400 at 70% opacity.
- `SITE_URL` becomes `https://soldigital.com` and the placeholder email becomes `hello@soldigital.com`. Both remain marked as placeholders; the real domain and inbox are still a launch step.
- Page titles end with the full name, `| Sol Digital`, for brand recognition.
- Dated implementation records keep their filenames but their brand references are updated, so no stale brand copy remains in the repository. Git history preserves the original.
- The project folder on disk keeps its current name; renaming the working copy is outside this change.
- A new `brand/` folder holds the logo pack: SVG mark and lockups (dark and inverse), PNG exports, and usage notes.

## Out of scope

- No logo redesign, palette change, font change, copy rewrite, or page restructure.
- No domain purchase, DNS change, or inbox creation.
- No claim that `soldigital.com` is owned or live.

## Verification

- `npm run check` passes (build, 13 test files, dist checks).
- No legacy brand string remains in source, docs, or `dist/`.
- Every page title is 15–65 characters; every description 50–160.
- All seven pages load, the preview renders the new wordmark, and Lighthouse stays at the previous standard.
- The logo pack renders correctly from its SVG paths, with transparent PNG exports.
