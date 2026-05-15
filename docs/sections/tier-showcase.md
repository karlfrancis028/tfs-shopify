# Tier Showcase

**Section type:** `tier-showcase`
**Section file:** `sections/tier-showcase.liquid`
**CSS:** `assets/section-tier-showcase.css`

## Purpose

Stack of full-bleed illustration backgrounds with overlaid pricing-tier cards. Each tier block renders as a fixed-size row (1512 × 850, responsive cap at `100%` of viewport) containing an illustration that fills the row via `object-fit: cover`, with a tinted card overlaid on top showing tier name, price, description, features, and a CTA button.

The item is intentionally given a **fixed pixel size** rather than scaling with the image's natural aspect ratio — this guarantees predictable layout regardless of which illustration is uploaded. Card position within that fixed canvas is controlled by two 0–100 sliders (horizontal + vertical), so editors can place the card anywhere on the illustration without writing CSS.

Designed as a more flexible alternative to baking the card area into the illustration itself (the older [Pioneer Card pattern](../subscription/01-pioneer-card.md)) — here the illustration is purely background art, and the card is a CSS overlay that's fully editor-controlled.

## HTML Structure

```
section.tier-showcase
  div.tier-showcase__header                           ← optional section heading + subheading
    h2.tier-showcase__heading
    p.tier-showcase__subheading
  for each tier block:
    div#TierShowcase-{block.id}.tier-showcase__item   ← fixed 1512×850, centered, flex column
      ::before                                        ← top spacer (flex-grow = position_y)
      div.tier-showcase__bg                           ← position:absolute, fills item
        img                                           ← object-fit:cover
        div.tier-showcase__bg-overlay                 ← optional tint (only if opacity > 0)
      div.tier-showcase__card                         ← position:relative, z-index:1
        h3.tier-showcase__name
        div.tier-showcase__price
          span.tier-showcase__currency
          span.tier-showcase__amount
          span.tier-showcase__suffix                  ← optional
        div.tier-showcase__description.rte
        hr.tier-showcase__divider                     ← optional toggle
        ul.tier-showcase__features
          li × N (with • bullet)
        a.tier-showcase__button                       ← --outline|--filled|--ghost variant
      ::after                                         ← bottom spacer (flex-grow = 100 - position_y)
```

## Section settings

| Setting | Type | Default | Notes |
|---|---|---|---|
| `heading` | text | — | Optional section heading (above all tiers) |
| `subheading` | textarea | — | Multi-line; newlines render as `<br>` |
| `heading_color` | color | `#034325` | |
| `subheading_color` | color | `#034325` | |
| `header_alignment` | select | `center` | left / center / right |
| `background_color` | color | `#EEEEEE` | Section background (visible between blocks and around the centered item on wide viewports) |

> **Removed in latest revision:** the per-block Section Height group (`min_height`, `mobile_bg_height`) is gone. Item height is now a fixed `850px` from the CSS — no editor control. Re-introduce by adding the schema fields back and wiring a `--tier-min-height` inline custom property if needed.

## Block: `tier`

### Background image

| Setting | Type | Default | Notes |
|---|---|---|---|
| `background_image` | image_picker | — | Illustration. Responsive widths 450–3840 |
| `overlay_color` | color | `#000000` | Color of optional tint over image |
| `overlay_opacity` | range 0–80% | `0` | Set > 0 to apply tint |

### Card position

| Setting | Type | Default | Notes |
|---|---|---|---|
| `card_position` | range 0–100 (step 5) | `50` | Horizontal: 0 = flush left, 50 = centered, 100 = flush right. Math is `%`-based on item width so it tracks viewport shrink. |
| `card_position_y` | range 0–100 (step 5) | `50` | Vertical: 0 = top, 50 = middle, 100 = bottom. Driven by flex-grow ratio on `::before` / `::after` spacers. |

> **Scoped CSS hook:** each block gets a unique `id="TierShowcase-{block.id}"`, so you can write per-instance custom CSS for fine-tuning beyond the sliders.

