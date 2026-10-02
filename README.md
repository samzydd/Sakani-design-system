# Sakani Design System

An open-source, token-driven React component library for SaaS products — **1,500+ accessible components and variants**, built 1:1 from a Figma design system, across light and dark modes, with **built-in glass and Apple-style liquid glass surfaces**.

**[Live Storybook →](https://main--6a5a658b3681fcc010430db5.chromatic.com)** · **[Figma file →](https://www.figma.com/community/file/1661001585975776295/sakani-design-system-v1-8)**

![npm](https://img.shields.io/npm/v/@sakaniui/react) ![License](https://img.shields.io/badge/license-MIT-blue) ![React](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6) ![Storybook](https://img.shields.io/badge/Storybook-10-ff4785)

---

## Why Sakani

Most component libraries start in code and retrofit the design. Sakani was built the other way: every component is designed first in Figma with a strict three-layer token architecture, then implemented 1:1 in React — same variants, same states, same tokens. The Figma file has grown into a 1,500+ component-and-variant system across light and dark mode; the React library mirrors it component by component, with new ones landing as they're built out.

- **Token-driven** — components bind only to semantic tokens (`bg/surface`, `fg/muted`, `accent/default`…), so the entire library re-themes from one place
- **Light & dark mode** — add the `.dark` class to any container; every component re-themes automatically, no per-component dark styles
- **Glass & liquid glass** — a third theme axis, *Surface* (Solid · Glass · Liquid): frosted glassmorphism and Apple-style liquid glass with real lens refraction, switched per area with one attribute — see [Glass & liquid glass](#glass--liquid-glass)
- **Accessible by default** — WCAG AA contrast audited, global focus-ring system, `prefers-reduced-motion` support, full ARIA semantics (combobox active-descendant, calendar date labels, live-region toasts, focus-return popovers)
- **Typed & composable** — strict TypeScript, generic `Table<T>`, slot-based composition, controlled + uncontrolled patterns
- **Geist typography** and **Lucide icons** throughout, matching the Figma source exactly

## Install

```bash
npm install @sakaniui/react
```

Then import the tokens once at your app's entry point, and any component from the package root:

```tsx
import '@sakaniui/react/tokens.css';
```

## Quick start (contributing / browsing the source)

```bash
git clone https://github.com/samzydd/Sakani-design-system.git
cd Sakani-design-system
npm install
npm run storybook
```

Storybook opens at `http://localhost:6006` with every component, all variants, and dark-mode stories.

## Usage

Import the tokens once, then use any component from `@sakaniui/react`:

```tsx
import '@sakaniui/react/tokens.css';
import { Button, StatCard } from '@sakaniui/react';
import { DollarSign } from 'lucide-react';

export const Dashboard = () => (
  <>
    <StatCard
      variant="icon"
      icon={DollarSign}
      title="Revenue"
      value="$48,120"
      delta="+12.5%"
      trend="up"
      sparkline={[12, 18, 14, 22, 19, 28]}
    />
    <Button variant="primary" size="md">Get started</Button>
  </>
);
```

### Dark mode

```tsx
<div className="dark">
  {/* everything inside re-themes automatically */}
</div>
```

## Glass & liquid glass

Glass is built into the theme system, not added component by component. Next to light/dark, Sakani has a second axis — **Surface** — with three modes: **Solid** (the default), **Glass** (frosted translucency) and **Liquid** (Apple-style liquid glass: the backdrop *bends* at the edges like a lens, with a faint color fringe, rim light and depth). Components read a small set of `--surface-*` tokens, so switching an area from Solid to Glass or Liquid re-themes everything inside it at once — in the Figma file (variable modes and effect styles) and in code. Solid stays pixel-identical to before.

```tsx
// Frosted glass: one attribute on any ancestor (works in light and dark)
<div data-surface="glass">
  <Sidebar />
  <Card>…</Card>
</div>

// Liquid glass: a lens-refracting sheet over a photo, UI on top
import { LiquidGlass } from '@sakaniui/react';

<div style={{ position: 'relative', backgroundImage: 'url(photo.jpg)', backgroundSize: 'cover' }}>
  <LiquidGlass variant="clear" radius={0} style={{ position: 'absolute', inset: 0 }} />
  <div data-surface="liquid" style={{ position: 'relative' }}>
    <Sidebar />                                  {/* transparent: sits on the glass */}
    <div data-surface="solid"><Card>…</Card></div> {/* data stays solid and crisp */}
  </div>
</div>
```

The recipe is always the same three layers: **photo → one glass overlay → components**. See the full **Liquid Glass Dashboard** block (`@sakaniui/react/blocks`) for a complete example: a hovering lens that glides between sidebar items while the active item keeps its own, frosted menus, and solid data cards on a glass panel.

- **Browsers** — refraction renders in Chromium (Chrome, Edge); Safari and Firefox get a frosted fallback with the same rim and depth.
- **Accessible** — `prefers-reduced-transparency` turns glass into an opaque surface, `prefers-reduced-motion` stops the glare and glide; secondary text has its own stronger color token on glass, and the docs list measured contrast for every tint.
- **Tunable** — strength, bend, frost, tint and color boost are `--liquid-*` tokens.

Docs: **[sakaniui.com/docs/glass](https://www.sakaniui.com/docs/glass)** · Storybook: *Foundations → Glass* and *Foundations → Liquid glass*.

## Token architecture

Three layers, defined in Figma and exported to `tokens.css`:

1. **Primitives** — raw scales (`neutral/50–950`, `primary/…`, spacing, radii)
2. **Semantic** — purpose-named aliases that flip between light and dark (`bg/surface`, `fg/default`, `border/subtle`, `accent/default`, `chart/1–5`)
3. **Components** — bind *only* to semantic tokens, never to primitives

Change a semantic token and every component follows — in both the design file and the code.

## Components (114+, syncing toward Figma's 1,500+)

**Core** — Button · Icon Button · Badge · Label · Divider · Link · Kbd · Spinner · Skeleton · Progress · Tooltip · Avatar · Avatar Group

**Forms** — Input · Textarea · Select · Checkbox · Radio · Switch · Slider · Combobox (single/multi, async loading) · File Upload

**Composite** — Card · Alert · Toast · Accordion · Tabs · Breadcrumb · Table (generic, selectable) · Stat Card (sparklines) · Stepper · Calendar (single + range, dropdown navigation) · Pagination · Popover · Segmented Control · List Item

**Sidebar kit** — Sidebar · Header · Search · Item · Sub Item · Group Label · Divider · Promo · Footer — nine standalone parts that compose into full navigation

**Navigation** — Top Bar · Top Bar (mobile)

**Overlays** — Menu · Menu Item

**Glass** — Liquid Glass (`LiquidGlass`, `useLiquidGlass`) · Surface modes (`data-surface="glass" | "liquid" | "solid"`)

**Data** — Empty State · Filter Chip

**Charts** — Area · Bar · Donut · Funnel · Heatmap · Line · Pie · Radar · Radial — Recharts wrappers styled entirely with the `chart/1–6` tokens

**Chat** — Chat Composer · Conversation Item · Message Bubble

**Application** — Activity Feed · Announcement · Avatar Upload · Balance · Code Snippet · Expenses · Inline Hint · Modal · Notification Item · Progress Item · Progress Stat · Rich Separator · Spending Balance · Stock Market · Tags · Ticker · Transactions

**E-commerce** — Cart Item · Checkout Steps · Color Swatch · Price Display · Product Card · Product Gallery · Quantity Selector · Size Selector · Star Rating · Stock Status · Wishlist Button

**Marketing** — Blog Blockquote · Blog Feature Text · Blog Image · Blog Listing Card · Blog Listing Featured Card · Featured Icon · First Page Heading · Job Listing · List · Location Dot · Marquee · Metric · Mobile Navigation Menu · Placeholder Logo · Profile Card · Rich Text Heading · Rich Text Paragraph · Section Heading · Sub Feature · Team Card

## Blocks (42)

Blocks are full sections assembled from Sakani components — **composition examples**, not fully-configurable components like the ones above. Most ship with realistic sample data and manage their own demo state internally (a `state` prop just switches between the states each one ships with — loading, empty, error, and so on). They're meant as a working starting point you customize, not a drop-in you configure entirely through props.

They live in `src/blocks`, and are also published separately from the main package at **`@sakaniui/react/blocks`** — kept out of the main entry point on purpose, so importing them is a deliberate choice:

```bash
npm install @sakaniui/react
```

```tsx
import { DataTableBlock } from '@sakaniui/react/blocks';

<DataTableBlock />
```

To actually customize one, copy its source file straight from GitHub instead and edit it directly — that's still the intended workflow for anything beyond the states it ships with:

```tsx
// src/blocks/DataTableBlock/DataTableBlock.tsx, copied into your project
import { DataTableBlock } from './DataTableBlock';

// Swap the sample data for your own, edit the columns.
<DataTableBlock />
```

**Application (14)** — Account Overview · Activity Log · App Header · CRM Dashboard · Liquid Glass Dashboard · Data Table + Toolbar · File Upload Panel · Form Modal · Inline CTA · Multistep Modal · Notification Panel · Onboarding Progress · Profile Settings · Section Footer

**Authentication (6)** — Email Verification · Forgot Password · Login · Reset Password · Sign Up · Two-Factor Authentication

**Billing (5)** — Add Card Form · Billing Address · Billing History · Current Plan · Payment Method

**E-commerce (5)** — Checkout Flow · Order Confirmation · Product Detail · Product Grid · Shopping Cart

**Marketing (10)** — Blog Listing · Careers · CTA Banner · FAQ · Feature Grid · Hero · Logo Cloud · Pricing Table · Team Section · Testimonial

**Chat (1)** — Desktop Chat Interface

**Data & Content (1)** — Kanban Board

Browse every block and state in the [live Storybook](https://main--6a5a658b3681fcc010430db5.chromatic.com) under **Blocks**.

## Accessibility

The library ships with an audited AA baseline: contrast-checked token pairs in both modes, a global token-driven focus ring on every interactive element, reduced-motion support, Escape-dismissible tooltips, screen-reader-tracked combobox options, full-date calendar labels, assertive error toasts, and focus-returning popovers. See the Storybook docs tab on each component for its ARIA contract.

## Roadmap

- [x] npm package ([`@sakaniui/react`](https://www.npmjs.com/package/@sakaniui/react))
- [ ] Figma Community publication
- [ ] Theming CLI (custom brand token generation)
- [ ] Vue port

## Support

If Sakani is useful to you, you can [tip the creator](https://csakani.gumroad.com/coffee). It funds the time that keeps the system maintained and growing.

## Author

**Sam Okpere** — senior UI/UX & design systems designer

[Portfolio](https://samdesignworks.framer.website) · [Dribbble](https://dribbble.com/samthedes) · [LinkedIn](https://www.linkedin.com/in/samuel-okpere) · [GitHub](https://github.com/samzydd)

## License

MIT — free for personal and commercial use. If Sakani saves you time, a star ⭐ helps others find it.
