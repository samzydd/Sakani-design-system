import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta = {
  title: 'Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Toggle switch. Matches Figma "Switch" set (SW axis): Off | On | Disabled.
Track spec from Figma: 36x20, radius-full, bg/muted (off) / accent/default (on).` } } },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const WithLabel: Story = { args: { label: 'Enable notifications' } };
export const Disabled: Story = { args: { label: 'Disabled', disabled: true } };

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  args: { label: 'Enable notifications' },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
