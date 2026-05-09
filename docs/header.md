# Header

## File Map

| File | Role |
|---|---|
| `sections/header.liquid` | Main entry point — markup, inline styles, sticky JS, schema |
| `sections/header-group.json` | Section group config (announcement bar + header order, saved settings) |
| `snippets/header-drawer.liquid` | Mobile/tablet slide-out nav drawer |
| `snippets/header-dropdown-menu.liquid` | Desktop dropdown nav (default) |
| `snippets/header-mega-menu.liquid` | Desktop mega menu (full-width panel) |
| `snippets/header-search.liquid` | Search modal (used twice: top-center layout + icon position) |
| `assets/component-menu-drawer.css` | Drawer panel styles |
| `assets/component-mega-menu.css` | Mega menu panel styles |
| `assets/component-search.css` | Search input/modal styles |
| `assets/component-list-menu.css` | Shared list menu styles (used by both drawer and inline nav) |
| `assets/component-cart-notification.css` | Cart notification popup styles (loaded by header) |
| `assets/component-price.css` | Price display in predictive search results (conditional) |

---

## HTML Structure

### `sections/header.liquid`

The section renders as either a plain `<div>` or a `<sticky-header>` custom element depending on the `sticky_header_type` setting.

```
<sticky-header> | <div>  (.header-wrapper)
  <header>  (.header)
    header-drawer           ← mobile hamburger + slide-out panel
    header-search           ← search icon + modal (top-center layout only)
    <a> .header__heading-link  ← logo or shop name
    header-dropdown-menu    ← desktop nav (dropdown mode)
      OR
    header-mega-menu        ← desktop nav (mega mode)
    <div> .header__icons
      .header-cta-pill      ← "BECOME A PARTNER" link (custom, desktop only)
      localization-form     ← country selector (desktop, hidden on mobile)
      localization-form     ← language selector (desktop, hidden on mobile)
      header-search         ← search icon + modal (all layouts)
      <a> .header__icon--account  ← account icon (if accounts enabled)
      app blocks            ← third-party app icons
      <a> #cart-icon-bubble ← cart icon + item count bubble
  </header>
  cart-notification         ← rendered here when cart type = notification
</sticky-header>
```

**Logo rendering** — the logo block appears in two places in the template:
- Before the nav when `logo_position` is `top-left`, `top-center`, or `middle-left`
- After the nav when `logo_position` is `middle-center`

This is intentional so CSS grid placement works correctly for each layout variant.

### `snippets/header-drawer.liquid`

Mobile/tablet nav rendered as a `<header-drawer>` custom element (JS defined in `assets/header.js` via Dawn core). Uses `<details>`/`<summary>` for open/close state. Supports 3 levels of nesting:

```
header-drawer
  details#Details-menu-drawer-container
    summary  ← hamburger icon (toggles open/close)
    div#menu-drawer
      nav .menu-drawer__navigation
        ul  ← top-level links
          details  ← if link has children (level 1 → level 2)
            summary  ← parent link
            div .menu-drawer__submenu
              button .menu-drawer__close-button
              ul  ← child links
                details  ← if grandchildren (level 2 → level 3)
                  summary
                  div .menu-drawer__submenu
                    ul  ← grandchild links
      div .menu-drawer__utility-links
        account link
        localization forms (country + language, mobile)
        social icon list
```

`data-breakpoint` is set to `"desktop"` when `menu_type_desktop == 'drawer'`, otherwise `"tablet"` — this controls at which breakpoint the hamburger becomes visible.

### `snippets/header-dropdown-menu.liquid`

Desktop inline nav using `<header-menu>` custom elements. Each top-level item with children uses `<details>`/`<summary>`. Supports up to 3 levels. Dropdowns are positioned absolutely via `.header__submenu`.

### `snippets/header-mega-menu.liquid`

Same structure as dropdown but uses `.mega-menu` class on the `<details>` element. The panel (`.mega-menu__content`) stretches full-width (left: 0, right: 0) and uses a 6-column grid for child links.

### `snippets/header-search.liquid`

