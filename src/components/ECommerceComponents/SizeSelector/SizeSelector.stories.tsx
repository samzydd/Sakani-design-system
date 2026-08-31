import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SizeSelector } from './SizeSelector';

const meta = {
  title: 'E-commerce/Size Selector',
  component: SizeSelector,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Size Selector" (E-commerce set): a 40px label circle.
Same two-independent-boolean-axis pattern as ColorSwatch (\`selected\`,
\`available\`), but a genuinely different visual language, not a shared
component with it -- selection here is a solid filled circle (bg/
accent-default + white text), not a ring-plus-checkmark over a color
fill, since there's no arbitrary consumer color to preserve visibility
of underneath a ring:
- **Unselected** — bg/surface, border/default, fg/default text
- **Selected** — bg/accent-default fill, no border, white text
- **Unavailable** — bg/canvas, border/default, fg/subtle text, a diagonal strike line (confirmed from the asset: a rotated rectangle, not a CSS border) in border/default -- a fixed, deliberately low-contrast color here (unlike ColorSwatch's strike) since this always sits on a neutral canvas background, never an arbitrary color.

\`available={false}\` renders a disabled, unclickable button regardless
of \`selected\`, same reasoning as ColorSwatch.` } } },
} satisfies Meta<typeof SizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(false);
    return <SizeSelector size="M" selected={selected} onSelect={() => setSelected(true)} />;
  },
};
export const Selected: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(true);
    return <SizeSelector size="M" selected={selected} onSelect={() => setSelected(!selected)} />;
  },
};
export const Unavailable: Story = { args: { size: 'M', available: false } };

export const Group: Story = {
  render: () => {
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];
    const [selected, setSelected] = React.useState('M');
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        {sizes.map((size) => (
          <SizeSelector
            key={size}
            size={size}
            selected={selected === size}
            available={size !== 'S'}
            onSelect={() => setSelected(size)}
          />
        ))}
      </div>
    );
  },
};

export const DarkMode: Story = {
  args: { size: 'M', selected: true },
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
