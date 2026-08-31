import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';

const meta = {
  title: 'Marketing/List',
  component: List,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "List" (Marketing primitives set, 3 styles: Check,
Bullet, Arrow). \`style\` stays a real, explicit prop (Figma's own
axis) -- a genuine visual-language choice for the marker, not
derivable from the item text:
- **'check'** — lucide Check, 18px.
- **'bullet'** — a plain filled 8px dot (not an icon at all in Figma's own asset -- no lucide glyph needed).
- **'arrow'** — lucide ArrowRight, 16px.

All three use the same fg/muted color for both marker and label --
confirmed identical across all three fetched previews, not just the
bullet's own color.

\`items\` is a plain string array (each item is a single label, no
per-item icon override in Figma) rather than an array of objects --
simplest shape that matches what the design actually shows.` } } },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  'Full Figma-to-code parity',
  'Token-driven theming',
  'Composable, accessible primitives',
];

export const Check: Story = { args: { items, style: 'check' } };
export const Bullet: Story = { args: { items, style: 'bullet' } };
export const Arrow: Story = { args: { items, style: 'arrow' } };

export const DarkMode: Story = {
  args: { items, style: 'check' },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
