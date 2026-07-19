# Sakani Design System

An open-source, token-driven React component library for SaaS products — **45+ accessible components**, light/dark theming, and a fully documented design system built in Figma.

**[Live Storybook →](https://6a5a658b3681fcc010430db5-jmmrgsbvko.chromatic.com/)** · **[Figma file →](https://www.figma.com/design/Fd3uY263mEQKnaTEfrzQxh/)**

![License](https://img.shields.io/badge/license-MIT-blue) ![React](https://img.shields.io/badge/React-18-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6) ![Storybook](https://img.shields.io/badge/Storybook-10-ff4785)

---

## Why Sakani

Most component libraries start in code and retrofit the design. Sakani was built the other way: every component was designed first in Figma with a strict three-layer token architecture, then implemented 1:1 in React — same variants, same states, same tokens. The Figma file and the code library are mirrors of each other.

- **Token-driven** — components bind only to semantic tokens (`bg/surface`, `fg/muted`, `accent/default`…), so the entire library re-themes from one place
- **Light & dark mode** — add the `.dark` class to any container; every component re-themes automatically, no per-component dark styles
- **Accessible by default** — WCAG AA contrast audited, global focus-ring system, `prefers-reduced-motion` support, full ARIA semantics (combobox active-descendant, calendar date labels, live-region toasts, focus-return popovers)
- **Typed & composable** — strict TypeScript, generic `Table<T>`, slot-based composition, controlled + uncontrolled patterns
- **Geist typography** and **Lucide icons** throughout, matching the Figma source exactly

## Quick start

```bash
git clone https://github.com/samzydd/Sakani-design-system.git
cd Sakani-design-system
npm install
npm run storybook
```

Storybook opens at `http://localhost:6006` with every component, all variants, and dark-mode stories.

## Usage

Components live in `src/components`, tokens in `src/styles/tokens.css`. Import the tokens once, then use any component:

```tsx
import '@/styles/tokens.css';
import { Button } from '@/components/Button';
import { StatCard } from '@/components/StatCard';
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

## Components (45+)

**Core** — Button · Icon Button · Badge · Label · Divider · Link · Kbd · Spinner · Skeleton · Progress · Tooltip · Avatar · Avatar Group

**Forms** — Input · Textarea · Select · Checkbox · Radio · Switch · Slider · Combobox (single/multi, async loading) · File Upload

**Composite** — Card · Alert · Toast · Accordion · Tabs · Breadcrumb · Table (generic, selectable) · Stat Card (sparklines) · Stepper · Calendar (single + range, dropdown navigation) · Pagination · Popover · Segmented Control · List Item

**Sidebar kit** — Sidebar · Header · Search · Item · Sub Item · Group Label · Divider · Promo · Footer — nine standalone parts that compose into full navigation

**Charts** — Bar · Line · Donut — Recharts wrappers styled entirely with the `chart/1–5` tokens

## Accessibility

The library ships with an audited AA baseline: contrast-checked token pairs in both modes, a global token-driven focus ring on every interactive element, reduced-motion support, Escape-dismissible tooltips, screen-reader-tracked combobox options, full-date calendar labels, assertive error toasts, and focus-returning popovers. See the Storybook docs tab on each component for its ARIA contract.

## Roadmap

- [ ] npm package (`@sakani/react`)
- [ ] Figma Community publication
- [ ] Theming CLI (custom brand token generation)
- [ ] Vue port

## Author

**Sam Okpere** — senior UI/UX & design systems designer

[Portfolio](https://samdesignworks.framer.website) · [Dribbble](https://dribbble.com/samthedes) · [LinkedIn](https://www.linkedin.com/in/samuel-okpere) · [GitHub](https://github.com/samzydd)

## License

MIT — free for personal and commercial use. If Sakani saves you time, a star ⭐ helps others find it.
