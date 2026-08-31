import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QuantitySelector } from './QuantitySelector';

const meta = {
  title: 'E-commerce/Quantity Selector',
  component: QuantitySelector,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Quantity Selector" (E-commerce set): a 3-cell stepper --
decrement / value / increment, separated by 1px dividers, only the
outer frame rounded/bordered. Figma's "Default"/"Incremented" style
preview is just this component at two different quantities, not a real
variant -- both the value shown and the decrement button's disabled
(45%-opacity) state are fully derived from \`quantity\` vs. \`min\`.

This is the standalone version of the stepper CartItem already built
inline -- CartItem now reuses this component instead of its own copy,
so there's one implementation instead of two drifting in parallel.

The value cell is a real editable text field, not just +/- buttons --
clicking in lets you type any number of digits directly, unrestricted
while typing (only clamped to min/max on commit: blur or Enter), so
jumping from 1 to, say, 24 doesn't need 23 clicks. While focused it
shows your raw typed digits with no animation (mid-typing isn't a real
"value change" yet); once committed, an invisible-text input sits under
a \`RollingValue\` overlay that plays the odometer roll for the actual
old-value -> new-value transition, same as a click on +/- would. That
keeps free typing and the roll effect both working off the same
underlying \`quantity\` prop change, not two separate code paths.

The value itself rolls like an odometer on change: incrementing slides
the old number up and out while the new one slides up into place from
below; decrementing reverses both (old slides down and out, new enters
from above) -- direction always matches which way the number is
actually moving, not a fixed animation. \`RollingValue\` below is kept
internal/unexported since this is specifically a QuantitySelector
concern, not a general-purpose primitive yet. \`prefers-reduced-motion\`
disables it via the stylesheet (the new value still swaps instantly).` } } },
} satisfies Meta<typeof QuantitySelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [quantity, setQuantity] = React.useState(1);
    return <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />;
  },
};

export const Incremented: Story = {
  render: () => {
    const [quantity, setQuantity] = React.useState(3);
    return <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />;
  },
};

export const WithMax: Story = {
  render: () => {
    const [quantity, setQuantity] = React.useState(5);
    return <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} max={5} />;
  },
};

export const DarkMode: Story = {
  args: { quantity: 3 },
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
