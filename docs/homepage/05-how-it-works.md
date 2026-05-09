# How It Works

**Section ID:** `how_it_works_main`
**Section type:** `how-it-works`
**Section file:** `sections/how-it-works.liquid`
**CSS:** `assets/section-how-it-works.css`

## Purpose

3-step process explainer with icon, title, and description per step. Has an optional footer with a text link and a CTA button.

## HTML Structure

```
div.how-it-works
  div.how-it-works__header
    h2.how-it-works__heading
    p.how-it-works__subheading
  div.how-it-works__steps
    div.how-it-works__step
      div.how-it-works__icon
        img
      h3.how-it-works__step-title
      p.how-it-works__step-body
  div.how-it-works__footer        ← only if link_text or button_label set
    a.how-it-works__link          ← text link with → arrow
    a.how-it-works__button        ← CTA button
```

## Settings

| Setting | Type | Current value |
|---|---|---|
| `heading` | text | "How It Works" |
| `subheading` | textarea | "A seamless three-step process—from induction to delivery." |
| `background_color` | color | `#DFE6E2` |
| `link_text` | text | "Begin your journey" |
| `link_url` | url | *(not set)* |
| `button_label` | text | "TAKE THE OATH OF DISCRETION" |
| `button_url` | url | *(not set)* |

## Block type: `step`

| Field | Type | Notes |
|---|---|---|
| `icon` | image_picker | Shopify CDN icon image |
| `icon_asset` | text | Fallback — theme asset filename (e.g. `icon-oath.svg`) |
| `title` | text | Step heading |
| `body` | textarea | Step description paragraph |

## Current Steps (3 blocks)

| Step | Icon | Title | Summary |
|---|---|---|---|
| 1 | `icon-oath.svg` | Take the Oath of Discretion | Required induction to define your profile |
| 2 | `icon-curation.svg` | The Curation Begins | Box curated after induction is complete |
| 3 | `icon-arrival.svg` | The Arrival | Box delivered; no-cost exchanges if fit is off |

## CTA button

`.how-it-works__button` uses `border-radius: 999px` (pill) — matches every other CTA on the homepage. See [`section-how-it-works.css:109`](../../assets/section-how-it-works.css).

## Step text colors

Both `.how-it-works__step-title` and `.how-it-works__step-body` use `color: #3D3D3D` (neutral dark grey) — distinct from the brand-green used on the heading and subheading above. See [`section-how-it-works.css:84,93`](../../assets/section-how-it-works.css).

## Layout (flex with safe-center)

`.how-it-works__steps` is a Flexbox container, **not a CSS Grid** (was `repeat(3, 1fr)` originally). It uses `justify-content: safe center` — when there are 3 steps the row fills full width as before, but with fewer steps the items center themselves. Each step has `flex: 0 0 calc((100% - 4rem) / 3)` to maintain the same per-step width as the original grid.

```css
.how-it-works__steps {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: safe center;
}
.how-it-works__step {
  flex: 0 0 calc((100% - 4rem) / 3);   /* 3 across — (100% − 2 gaps of 2rem) / 3 */
  box-sizing: border-box;
}
```

On mobile (< 749px), `.how-it-works__step` switches to `flex: 0 0 100%` (full-width stack), and the dashed connector line is hidden via `.how-it-works__steps::before { display: none }`.
