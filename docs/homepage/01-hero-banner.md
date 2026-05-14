# Hero Banner

**Section ID:** `image_banner_KbGw4i`
**Section type:** `image-banner`
**Section file:** `sections/image-banner.liquid`
**CSS:** `assets/section-image-banner.css`

## Purpose

Hero at the top of the homepage. Two-column layout (desktop): content panel on the left with eyebrow / heading / body / CTA, and an absolutely-positioned image on the right that **deliberately overflows downward into the logo bar** below it.

> Note: the rendered element ID is `Banner-template--{template_id}__image_banner_KbGw4i` because Shopify prefixes section IDs in JSON templates. All targeted CSS uses `[id$="__image_banner_KbGw4i"]` (attribute "ends with") to match regardless of the prefix.

## HTML Structure

```
section#shopify-section-…__image_banner_KbGw4i        ← Shopify wrapper, lifted z-index:2
  div#Banner-…__image_banner_KbGw4i  (.banner)        ← position:relative, overflow:visible
    div.banner__media                                  ← position:absolute, anchored top/right
      img                                              ← native 993×1058, width:100%, height:auto
    div.banner__content                                ← in normal flow on the left
      div.banner__box
        blocks:
          div.banner__text     ← eyebrow text (body style)
          h2.banner__heading   ← main headline
          div.banner__text     ← subtext (body style)
          div.banner__buttons  ← CTA button(s)
```

## Settings

| Setting | Type | Current value |
|---|---|---|
| `image` | image_picker | `new_hero_image.png` |
| `image_overlay_opacity` | range 0–100% | `0` |
| `image_height` | select | `adapt` |
| `image_behavior` | select | `none` |
| `desktop_content_position` | select | `top-left` |
| `desktop_content_alignment` | select | `left` |
| `show_text_box` | checkbox | `false` (transparent bg) |
| `color_scheme` | color_scheme | `scheme-5` |
| `stack_images_on_mobile` | checkbox | `true` |
| `mobile_content_alignment` | select | `center` |
| `show_text_below` | checkbox | `false` |

**Image height options:** `adapt` (matches image ratio), `small`, `medium`, `large`
**Image behavior options:** `none`, `ambient` (subtle zoom), `fixed` (parallax), `zoom-in`
**Desktop content position options:** `top-left/center/right`, `middle-left/center/right`, `bottom-left/center/right`

## Blocks

| Block type | Limit | Fields |
|---|---|---|
| `heading` | 2 | `heading` (inline richtext), `heading_size` (h2/h1/h0/hxl/hxxl) |
| `text` | 2 | `text` (inline richtext), `text_style` (body/subtitle/caption-with-letter-spacing) |
| `buttons` | 1 | `button_label_1`, `button_link_1`, `button_style_secondary_1`, `button_label_2`, `button_link_2`, `button_style_secondary_2` |
| `button` | — | `button_label`, `button_link`, `button_style_secondary`, `bg_color`, `text_color`, `border_style` (default/none/custom), `border_width` (px), `border_color`, `btn_width`, `btn_height` |
| `price` | 1 | `currency` (text, e.g. "P"), `amount` (text, e.g. "20,000") |
| `feature_item` | 1 | `items` (textarea — one item per line, rendered as `<ul>/<li>` with bullet) |
| `divider` | 3 | _(no settings — renders `<hr>` at full width, 1px, 20% opacity)_ |

## Current Content

| Block | Content |
|---|---|
| Text (eyebrow) | "Craftsmanship \| Refinement \| Exploration" |
| Heading | "A Curated Lifestyle for the Modern Gentleman" (size: h0) |
| Text (subtext) | "Where craftsmanship meets cultural discovery—expressed through quarterly pairings and monthly discoveries." |
| Buttons | "Become A Son" → `/pages/subscription-page` (primary style) |

## Custom CSS (from `templates/index.json` `custom_css` array)

These rules are auto-scoped by Shopify with `#shopify-section-{section.id}` and live next to the section data in [`templates/index.json`](../../templates/index.json):

```css
.banner { background: #EEEEEE !important; }

/* Strip Dawn's aspect-ratio padding trick (the hero defines its own height) */
.banner::before, .banner__media::before, .banner__content::before {
  padding-bottom: 0 !important;
  display: none !important;
}

.banner__media { background: transparent !important; }

/* Pill-shape the "Become A Son" CTA — overrides Dawn's button radius vars */
.banner__buttons .button {
  --buttons-radius: 999px !important;
  --buttons-radius-outset: 999px !important;
}
```

## Layout CSS (from `assets/section-image-banner.css`, desktop ≥ 1100px)

Anchored to the actual rendered element via attribute selectors. Figma reference frame is **1440px wide**; image is **993×1058 native**.

