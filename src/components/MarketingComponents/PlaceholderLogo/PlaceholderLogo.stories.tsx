import type { Meta, StoryObj } from '@storybook/react';
import { PlaceholderLogo } from './PlaceholderLogo';

const meta = {
  title: 'Marketing/Placeholder Logo',
  component: PlaceholderLogo,
  tags: ['autodocs'],
} satisfies Meta<typeof PlaceholderLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = { args: { size: 'sm', label: 'Acme Inc.' } };
export const Medium: Story = { args: { size: 'md', label: 'Acme Inc.' } };
export const Large: Story = { args: { size: 'lg', label: 'Acme Inc.' } };

export const Row: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <PlaceholderLogo size="sm" label="Acme Inc." />
      <PlaceholderLogo size="md" label="Acme Inc." />
      <PlaceholderLogo size="lg" label="Acme Inc." />
    </div>
  ),
};

export const DarkMode: Story = {
  args: { size: 'md', label: 'Acme Inc.' },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
