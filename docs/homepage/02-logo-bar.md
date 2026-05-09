# Logo Bar

**Section ID:** `logo_bar_main`
**Section type:** `logo-bar`
**Section file:** `sections/logo-bar.liquid`
**CSS:** `assets/section-logo-bar.css`

## Purpose

Continuously auto-scrolling horizontal strip of partner/brand logos. The track renders each logo block twice (second set has `aria-hidden="true"`) to create a seamless infinite loop via CSS animation.

## HTML Structure

```
div#LogoBar-{id}  (.logo-bar)
  div.logo-bar__track
    div.logo-bar__item   ← logo (repeated for each block)
      img
    div.logo-bar__item   ← duplicate set (aria-hidden, for loop)
      img
```

CSS variables set inline on the wrapper:
- `--logo-bar-speed` — animation duration in seconds
- `--logo-bar-height` — logo height in px
- `--logo-bar-gap` — gap between logos in px

## Settings

| Setting | Type | Current value |
|---|---|---|
| `color_scheme` | color_scheme | `scheme-1` |
| `background_color` | color | `#DFE6E2` |
| `speed` | range 10–120s | `40s` |
| `logo_height` | range 20–120px | `56px` |
| `gap` | range 16–160px | `80px` |

## Block type: `logo`

| Field | Type | Notes |
|---|---|---|
| `image` | image_picker | Shopify CDN image |
| `asset_filename` | text | Fallback — theme asset file (e.g. `spingle.svg`) |
| `darken` | checkbox | Adds `.logo-bar__item--darken` class (use for light logos on light backgrounds) |
| `scale` | range 30–150% | Per-logo size override via `--item-scale` CSS var |

## Current Logos (8 blocks)

| Brand | Source |
|---|---|
| Tino | `Tino_Bone_150.png` (darkened) |
| Mono | `Mono.png` |
| Cordone | `Cordone.png` |
| St James | `St_James.png` |
| Kinetix | `Kinetix.png` |
| Nishiguchi | `Nishiguchi_Socks.png` |
| Officine Paladino | `Officine_Paladino.png` |
| Spingle | `spingle.svg` (theme asset, scale: 60%) |
