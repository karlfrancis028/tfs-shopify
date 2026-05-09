# Pioneer Card

**Section ID:** `image_banner_idbwdg`
**Section type:** `image-banner`
**Section file:** `sections/image-banner.liquid`
**Template:** `templates/page.subscription-2.json`
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

## Settings (in `templates/page.subscription-2.json`)

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
