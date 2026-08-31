import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta = {
  title: 'Core/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Form field label with optional required asterisk.
Wraps a native <label> so htmlFor wiring works correctly.` } } },
  args: { children: 'Email address' },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default:  Story = { args: { children: 'Email address' } };
export const Required: Story = { args: { children: 'Email address', required: true } };
export const Disabled: Story = { args: { children: 'Email address', disabled: true } };

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
