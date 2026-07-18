import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta = {
  title: 'Core/Link',
  component: Link,
  tags: ['autodocs'],
  args: { children: 'Read the docs', href: '#' },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default:  Story = {};
export const Disabled: Story = { args: { disabled: true, children: 'Unavailable link' } };
export const External: Story = { args: { external: true, children: 'View on GitHub', href: 'https://github.com' } };

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
