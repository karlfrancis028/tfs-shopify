# Pricing Tiers

**Section ID:** `pricing_tiers_main`
**Section type:** `pricing-tiers`
**Section file:** `sections/pricing-tiers.liquid`
**CSS:** `assets/section-pricing-tiers.css`

## Purpose

3-column subscription plan comparison card grid. Each card shows a tier name, price, description, feature list, and a CTA button. One card can be marked "most popular" which adds a badge and highlighted styling.

## HTML Structure

```
div#PricingTiers-{id}  (.pricing-tiers)
  div.pricing-tiers__header
    h2.pricing-tiers__heading
    p.pricing-tiers__subheading
  div.pricing-tiers__grid
    div.pricing-tier  [.pricing-tier--popular]
      div.pricing-tier__badge       ← only if is_popular
      div.pricing-tier__name
      div.pricing-tier__price
        span.pricing-tier__amount
        span.pricing-tier__suffix
      div.pricing-tier__description
      hr.pricing-tier__divider
      ul.pricing-tier__features
        li  ← one per line in textarea
      a.pricing-tier__button
```

## Settings

| Setting | Type | Current value |
|---|---|---|
| `heading` | text | "What's Inside the Box?" |
| `subheading` | textarea | "Your boxes reflects your archetype, curated from brands that share our ethos." |
| `background_color` | color | `#EEEEEE` |

## Block type: `tier`

| Field | Type | Notes |
|---|---|---|
| `name` | text | Tier display name |
| `price` | text | Price string (e.g. "P 20,000") |
| `price_suffix` | text | Suffix after price (e.g. "/quarter") |
| `description` | richtext | Short paragraph description |
| `features` | textarea | One feature per line — split on newlines into `<li>` items |
| `is_popular` | checkbox | Adds `.pricing-tier--popular` + shows badge |
| `popular_label` | text | Badge text (e.g. "Most Popular") |
| `button_label` | text | CTA button text |
| `button_link` | url | ReCharge or cart URL |
| `open_new_tab` | checkbox | Opens link in new tab |

## Current Tiers (3 blocks)

| Tier | Price | Popular | Features |
|---|---|---|---|
| The Pioneer | P 20,000 /quarter | No | 4–5 items, top & bottom garments, accessories, VIP events |
| The Heirloom | P 30,000 /quarter | Yes ("Most Popular") | 5+ premium items, premium garments, shoes, exclusive events, birthday gift |
| The Legacy | P 50,000 /quarter | No | 5+ premium items, premium garments, shoes, VIP + private experience access |

## Hero bleed-through layering

The hero banner image extends downward past the logo bar and reaches into this section. Unlike the logo bar (which fully covers the image), pricing tiers lets the image **bleed through its background but stay hidden behind its content**:

| Element | z-index | Why |
|---|---|---|
| `.pricing-tiers::before` | `0` | Background painted on a pseudo-element so the hero image at `z-index: 1` can render on top of it |
| Hero `.banner__media` (from `image_banner_KbGw4i`) | `1` | Sandwiched between the bg and the content of this section |
| `.pricing-tiers__header`, `.pricing-tiers__grid` | `2` | Heading, subheading, and the tier cards always paint on top of the hero overflow |

The `--pricing-tiers-bg` CSS variable is set inline on `.pricing-tiers` from the section's `background_color` setting, then read by the `::before` pseudo-element. The `.pricing-tiers` element itself has `position: relative` but **no `z-index`** — it must NOT create a stacking context, or the hero image at z:1 would be trapped behind the entire section.

> Cards have their own opaque white background, so even where the hero image overlaps with a card area, the image is visually hidden by the card's bg. Image only "bleeds through" in the gaps between cards or above the heading area.

## Card sizing

Cards are **fixed at 386px wide** each. The grid uses `grid-template-columns: repeat(auto-fit, 386px)` (not `repeat(3, …)`) and `justify-content: center`. `auto-fit` lets the grid lay down as many 386px columns as the viewport actually has room for, so cards wrap gracefully on narrower viewports instead of overflowing horizontally.

| Viewport | Visible cards |
|---|---|
| ≥ ~1190px | 3 across, centered (matches Figma) |
| ~810–1189px | 2 across, centered |
| ~430–809px | 1 across, centered at native 386px |
| < 420px | 1 across, full-width (`grid-template-columns: 1fr; padding: 0 1.6rem;`) |

The phone-width fallback at `max-width: 420px` switches to a `1fr` column so cards don't exceed the screen on phones narrower than the 386px card itself.

## Popular-tier styling

The card with `is_popular: true` (currently **The Heirloom**) gets:

| Element | Color | Source |
|---|---|---|
| `.pricing-tier--popular` border | `#169C62` (Figma brighter green) | [`section-pricing-tiers.css:48`](../../assets/section-pricing-tiers.css) |
| `.pricing-tier__badge` background | `#169C62` | [`section-pricing-tiers.css:57`](../../assets/section-pricing-tiers.css) |

## CTA button

`.pricing-tier__button` uses `border-radius: 999px` (pill) — matches every other CTA on the homepage. See [`section-pricing-tiers.css:131`](../../assets/section-pricing-tiers.css).

## Feature bullets

Each feature line is rendered as `<li>` with a `::before` pseudo-element injecting a bullet character. Defined in [`section-pricing-tiers.css:123–125`](../../assets/section-pricing-tiers.css). If bullets ever render as `â€¢`, switch the literal `•` to its CSS escape `\2022 ` to be encoding-independent.
