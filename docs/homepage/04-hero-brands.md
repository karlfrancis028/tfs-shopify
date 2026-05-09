# Hero Brands

**Section ID:** `hero_brands_main`
**Section type:** `hero-brands`
**Section file:** `sections/hero-brands.liquid`
**CSS:** `assets/section-hero-brands.css`

## Purpose

Static grid of featured brand logos for the current season. Unlike the logo bar (which auto-scrolls), this displays logos in a fixed grid layout with a heading and subheading above.

## HTML Structure

```
div#HeroBrands-{id}  (.hero-brands)
  div.hero-brands__header
    h2.hero-brands__heading
    p.hero-brands__subheading
  div.hero-brands__grid
    div.hero-brands__card  [.hero-brands__card--darken]
      img
```

## Settings

| Setting | Type | Current value |
|---|---|---|
| `heading` | text | "Hero Brands" |
| `subheading` | textarea | "Makers and crafts featured this season—alongside signature pieces from The Fortunate Son, reflected in your pairing." |
| `background_color` | color | `#EEEEEE` |

## Block type: `logo`

| Field | Type | Notes |
|---|---|---|
| `image` | image_picker | Shopify CDN image |
| `asset_filename` | text | Fallback — theme asset file (e.g. `spingle.svg`) |
| `darken` | checkbox | Adds `.hero-brands__card--darken` for dark filter on light logos |

## Current Brands (7 blocks)

| Brand | Source |
|---|---|
| Tino | `Tino_Bone_150.png` (darkened) |
| Spingle | `spingle.svg` (theme asset) |
| Colony Clothing | `Colony_Clothing.png` |
| Nishiguchi | `Nishiguchi.png` |
| Captain Santors | `Captain_Santors.png` |
| The Gentleman's Fieldguide | `The_Gentleman_s_Fieldguide.png` |
| St James | `St_James.png` |
