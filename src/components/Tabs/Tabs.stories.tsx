import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta = {
  title: 'Composite/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [(S) => <div style={{ width: 520 }}><S /></div>],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const items3 = [
  { value: 'overview', label: 'Overview' },
  { value: 'activity', label: 'Activity' },
  { value: 'settings', label: 'Settings' },
];

export const Three: Story = { args: { items: items3, defaultValue: 'overview' } };

export const Two: Story = {
  args: { items: [{ value: 'a', label: 'Account' }, { value: 'b', label: 'Billing' }], defaultValue: 'a' },
};

export const Six: Story = {
  args: {
    items: ['Overview','Activity','Members','Settings','Billing','Logs'].map((l) => ({ value: l.toLowerCase(), label: l })),
    defaultValue: 'overview',
  },
};

export const WithDisabled: Story = {
  args: {
    items: [
      { value: 'overview', label: 'Overview' },
      { value: 'activity', label: 'Activity' },
      { value: 'locked', label: 'Locked', disabled: true },
    ],
    defaultValue: 'overview',
  },
};

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  args: { items: items3, defaultValue: 'overview' },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
