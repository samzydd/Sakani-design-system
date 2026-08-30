import type { Meta, StoryObj } from '@storybook/react';
import { MobileNavigationMenu } from './MobileNavigationMenu';

const meta = {
  title: 'Marketing/Mobile Navigation Menu',
  component: MobileNavigationMenu,
  tags: ['autodocs'],
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
