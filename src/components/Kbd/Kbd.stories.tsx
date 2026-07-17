import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from './Kbd';

const meta = {
  title: 'Core/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  args: { children: '⌘K' },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Combo: Story = {
  render: () => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--color-fg-muted)' }}>
      <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>
    </span>
  ),
};
