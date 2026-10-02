# Changelog

All notable changes to `@sakaniui/react` are documented here.

## 0.4.2

**Liquid glass, measured from Figma.**

- **The lens is measured, not eyeballed.** A gradient backdrop behind Figma's
  Glass effect shows, pixel by pixel, where it samples from; the `--liquid-*`
  lens tokens now reproduce that field to about half a pixel on every edge.
  The clear lens is much stronger near the rim (refraction 26.2, bezel 16),
  which draws Figma's magnified band along the edges and round the corners.
- **Correction to 0.4.1:** Figma's lens does not sample outside the element.
  Every edge bends inward; the lit edges just a little less. The 0.4.1 note
  about an approximate clear rim no longer applies.
- **Frost before the bend**, as in Figma, so the rim stays sharp; frost is
  now 1.8 (regular) and 0.65 (clear). No color boost (`--liquid-saturate` 1).
- **Color fringe in Figma's order:** red bends most, blue least.
- **Rim light all the way round:** a 1px ring at about Figma's brightness
  (lit edges a little brighter), instead of a diagonal gradient that faded
  out along the sides. Depth is a faint shade inside the lit edges and a
  faint glow inside the far ones. Rim and depth are the same in dark mode,
  like Figma's effect styles.
- `LiquidDashboardBlock`: the active sidebar lens uses the library's clear
  lens as is (its own overrides are gone, and it matches Figma better).
- Known difference: Figma's glass reads the original photo below it, so a
  lens stacked over another lens (the dashboard's promo card over the
  overlay) is sharp in Figma; in a browser it sees the overlay's frost.

## 0.4.1

**Liquid glass matches the Figma file.**

- **`tint` prop on `LiquidGlass`** — `"regular" | "clear" | "subtle" | "none"`.
  `subtle` is Figma's `glass/bg-subtle` (5% ink; 8% white in dark), the fill of
  a full-bleed overlay over a photo. Defaults to the variant's own tint.
