# Navy Theme and Light/Dark Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make navy the active brand color and add a persisted, OS-aware light/dark theme without changing layout or content.

**Architecture:** Define semantic color tokens in `src/styles/main.css` with light values on `:root` and dark overrides on `.dark`, bridged into Tailwind with `@theme inline`. Add a tiny inline boot script through the SEO build plugin, a Vue `useTheme` composable, and a header toggle. Migrate component color utilities to semantic tokens.

**Tech Stack:** Vue 3, Vite, Tailwind CSS v4, Vitest, Cloudflare Pages.

**Spec:** `docs/superpowers/specs/2026-11-17-navy-theme-light-dark-design.md`

## Global Constraints

- Preserve all page structure, typography, imagery, copy, and contact behavior.
- Keep Manrope for display and Inter for body.
- Primary action is navy; teal is a signal accent, not a second primary.
- Theme defaults to the OS and remembers an explicit visitor choice.
- No flash of the wrong theme before first paint.
- Deep panels keep white text; teal on deep panels uses `signal-bright`.
- Verify 320px and 1440px in both themes.
- No new runtime dependencies.

## Review Focus

- An OS theme change must update the page while no explicit choice exists.
- An explicit theme choice must survive reload and override the OS.
- Teal details on deep navy panels must use `signal-bright`, not `signal`.
- The toggle must remain a 44px target with a dynamic accessible label.
- The inline bootstrap and Vue composable must agree on the storage key and root attributes.

---

### Task 1: Theme tokens and bootstrap

**Files:**
- Modify: `src/styles/main.css:1-103`
- Create: `src/lib/theme.js`
- Modify: `build/seo-plugin.js:29-50`
- Test: `tests/theme.test.js`

**Interfaces:**
- Produces: `THEME_STORAGE_KEY`, `THEME_COLORS`, `resolveTheme(stored, systemDark)`, `applyTheme(theme, root)`, `themeInitScript()`.
- Consumes: none.

- [ ] **Step 1: Write failing tests**

Test `resolveTheme` for stored `dark`, stored `light`, and missing value with system dark/light.
Test `applyTheme('dark')` sets `document.documentElement.classList` to include `dark`, `dataset.theme` to `dark`, `style.colorScheme` to `dark`, and updates `meta[name="theme-color"]`.
Test `themeInitScript()` contains `kayna-theme`, `localStorage`, and both theme colors.

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/theme.test.js`
Expected: FAIL because `src/lib/theme.js` does not exist.

- [ ] **Step 3: Implement tokens and theme helpers**

In `main.css`, define `:root` light tokens and `.dark` dark tokens from the spec. Bridge them in `@theme inline`. Update `body`, headings, focus, selection, fields, and noscript colors to semantic tokens.

In `src/lib/theme.js`, implement:

```js
export const THEME_STORAGE_KEY = 'kayna-theme'
export const THEME_COLORS = { light: '#FFFFFF', dark: '#071322' }
export function resolveTheme(stored, systemDark) {}
export function applyTheme(theme, root = document.documentElement) {}
export function themeInitScript() {}
```

In `build/seo-plugin.js`, inject `<meta name="theme-color" content="#FFFFFF" />` and an inline script from `themeInitScript()` into every page head.

- [ ] **Step 4: Run tests and build**

Run: `npm test -- tests/theme.test.js`
Expected: PASS.

Run: `npm run build`
Expected: build succeeds and `dist/index.html` contains `kayna-theme` and `theme-color`.

- [ ] **Step 5: Commit**

```bash
git add src/styles/main.css src/lib/theme.js build/seo-plugin.js tests/theme.test.js
git commit -m "feat: add navy theme tokens and theme bootstrap"
```

### Task 2: Theme toggle and OS preference handling

**Files:**
- Create: `src/lib/useTheme.js`
- Create: `src/components/layout/ThemeToggle.vue`
- Modify: `src/components/layout/SiteHeader.vue:1-70`
- Test: `tests/theme.test.js`
- Test: `tests/layout.test.js`

**Interfaces:**
- Consumes: `THEME_STORAGE_KEY`, `applyTheme`, `resolveTheme` from Task 1.
- Produces: `useTheme()` returning `{ theme, isDark, toggle }`; `ThemeToggle` component with no required props.

- [ ] **Step 1: Write failing toggle tests**

Mock `window.matchMedia` with a change listener. Mount `ThemeToggle`; assert initial label `Switch to dark theme`, click, assert `html.dark`, `localStorage` set to `dark`, and label `Switch to light theme`. Reload a new mount with stored `light` and assert it stays light. Trigger the mocked media change with no stored choice and assert the theme follows it.

Add a `SiteHeader` test that finds the theme toggle and a 44px utility class.

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/theme.test.js tests/layout.test.js`
Expected: FAIL because `ThemeToggle.vue` and `useTheme.js` do not exist.

