import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColorSwatch } from './ColorSwatch';

const meta = {
  title: 'E-commerce/Color Swatch',
  component: ColorSwatch,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Color Swatch" (E-commerce set): a 24px filled circle in a
32px hit target. Figma's 3 style previews collapse into two real,
independent boolean axes rather than a manual state prop -- a swatch can
be the currently-chosen variant (\`selected\`) and/or out of stock
(\`available={false}\`) as separate facts about the product data:
- **Unselected** — plain filled circle
- **Selected** — + an outer border/subtle ring (offset out from the circle, not touching it) + a checkmark on top
- **Unavailable** — circle at 35% opacity + a diagonal strike line (confirmed from the actual asset: a rotated 30deg rectangle, not a border or icon)

\`available={false}\` renders a disabled, unclickable button regardless of
\`selected\`, since an out-of-stock variant can't be the active choice.

\`color\` is a consumer-supplied CSS color value -- this component ships
no fixed palette, same reasoning as StockMarket's \`logo\` slot.

The checkmark/strike color is NOT a fixed white: \`color\` is arbitrary
consumer data (any product's swatch), and a flat white glyph fails
contrast on light colors (confirmed: white-on-#E0D8D1 is not
accessible). getContrastColor picks whichever of this system's own
fixed light/dark icon colors actually contrasts against the swatch's
own color, computed fresh per swatch rather than assumed -- so this
can't silently fail contrast again for any future color a consumer
passes in.` } } },
} satisfies Meta<typeof ColorSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

/** ColorSwatch is a controlled component -- `selected` is a prop, not
 * internal state, so clicking only fires `onSelect`; the story has to wire
 * that back to `selected` itself for the click to visibly do anything
 * (same pattern as the Group story below). */
export const Unselected: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(false);
    return <ColorSwatch color="#1B284D" label="Navy" selected={selected} onSelect={() => setSelected(true)} />;
  },
};
export const Selected: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(true);
    return <ColorSwatch color="#1B284D" label="Navy" selected={selected} onSelect={() => setSelected(!selected)} />;
  },
};
export const Unavailable: Story = { args: { color: '#1B284D', label: 'Navy', available: false } };

export const Group: Story = {
  render: () => {
    const colors = [
      { color: '#1B284D', label: 'Navy' },
      { color: '#D01B26', label: 'Red' },
      { color: '#F5F4F2', label: 'Bone' },
      { color: '#16A34A', label: 'Green' },
      { color: '#78716A', label: 'Stone' },
    ];
    const [selected, setSelected] = React.useState('Navy');
    return (
      <div style={{ display: 'flex', gap: 4 }}>
        {colors.map((c, i) => (
          <ColorSwatch
            key={c.label}
            {...c}
            selected={selected === c.label}
            available={i !== 2}
            onSelect={() => setSelected(c.label)}
          />
        ))}
      </div>
    );
  },
};

/** Regression case: a white checkmark on this light tan (#E0D8D1) failed
 * contrast. getContrastColor should now switch the checkmark to dark
 * automatically. */
export const LightColorContrast: Story = {
  args: { color: '#E0D8D1', label: 'Sand', selected: true },
};

export const DarkMode: Story = {
  args: { color: '#1B284D', label: 'Navy', selected: true },
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