The breakpoint is **1100px**, not 750px — the design's hardcoded pixel values (`width: 993px` image + `630px` content panel) need at least ~1100px of horizontal room or they'd blow out the viewport. Below 1100px the layout falls back to a clean stacked column (image first, content second) — see [§ Tablet & mobile](#tablet--mobile--1100px) below.

```css
/* Lift the entire hero above the next section so the image's downward overflow paints on top */
[id^="shopify-section-"][id$="__image_banner_KbGw4i"] {
  position: relative;
  z-index: 2;
  overflow: visible;
}

/* The .banner — block layout, plain visible overflow, full-width on typical desktops.
   Ultra-wide centering is in a separate media query below. */
[id$="__image_banner_KbGw4i"] {
  display: block !important;
  position: relative !important;
  overflow: visible !important;        /* plain visible — see § Why plain overflow:visible */
  isolation: auto !important;
}

/* Content panel — left side, fixed width matching Figma's 630px content area */
[id$="__image_banner_KbGw4i"] .banner__content {
  position: relative;
  z-index: 2;
  width: 630px;             /* matches Figma image left:630 → text never drifts under image */
  max-width: 630px;
  padding: 80px 60px;
  background-color: #EEEEEE;
  box-sizing: border-box;
}

/* Image — absolutely positioned, right-anchored, overflows downward.
   z-index: 1 places it ABOVE the pricing-tiers section background (z:0 on ::before)
   but BELOW the logo bar (z:2) and pricing-tiers content (z:2). Net effect: the image
   is fully hidden behind the logo bar, then bleeds through the pricing-tiers bg.
   Wrapper max-width + img max-height cap the rendered image at a 1100×1100 bounding box. */
[id$="__image_banner_KbGw4i"] .banner__media {
  position: absolute !important;
  top: 112.77px;            /* Figma y-offset within frame */
  right: -110px;            /* image right edge sits 110px past viewport-right (overflow) */
  left: auto !important;    /* override Dawn's default left:0 */
  bottom: auto !important;
  width: calc(100vw - 630px + 110px); /* fills from content edge to 110px past viewport right */
  max-width: 1100px;        /* hard cap — wrapper never exceeds 1100px wide */
  height: auto !important;
  z-index: 1;
  pointer-events: none;
}

[id$="__image_banner_KbGw4i"] .banner__media img {
  position: relative !important;
  width: 100% !important;            /* fill the wrapper, ignore intrinsic 993px width */
  height: auto !important;
  max-height: 1100px !important;     /* hard cap — image never exceeds 1100px tall */
  display: block !important;
}
```

> **Why `width: 100%` instead of `width: auto`:** Dawn renders the `<img>` with an HTML `width="993"` attribute (the image's intrinsic width). With CSS `width: auto`, the browser treats `993` as the preferred width and may render smaller than the wrapper even with `max-width: 100%`. Explicit `width: 100%` makes the image always fill the wrapper's full width regardless of the HTML attribute.

### Maximum image size (1100 × 1100 bounding box)

The wrapper has `max-width: 1100px` and the `<img>` has `max-height: 1100px`. With the image's natural aspect ratio of **993 : 1058** (slightly taller than wide), the height is the binding constraint at the cap — so the image will render at **~1033 × 1100** when both maxes are active.

| Constraint | Value | Element |
|---|---|---|
| max width | `1100px` | `.banner__media` (wrapper) |
| max height | `1100px` | `.banner__media img` |
| Effective rendered cap | `~1033 × 1100px` | (height-bound by natural aspect) |

The 1100px cap kicks in at viewports ≥ **1620px**. Below that the image fills the right column naturally (calc-based width). The 1100 cap was chosen iteratively between "too small at 1980" (1000) and "too dominant" (1400) — at 1100 the image feels prominent at typical desktop widths without overwhelming the layout.

> The image's downward bleed at 1100 height is intentionally allowed to pass behind the logo bar and into the pricing-tiers section — they're at higher z-indexes (`z-index: 2`) so they paint on top of the image cleanly.

### Hero centering — only on ultra-wide screens (≥ 2000px)

At typical desktop widths (1100–1999px), the hero stretches **full viewport width** to match Figma's reference design. Centering only kicks in on **ultra-wide monitors (≥ 2000px)** via a dedicated media query, so common laptop and desktop displays don't get awkward margins:

```css
@media screen and (min-width: 2000px) {
  [id$="__image_banner_KbGw4i"] {
    max-width: 1900px !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
  /* Image switches to .banner-relative width once the cap activates */
  [id$="__image_banner_KbGw4i"] .banner__media {
    width: calc(100% - 630px + 110px) !important;
  }
}
```

The image's `width` is `calc(100vw - 630px + 110px)` at typical desktop widths (image right edge anchored to viewport-right minus 110px overflow). At ultra-wide, we override with `calc(100% - 630px + 110px)` so it tracks the centered `.banner` instead.

### Sizing math at common viewports

| Viewport | `.banner` width | Image wrapper width | Image rendered | Layout |
|---|---|---|---|---|
| 1100px | 1100px (full) | 580px | 580 × 618 | Full-width hero, no cap |
| 1440px (Figma) | 1440px (full) | 920px | 920 × 980 | Full-width hero, image fills column |
| 1620px | 1620px (full) | 1100px (capped) | ~1033 × 1100 | First viewport where cap activates |
| 1920px | 1920px (full) | 1400px → **capped 1100** | ~1033 × 1100 | Full-width hero, image at cap |
| 2000px | 1900px (centered) | 1380px → **capped 1100** | ~1033 × 1100 | Hero centered with ~50px each side |
| 2560px | 1900px (centered) | 1380px → **capped 1100** | ~1033 × 1100 | Hero centered with 330px on each side |
| 3840px (4K) | 1900px (centered) | 1380px → **capped 1100** | ~1033 × 1100 | Hero centered with 970px on each side |

The 110px right overflow is constant at every width — past viewport-right under 2000px, past `.banner`-right at ≥ 2000px.

### Why plain `overflow: visible`

A previous version used `overflow-x: clip; overflow-y: visible` to clip the 110px horizontal bleed without affecting the vertical bleed-through. **That combination is a trap**: per CSS spec, when `overflow-x` is non-`visible` and `overflow-y` is `visible`, the visible axis silently coerces to `auto`, turning the element into a scroll container. Scroll containers grow to contain their absolutely-positioned descendants — which made `.banner` disproportionately tall (the "lots of empty space below content" issue).

Plain `overflow: visible` keeps `.banner` content-driven. Horizontal scroll prevention is handled at the body level via `overflow-x: clip` in [`assets/base.css`](../../assets/base.css), which doesn't trigger the same coercion.

### Removed: stale "Hero — 50/50 Split Layout" block in `base.css`

[`assets/base.css`](../../assets/base.css) previously had a block (around line 3596) that was applying a 50/50 grid layout AND `min-height: 90vh` to **every** `.banner.banner--content-align-left` at viewports ≥ 990px. That block:

- Set `min-height: 90vh` → made the hero ~810px tall on a 900px viewport regardless of content
- Set `display: grid; grid-template-columns: 1fr 3fr` → conflicted with the homepage hero's absolute-positioning approach
- Set `.banner__media { position: relative }` and `img { position: absolute; object-fit: contain }` → fought our `.banner__media { position: absolute }` rules

It was a leftover from an earlier iteration of the design. The current homepage hero layout is fully scoped via `[id$="__image_banner_KbGw4i"]` attribute selectors in [`section-image-banner.css`](../../assets/section-image-banner.css), so it only targets the homepage hero — without affecting other sections that use `image-banner` with left content alignment (e.g. the Pioneer Card on the subscription page).

### Selective bleed-through (covered by logo bar, visible through pricing tiers)

The image is allowed to extend past the bottom of the hero section without any `max-height` or `overflow: hidden` clipping. What happens to the overflow depends on which section it falls into:

| Section | Image visible? | How |
|---|---|---|
| **Logo Bar** (immediately below hero) | ❌ Hidden | `.logo-bar` has `z-index: 2` painted directly on the element with its solid background, fully covering the image (which is at z:1) |
| **Pricing Tiers** (after logo bar) | ✅ Visible behind content | `.pricing-tiers` background is moved to a `::before` pseudo-element at `z-index: 0`, while content (`.pricing-tiers__header` + `__grid`) sits at `z-index: 2`. Image at z:1 sandwiches between, peeking through bg gaps but covered by cards/heading |

The hero section wrapper has **no `z-index`** and creates no stacking context — that's required so the image's `z-index: 1` participates in the page-level stacking context alongside layered children of subsequent sections.

For details on the pricing-tiers bg/content split, see [03-pricing-tiers.md](03-pricing-tiers.md).

## Tablet & mobile (< 1100px)

A single `@media screen and (max-width: 1099px)` block covers everything below the desktop layout — both narrow desktop / tablet AND phone widths. The hero turns into a **clean vertical stack**:

```css
@media screen and (max-width: 1099px) {
  [id$="__image_banner_KbGw4i"] {
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;        /* prevent any rogue image overflow */
  }

  /* Image renders inline above content, scales naturally with viewport */
  [id$="__image_banner_KbGw4i"] .banner__media {
    position: relative !important;
    inset: auto !important;
    width: 100% !important;
    height: auto !important;
    order: 1;                            /* image first */
  }

  [id$="__image_banner_KbGw4i"] .banner__content {
    position: relative;
    width: 100% !important;
    max-width: 100% !important;
    background-color: #EEEEEE;
    padding: 40px 24px;
    order: 2;                            /* content below */
  }
}
```

| Width | Layout |
|---|---|
| ≥ 1100px | Two-column with absolute image + downward overflow (Figma design) |
| 750–1099px | Stacked column — image at native ratio above content |
| < 750px | Same stacked column — image at native ratio above content |

Why one media query covers both ranges instead of two: the natural-aspect-ratio image works the same way at any width below 1100px, so there's no need to distinguish tablet from phone here.