Wraps in a `<details-modal>` custom element. Conditionally uses `<predictive-search>` or `<search-form>` wrapper depending on `settings.predictive_search_enabled`. Called twice in `header.liquid` — once for top-center logo layouts, once inside `.header__icons` for all layouts. Each call must receive a unique `input_id`.

---

## CSS

### Inline styles in `sections/header.liquid`

Two style blocks live directly in the section file:

**Static `<style>` block (lines 19–128)** — customizations applied on top of Dawn defaults:

| Selector | What it does |
|---|---|
| `header-drawer` | `justify-self: start; margin-left: -1.2rem` |
| `.header-wrapper` | Rounded border (`border-radius: 0.8rem`), green border `#8AA396`, white bg |
| `.header__inline-menu a`, `.header__menu-item` | Uppercase, `font-size: 20px`, removes text-decoration |
| `.header-cta-pill` | Green pill button — `border: 1px solid #024325`, `border-radius: 999px`, uppercase, hover fills green |
| `.header__icon .svg-wrapper` | 36×36px icon sizing |
| `header-drawer` (desktop hide) | `display: none` at ≥990px when not in drawer mode |
| `.list-menu`, `.list-menu--inline` | Base list reset + inline flex layout |
| `.list-menu__item` | Flex align-center, line-height via `--font-body-scale` |

**Dynamic `{%- style -%}` block (lines 130–155)** — uses Liquid to output section setting values:

| Selector | Dynamic value |
|---|---|
| `.header` | `padding-top/bottom` from `padding_top` / `padding_bottom` settings; `max-width: 1600px` |
| `.section-header` | `margin-bottom` from `margin_bottom` setting |

