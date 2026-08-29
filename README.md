# Sakani Design System

An open-source, token-driven React component library for SaaS products — **1,500+ accessible components and variants**, built 1:1 from a Figma design system and now spanning **1,500+ components and variants** across light and dark modes.

**[Live Storybook →](https://main--6a5a658b3681fcc010430db5.chromatic.com)** · **[Figma file →](https://www.figma.com/design/Fd3uY263mEQKnaTEfrzQxh/)**

![npm](https://img.shields.io/npm/v/@sakaniui/react) ![License](https://img.shields.io/badge/license-MIT-blue) ![React](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6) ![Storybook](https://img.shields.io/badge/Storybook-10-ff4785)

---

## Why Sakani

Most component libraries start in code and retrofit the design. Sakani was built the other way: every component is designed first in Figma with a strict three-layer token architecture, then implemented 1:1 in React — same variants, same states, same tokens. The Figma file has grown into a 1,500+ component-and-variant system across light and dark mode; the React library mirrors it component by component, with new ones landing as they're built out.

- **Token-driven** — components bind only to semantic tokens (`bg/surface`, `fg/muted`, `accent/default`…), so the entire library re-themes from one place
- **Light & dark mode** — add the `.dark` class to any container; every component re-themes automatically, no per-component dark styles
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

## Token architecture

Three layers, defined in Figma and exported to `tokens.css`:

1. **Primitives** — raw scales (`neutral/50–950`, `primary/…`, spacing, radii)
2. **Semantic** — purpose-named aliases that flip between light and dark (`bg/surface`, `fg/default`, `border/subtle`, `accent/default`, `chart/1–5`)
3. **Components** — bind *only* to semantic tokens, never to primitives

Change a semantic token and every component follows — in both the design file and the code.

## Components (66+, syncing toward Figma's 1,500+)

**Core** — Button · Icon Button · Badge · Label · Divider · Link · Kbd · Spinner · Skeleton · Progress · Tooltip · Avatar · Avatar Group

**Forms** — Input · Textarea · Select · Checkbox · Radio · Switch · Slider · Combobox (single/multi, async loading) · File Upload

**Composite** — Card · Alert · Toast · Accordion · Tabs · Breadcrumb · Table (generic, selectable) · Stat Card (sparklines) · Stepper · Calendar (single + range, dropdown navigation) · Pagination · Popover · Segmented Control · List Item

**Sidebar kit** — Sidebar · Header · Search · Item · Sub Item · Group Label · Divider · Promo · Footer — nine standalone parts that compose into full navigation

**Charts** — Area · Bar · Donut · Funnel · Heatmap · Line · Pie · Radar · Radial — Recharts wrappers styled entirely with the `chart/1–6` tokens

## Blocks

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

| Block | States |
|---|---|
| **Data Table + Toolbar** | default · filtered · bulk selection · loading · empty · error |
| **Kanban Board** | default · loading · empty column · dragging |

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
