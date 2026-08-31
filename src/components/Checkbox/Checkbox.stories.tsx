import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Checkbox" set: Unchecked | Checked | Indeterminate | Disabled,
with Title/Description toggles (label + description props).

Box spec from Figma: 18px, radius 4 (radius-sm), accent/default fill when checked.` } } },
  args: { label: 'Accept terms and conditions' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { indeterminate: true } };
export const WithDescription: Story = { args: { label: 'Email notifications', description: 'Receive updates about your account.' } };
export const Disabled: Story = { args: { label: 'Disabled option', disabled: true } };

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
