# Unboxing Experience

**Section ID:** `unboxing_main`
**Section type:** `unboxing-experience`
**Section file:** `sections/unboxing-experience.liquid`
**CSS:** `assets/section-unboxing-experience.css`

## Purpose

Edge-to-edge **infinite-scroll marquee** showing unboxing photography. Same CSS-only marquee technique as the [Logo Bar](02-logo-bar.md) — Liquid renders blocks twice, the track translates `-50%`, and the loop is seamless. Pauses on hover. No JS.

## HTML Structure

```
section.unboxing                                       ← overflow:hidden, edge-to-edge
  div.unboxing__header                                 ← only header has horizontal padding
    h2.unboxing__heading
    p.unboxing__subheading
  div.unboxing__grid                                   ← width:max-content, animates -50%
    div.unboxing__item × N                             ← first pass — real blocks
      img
    div.unboxing__item × N (aria-hidden="true")        ← second pass — duplicate for loop
      img
```

For 3 blocks, the DOM ends up with 6 `.unboxing__item` elements (3 visible + 3 aria-hidden duplicates).

## How the marquee works

| Step | Mechanism |
|---|---|
| 1 | `for block in section.blocks` runs **twice** in [Liquid](../../sections/unboxing-experience.liquid) — first pass renders real blocks, second pass renders an `aria-hidden` duplicate |
| 2 | Wrapping `<div>` sets `--unboxing-speed` CSS variable from the `scroll_speed` setting |
| 3 | `.unboxing__grid` is a flex strip with `width: max-content` (grows to fit all duplicated items) |
| 4 | `@keyframes unboxing-scroll` translates `0` → `-50%` infinitely; at -50% the duplicate set is positioned exactly where the original was at 0%, so the loop is invisible |
| 5 | Parent `.unboxing` has `overflow: hidden` to clip everything past the viewport edges |
| 6 | `:hover` pauses via `animation-play-state: paused`; `prefers-reduced-motion` disables animation entirely |

## Settings

| Setting | Type | Default | Current |
|---|---|---|---|
| `heading` | text | "The Unboxing Experience" | (default) |
| `subheading` | textarea | "Those with discerning taste live with intention…" | (default) |
| `background_color` | color | `#EEEEEE` | `#EEEEEE` |
| `scroll_speed` | range (20–120s) | `40` | `40` — duration of one full cycle, lower = faster |

## Block type: `image`

| Field | Type | Notes |
|---|---|---|
| `image` | image_picker | Responsive image rendered at widths 400/600/900/1200 |

## Current Images (3 blocks)

| Block | Image |
|---|---|
| 1 | `unboxing_experience_1.png` |
| 2 | `unboxing_experience_2.png` |
| 3 | `unboxing_experience_3.png` |

## Per-item width (CSS)

| Viewport | `flex: 0 0` value | Visible images |
|---|---|---|
| Desktop ≥ 750px | `calc(100vw / 3)` | 3 at a time |
| Mobile < 750px | `80vw` | ~1.25 (peek of next image) |

`vw` (not `%`) is used because the parent has `width: max-content` — percentages would be ambiguous, while `vw` is a fixed slice of the viewport. This makes the `-50%` translate land on exact pixel boundaries for a perfect loop.

## Edge-to-edge layout

The section has `padding: 6rem 0` (no horizontal padding) so images extend fully to the viewport edges. The `.unboxing__header` has its own `padding: 0 1.6rem` so the heading and subheading still sit comfortably away from the screen edge.
