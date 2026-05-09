# FAQs

**Section ID:** `faq_main`
**Section type:** `faq-section`
**Section file:** `sections/faq-section.liquid`
**CSS:** `assets/section-faq.css`
**JS:** `assets/section-faq.js`

## Purpose

Categorised FAQ accordion. A left-side nav lists categories; clicking a category reveals only that group of `<details>` items. Questions use native `<details>`/`<summary>` for expand/collapse — no JS needed for accordion behaviour.

## HTML Structure

```
div.faq[data-faq]
  h2.faq__heading
  div.faq__layout
    nav.faq__nav
      button.faq__nav-item[data-target=<category-block-id>]   ← one per category
    div.faq__content
      div.faq__category[data-cat=<category-block-id>]         ← one per category
        details.faq__item
          summary                ← question text
          div.faq__answer        ← richtext answer
```

## JS Behaviour (`assets/section-faq.js`)

- On load, the first category is activated.
- Clicking a `.faq__nav-item` toggles `is-active` on the button and `is-hidden` on every `.faq__category` whose `data-cat` doesn't match the clicked button's `data-target`.
- Question expand/collapse is handled by the native `<details>` element — no JS.

## Settings

| Setting | Type | Current value |
|---|---|---|
| `heading` | text | "FAQs" |
| `background_color` | color | `#DFE6E2` |

## Block types

### `category`

| Field | Type | Notes |
|---|---|---|
| `label` | text | Category name shown in left-side nav |

### `question`

| Field | Type | Notes |
|---|---|---|
| `question` | text | Shown in `<summary>` |
| `answer` | richtext | Shown in `.faq__answer` (HTML allowed) |

> Block order matters — every `question` block belongs to the most recent `category` block above it. Re-ordering blocks in the editor moves questions between categories.

## Current Categories & Questions

| Category | # Questions | Topics |
|---|---|---|
| General Information | 1 | Eligibility (18+) |
| Subscription & Cycle | 3 | Cycle length, ship month, auto-renewal |
| Upgrading, Downgrading & Cancellation | 3 | 7-day adjustment window, cancel, no-action default |
| Payments | 4 | Accepted cards, recurring billing, failed payments, refunds |
| Subscription Box Contents | 3 | RTW vs bespoke, why measurements, alterations |
| Returns & Exchanges | 1 | Damaged/incorrect items, fit issues |
| Delivery | 1 | Missing-box procedure |

Total: 7 categories, 16 questions.
