import type { Meta, StoryObj } from '@storybook/react';
import { MobileNavigationMenu } from './MobileNavigationMenu';

const meta = {
  title: 'Marketing/Mobile Navigation Menu',
  component: MobileNavigationMenu,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Mobile Navigation Menu" (Marketing primitives set, 2
states: Closed, Open). Unlike every other Figma "state" axis in this
library so far, Closed/Open here is REAL interactive UI state (a
user tapping the hamburger toggle), not a style choice or something
derivable from static data -- so this is a genuinely functional
expand/collapse component, not a two-look static component. Follows
the same optional-controlled/uncontrolled-by-default dual mode
already established by ProductGallery's \`activeIndex\`: most consumers
just want a self-contained toggle, but anything needing to sync it
externally (e.g. locking body scroll while open) can still control it.

The header's toggle button is NOT the shared IconButton: none of its
5 variants produce Figma's own bg/surface + shadow/xs + no-border
look (secondary is bg/subtle, outline has a visible border, etc.) --
built locally instead, same reasoning WishlistButton gives for not
reusing IconButton either. The icon itself swaps lucide Menu <-> X
based on the real \`isOpen\` state (derived, not a separate icon prop).

Nav link rows are NOT the shared Button component either: Button
always centers its own content (\`justify-content: center\`), but
Figma's own nav links are left-aligned, plain-text, no background --
a distinct enough shape to build directly. The "Get started" CTA
and the horizontal rule above it DO reuse the shared Button
(variant="primary") and Divider components respectively -- exact
matches for Figma's own treatment there.

The links/divider/CTA block is always mounted (never conditionally
removed from the tree) specifically so open <-> close can animate:
unmounting on close would cut off any closing transition instantly,
and remounting on open would replay from nothing rather than expand
smoothly. Its height is animated via \`max-height\` (unlike plain
\`height\`, which can't transition to/from \`auto\`), between two
concrete pixel lengths: \`0\` and a live-measured \`contentHeight\`
(tracked off \`.collapseInner\`'s own scrollHeight via ResizeObserver --
it's always rendered, just visually clipped when collapsed, so its
natural height is measurable even while closed).

Two earlier attempts at this didn't hold up once actually verified in
the browser: \`grid-template-rows: 0fr <-> 1fr\` (the usual trick for
this, since \`height\` itself can't animate to/from \`auto\`) interpolated
fine when collapsing but snapped instantly to full height when
expanding -- confirmed reproducible at multiple delays, not a flake.
Swapping that same grid-template-rows property to animate between
concrete pixel row-track values (\`0px\`/\`{contentHeight}px\`) instead of
the fr keywords reproduced the identical one-directional snap, which
narrowed the problem down to animating a CSS Grid row track
specifically, not the fr unit. Moving off \`display: grid\` entirely and
animating plain \`max-height\` on a block element sidesteps grid
track-sizing animation altogether and was confirmed, via direct
height sampling mid-transition, to animate correctly in both
directions.` } } },
} satisfies Meta<typeof MobileNavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const links = [
  { label: 'Home' },
  { label: 'Features' },
  { label: 'Pricing' },
  { label: 'Blog' },
  { label: 'Docs' },
];

export const Closed: Story = {
  args: { label: 'Label', links, defaultOpen: false },
};

export const Open: Story = {
  args: { label: 'Label', links, defaultOpen: true },
};

export const DarkMode: Story = {
  args: { label: 'Label', links, defaultOpen: true },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
