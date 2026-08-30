import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColorSwatch } from './ColorSwatch';

const meta = {
  title: 'E-commerce/Color Swatch',
  component: ColorSwatch,
  tags: ['autodocs'],
} satisfies Meta<typeof ColorSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = { args: { color: '#1B284D', label: 'Navy' } };
export const Selected: Story = { args: { color: '#1B284D', label: 'Navy', selected: true } };
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

export const DarkMode: Story = {
  args: { color: '#1B284D', label: 'Navy', selected: true },
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
