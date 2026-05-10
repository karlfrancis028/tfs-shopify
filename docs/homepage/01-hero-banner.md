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

/* The .banner — block layout, allow overflow, no stacking-context trap */
[id$="__image_banner_KbGw4i"] {
  display: block !important;
  position: relative !important;
  overflow: visible !important;
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
   is fully hidden behind the logo bar, then bleeds through the pricing-tiers bg. */
[id$="__image_banner_KbGw4i"] .banner__media {
  position: absolute !important;
  top: 112.77px;            /* Figma y-offset within frame */
  right: -110px;            /* image right edge sits 110px past viewport-right (overflow) */
  left: auto !important;    /* override Dawn's default left:0 */
  bottom: auto !important;
  width: calc(100vw - 630px + 110px); /* fills from content edge to 110px past viewport right */
  height: auto !important;
  z-index: 1;
  pointer-events: none;
}

[id$="__image_banner_KbGw4i"] .banner__media img {
  position: relative !important;
  width: 100% !important;
  height: auto !important;
  display: block !important;
}
```

### Why fluid width + right-anchoring

`width: calc(100vw - 630px + 110px)` combined with `right: -110px` pins the image left edge to **exactly 630px at every desktop viewport width** — no overlap with the content column ever.

Math: image right edge = viewport + 110px (fixed overflow). Image left = right − width = (vw + 110) − (vw − 630 + 110) = **630px**.

| Viewport | Image width | Image left | Right overflow |
|---|---|---|---|
| 1100px | 580px | 630px | 110px |
| 1440px | 920px | 630px | 110px |
| 1920px | 1400px | 630px | 110px |

The image scales with the viewport (height auto, proportional), so on wider screens it fills the right half more generously. The 110px right overflow is constant.

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
