# The Fortunate Son — Shopify Theme

Customized Shopify Dawn v15.4.0 theme for The Fortunate Son brand. Vanilla JS, plain CSS, Liquid templates — no build framework or bundler.

## Development Commands

Requires [Shopify CLI](https://shopify.dev/docs/themes/tools/cli) (`npm install -g @shopify/cli`).

```bash
shopify theme dev        # Local dev server with hot reload
shopify theme push       # Push theme to store
shopify theme pull       # Pull latest theme from store
shopify theme check      # Lint Liquid templates
```

## Directory Structure

```
assets/      JS, CSS, and custom WOFF2 fonts
config/      settings_schema.json (editor schema) + settings_data.json (current values)
layout/      theme.liquid — root HTML shell
locales/     50+ language JSON files; en.default.json is primary
sections/    72 sections (stock Dawn + custom business sections)
snippets/    39 reusable Liquid components
templates/   28 page templates (JSON + Liquid)
```

## Architecture

**No build step.** All files in `assets/` are served as-is — edits take effect immediately after `shopify theme push`.

**Pub/Sub pattern.** Cross-component communication goes through `assets/pubsub.js`. Subscribe with `subscribe(eventName, callback)`, publish with `publish(eventName, data)`.

**Color schemes.** Defined in `config/settings_data.json` under `current.colors`. Applied via CSS custom properties scoped to `[data-color-scheme]` blocks. Five presets + custom overrides.

**CSS variables.** Typography, spacing, and colors are CSS custom properties. Core variables live in `assets/base.css`.

**Custom fonts.** Glacial Indifference and Linux Libertine loaded from `assets/` as WOFF2. Declared in `assets/base.css` with `font-display: swap`.

## Theme Settings (Current)

| Setting | Value |
|---|---|
| Page width | 1000px |
| Heading font | Cardo |
| Body font | Assistant |
| Heading scale | 115% |
| Body scale | 115% |
| Cart type | Notification (not drawer) |
| Primary color | `#014325` (green) |
| Accent color | `#bf934a` (gold) |

## Custom Sections

Business-specific sections not in stock Dawn:

| Section | Purpose |
|---|---|
| `benefactors-note-survey.liquid` | Survey flow — Benefactors Note |
| `gentlemans-dossier-survey.liquid` | Survey flow — Gentleman's Dossier |
| `swift-induction-survey.liquid` | Survey flow — Swift Induction |
| `info-trigger.liquid` | Custom info component trigger |
| `custom-slider.liquid` | Custom image slider |
| `custom-collapse.liquid` | Custom collapsible content |
| `custom-imagebanner.liquid` | Custom image banner |
| `custom-image-image.liquid` | Side-by-side image layout |
| `custom-image-video.liquid` | Image + video layout |
| `custom-videobanner.liquid` | Full-width video banner |
| `hero-brands.liquid` | Brand hero section |
| `logo-bar.liquid` | Logo bar / press mentions |
| `horizontal-scroll.liquid` | Horizontal scroll strip |
| `testimonials.liquid` | Customer testimonials |
| `unboxing-experience.liquid` | Unboxing feature section |
| `how-it-works.liquid` | Step-by-step explainer |
| `pricing-tiers.liquid` | Pricing/plan comparison |
| `email-signup-banner.liquid` | Email capture banner |

The info component is split across `sections/info-trigger.liquid`, `snippets/info-display.liquid`, and `snippets/info-script.liquid`.

## Third-Party App Blocks

Integrated via `"type": "apps"` blocks in section schemas:

- Subscriptions
- Memberships
- Quizify
- Form Builder
- Product Quiz

## Localization

- Primary locale: `locales/en.default.json`
- Schema translations: `locales/*.schema.json` (one per language)
- 50+ languages including de, es, fr, it, ja, ko, zh-CN, zh-TW, pt-BR, ru, and more

## Key Files

| File | Purpose |
|---|---|
| `layout/theme.liquid` | Root HTML, global scripts/styles |
| `assets/base.css` | Core CSS variables and resets |
| `assets/global.js` | Global utilities |
| `assets/pubsub.js` | Pub/Sub event bus |
| `assets/constants.js` | Shared constants |
| `config/settings_schema.json` | Theme editor customization schema |
| `config/settings_data.json` | Active theme setting values |
