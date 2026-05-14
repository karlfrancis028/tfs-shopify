# Tier Showcase

**Section type:** `tier-showcase`
**Section file:** `sections/tier-showcase.liquid`
**CSS:** `assets/section-tier-showcase.css`

## Purpose

Stack of full-bleed illustration backgrounds with overlaid pricing-tier cards. Each tier block renders as a full-width row containing an illustration that scales to its natural aspect ratio, with a tinted card overlaid on top showing tier name, price, description, features, and a CTA button.

Designed as a more flexible alternative to baking the card area into the illustration itself (the older [Pioneer Card pattern](../subscription/01-pioneer-card.md)) — here the illustration is purely background art, and the card is a CSS overlay that's fully editor-controlled.

## HTML Structure

```
section.tier-showcase
  div.tier-showcase__header                           ← optional section heading + subheading
    h2.tier-showcase__heading
    p.tier-showcase__subheading
  for each tier block:
    div#TierShowcase-{block.id}                       ← unique ID for scoped CSS targeting
       .tier-showcase__item
       .tier-showcase__item--{left|center|right}
      div.tier-showcase__bg                           ← position:absolute, fills item
        img                                           ← object-fit:cover, scales naturally
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
        a.tier-showcase__button                       ← .tier-showcase__button--{outline|filled|ghost}
```

## Section settings

| Setting | Type | Default | Notes |
|---|---|---|---|
| `heading` | text | — | Optional section heading (above all tiers) |
| `subheading` | textarea | — | Multi-line; newlines render as `<br>` |
| `heading_color` | color | `#034325` | |
| `subheading_color` | color | `#034325` | |
| `header_alignment` | select | `center` | left / center / right |
| `background_color` | color | `#EEEEEE` | Section background (visible between blocks if any) |

## Block: `tier`

### Background image

| Setting | Type | Default | Notes |
|---|---|---|---|
| `background_image` | image_picker | — | The illustration. Renders responsive widths 450–3840 |
| `overlay_color` | color | `#000000` | Color of optional tint over image |
| `overlay_opacity` | range 0–80% | `0` | Set > 0 to apply tint (e.g. for darker / more dramatic look) |

### Card position

| Setting | Type | Default | Notes |
|---|---|---|---|
| `card_position` | select | `center` | left / center / right — controls horizontal alignment via `justify-content` |

> **Scoped position override:** each block gets a unique `id="TierShowcase-{block.id}"`, so you can write per-instance custom CSS like `#TierShowcase-abc123 .tier-showcase__card { margin-left: 12%; }` to fine-tune position beyond the three preset options.

### Card style

| Setting | Type | Default | Notes |
|---|---|---|---|
| `card_bg_color` | color | `#2a2116` | Card background (dark warm brown) |
| `card_text_color` | color | `#ffffff` | Inherited by all card content |
| `card_max_width` | range 280–640px | `460` | |
| `card_padding` | range 16–64px | `32` | All sides |
| `card_border_radius` | range 0–32px | `10` | |
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

## Behaviour

### Image height — scales with natural aspect ratio

`.tier-showcase__bg img` uses `width: 100%; height: 100%; object-fit: cover` while `.tier-showcase__bg` is `position: absolute; inset: 0`. The **item's height** is determined by the **card** (which is in flow), so the image fills whatever vertical space the card needs. Because the card has padding + content but no fixed height, it adapts to its content — and the image fills around it.

For a tighter image (less of it visible), reduce `card_padding` or `card_max_width`. For more image, increase `card_padding` or add empty content.

### Card position — flex-based with custom CSS hooks

```css
.tier-showcase__item--left   { justify-content: flex-start; }
.tier-showcase__item--center { justify-content: center; }
.tier-showcase__item--right  { justify-content: flex-end; }
```

Plus side margin clamps so the card never kisses the viewport edge:

```css
.tier-showcase__item--left  .tier-showcase__card { margin-left:  clamp(1.6rem, 8%, 8rem); }
.tier-showcase__item--right .tier-showcase__card { margin-right: clamp(1.6rem, 8%, 8rem); }
```

For per-instance overrides (e.g. "this specific Pioneer card should sit at exactly 12% from the left"), target the block's unique ID:

```css
#TierShowcase-{block.id} .tier-showcase__card {
  margin-left: 12%;
}
```

### Mobile (< 749px) — card overlaps image bottom

On phones, the layout switches to vertical stacking with a deliberate **overlap effect**:

- `.tier-showcase__bg` becomes `position: relative` with `aspect-ratio: 4/3` (image at top, sensible height)
- `.tier-showcase__card` gets `margin-top: -8rem`, pulling it up to overlap the image bottom by ~80px

This creates a more dramatic "card peeks over the illustration" feel than a clean stack.

### Button styles

| Style | Look | When to use |
|---|---|---|
| `outline` | Transparent bg, 1px border in `currentColor` | Default — works on any card bg |
| `filled` | `currentColor` background | When card bg is dark and you want a high-contrast CTA |
| `ghost` | Transparent bg, no border, underlined text | Minimal/secondary CTAs |

## Example: Pioneer + Heirloom from the homepage

```liquid
{
  "type": "tier-showcase",
  "blocks": {
    "tier_pioneer": {
      "type": "tier",
      "settings": {
        "background_image": "shopify://shop_images/pioneer-illustration.png",
        "card_position": "center",
        "card_bg_color": "#2a2116",
        "card_text_color": "#ffffff",
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
        "card_position": "right",
        "card_bg_color": "#bf934a",
        "card_text_color": "#ffffff",
        "tier_name": "The Heirloom",
        "currency": "P",
        "amount": "30,000",
        "description": "<p>For the gentleman who values the lineage of craft…</p>",
        "features": "A curation of 5+ Premium items\nPremium Top & Bottom garments\nPremium-tier apparel and accessories\nExclusive access to The Fortunate Son events\nPremium-tier pair of shoes\nAnnual Limited Collection Birthday gift.",
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
| Tier cards with **separate illustration backgrounds**, mirrored layouts, full-bleed | **`tier-showcase`** (this section) |
| Tier cards in a **clean grid** (3 cards side-by-side, white bg) | [`pricing-tiers`](../homepage/03-pricing-tiers.md) |
| Single tier card with the card area **baked into the illustration** | [`image-banner` (Pioneer Card pattern)](../subscription/01-pioneer-card.md) |
