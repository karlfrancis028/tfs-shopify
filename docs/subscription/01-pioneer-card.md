# Pioneer Card

**Section ID:** `image_banner_idbwdg`
**Section type:** `image-banner`
**Section file:** `sections/image-banner.liquid`
**Template:** `templates/page.subscription-quarterly-2.json`
**CSS:** `assets/section-image-banner.css`

## Purpose

Displays an HTML card overlaid precisely on top of the card design that is baked into the Pioneer background PNG. The card contains subscription plan details — title, price, description, feature list, and a CTA button.

> The selector `[id$="__image_banner_idbwdg"]` (attribute "ends with") matches regardless of the Shopify template ID prefix.

## Key Design Insight

The background image (`1-subs-the-pioneer_*.png`) already has a card-shaped area drawn into it. The HTML card does **not** float above a plain photo — it must be positioned to exactly cover that baked-in card region using percentage-based absolute coordinates. Any shift in `top/left/width/bottom` will visually misalign the HTML card from the image's card area.

## HTML Structure

```
section#shopify-section-…__image_banner_idbwdg
  div#Banner-…__image_banner_idbwdg  (.banner)
    div.banner__media                   ← Pioneer background image (fills full banner)
    div.banner__content                 ← position:absolute, overlaid on image card area
      div.banner__box                   ← dark card, flex column
        h2.banner__heading              ← plan name
        div.banner__price               ← currency + amount spans
        div.banner__text                ← plan description
        hr.banner__divider
        ul.banner__feature-list         ← one <li> per textarea line
          li.banner__feature-item
        div.banner__buttons             ← CTA button (margin-top: auto pushes to bottom)
```

## Settings (in `templates/page.subscription-quarterly-2.json`)

| Setting | Value |
|---|---|
| `image` | `shopify://shop_images/1-subs-the-pioneer_b566e03c-41c9-4fba-80bd-91acdf39c526.png` |
| `image_height` | `adapt` |
| `image_behavior` | `none` |
| `desktop_content_position` | `middle-center` |
| `desktop_content_alignment` | `center` |
| `show_text_box` | `true` |
| `color_scheme` | `scheme-4` (dark: `#121212` background, white text) |
| `stack_images_on_mobile` | `true` |
| `mobile_content_alignment` | `center` |

## Blocks (current content)

| Block type | Content |
|---|---|
| `heading` | "The Pioneer" (size: h2) |
| `price` | currency: "P", amount: "20,000" |
| `text` | Plan description paragraph |
| `divider` | _(separator)_ |
| `feature_item` | 4 lines: items in the box, garments, accessories, VIP access |
| `button` | "Add to cart", `button_style_secondary: true`, `btn_width: 100%` |

## Positioning (desktop)

The `.banner__content` is `position: absolute` and its coordinates are percentage-based, anchored to the banner's height/width, so they track the image dimensions at any viewport:

```css
[id$="__image_banner_idbwdg"] .banner__content {
  position: absolute !important;
  top: 14% !important;
  left: 20% !important;
  width: 31% !important;
  bottom: 8% !important;
  padding: 0 !important;
  display: flex !important;
  align-items: stretch !important;
  justify-content: center !important;
  z-index: 4;
}
```

| Property | Value | Why |
|---|---|---|
| `top: 14%` | Aligns card top with image card top | % of banner height |
| `left: 20%` | Aligns card left edge with image card left edge | % of banner width |
| `width: 31%` | Matches image card width | % of banner width |
| `bottom: 8%` | Stretches card bottom to image card bottom | % of banner height |

## Card Box

```css
[id$="__image_banner_idbwdg"] .banner__box {
  background: #2a2116 !important;   /* dark warm brown, matches image card bg */
  border-radius: 8px !important;
  padding: 3.2rem 2.8rem !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  gap: 1.4rem !important;
}
```

The `.banner__buttons` block has `margin-top: auto` to push the CTA to the bottom of the flex column regardless of content height.

## Typography

| Element | Font | Weight | Size | Notes |
|---|---|---|---|---|
| Heading | Glacial Indifference | 400 | 24px | `letter-spacing: -0.011em` |
| Price currency | Cardo | 700 | 20px | baseline-aligned with amount |
| Price amount | Cardo | 700 | 40px | `letter-spacing: -0.011em` |
| Description (`.banner__text`) | Glacial Indifference | 400 | 16px | `line-height: 1.5` — targets `p` and `*` children to override any nested tag |
| Feature items | Glacial Indifference | 400 | 16px | `line-height: 1.5`, bullet via `::before { content: '\2022' }` |
| Button | Proxima Nova | 400 | 16px | `text-transform: uppercase`, transparent bg, white border |

> `letter-spacing: -1.1%` from Figma is expressed as `-0.011em` in CSS (percentages are not valid for `letter-spacing`).

## Button

```css
[id$="__image_banner_idbwdg"] .banner__buttons .button {
  --buttons-radius: 999px;
  --buttons-radius-outset: 999px;
  width: 100% !important;
  max-width: 465px !important;
  background: transparent !important;
  color: #ffffff !important;
  border: 1px solid #ffffff !important;
  font-family: 'Proxima Nova', sans-serif !important;
  font-size: 16px !important;
  text-transform: uppercase !important;
}
```

## Mobile (< 750px)

On mobile the card is pulled out of absolute positioning and stacked below the image in normal flow:

