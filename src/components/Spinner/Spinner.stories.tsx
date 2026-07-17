import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
  title: 'Core/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  args: { size: 'md' },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small:  Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };
export const Large:  Story = { args: { size: 'lg' } };
export const OnAccent: Story = {
  render: () => (
    <div style={{ display: 'inline-flex', padding: 16, borderRadius: 8, background: 'var(--color-accent-default)' }}>
      <Spinner size="md" style={{ color: 'var(--color-fg-on-accent)' } as React.CSSProperties} />
    </div>
  ),
};
