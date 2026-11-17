# Kayna IT Solutions brand assets

The supplied profile icon is the source of truth. It shows the gradient K/Y mark with the cyan dot, centred on the deep navy field. The artwork is used as supplied — it is not redrawn.

The file has generous navy margins around the mark. `scripts/make-brand.mjs` crops a centred 1024 × 1024 window so the mark stays optically correct at every size, from the 32 px favicon to the 120 px Open Graph lockup.

The header and footer pair the icon with live typography: **Kayna** in Manrope 700 and **IT Solutions** in Inter 500. This keeps the wordmark sharp at every breakpoint and consistent with the rest of the site.

## Files

| File | Use |
| --- | --- |
| `kayna-icon-master.png` | The supplied 2048 × 2048 profile icon. Do not edit. |
| `png/kayna-icon-1024.png` | 1024 × 1024 centred crop used as the logo source. |
| `kayna-logo.svg` | Horizontal lockup on light surfaces: supplied icon + live Manrope/Inter type. |
| `kayna-logo-inverse.svg` | The same lockup with light lettering for dark surfaces. |
| `png/kayna-icon-512.png` | 512 px app/social icon. |
| `png/kayna-logo-1600.png` | 1600 px PNG of the light lockup. |
| `png/kayna-logo-inverse-1600.png` | 1600 px PNG of the inverse lockup. |

The site uses `public/brand/kayna-icon.png` in the header and footer, `public/favicon-32.png` and `public/favicon-192.png` for browser icons, and `public/apple-touch-icon.png` for iOS.

Regenerate every asset with `npm run brand`. The script also writes the Open Graph image at `public/og/og-default.png`.

## Colours

| Name | Hex | Role |
| --- | --- | --- |
| Icon field | `#232156` | Background supplied in the profile icon |
| Site navy | `#101D35` | Headings, header text, OG background |
| Blue | `#2563EB` | Site accent |
| Teal | `#14B8A6` | Site accent |
| Slate | `#475569` | Descriptor text |
| White | `#FFFFFF` | Light surfaces and inverse type |

The icon’s own purple-to-blue gradient and cyan dot are part of the supplied mark and should not be recoloured.

## Typography

- **Manrope Variable** — “Kayna”, headings, and display text.
- **Inter Variable** — “IT Solutions”, body copy, and interface text.

Both are loaded from the site’s self-hosted font packages. The logo SVGs embed the same two fonts so they render correctly in tools without the fonts installed.

## Usage

- Use the icon for favicons, app icons, and tight spaces.
- Use the horizontal lockup on white or paper-coloured surfaces.
- Use the inverse lockup on navy and other dark surfaces.
- Keep the icon square; do not stretch, rotate, or crop into the mark.
- Do not recolour the mark or place the lockup over busy photography.

## Notes

- `kaynasolutions.com` in the site metadata is a placeholder, not a confirmed domain.
- `public/favicon.svg` is intentionally gone; the site uses PNG favicons generated from the supplied icon.