### Card style

| Setting | Type | Default | Notes |
|---|---|---|---|
| `card_bg_color` | color | `#2a2116` | Card background (dark warm brown) |
| `card_text_color` | color | `#ffffff` | Inherited by all card content |
| `card_max_width` | range 280–640px (step 20) | `460` | Caps card width inside the 1512px item |
| `card_min_height` | range 0–800px (step 20) | `0` | `0` = auto (sizes to content). Use to keep multiple tiers visually consistent |
| `card_padding` | range 16–64px (step 4) | `32` | All sides |
| `card_border_radius` | range 0–32px (step 2) | `10` | |
| `card_text_alignment` | select | `center` | left / center / right |

### Content

| Setting | Type | Default | Notes |
|---|---|---|---|
| `tier_name` | text | "The Pioneer" | Rendered as `<h3>` |
| `currency` | text | "P" | Currency symbol/code |
| `amount` | text | "20,000" | Price number |
| `price_suffix` | text | — | Optional, e.g. "/quarter" |
| `description` | richtext | — | Paragraph(s) below price |
| `show_divider` | checkbox | `true` | Show `<hr>` between description and features |
| `features` | textarea | — | One feature per line → `<ul>` with bullet points |

### Call to action

| Setting | Type | Default | Notes |
|---|---|---|---|
| `button_label` | text | "ADD TO CART" | |
| `button_link` | url | — | |
| `button_style` | select | `outline` | outline / filled / ghost |
| `open_new_tab` | checkbox | `false` | |

## Layout model

### Item — fixed canvas, centered, capped responsively

```css
.tier-showcase__item {
  position: relative;
  width: 1512px;
  max-width: 100%;          /* shrinks below 1512px viewports — no horizontal scroll */
  height: 850px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tier-showcase__item + .tier-showcase__item {
  margin-top: 128px;        /* gap between stacked tiers — only between, not above the first */
}
```

The item is `display: flex; flex-direction: column` so the `::before` / `::after` spacers and the `.tier-showcase__card` participate in a column flex layout. The `.tier-showcase__bg` is `position: absolute; inset: 0` so it sits behind the column and is not part of the flex flow.

### Vertical card position — flex-grow on spacers

```css
.tier-showcase__item::before,
.tier-showcase__item::after {
  content: '';
  display: block;
  min-height: 1.6rem;       /* breathing room at positions 0 and 100 */
  flex-shrink: 0;
}

.tier-showcase__item::before { flex-grow: var(--tier-card-position-y, 50); }
.tier-showcase__item::after  { flex-grow: calc(100 - var(--tier-card-position-y, 50)); }
```

At `card_position_y = 50` both grow `1 : 1` → card centered. At `0` the `::before` is `0` → card slides to top. At `100` the `::after` is `0` → card slides to bottom.

### Horizontal card position — margin-left percentage math

```css
.tier-showcase__card {
  width: 100%;
  max-width: var(--tier-card-max-width, 460px);
  margin-left: calc(1.6rem + (100% - var(--tier-card-max-width, 460px) - 3.2rem) * var(--tier-card-position, 50) / 100);
  margin-right: 1.6rem;
}
```

The calc is a percentage of the item's width, so as the item shrinks (below the 1512px breakpoint) the card's offset shrinks proportionally — no `position: absolute`, no JS, just flow math.

- At `card_position = 0`: `margin-left = 1.6rem` (flush left with 1.6rem gutter)
- At `card_position = 100`: `margin-left = 100% - max-width - 1.6rem` (flush right)
- At `card_position = 50`: `margin-left = (100% - max-width) / 2` (centered)

## Typography spec

