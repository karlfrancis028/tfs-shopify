# Homepage

**Template:** `templates/index.json`

## Sections (in order)

| # | File | Section type | Description |
|---|---|---|---|
| 1 | `01-hero-banner.md` | `image-banner` | Two-column hero — content left, image right (overflows downward into logo bar). Stacked layout below 1100px. |
| 2 | `02-logo-bar.md` | `logo-bar` | Infinite auto-scroll brand logo marquee (CSS-only, blocks duplicated in Liquid) |
| 3 | `03-pricing-tiers.md` | `pricing-tiers` | Subscription tier cards locked to 386px each, `auto-fit` wraps on narrower viewports |
| 4 | `04-hero-brands.md` | `hero-brands` | Featured brand logo grid |
| 5 | `05-how-it-works.md` | `how-it-works` | 3-step process explainer with dashed connector |
| 6 | `06-quarterly-pairing.md` | `horizontal-scroll` | Quarterly archetype cards (scroll-snap with arrows) |
| 7 | `07-discovery-box.md` | `horizontal-scroll` | Discovery box product cards (same section type as Quarterly) |
| 8 | `08-unboxing-experience.md` | `unboxing-experience` | Edge-to-edge **infinite-scroll marquee** of unboxing photos |
| 9 | `09-testimonials.md` | `testimonials` | Member quote grid (flex with safe-center) |
| 10 | `10-faq.md` | `faq-section` | Categorised FAQ accordion |

## Cross-section conventions

### CTA buttons — pill shape (999px radius)

Every primary CTA on the homepage uses `border-radius: 999px` for a consistent pill look:

| Section | Class | Defined in |
|---|---|---|
| Hero | `.banner__buttons .button` | [`templates/index.json`](../../templates/index.json) `custom_css` (overrides `--buttons-radius`) |
| Pricing Tiers | `.pricing-tier__button` | [`section-pricing-tiers.css:131`](../../assets/section-pricing-tiers.css) |
| How It Works | `.how-it-works__button` | [`section-how-it-works.css:109`](../../assets/section-how-it-works.css) |
| Quarterly Pairing & Discovery Box | `.h-scroll__button` | [`section-horizontal-scroll.css:111`](../../assets/section-horizontal-scroll.css) |

When adding new homepage sections with CTAs, follow this convention.

### Brand colors

| Use case | Color |
|---|---|
| Primary text / dark green | `#034325` (close to theme primary `#014325`) |
| "Most Popular" / accent green | `#169C62` (Figma brighter green — pricing tier popular badge & border) |
| Step text (How It Works) | `#3D3D3D` (neutral dark grey) |
| Accent gold | `#bf934a` |

### Multi-card centering convention (`safe center`)

Every section with multiple cards/items in a row uses **Flexbox** with `justify-content: safe center` so:

- When items fit in viewport → centered as a row
- When items overflow → falls back to `start` (left-aligned + scrollable, first card always reachable)

| Section | Container | Per-item flex-basis |
|---|---|---|
| Pricing Tiers | `.pricing-tiers__grid` (CSS Grid `repeat(auto-fit, 386px)`) | n/a — grid auto-fit handles wrap |
| How It Works | `.how-it-works__steps` | `calc((100% - 4rem) / 3)` |
| Quarterly Pairing & Discovery Box | `.h-scroll__track` | `flex: 0 0 auto; width: 28rem` |
| Unboxing Experience | `.unboxing__grid` (marquee — see § Marquee pattern) | `calc(100vw / 3)` |
| Testimonials | `.testimonials__grid` | `calc((100% - 6rem) / 3)` |

**Width formula for N columns at gap G:** `calc((100% - (N − 1) × G) / N)`. For 3 columns at 2rem gap → `calc((100% − 4rem) / 3)`.

### Marquee / infinite-scroll pattern

Two homepage sections use the same CSS-only infinite-scroll trick:

1. **Logo Bar** ([02-logo-bar.md](02-logo-bar.md))
2. **Unboxing Experience** ([08-unboxing-experience.md](08-unboxing-experience.md))

The recipe in three steps:
1. **Liquid renders blocks twice** — first pass with real content, second pass with `aria-hidden="true"` duplicates.
2. **Track is a flex container with `width: max-content`** so it grows wider than the viewport.
3. **Animate `transform: translateX(0)` → `translateX(-50%)`**. At -50% the duplicate set lands exactly where the original was at 0% — the loop is invisible.

Both sections include `:hover { animation-play-state: paused }` and `@media (prefers-reduced-motion: reduce) { animation: none }` for accessibility.
