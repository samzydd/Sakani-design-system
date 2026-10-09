import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
  title: 'Core/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Animated loading indicator. Inherits currentColor so it works on any background.
Use inside buttons (loading state) or as a standalone page/section loader.

Size axis → size prop (sm | md | lg)` } } },
  args: { size: 'md' },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Small:  Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };
export const Large:  Story = { args: { size: 'lg' } };
export const OnAccent: Story = {
  render: () => (
    <div style={{ display: 'inline-flex', padding: 16, borderRadius: 8, background: 'var(--color-accent-default)', color: 'var(--color-fg-on-accent)' }}>
      <Spinner size="md" />
    </div>
  ),
};

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
