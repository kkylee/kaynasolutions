# Kayna Navy Theme and Light/Dark Mode

Status: proposed

## Goal

Make navy the active brand color across the site and add a first-class light/dark theme system. Keep the existing page structure, typography, imagery, and content. This is a theme and polish pass, not a redesign.

## Direction

Navy becomes the primary action and link color. Teal remains a small signal accent, not a second primary color. The result should feel like the same Kayna site with a clearer navy identity and a dark mode that belongs to the brand rather than an inverted afterthought.

## Color system

Use semantic tokens only. Components should not reach for raw `navy`, `blue`, `teal`, or `paper` when a role-based token exists.

| Role | Light | Dark | Use |
| --- | --- | --- | --- |
| `canvas` | `#FFFFFF` | `#071322` | Page background |
| `surface` | `#FFFFFF` | `#0D2036` | Cards, header, form panels |
| `subtle` | `#F4F7FB` | `#0A192B` | Alternate sections, footer, helper panels |
| `ink` | `#101D35` | `#EEF4FB` | Headings and strong text |
| `body` | `#475569` | `#B7C5D6` | Paragraph and secondary text |
| `line` | `#DCE5F0` | `#27415D` | Default borders and dividers |
| `line-strong` | `#C4D2E3` | `#3A5B7D` | Interactive borders, emphasis |
| `action` | `#15365C` | `#2A5584` | Primary button background |
| `action-hover` | `#0D2947` | `#35679D` | Primary button hover |
| `link` | `#174B7A` | `#8DC2F5` | Links, eyebrows, small emphasis |
| `link-hover` | `#0F3457` | `#B6D8FB` | Link hover |
| `signal` | `#0F766E` | `#2DD4BF` | Teal signal on light surfaces |
| `signal-bright` | `#5EEAD4` | `#5EEAD4` | Teal signal on deep navy panels |
| `focus` | `#2563EB` | `#7CB4FF` | Focus rings and outlines |
| `deep` | `#101D35` | `#142C49` | Always-dark feature panels |
| `deep-raised` | `#1A3352` | `#1B385A` | Raised surface inside deep panels |
| `inverse` | `#FFFFFF` | `#EAF2FC` | Light button on dark surfaces |
| `inverse-ink` | `#101D35` | `#0A192C` | Text on inverse button |
| `danger` | `#B42318` | `#FDA29B` | Error text |
| `danger-surface` | `#FEF3F2` | `#3A1715` | Error panel background |
| `danger-line` | `#FECDCA` | `#5B2A26` | Error panel border |

`deep` panels keep white text in both themes. `signal-bright` is used for teal details that sit on those panels.

### Token implementation

- Define light values on `:root`.
- Override dark values on `.dark`.
- Bridge the values into Tailwind with `@theme inline` so utilities such as `bg-surface`, `text-body`, `border-line`, and `text-link` resolve through the theme.
- Set `color-scheme` on the root so native controls follow the active theme.
- Keep the existing `Manrope`/`Inter` typography and radii.

## Component application

- `BaseButton`: primary becomes navy action, secondary uses line/ink with a navy hover, inverse stays light on dark panels.
- Header: surface background, line border, ink navigation, navy hover/active states, and a theme toggle before the contact CTA.
- Footer and alternate sections: `subtle` surfaces with line borders and body text.
- Deep sections (`CtaSection`, `ProcessSection`, About aside): `deep` background, white text, `signal-bright` accent.
- Cards, forms, mockups, filter pills: `surface` or `subtle` with line borders and ink/body text.
- Form fields: surface background, strong line border, ink text, link-colored focus, danger tokens for errors.
- Selection and focus indicators use the active theme tokens.

## Theme behavior

- Default to light mode.
- Before first paint, a tiny inline script reads `localStorage` and applies `dark` plus `data-theme` on `<html>`. This prevents a flash of the wrong theme.
- A header `ThemeToggle` button switches light/dark, updates the root class, `data-theme`, `color-scheme`, `theme-color` meta, and stores the explicit choice.
- If no explicit choice exists, the site remains light until the visitor uses the toggle.
- The toggle is a 44px target with a tooltip and a dynamic accessible label (`Switch to dark theme` / `Switch to light theme`).
- The same key and boot logic are shared between the inline script and the Vue composable.

## Accessibility

- Verify body text and links at 4.5:1 or better in both themes.
- Keep focus visible against canvas, surface, deep, and action backgrounds.
- Do not communicate meaning with color alone; active nav and errors keep text or icon cues.
- Preserve reduced-motion behavior.
- Check the theme toggle with keyboard and screen reader labels.

## Verification

- Run the full test suite and dist checks.
- Add tests for theme resolution, persistence, root class updates, and toggle labels.
- Render Home, Services, About, and Contact at 320px and 1440px in both themes.
- Exercise nav active state, buttons, form fields, errors, success panel, deep sections, mockups, and mobile menu.
- Confirm no flash of the wrong theme on reload.
- Confirm the inline bootstrap and Vue composable agree after a stored choice.

## Out of scope

- No content, page structure, imagery, or service changes.
- No CMS, new fonts, or new dependencies.
- No changes to the contact endpoint.