Card content typography matches the Figma design tokens. `letter-spacing: -1.1%` from Figma is expressed as `-0.011em` (CSS doesn't accept percentages for `letter-spacing`); `line-height: 100%` is expressed as `line-height: 1`.

| Element | Font | Weight | Size | Line-height | Letter-spacing | Align |
|---|---|---|---|---|---|---|
| `.tier-showcase__name` | Glacial Indifference | 400 | 24px | 1 | −0.011em | center |
| `.tier-showcase__currency`, `.tier-showcase__amount` | Cardo | 700 | 40px | 1 | −0.011em | center |
| `.tier-showcase__description` | Glacial Indifference | 400 | 20px | 1 | −0.011em | center |
| `.tier-showcase__features` | Glacial Indifference | 400 | 20px | 1 | −0.011em | center |

Because `line-height: 1` makes feature list rows touch each other, `.tier-showcase__features li` adds `margin-bottom: 1rem` for breathing room between items.

## Button position — pinned to card bottom

The card uses `display: flex; flex-direction: column`, and the button gets `margin-top: auto`. That auto-margin consumes any remaining vertical space inside the card, **pushing the button to the bottom regardless of how short or long the description / features content is**. Every tier's CTA button stays vertically aligned to the bottom edge of its card, even when card heights differ.

### Button styles

| Style | Look | When to use |
|---|---|---|
| `outline` | Transparent bg, 1px border in `currentColor` | Default — works on any card bg |
| `filled` | `currentColor` background | When card bg is dark and you want a high-contrast CTA |
| `ghost` | Transparent bg, no border, underlined text | Minimal/secondary CTAs |

## Mobile (< 749px)

```css
@media (max-width: 749px) {
  .tier-showcase__card {
    margin-left: auto !important;          /* override card_position — always centered */
    margin-right: auto !important;
    margin-top: 4rem;
    margin-bottom: 4rem;
    max-width: 460px;
    width: calc(100% - 3.2rem);
  }
}
```

On mobile the `card_position` slider is overridden to always center horizontally (the slider math doesn't produce nice values on narrow viewports). The vertical-position spacers still respect `card_position_y`. The item itself remains `1512px max-width: 100%` so it fills the viewport, and `height: 850px` is unchanged (image fills via `object-fit: cover`).

## Example: Pioneer + Heirloom from the homepage

```liquid
{
  "type": "tier-showcase",
  "blocks": {
    "tier_pioneer": {
      "type": "tier",
      "settings": {
        "background_image": "shopify://shop_images/pioneer-illustration.png",
        "card_position": 50,
        "card_position_y": 50,
        "card_bg_color": "#2a2116",
        "card_text_color": "#ffffff",
        "card_max_width": 460,
        "tier_name": "The Pioneer",
        "currency": "P",
        "amount": "20,000",
        "description": "<p>For the man beginning his journey into refinement…</p>",
        "features": "4 to 5 Items inside the box\nTop & Bottom Garments\nComplimentary Accessories\nVIP access to The Fortunate Son events",
        "button_label": "ADD TO CART"
      }
    },
    "tier_heirloom": {
      "type": "tier",
      "settings": {
        "background_image": "shopify://shop_images/heirloom-illustration.png",
        "card_position": 75,
        "card_position_y": 50,
        "card_bg_color": "#bf934a",
        "card_text_color": "#ffffff",
        "tier_name": "The Heirloom",
        "currency": "P",
        "amount": "30,000",
        "description": "<p>For the gentleman who values the lineage of craft…</p>",
        "features": "A curation of 5+ Premium items\nPremium Top & Bottom garments\nPremium-tier apparel and accessories\nExclusive access to The Fortunate Son events\nPremium-tier pair of shoes",
        "button_label": "ADD TO CART"
      }
    }
  },
  "block_order": ["tier_pioneer", "tier_heirloom"]
}
```

## When to use this section vs alternatives

| Need | Use |
|---|---|
| Tier cards with **separate illustration backgrounds**, slider-positioned, full-bleed | **`tier-showcase`** (this section) |
| Tier cards in a **clean grid** (3 cards side-by-side, white bg) | [`pricing-tiers`](../homepage/03-pricing-tiers.md) |
| Single tier card with the card area **baked into the illustration** | [`image-banner` (Pioneer Card pattern)](../subscription/01-pioneer-card.md) |