- [ ] **Step 3: Implement**

In `useTheme.js`, read the root theme on mount, listen to `prefers-color-scheme` only while no stored choice exists, remove the listener on unmount, and persist explicit choices.

In `ThemeToggle.vue`, render a 44px button with `Moon` in light mode and `Sun` in dark mode, using dynamic `aria-label` and `title`.

In `SiteHeader.vue`, place the toggle before the contact CTA and keep it available at every breakpoint.

- [ ] **Step 4: Run tests**

Run: `npm test -- tests/theme.test.js tests/layout.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/useTheme.js src/components/layout/ThemeToggle.vue src/components/layout/SiteHeader.vue tests/theme.test.js tests/layout.test.js
git commit -m "feat: add persisted light and dark theme toggle"
```

### Task 3: Migrate primitives and layout

**Files:**
- Modify: `src/components/common/BaseButton.vue`
- Modify: `src/components/common/Tag.vue`
- Modify: `src/components/common/CtaSection.vue`
- Modify: `src/components/common/PageHeader.vue`
- Modify: `src/components/common/Banner.vue`
- Modify: `src/components/common/SectionHeading.vue`
- Modify: `src/components/common/PhotoFigure.vue`
- Modify: `src/components/common/ProcessTimeline.vue`
- Modify: `src/components/layout/Wordmark.vue`
- Modify: `src/components/layout/SiteFooter.vue`
- Modify: `src/components/layout/MobileNav.vue`
- Modify: `src/layouts/MainLayout.vue`
- Test: `tests/primitives.test.js`

**Interfaces:**
- Consumes: semantic tokens from Task 1.
- Produces: shared components using `bg-action`, `text-ink`, `text-body`, `bg-surface`, `bg-subtle`, `bg-deep`, `text-signal-bright`, and `border-line`.

- [ ] **Step 1: Update primitive test**

Change the primary-button assertion from `bg-blue` to `bg-action`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/primitives.test.js`
Expected: FAIL until `BaseButton` is migrated.

- [ ] **Step 3: Migrate primitive and layout classes**

Apply the token map from the spec. Keep `bg-white/25` in `MockFrame` for chrome dots and keep white text on deep panels. Use `signal-bright` for teal details inside `CtaSection`, `ProcessTimeline`, and any deep panel.

- [ ] **Step 4: Run tests**

Run: `npm test -- tests/primitives.test.js tests/layout.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/common src/components/layout src/layouts tests/primitives.test.js
git commit -m "refactor: apply navy theme tokens to shared UI"
```

### Task 4: Migrate pages and page sections

**Files:**
- Modify: `src/components/sections/*.vue`
- Modify: `src/pages/*.vue`
- Test: existing page tests

**Interfaces:**
- Consumes: semantic tokens from Task 1 and shared components from Task 3.
- Produces: page content using theme-aware surfaces, body text, borders, links, and deep panels.

- [ ] **Step 1: Migrate page and section classes**

Replace raw palette classes with semantic roles. Keep layout and copy unchanged. Ensure form success/error panels use `signal`/`danger` tokens. Keep `text-white` only on `deep`/`action` surfaces.

- [ ] **Step 2: Run page tests**

Run: `npm test -- tests/home.test.js tests/services.test.js tests/solutions.test.js tests/about.test.js tests/portfolio.test.js tests/insights.test.js tests/contact.test.js tests/contact-form.test.js`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections src/pages
git commit -m "refactor: apply navy theme tokens to pages and sections"
```

### Task 5: Migrate mockups, verify both themes, and document

**Files:**
- Modify: `src/components/mockups/*.vue`
- Modify: `README.md`
- Modify: `docs/deployment.md` only if needed for theme behavior
- Test: `tests/mockups.test.js`
- Verify: `npm run check`

**Interfaces:**
- Consumes: all prior tasks.
- Produces: complete light/dark UI and documented theme behavior.

- [ ] **Step 1: Migrate mockup surfaces and data colors**

Use `surface`, `subtle`, `line`, `body`, `ink`, `action`, and `signal`. Preserve white chrome dots and white text on the mockup title bar.

- [ ] **Step 2: Run mockup tests**

Run: `npm test -- tests/mockups.test.js`
Expected: PASS.

- [ ] **Step 3: Document theme behavior**

Add a short README section: OS default, toggle, stored key `kayna-theme`, and no-flash boot script.

- [ ] **Step 4: Full verification**

Run: `npm run check`
Expected: build succeeds, all tests pass, dist check clean.

Render Home, Services, About, and Contact at 320px and 1440px in both themes. Exercise the header, mobile menu, buttons, form fields, form error/success, deep panels, and mockups. Reload with a stored choice and confirm no flash.

- [ ] **Step 5: Commit**

```bash
git add src/components/mockups README.md docs/deployment.md tests
git commit -m "feat: finish navy light and dark theme"
```