- **One lens per variant.** `--liquid-refraction`, `-shift`, `-bezel`, `-profile`,
  `-dispersion`, `-frost` and `-saturate` now have `-regular` and `-clear`
  versions (Figma's two `liquid/*` effect styles), fitted against Figma's own
  render. Set the unprefixed name on one element to override just that one.
- **Directional lens, rim and depth.** The bend, the rim light and the inner
  shading follow `--liquid-light-angle` (Figma's light, -45 degrees), so the lit
  edges differ from the far edges as in Figma. New `--liquid-shift-*`
  and `--liquid-profile-*` tokens.
- **Figma's shadows** for both variants (`--liquid-shadow-regular|clear`) and
  Figma's glass tint values (`.64 / .76 / .52`).
- **New `--surface-fg-muted` token** (solid, glass and liquid), and
  `data-on-photo`: light text for any subtree that sits straight on a photo.
- Liquid scope defaults: the `Menu` is frosted, the active `SidebarItem` is flat
  and `SidebarPromo` is transparent with an outlined button, so the dashboard
  block no longer needs overrides for them.
- Known difference: Figma's clear lens samples *outside* the element at its lit
  edges. CSS `backdrop-filter` cannot read outside its own box, so the clear
  variant's rim is an approximation.

## 0.4.0

**Glass and liquid glass.**

- **New theme axis: Surface (Solid · Glass · Liquid).** Components read
  `--surface-*` tokens; `data-surface="glass" | "liquid" | "solid"` on any
  ancestor re-themes everything inside it. Solid is pixel-identical to
  before (checked story by story). Menus, modals and selects carry the
  setting through their portals. `prefers-reduced-transparency` falls back
  to opaque surfaces.
- **New: `LiquidGlass` and `useLiquidGlass`.** Apple-style liquid glass: an
  SVG displacement filter bends the backdrop at the element's edge (with a
  per-channel color fringe), plus tint, rim light, depth and a pointer-
  following glare. Chromium renders the refraction; Safari and Firefox get
  a frosted fallback with the same rim. Tunable through `--liquid-*` tokens
  (tint, refraction, bezel, dispersion, frost, saturate, overlay and panel tints).
- **New block: `LiquidDashboardBlock`** (`@sakaniui/react/blocks`, Storybook
  *Blocks / Application / Liquid Glass Dashboard*). A full dashboard on a
  photo: one glass overlay, transparent chrome, solid data cards, an active
  sidebar lens that only moves on click and a softer hover lens.
- Interaction polish: Switch spring, Slider fling bounce, chip/tag fade-out,
  ListItem hover glide, ghost Button without shadow, Menu radius 8px,
  `Switch` `description` prop, `bg/canvas` hover fill on surface components.
- Fix: the swatch checkmark could render invisible on light swatches in
  server-rendered pages.

## 0.3.5

- Replaces the Sakani mark (`PlaceholderLogo`'s default fill) with the new
  logo, brand-orange background.
- Fix: `vite.lib.config.ts` has no `publicDir` override, so Vite's default
  behaviour was copying this repo's `public/` folder into the published
  package as a side effect — `dist/favicon.svg` shipped inside every install
  of `@sakaniui/react` for no reason connected to the library itself. Still
  ships (removing it isn't this release's job), but now carries the current
  brand mark rather than a leftover unrelated asset.

## 0.3.4

0.3.3 was never actually published — a publish got stuck mid-flight on the
registry (staged but never finalized) and had to be abandoned rather than
retried, so this carries everything that would have shipped as 0.3.3:

- **Fix: `Popover` and `Modal` had no entrance/exit animation at all.** They
  appeared and vanished on a single frame, unlike `Select` and `Combobox`,
  which already ease their panels in and out. Both now animate over 180ms on
  the same curve, kept mounted past `open` so the exit has something to play
  on, and fall back to a timeout if `animationend` never fires (a
  backgrounded tab, or anything suppressing animations) — without it, a
  dismissed popover, or worse a full-screen modal backdrop, could be left
  mounted and invisible over the page while still able to take focus.
- **Fix: charts read colour tokens from `document.documentElement`, ignoring
  any `.dark`/`.force-light` scope between it and the chart.** A chart
  rendered inside a themed container painted the *outer* theme's colours on
  the *inner* theme's background. Tokens now resolve from the chart's own
  element, and the reader re-renders when any ancestor's class changes, not
  just `<html>`'s.
- **Fix: server-rendered charts never picked up real tokens at all.**
  `useThemeTick` only bumped on theme *changes*; under SSR there is no
  `getComputedStyle`, so a server-rendered chart kept its hardcoded fallback
  colours forever once hydrated (React won't patch a hydration mismatch). It
  now also bumps once on mount. Several of those fallbacks were themselves
  stale values from an older palette and are corrected.
- **Fix: `Select`'s floating listbox and `Modal`'s backdrop ignored the
  `.dark`/`.force-light` scope of whatever they were opened from.** Both
  portal to `<body>` to position with `fixed`, which moves them out from
  under any themed container; they now carry that container's theme class
  onto the portaled element.
- `Table` gained a drag handle: a grip icon at the left edge of a
  `reorderable` row, hidden until hover, and the sole drag origin (dragging
  no longer starts from clicking anywhere in the row).
- `CRMDashboardBlock`, `KanbanBoardBlock` and `DataTableBlock` gained
  `fillPlaceholders`, which extends the table to fill a taller container with
  placeholder rows instead of leaving blank canvas below it.
- `Calendar` now exports its `DateRange` type.

## 0.3.2

- **Fix: `@sakaniui/react/tokens.css` was never actually published.** The `exports` map pointed it at `./src/styles/tokens.css`, but `files: ["dist"]` only ever publishes the `dist` folder — so that path never existed in the installed package, and `import '@sakaniui/react/tokens.css'` (exactly as documented in the README) failed to resolve for every consumer. Without it, every component would have rendered completely unstyled: the CSS ships only the `var(--color-fg-default)` *references*, not the `:root { --color-fg-default: ... }` *definitions*. Fixed by copying `tokens.css` into `dist/` as part of the build and pointing the export there instead.

## 0.3.1

- Fix: `Combobox`'s `loading` prop (the panel's loading state) was declared on `ComboboxOption` instead of `ComboboxProps`, so passing it to `<Combobox loading />` as documented was a type error and the prop was unreachable in a type-checked consumer. Moved to `ComboboxProps`, where the component was already reading it from at runtime.

## 0.3.0

The library has grown substantially since the last published release —
five new categories of primitives and dozens of new blocks, all matching
their Figma source 1:1 and shipping with full light/dark support.

**New component categories:**
- **E-commerce** — Cart Item, Checkout Steps, Color Swatch, Price Display, Product Card, Product Gallery, Quantity Selector, Size Selector, Star Rating, Stock Status, Wishlist Button
- **Marketing** — Blog Blockquote, Blog Feature Text, Blog Image, Blog Listing Card, Blog Listing Featured Card, Featured Icon, First Page Heading, Job Listing, List, Location Dot, Marquee, Metric, Mobile Navigation Menu, Placeholder Logo, Profile Card, Rich Text Heading, Rich Text Paragraph, Section Heading, Sub Feature, Team Card

**New blocks:**
- **Authentication** — Email Verification, Forgot Password, Login, Reset Password, Sign Up, Two-Factor Authentication
- **Billing** — Add Card Form, Billing Address, Billing History, Current Plan, Payment Method
- **E-commerce** — Checkout Flow, Order Confirmation, Product Detail, Product Grid, Shopping Cart
- **Marketing** — Blog Listing, Careers, CTA Banner, FAQ, Feature Grid, Hero, Logo Cloud, Pricing Table, Team Section, Testimonial
- **Application** — Account Overview, Activity Log, App Header, Data Table + Toolbar, File Upload Panel, Form Modal, Inline CTA, Multistep Modal, Notification Panel, Onboarding Progress, Profile Settings, Section Footer

**Other:**
- `StarRating` gained a full `orientation` axis (horizontal / horizontal-reverse / vertical), shared between the E-commerce Product Detail block and Marketing's own Star Rating usage.
- Every component and block's Storybook Docs page now renders a real, written explanation (previously blank) — what it does, what it maps to in Figma, and key implementation notes, sourced from each component's own doc comments.
- The Storybook landing page now introduces the Sakani Design System itself instead of Storybook's generic default onboarding content.
- README's component/block inventory brought up to date with the actual library (114+ components, 41 blocks).

## 0.2.0

- Blocks are now published from a separate subpath, `@sakaniui/react/blocks`, kept out of the main `@sakaniui/react` entry point so importing them is a deliberate choice.
- Added Funnel and Heatmap charts.
- The library now auto-builds (`prepare` script) on install.

## 0.1.0

- First published release of `@sakaniui/react`.
