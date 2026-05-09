# Quarterly Pairing

**Section ID:** `quarterly_pairing`
**Section type:** `horizontal-scroll`
**Section file:** `sections/horizontal-scroll.liquid`
**CSS:** `assets/section-horizontal-scroll.css`
**JS:** `assets/section-horizontal-scroll.js`

## Purpose

Horizontally scrollable card strip showcasing the quarterly archetype pairings. Cards show an image, title, and description. Navigation is via prev/next arrow buttons and a progress bar. The same `horizontal-scroll` section type is reused for the Discovery Box section.

## HTML Structure

```
div.h-scroll  [data-h-scroll]
  div.h-scroll__header
    h2.h-scroll__heading
    p.h-scroll__subheading
  div.h-scroll__track  [data-scroll-track]
    div.h-scroll__card
      div.h-scroll__card-image
        img
      div.h-scroll__card-body
        h3.h-scroll__card-title
        p.h-scroll__card-subtitle    ← optional
        p.h-scroll__card-body-text   ← optional
  div.h-scroll__footer               ← only if link_text or button_label set
    a.h-scroll__link
    a.h-scroll__button
  div.h-scroll__nav
    button.h-scroll__arrow  [data-scroll-prev]   ← «
    div.h-scroll__progress
      div.h-scroll__progress-bar  [data-scroll-progress]
    button.h-scroll__arrow  [data-scroll-next]   ← »
```

## Settings

| Setting | Type | Current value |
|---|---|---|
| `heading` | text | "Quarterly Pairing" |
| `subheading` | textarea | "Shaped by your profile, function, and lifestyle. Structured across three quarterly tiers—progressing from essential foundations to a complete expression." |
| `background_color` | color | `#EEEEEE` |
| `link_text` | text | "Inspired Gentleman Style" |
| `link_url` | url | *(not set)* |
| `button_label` | text | "TAKE THE OATH OF DISCRETION" |
| `button_url` | url | *(not set)* |

## Block type: `card`

| Field | Type | Notes |
|---|---|---|
| `image` | image_picker | Card image (rendered at 300px desktop / 80vw mobile) |
| `title` | text | Card heading |
| `subtitle` | text | Optional small label below title |
| `body` | textarea | Optional description paragraph |

## Current Cards (5 blocks)

| Card | Image | Title | Body |
|---|---|---|---|
| 1 | `clubman.png` | The Classic Clubman | For the man at ease from course to clubhouse |
| 2 | `yachtman.png` | The Riviera Yachtman | For the man who leaves shore behind |
| 3 | `frontiersman.png` | The Hinterland Frontiersman | For the man drawn beyond the familiar |
| 4 | `academic.png` | The Academic | For the man shaped by thought |
| 5 | `operator.png` | The Operator | For the man at ease in every setting |

## CTA button

`.h-scroll__button` uses `border-radius: 999px` (pill) — matches every other CTA on the homepage. Defined in [`section-horizontal-scroll.css:111`](../../assets/section-horizontal-scroll.css). Note: this style is shared with the **Discovery Box** section (which uses the same `horizontal-scroll` section type).

## Card track centering

`.h-scroll__track` uses `justify-content: safe center` — when there are enough cards to overflow the viewport, the track left-aligns and scrolls naturally; when there are 1–2 cards that fit in the viewport, they center themselves. The `safe` keyword prevents the first card from becoming unreachable when content overflows. See [`section-horizontal-scroll.css:34`](../../assets/section-horizontal-scroll.css).

## Subheading line breaks (triangle shape)

The subheading uses the [`newline_to_br`](https://shopify.dev/docs/api/liquid/filters/newline_to_br) Liquid filter so a newline character (`\n`) in the textarea setting renders as a `<br>`. This lets you control where the subheading breaks for an upright "triangle" shape (short first line, longer second line) instead of the default greedy wrap.

In [`templates/index.json`](../../templates/index.json) Quarterly Pairing's subheading is currently:
```
Shaped by your profile, function, and lifestyle.\nStructured across three quarterly tiers—progressing from essential foundations to a complete expression.
```

Renders as:
```
Shaped by your profile, function, and lifestyle.
Structured across three quarterly tiers—progressing from
essential foundations to a complete expression.
```

In [`sections/horizontal-scroll.liquid`](../../sections/horizontal-scroll.liquid) line 14:
```liquid
<p class="h-scroll__subheading">{{ section.settings.subheading | newline_to_br }}</p>
```

Editor users can press Enter in the textarea to add line breaks via Customize.