The `.section-header` rule also has `position: sticky` as a Safari z-index workaround (see PR #2147 comment in source).

**Custom CSS from `header-group.json`** — two rules targeting the "Editor's Notes" nav item specifically:

```css
#HeaderMenu-editors-notes span {
  font-family: "GlacialIndifference-Regular";
  color: #034325;
  font-size: 18px;
  letter-spacing: 0;
  text-transform: uppercase;
}
#HeaderMenu-editors-notes[aria-current="page"] span,
#HeaderMenu-editors-notes.list-menu__item--active span {
  text-decoration: underline;
  text-underline-offset: 6px;
  text-decoration-thickness: 2px;
}
```

These are injected via the Shopify theme editor `custom_css` field and applied globally.

### `assets/component-menu-drawer.css`

Styles the mobile/tablet slide-out drawer panel.

| Key rules | Notes |
|---|---|
| `.menu-drawer` | `position: absolute; transform: translateX(-100%)` — off-screen by default |
| `details[open].menu-opening > .menu-drawer` | `transform: translateX(0)` — slides in when open |
| `.menu-drawer__submenu` | `position: absolute; transform: translateX(100%)` — child panels slide in from right |
| Overlay (`summary::before`) | Semi-transparent backdrop via `rgba(var(--color-foreground), 0.5)` |
| `@media (min-width: 750px)` | Drawer width constrained to `40rem` |
| `@media (max-width: 749px)` | Country selector open state disables transform/filter |

### `assets/component-mega-menu.css`

Styles the full-width desktop mega menu panel.

| Key rules | Notes |
|---|---|
| `.mega-menu__content` | `position: absolute; left: 0; right: 0; top: 100%` — full-width below header |
| `.js .mega-menu__content` | Hidden via `opacity: 0; transform: translateY(-1.5rem)` |
| `.mega-menu[open] .mega-menu__content` | Shown via `opacity: 1; transform: translateY(0)` |
| `.mega-menu__list` | CSS Grid — 6 equal columns, `gap: 1.8rem 4rem` |
| `.header--top-center .mega-menu__list` | Switches to flexbox with `width: 16%` per column |
| `.mega-menu__link--level-2` | Bold — used for category headings |
| Sticky max-height | `calc(100vh - var(--header-bottom-position-desktop) - 4rem)` |

---

## JavaScript

### `StickyHeader` class — embedded in `sections/header.liquid` (line 376)

Defined inline via the `{% javascript %}` Liquid tag. Compiled into Shopify's concatenated JS bundle.

**Custom element:** `<sticky-header>` (replaces the outer `<div>` when sticky is enabled)

**Lifecycle:**

```
connectedCallback()
  → setHeaderHeight()         sets --header-height CSS var
  → adds 'shopify-section-header-sticky' if always-sticky
  → registers scroll listener → onScroll()
  → registers IntersectionObserver → captures headerBounds

disconnectedCallback()
  → removes scroll listener
```

**`onScroll()` logic:**

| Condition | Action |
|---|---|
| Scrolling down + past header bottom | `hide()` — adds `shopify-section-header-hidden` + `shopify-section-header-sticky` |
| Scrolling up + past header bottom + `preventReveal` is false | `reveal()` — removes `hidden`, adds `animate` |
| Scrolling up + `preventReveal` is true | Debounced `hide()`, clears `preventReveal` after 66ms |
| Scrolled back to top (≤ headerBounds.top) | `reset()` — removes all sticky classes |

**Sticky modes** (set via `data-sticky-type`):

| Value | Behavior |
|---|---|
| `none` | No sticky — section renders as plain `<div>` |
| `on-scroll-up` | Hides on scroll down, reveals on scroll up |
| `always` | Always visible; `hide()` / `reveal()` / `reset()` are all no-ops |
| `reduce-logo-size` | Same as `always` + adds `.scrolled-past-header .header__heading-logo-wrapper { width: 75% }` via inline style |

**`preventReveal` flag** — set to `true` when the `preventHeaderReveal` custom event fires (dispatched by other components, e.g. cart drawer opening). Prevents the header from sliding back in while an overlay is open.

**`closeMenuDisclosure()` / `closeSearchModal()`** — called inside `hide()` to close any open dropdown or search modal when the header hides.

**CSS variable set by this class:**

| Variable | Value |
|---|---|
| `--header-height` | `header.offsetHeight` in px — updated on 990px breakpoint change |

---

## Theme Editor Settings

Configured in `sections/header.liquid` schema, saved in `sections/header-group.json`.

| Setting ID | Type | Current value | Description |
|---|---|---|---|
| `logo_position` | select | `middle-left` | Logo placement: `top-left`, `top-center`, `middle-left`, `middle-center` |
| `mobile_logo_position` | select | `left` | Mobile logo: `center` or `left` |
| `menu` | link_list | `new-dawn-menu` | Navigation menu to render |
| `menu_type_desktop` | select | `dropdown` | Desktop nav style: `dropdown`, `mega`, `drawer` |
| `sticky_header_type` | select | `on-scroll-up` | Sticky behavior: `none`, `on-scroll-up`, `always`, `reduce-logo-size` |
| `show_line_separator` | checkbox | `true` | Border-bottom on header wrapper |
| `color_scheme` | color_scheme | custom scheme | Header background/text color |
| `menu_color_scheme` | color_scheme | custom scheme | Dropdown/mega/drawer panel color |
| `enable_country_selector` | checkbox | `true` | Show country switcher |
| `enable_language_selector` | checkbox | `true` | Show language switcher |
| `enable_customer_avatar` | checkbox | `true` | Show customer avatar vs generic account icon |
| `padding_top` | range (0–36px) | `8px` | Header inner top padding |
| `padding_bottom` | range (0–36px) | `8px` | Header inner bottom padding |
| `margin_bottom` | range (0–100px) | `0px` | Space below the header section |

---

## Current Active Settings (header-group.json)

- **Menu:** `new-dawn-menu` (dropdown style)
- **Logo:** left-aligned on desktop and mobile
- **Sticky:** `on-scroll-up`
- **Color scheme:** `scheme-0abd8178-3d59-42e3-8cb8-c44c8b687be0` (custom, applied to both header and menu)
- **Announcement bar:** disabled (single block, `disabled: true`)
- **Custom CTA:** "BECOME A PARTNER" pill link → `/pages/surveys-3-paths` (hardcoded in `sections/header.liquid`, desktop only, hidden on mobile via `.small-hide.medium-hide`)
