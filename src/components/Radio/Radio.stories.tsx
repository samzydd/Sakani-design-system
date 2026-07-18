import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta = {
  title: 'Forms/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: { label: 'Option one', name: 'demo' },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const WithDescription: Story = { args: { label: 'Standard shipping', description: 'Delivered in 3–5 business days.' } };
export const Disabled: Story = { args: { label: 'Unavailable', disabled: true } };

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Radio name="plan" label="Starter" description="For individuals" defaultChecked />
      <Radio name="plan" label="Pro" description="For growing teams" />
      <Radio name="plan" label="Enterprise" description="Custom pricing" />
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
