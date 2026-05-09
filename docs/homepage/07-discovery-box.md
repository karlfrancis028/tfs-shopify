# Discovery Box

**Section ID:** `discovery_box`
**Section type:** `horizontal-scroll`
**Section file:** `sections/horizontal-scroll.liquid`
**CSS:** `assets/section-horizontal-scroll.css`
**JS:** `assets/section-horizontal-scroll.js`

## Purpose

Second instance of the `horizontal-scroll` section on the homepage. Showcases individual product items that appear in the monthly discovery box. Uses the same section file and JS as the Quarterly Pairing section — differentiated only by content.

See [06-quarterly-pairing.md](06-quarterly-pairing.md) for full HTML structure, settings reference, and block field documentation.

## Settings (Current)

| Setting | Value |
|---|---|
| `heading` | "Discovery Box" |
| `subheading` | "Lorem ipsum dolor sit amet consectetur. Sed vitae sem id risus." |
| `background_color` | `#EEEEEE` |
| `link_text` | *(not set)* |
| `button_label` | *(not set)* |

## Current Cards (4 blocks)

| Card | Image | Title | Subtitle |
|---|---|---|---|
| 1 | `mokaflor.png` | Florence in a cup | Mokaflor |
| 2 | `spingle_loafers.png` | Belgian Loafers | Spingle |
| 3 | `colony_field_jacket.png` | Field Jacket | Colony Clothing |
| 4 | `spingle_boat.png` | Lausetto Boat Sneakers | Spingle |

> Note: Subheading copy is still placeholder ("Lorem ipsum…") and needs to be updated with real content.

## Inherited behavior from `horizontal-scroll`

Because this uses the same section file as Quarterly Pairing, it picks up the same recent improvements:

- `.h-scroll__track` is centered with `justify-content: safe center` — auto-centers when there are few cards, scrolls normally when overflowing.
- Subheading is rendered through the `newline_to_br` filter, so newlines in the textarea become `<br>` tags. Use this to control wrapping when you replace the placeholder copy.
- CTA button (`.h-scroll__button`) shares the homepage 999px pill radius.
