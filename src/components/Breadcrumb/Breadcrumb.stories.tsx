import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Composite/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Navigation trail. Matches Figma "Breadcrumb" set (1–6 crumbs) x Type:
- **Text** — plain inline links, gap 6, chevron 16px. crumbs fg/muted, current crumb fg/default + medium, underline on link hover.
- **Button** — added 2026-08-27. Every crumb (including the current one) renders as a small Ghost-style chip: fg/default text always (no muted/default split — the differentiation is the chip shape + hover, not text color), radius-md, shadow-xs, 2px/6px padding, gap 4, chevron 14px. Only linked crumbs get the bg/subtle hover; the current crumb stays static.

Takes an array of items; the last is treated as the current page (not a link).` } } },
  argTypes: {
    variant: { control: 'select', options: ['text', 'button'] },
  },
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

export const ButtonVariant: Story = {
  args: {
    variant: 'button',
    items: [
      { label: 'Files', href: '#' },
      { label: 'Archive', href: '#' },
      { label: 'Current' },
    ],
  },
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
  args: { items: [{ label: 'Home', href: '#' }, { label: 'Projects', href: '#' }, { label: 'Current' }] },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};

export const ButtonVariantDarkMode: Story = {
  args: ButtonVariant.args,
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
