import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SizeSelector } from './SizeSelector';

const meta = {
  title: 'E-commerce/Size Selector',
  component: SizeSelector,
  tags: ['autodocs'],
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
