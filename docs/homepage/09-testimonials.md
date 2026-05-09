# Testimonials

**Section ID:** `testimonials_main`
**Section type:** `testimonials`
**Section file:** `sections/testimonials.liquid`
**CSS:** `assets/section-testimonials.css`

## Purpose

Member quote grid. Each testimonial is a `<figure>` with a `<blockquote>` and `<figcaption>`. No JS — purely static layout.

## HTML Structure

```
div.testimonials
  h2.testimonials__heading
  p.testimonials__subheading
  div.testimonials__grid
    figure.testimonial
      blockquote.testimonial__quote
      figcaption.testimonial__author
        span.testimonial__name
        span.testimonial__role     ← optional
```

## Settings

| Setting | Type | Current value |
|---|---|---|
| `heading` | text | "In Their Words" |
| `subheading` | textarea | *(empty)* |
| `background_color` | color | `#EEEEEE` |

## Block type: `testimonial`

| Field | Type | Notes |
|---|---|---|
| `quote` | textarea | The quote text (include surrounding quotation marks in the copy) |
| `name` | text | Member name |
| `role` | text | Optional role or membership date (e.g. "Member since 2024") |

## Current Testimonials (3 blocks)

| Quote | Name | Role |
|---|---|---|
| "A quarterly ritual I've come to rely on — curated with an editor's eye." | Full Name | Member since 2024 |
| "Considered, intentional, and quietly beautiful. Everything I hoped a membership could be." | Full Name | Member since 2024 |
| "The closest thing I've found to a personal archivist of taste." | Full Name | Member since 2024 |

> Note: Names are still placeholder ("Full Name") — real member names need to be filled in.

## Layout (flex with safe-center)

`.testimonials__grid` is a Flexbox container, **not a CSS Grid** (was `repeat(3, 1fr)` originally). It uses `justify-content: safe center` so 1 or 2 testimonials center themselves; 3 testimonials fill the full row identically to before.

```css
.testimonials__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: safe center;
}
.testimonial {
  flex: 0 0 calc((100% - 6rem) / 3);   /* 3 across — (100% − 2 gaps of 3rem) / 3 */
}
```

On mobile (< 749px), `.testimonial` becomes `flex: 0 0 100%` (full-width stack).
