import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Composite/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items: [
    { label: 'Home', href: '#' },
    { label: 'Projects', href: '#' },
    { label: 'Current' },
  ] },
};

export const TwoLevels: Story = {
  args: { items: [{ label: 'Home', href: '#' }, { label: 'Settings' }] },
};

export const DeepTrail: Story = {
  args: { items: [
    { label: 'Home', href: '#' },
    { label: 'Workspace', href: '#' },
    { label: 'Projects', href: '#' },
    { label: 'Sakani', href: '#' },
    { label: 'Components' },
  ] },
};

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
