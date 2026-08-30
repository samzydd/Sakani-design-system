import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';

const meta = {
  title: 'Marketing/List',
  component: List,
  tags: ['autodocs'],
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
