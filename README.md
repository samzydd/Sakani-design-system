# Sakani Design System

An open-source, token-driven React component library for SaaS products — with light/dark theming and a fully documented design system built in Figma.

**Sakani** is built on a three-layer token architecture:

1. **Primitives** (`--color-primary-500`, `--space-16`, `--radius-md`) hold raw values and are never used directly by components.
2. **Semantic tokens** (`--color-bg-surface`, `--color-fg-muted`, `--color-accent-default`) alias primitives and carry light/dark modes. Components consume **only** this layer.
3. **Components** bind to semantic tokens — so theming, dark mode, and even a full rebrand are a single-layer change, never a component rewrite.

## Status

🚧 **In active development.** Components are being converted from the Figma source of truth one at a time. Follow along — each component lands with its Storybook stories.

## Getting started

```bash
# install dependencies
npm install

# run Storybook (the component workshop)
npm run storybook
```

## Tokens

All design tokens live in [`src/styles/tokens.css`](src/styles/tokens.css) as CSS custom properties:

- **Color** — primitives + semantic layer, light and dark (`.dark` class flips only the semantic layer)
- **Spacing** — 4-point grid with half-steps (`--space-0` … `--space-96`)
- **Radius** — `--radius-none` … `--radius-full`
- **Typography** — Inter-based scale (display / heading / body / label / caption)
- **Elevation** — `--shadow-xs` … `--shadow-2xl` + directional
- **Opacity** — `--opacity-0 / 45 / 60 / 70 / 100` for disabled states and layering
- **Border width** — `--border-width-050` … `--border-width-600`

A Style-Dictionary-compatible export lives in [`src/styles/tokens.json`](src/styles/tokens.json).

### Dark mode

Add `class="dark"` to `<html>` — every component re-themes with zero component-level changes:

```html
<html class="dark">
```

### Usage example

```css
.button-primary {
  background: var(--color-accent-default);
  color: var(--color-fg-on-accent);
  border-radius: var(--radius-md);
  padding: var(--space-8) var(--space-16);
}
```

## Design source

The system is designed and maintained in Figma — every component in this library mirrors a fully token-bound Figma component with matching variants, states, and properties.

## Author

**Samuel Okpere** — product designer & design systems specialist.

## License

MIT