```css
@media screen and (max-width: 749px) {
  [id$="__image_banner_idbwdg"] .banner__content {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    bottom: auto !important;
    width: 100% !important;
    padding: 2rem !important;
  }

  [id$="__image_banner_idbwdg"] .banner__box {
    height: auto !important;
    padding: 2.4rem 2rem !important;
  }
}
```

## Related: `banner--card-style` opt-in (Quarterly Subscription hero)

A second pattern in this same section (`image-banner`) supports a **generic card overlay** that's not baked into the PNG — the card is drawn entirely by CSS over a photo background. Used by the Quarterly Subscription hero (`image_banner_XypHhk` on `templates/page.subscription-quarterly-2.json`).

### Section settings (added)

| Setting | Type | Default | Effect |
|---|---|---|---|
| `card_background` | color | _(blank)_ | When set, applies inline `background-color` + `background-image: none` on `.banner__box` (kills the color-scheme gradient). Blank default means existing image-banner sections without an explicit value fall through to the color scheme unchanged — set this per-section (e.g. `#ffffff` for a white card). |
| `use_card_style` | checkbox | `false` | Adds `banner--card-style` class to `.banner`. Enables the full card layout + typography rules below. |

### Block settings (added)

| Block | Setting | Notes |
|---|---|---|
| `heading` | `heading_style` (select: `heading` / `subheading`) | When `subheading`, adds `banner__subheading` class to the `<h2>`. Inside card-style: `subheading` renders as 48px Cardo (desktop) / 32px (mobile); `heading` renders as 32px Glacial Indifference (desktop) / 20px (mobile). |
| `button` | `btn_width` | Now applied as **`max-width`** with `width: 100%`. Button stretches to fill its container up to the cap, instead of being a fixed width that can overflow narrow containers. |
| `image` (new block) | `image`, `width`, `height`, `fit`, `alignment` | Resizable image block. `width`/`height` are CSS lengths on a wrapper div; `fit` is `object-fit` on the `<img>`; `alignment` is `justify-content` on the flex wrapper. Useful for inline logos inside the card. |

### Card layout — class-based, both viewports

```css
@media (min-width: 750px) {
  .banner--card-style .banner__box {
    width: 808px;
    height: 493px;
    padding: 32px;
    border: 1px solid #8AA396;
    border-radius: 16px;
  }
}

@media (max-width: 749px) {
  .banner--card-style .banner__box {
    width: calc(100% - 3.2rem);
    height: auto;
    padding: 2rem;
    border: 1px solid #8AA396;
    border-radius: 12px;
    margin-left: auto;
    margin-right: auto;
  }
}
```

### Mobile overlay override

When `show_text_below: true` (the default), Dawn sets `banner--mobile-bottom` which puts the image in normal flow (stacked above content). Card-style overrides this so the image stays as a full-bleed background and the card overlays:

```css
@media (max-width: 749px) {
  .banner--card-style.banner--mobile-bottom .banner__media { position: absolute; }
  .banner--card-style.banner--mobile-bottom.banner--large  .banner__content { min-height: 39rem; }
  .banner--card-style.banner--mobile-bottom.banner--medium .banner__content { min-height: 34rem; }
  .banner--card-style.banner--mobile-bottom.banner--small  .banner__content { min-height: 28rem; }
}
```

Image absolute → doesn't contribute to height; we re-apply Dawn's per-size min-heights to `.banner__content` so the banner has somewhere for the absolute media to live.

### Instance-specific hoist (Quarterly Subscription only)

```css
@media (min-width: 750px) {
  [id^="shopify-section-"][id$="__image_banner_XypHhk"] {
    margin-top: calc(-1 * (var(--header-height, 6rem) + 1.2rem));
  }
  [id$="__image_banner_XypHhk"] .banner__content {
    padding-top: calc(var(--header-height, 6rem) + 1.2rem);
  }
}

@media (max-width: 749px) {
  [id^="shopify-section-"][id$="__image_banner_XypHhk"] {
    margin-top: 1.6rem;          /* breathing room below header on mobile */
  }
}

[id^="shopify-section-"][id$="__image_banner_XypHhk"] {
  margin-bottom: 128px;          /* gap to the next section, all viewports */
}
```

The negative top margin on desktop slides the hero behind the floating header pill (the header is transparent over the image). On mobile the hoist isn't viable (header would overlap the card) so the section flows below the header with a `1.6rem` gap.

### Typography (card-style only)

| Element | Desktop | Mobile |
|---|---|---|
| `.banner--card-style .banner__heading` | Glacial Indifference 32px, dark green `#024325`, `0 0 8px` | 20px, `0 0 4px` |
| `.banner--card-style .banner__subheading` | Cardo 48px serif, dark green, `0 0 32px` | 32px, `0 0 16px` |
| `.banner--card-style .banner__text` | Glacial Indifference 24px, dark green, `line-height: 1`, `0 0 32px` | 16px, `line-height: 1.4`, `0 0 16px` |

Dawn's stacked-child margins inside the box are reset (`> * + * { margin-top: 0 }`) so per-element `margin-bottom` is the only thing driving spacing — keeps the rhythm tight.

### When to use which pattern

| Need | Use |
|---|---|
| Single tier card with the card area **baked into the illustration** | Pioneer card (this doc, top section) |
| Generic card overlaid on a photo background, **no baked-in card art** | `banner--card-style` (this doc, below) |
| Multiple tier cards stacked vertically with independent illustrations | [`tier-showcase`](../sections/tier-showcase.md) |
