import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta = {
  title: 'Forms/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Range slider. Figma "Slider" is a single component; this implements a
functional controlled/uncontrolled range input styled to the token system.

The filled portion is driven by a CSS custom property (--pct) updated on input,
so the track fills up to the thumb using accent/default.` } } },
  args: { min: 0, max: 100, defaultValue: 50 },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithLabel: Story = { args: { label: 'Volume', showValue: true, defaultValue: 70 } };
export const Disabled: Story = { args: { label: 'Disabled', defaultValue: 30, disabled: true } };

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
