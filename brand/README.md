# Kayna Digital Solutions brand assets

The mark is a stylised K/Y formed from two rounded gradient strokes — purple on the left, blue on the right — with a cyan dot above the joint. It reads as a person with raised arms and as the K in Kayna. The wordmark is set in Manrope: **Kayna** at 700 and **SOLUTIONS** at 500 with wide letter spacing.

The SVGs embed the Manrope variable font so the wordmark renders accurately without an installed font. PNGs are provided for tools that do not accept SVG.

## Files

| File | Use |
| --- | --- |
| `kayna-logo.svg` | Primary horizontal lockup on light backgrounds. Transparent. |
| `kayna-logo-compact.svg` | Mark plus “Kayna”, used below the `sm` breakpoint in the header. |
| `kayna-logo-inverse.svg` | Lockup with white lettering for navy or other dark backgrounds. |
| `kayna-mark.svg` | Mark only, on a transparent background. |
| `kayna-mark-inverse.svg` | Mark only in white, for dark backgrounds. |
| `kayna-mark-dark.svg` | Wide navy field with concentric rings and the gradient mark. |
| `kayna-avatar.svg` | Square social avatar: navy field with the gradient mark and rings. |
| `png/kayna-logo-1600.png` | 1600 px transparent PNG of the primary lockup. |
| `png/kayna-logo-inverse-1600.png` | 1600 px transparent PNG of the inverse lockup. |
| `png/kayna-mark-512.png` | 512 px mark. |
| `png/kayna-mark-1024.png` | 1024 px mark. |
| `png/kayna-mark-inverse-1024.png` | 1024 px inverse mark. |
| `png/kayna-mark-dark-1600.png` | 1600 px navy field with rings and the gradient mark. |
| `png/kayna-avatar-1024.png` | 1024 px social avatar. |

Regenerate every asset with `npm run brand`. The script also writes the site favicon, public logo variants, and the Open Graph image.

## Colours

| Name | Hex | Role |
| --- | --- | --- |
| Navy | `#101D35` | Primary text, site surfaces |
| Deep navy | `#1B2A5B` | Wordmark, avatar field |
| Purple | `#4B2EE6` | Left gradient stroke |
| Blue | `#2F62E3` | Right gradient stroke, site accent |
| Cyan | `#00AEEF` | Dot above the mark |
| Slate | `#64748B` | “SOLUTIONS” descriptor |

## Typography

- **Manrope** (variable) — wordmark and display headings.
- **Inter** (variable) — body copy and interface text.

## Usage

- Use the primary lockup on white or paper-coloured surfaces.
- Use the inverse lockup on navy and other dark surfaces.
- Use the mark alone for favicons, app icons, and tight spaces.
- Keep the mark's proportions and internal spacing intact.
- Do not stretch, rotate, recolour, or place the lockup over busy photography.

## Notes

- `kaynasolutions.com` in the site metadata is a placeholder, not a confirmed domain.
- The site favicon (`public/favicon.svg`) is the app-icon version of the mark.
